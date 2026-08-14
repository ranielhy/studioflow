import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export function PersonalizePage() {
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
          <Stack spacing={1}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
              }}
            >
              Personalize
            </Typography>

            <Typography color="text.secondary">
              Ajuste as configurações visuais do StudioFlow.
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
