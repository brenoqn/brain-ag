import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { cnpj as cnpjValidator } from "cpf-cnpj-validator";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../../formSlice";
import { RootState } from "../../../store";

export function InformacoesFazendaForm() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);

  const [cnpj, setCnpj] = useState(formData.cnpj || "");
  const [isCnpjValid, setIsCnpjValid] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "cnpj") {
      const formattedCnpj = value.replace(/\D/g, "");
      setCnpj(formattedCnpj);

      const isValid = cnpjValidator.isValid(formattedCnpj);
      setIsCnpjValid(isValid);
      if (isValid) {
        dispatch(updateForm({ ...formData, cnpj: formattedCnpj }));
      }
    } else {
      dispatch(updateForm({ ...formData, [name]: value }));
    }
  };

  const formatCnpj = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  return (
    <Box
      className="container"
      sx={{ "& > .MuiTextField-root": { width: "100%", marginBottom: "12px" } }}
    >
      <TextField
        id="nomeFazenda"
        name="nomeFazenda"
        label="Nome da Fazenda"
        variant="outlined"
        required
        value={formData.nomeFazenda || ""}
        onChange={handleInputChange}
      />

      <TextField
        id="cnpj"
        name="cnpj"
        label="CNPJ"
        variant="outlined"
        placeholder="00.000.000/0000-00"
        required
        value={formatCnpj(cnpj)}
        onChange={handleInputChange}
        error={!isCnpjValid}
        helperText={!isCnpjValid ? "CNPJ inválido" : ""}
      />

      <TextField
        id="cidade"
        name="cidade"
        label="Cidade"
        variant="outlined"
        required
        value={formData.cidade || ""}
        onChange={handleInputChange}
      />

      <TextField
        id="estado"
        name="estado"
        label="Estado"
        variant="outlined"
        required
        value={formData.estado || ""}
        onChange={handleInputChange}
      />
    </Box>
  );
}
