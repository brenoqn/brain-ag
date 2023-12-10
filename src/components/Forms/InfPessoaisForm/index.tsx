import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export function InformacoesPessoaisForm() {
  return (
    <Box
      className="container"
      sx={{
        "& > .MuiTextField-root": { width: "100%", marginBottom: "12px" },
        "& > .MuiFormControl-root": { width: "100%", marginBottom: "12px" },
      }}
    >
      <TextField
        id="nomeProdutor"
        label="Nome do Produtor"
        variant="outlined"
        required
      />
      <TextField
        id="cpf"
        label="CPF"
        variant="outlined"
        placeholder="000.000.000-00"
        required
      />
      <TextField
        id="idade"
        label="Data de nascimento"
        variant="outlined"
        placeholder="000.000.000-00"
        required
      />
      <TextField
        id="email"
        label="E-mail"
        variant="outlined"
        placeholder="000.000.000-00"
        required
      />
      {/* Outros campos de informações pessoais */}
    </Box>
  );
}
