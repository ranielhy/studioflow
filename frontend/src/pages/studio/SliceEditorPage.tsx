import {
  Alert,
  Box,
  Button,
  Container,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { EditorCanvas } from "../../editor/canvas/EditorCanvas";

import { useSliceComponents } from "../../hooks/components/useSliceComponents";
import { useUpdateComponent } from "../../hooks/components/useUpdateComponent";
import { useTemplateSlices } from "../../hooks/slices/useTemplateSlices";
import { useTemplate } from "../../hooks/templates/useTemplate";

export function SliceEditorPage() {
  const navigate = useNavigate();

  const {
    templateId: templateIdParam,
    sliceId: sliceIdParam,
  } = useParams();

  const templateId =
    Number(templateIdParam);

  const sliceId =
    Number(sliceIdParam);

  const templateQuery =
    useTemplate(templateId);

  const slicesQuery =
    useTemplateSlices(templateId);

  const componentsQuery =
    useSliceComponents(sliceId);

  const updateComponent =
    useUpdateComponent({
      sliceId,
    });

  const slice =
    slicesQuery.data?.find(
      (item) =>
        item.id === sliceId,
    );

  if (
    !Number.isInteger(templateId) ||
    templateId <= 0 ||
    !Number.isInteger(sliceId) ||
    sliceId <= 0
  ) {
    return (
      <Alert severity="error">
        Template ou Slice inválido.
      </Alert>
    );
  }

  if (
    templateQuery.isLoading ||
    slicesQuery.isLoading ||
    componentsQuery.isLoading
  ) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 8,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (
    !templateQuery.data ||
    !slice ||
    templateQuery.isError ||
    slicesQuery.isError
  ) {
    return (
      <Alert severity="error">
        Não foi possível carregar
        o editor.
      </Alert>
    );
  }

  const template =
    templateQuery.data;

  const components =
    componentsQuery.data ?? [];

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: {
          xs: 3,
          md: 5,
        },
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={2}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() =>
              navigate(
                `/studio/templates/${templateId}`,
              )
            }
            sx={{
              alignSelf: "flex-start",
            }}
          >
            Voltar
          </Button>

          <Paper
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              p: {
                xs: 2,
                md: 3,
              },
            }}
          >
            <Stack spacing={0.5}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                }}
              >
                {template.name}
                {" - "}
                {slice.name}
              </Typography>

              <Typography color="text.secondary">
                Editor
              </Typography>
            </Stack>
          </Paper>

          {componentsQuery.isError && (
            <Alert severity="warning">
              Não foi possível carregar os componentes desta slice. O canvas
              será exibido vazio.
            </Alert>
          )}

          <Box
            sx={{
              overflow: "auto",
              bgcolor: "grey.200",
              p: {
                xs: 2,
                md: 4,
              },
              minHeight: 600,
            }}
          >
            <EditorCanvas
              width={template.width}
              height={template.height}
              background={slice.background}
              components={components}
              onUpdateComponent={
                updateComponent.mutate
              }
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
