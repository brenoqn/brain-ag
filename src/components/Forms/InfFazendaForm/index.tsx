import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export function InformacoesFazendaForm() {
  return (
    <Box className="container" sx={{ '& > .MuiTextField-root': { width: '100%', marginBottom: '12px' } }}>
      <TextField
        id="nomeFazenda"
        label="Nome da Fazenda"
        variant="outlined"
        required
      />
      <TextField
        id="cnpj"
        label="CNPJ"
        variant="outlined"
        placeholder="000.000.000-00"
        required
      />
      <TextField id="cidade" label="Cidade" variant="outlined" className="input" required />
      <TextField id="estado" label="Estado" variant="outlined" className="input" required />
    </Box>
  );
}
