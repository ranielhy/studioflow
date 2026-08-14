import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import {
  Controller,
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import { z } from "zod";

import { useCreateTemplate } from "../../hooks/templates/useCreateTemplate";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Informe o nome do template"),

  description: z.string().optional(),

  mediaType: z.enum([
    "IMAGE",
    "VIDEO",
    "PDF",
  ]),

  width: z.coerce
    .number()
    .positive(
      "A largura deve ser maior que zero",
    ),

  height: z.coerce
    .number()
    .positive(
      "A altura deve ser maior que zero",
    ),
});

type FormInput = z.input<typeof schema>;
type FormData = z.output<typeof schema>;

interface CreateTemplateDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CreateTemplateDialog({
  open,
  onClose,
}: CreateTemplateDialogProps) {
  const createTemplate =
    useCreateTemplate();

  const {
    register,
    control,
    handleSubmit,
    reset,

    formState: {
      errors,
    },
  } = useForm<FormInput, unknown, FormData>({
    resolver: zodResolver(schema),

    defaultValues: {
      name: "",
      description: "",

      mediaType: "IMAGE",

      width: 1080,
      height: 1080,
    },
  });

  async function onSubmit(
    data: FormData,
  ) {
    await createTemplate.mutateAsync({
      ...data,

      status: "DRAFT",
    });

    reset();

    onClose();
  }

  function handleClose() {
    reset();

    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogTitle>
          Novo Template
        </DialogTitle>

        <DialogContent>
          <Stack
            spacing={2}
            sx={{ mt: 1 }}
          >
            {createTemplate.isError && (
              <Alert severity="error">
                Não foi possível criar o
                template.
              </Alert>
            )}

            <TextField
              label="Nome"
              fullWidth

              {...register("name")}

              error={Boolean(
                errors.name,
              )}

              helperText={
                errors.name?.message
              }
            />

            <TextField
              label="Descrição"
              fullWidth
              multiline
              rows={3}

              {...register(
                "description",
              )}
            />

            <Controller
              name="mediaType"
              control={control}

              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>
                    Tipo
                  </InputLabel>

                  <Select
                    {...field}
                    label="Tipo"
                  >
                    <MenuItem value="IMAGE">
                      Imagem
                    </MenuItem>

                    <MenuItem value="VIDEO">
                      Vídeo
                    </MenuItem>

                    <MenuItem value="PDF">
                      PDF
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
            >
              <TextField
                label="Largura"
                type="number"
                fullWidth

                {...register("width")}

                error={Boolean(
                  errors.width,
                )}

                helperText={
                  errors.width?.message
                }
              />

              <TextField
                label="Altura"
                type="number"
                fullWidth

                {...register("height")}

                error={Boolean(
                  errors.height,
                )}

                helperText={
                  errors.height?.message
                }
              />
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            disabled={
              createTemplate.isPending
            }
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={
              createTemplate.isPending
            }
          >
            {createTemplate.isPending
              ? "Criando..."
              : "Criar Template"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
