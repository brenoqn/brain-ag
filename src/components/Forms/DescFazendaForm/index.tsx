import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React from "react";

const Culturas = ["Soja", "Milho", "Algodão", "Café", "Cana de Açúcar"];

export function DescricaoFazendaForm() {
  const [culturas, setCulturas] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const {
      target: { value },
    } = event;

    setCulturas(value as string[]);
  };

  return (
    <Box
      className="container"
      sx={{ "& > .MuiTextField-root": { width: "100%", marginBottom: "12px" } }}
    >
      <TextField
        id="areaTotal"
        label="Área total em hectares"
        variant="outlined"
        type="number"
        required
      />
      <TextField
        id="areaAgricultavel"
        label="Área agricultável em hectares"
        variant="outlined"
        type="number"
        required
      />
      <TextField
        id="areaVegetacao"
        label="Área de vegetação em hectares"
        variant="outlined"
        type="number"
        required
      />
      <FormControl fullWidth>
        <InputLabel id="culturas-label">Culturas Plantadas</InputLabel>
        <Select
          labelId="culturas-label"
          id="culturas"
          variant="outlined"
          label="Culturas Plantadas"
          required
          multiple
          value={culturas}
          onChange={handleChange}
          renderValue={(selected) => (selected as string[]).join(", ")}
        >
          {Culturas.map((cultura) => (
            <MenuItem key={cultura} value={cultura}>
              {cultura}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary">
        Enviar
      </Button>
    </Box>
  );
}
