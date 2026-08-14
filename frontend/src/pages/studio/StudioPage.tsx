import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Container,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";

import { useTemplates } from "../../hooks/templates/useTemplates";

import { CreateTemplateDialog } from "../../components/templates/CreateTemplateDialog";

export function StudioPage() {
  const navigate = useNavigate();

  const {
    data: templates,
    isLoading,
    isError,
  } = useTemplates();
const [createOpen, setCreateOpen] =
  useState(false);


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
      <Container maxWidth="lg">
        <Stack spacing={3}>
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
            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
              sx={{
                alignItems: {
                  xs: "stretch",
                  sm: "center",
                },
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Templates
                </Typography>

                <Typography color="text.secondary">
                  Crie e gerencie seus templates.
                </Typography>
              </Box>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() =>
                  setCreateOpen(true)
                }
              >
                Novo Template
              </Button>
            </Stack>
          </Paper>

          {isLoading && (
            <Paper
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                display: "flex",
                justifyContent: "center",
                py: 8,
              }}
            >
              <CircularProgress />
            </Paper>
          )}

          {isError && (
            <Alert severity="error">
              Não foi possível carregar os templates. Verifique se a API está
              executando em http://localhost:3333.
            </Alert>
          )}

          {!isLoading &&
            !isError &&
            templates?.length === 0 && (
              <Alert severity="info">
                Nenhum template criado.
              </Alert>
            )}

          {!isLoading &&
            !isError &&
            templates &&
            templates.length > 0 && (
              <Grid container spacing={2}>
                {templates.map((template) => (
                  <Grid
                    key={template.id}
                    size={{
                      xs: 12,
                      sm: 6,
                      md: 4,
                    }}
                  >
                    <Card
                      variant="outlined"
                      sx={{
                        height: "100%",
                      }}
                    >
                      <CardActionArea
                        onClick={() =>
                          navigate(
                            `/studio/templates/${template.id}`,
                          )
                        }
                        sx={{
                          height: "100%",
                        }}
                      >
                        <CardContent>
                          <Stack spacing={1.5}>
                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{
                                alignItems: "flex-start",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography variant="h6">
                                {template.name}
                              </Typography>

                              <Chip
                                size="small"
                                label={template.status}
                              />
                            </Stack>

                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              {template.description ||
                                "Sem descrição"}
                            </Typography>

                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{
                                flexWrap: "wrap",
                              }}
                            >
                              <Chip
                                size="small"
                                variant="outlined"
                                label={`${template.width} x ${template.height}`}
                              />

                              <Chip
                                size="small"
                                variant="outlined"
                                label={template.mediaType}
                              />
                            </Stack>
                          </Stack>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
            <CreateTemplateDialog
              open={createOpen}

              onClose={() =>
                setCreateOpen(false)
              }
            />
        </Stack>
      </Container>
    </Box>
  );
}
