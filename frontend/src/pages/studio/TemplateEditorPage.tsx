import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";

import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useTemplateSlices } from "../../hooks/slices/useTemplateSlices";
import { useTemplate } from "../../hooks/templates/useTemplate";

export function TemplateEditorPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const templateId = Number(id);

  const templateQuery =
    useTemplate(templateId);

  const slicesQuery =
    useTemplateSlices(templateId);

  if (
    !Number.isInteger(templateId) ||
    templateId <= 0
  ) {
    return (
      <Alert severity="error">
        Template inválido.
      </Alert>
    );
  }

  if (
    templateQuery.isLoading ||
    slicesQuery.isLoading
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
    templateQuery.isError ||
    !templateQuery.data
  ) {
    return (
      <Alert severity="error">
        Não foi possível carregar o
        template.
      </Alert>
    );
  }

  const template =
    templateQuery.data;

  const slices =
    slicesQuery.data ?? [];

  return (
    <Stack spacing={3}>
      <Box>
        <Button
          startIcon={
            <ArrowBackIcon />
          }
          onClick={() =>
            navigate("/studio")
          }
        >
          Voltar
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <Box>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center" }}
          >
            <Typography variant="h4">
              {template.name}
            </Typography>

            <Chip
              label={
                template.status
              }
              size="small"
            />
          </Stack>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            {template.description ||
              "Sem descrição"}
          </Typography>

          <Typography
            variant="body2"
            sx={{ mt: 1 }}
          >
            {template.width}
            {" × "}
            {template.height}
            {" · "}
            {template.mediaType}
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Nova Slice
        </Button>
      </Box>

      <Divider />

      <Box>
        <Typography
          variant="h6"
          sx={{ mb: 2 }}
        >
          Slices
        </Typography>

        {slicesQuery.isError && (
          <Alert severity="error">
            Não foi possível carregar
            as slices.
          </Alert>
        )}

        {!slicesQuery.isError &&
          slices.length === 0 && (
            <Alert severity="info">
              Este template ainda não
              possui slices.
            </Alert>
          )}

        <Stack spacing={2}>
          {slices.map((slice) => (
            <Card
              key={slice.id}
              variant="outlined"
            >
              <CardActionArea>
                <CardContent>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent:
                        "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                      >
                        {slice.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color=
                          "text.secondary"
                      >
                        Posição:{" "}
                        {slice.position}
                        {" · "}
                        Duração:{" "}
                        {slice.duration}s
                      </Typography>
                    </Box>

                    <Chip
                      label={
                        slice.background
                          .type
                      }
                      variant="outlined"
                    />
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}