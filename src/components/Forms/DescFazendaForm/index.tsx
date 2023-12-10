import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../../formSlice";
import { RootState } from "../../../store";

const Culturas = ["Soja", "Milho", "Algodão", "Café", "Cana de Açúcar"];

export function DescricaoFazendaForm() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);
  const [areaTotal, setAreaTotal] = useState<number | "">(
    formData.areaTotal || 0
  );
  const [areaAgricultavel, setAreaAgricultavel] = useState<number | "">(
    formData.areaAgricultavel || 0
  );
  const [areaVegetacao, setAreaVegetacao] = useState<number | "">(
    formData.areaVegetacao || 0
  );
  const [culturas, setCulturas] = useState<string[]>(formData.culturas || []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numericValue = value === "" ? "" : Number(value);
    if (name === "areaTotal") {
      setAreaTotal(numericValue);
    } else if (name === "areaAgricultavel") {
      setAreaAgricultavel(numericValue);
    } else if (name === "areaVegetacao") {
      setAreaVegetacao(numericValue);
    }
    dispatch(updateForm({ ...formData, [name]: numericValue }));
  };

  const handleCulturasChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[]; // Casting para string[]
    setCulturas(value);
    dispatch(updateForm({ ...formData, culturas: value }));
  };

  const isAreaValid = () => {
    const total = Number(areaAgricultavel) + Number(areaVegetacao);
    return total <= Number(areaTotal);
  };

  return (
    <Box
      className="container"
      sx={{ "& > .MuiTextField-root": { width: "100%", marginBottom: "12px" } }}
    >
      <TextField
        id="areaTotal"
        name="areaTotal"
        label="Área total em hectares"
        variant="outlined"
        type="number"
        required
        value={areaTotal}
        onChange={handleInputChange}
      />
      <TextField
        id="areaAgricultavel"
        name="areaAgricultavel"
        label="Área agricultável em hectares"
        variant="outlined"
        type="number"
        required
        value={areaAgricultavel}
        onChange={handleInputChange}
      />
      <TextField
        id="areaVegetacao"
        name="areaVegetacao"
        label="Área de vegetação em hectares"
        variant="outlined"
        type="number"
        required
        value={areaVegetacao}
        onChange={handleInputChange}
      />
      <FormControl fullWidth>
        <InputLabel id="culturas-label">Culturas Plantadas</InputLabel>
        <Select
          labelId="culturas-label"
          id="culturas"
          name="culturas"
          variant="outlined"
          label="Culturas Plantadas"
          required
          multiple
          value={culturas}
          onChange={handleCulturasChange}
          renderValue={(selected) => (selected as string[]).join(", ")}
        >
          {Culturas.map((cultura) => (
            <MenuItem key={cultura} value={cultura}>
              {cultura}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {!isAreaValid() && (
        <p style={{ color: "red" }}>
          A soma da área agricultável e da área de vegetação não pode ser maior
          que a área total da fazenda.
        </p>
      )}
    </Box>
  );
}
