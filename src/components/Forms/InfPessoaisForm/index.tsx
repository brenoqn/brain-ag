import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../../formSlice";
import { RootState } from "../../../store";

export function InformacoesPessoaisForm() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);
  const [cpf, setCpf] = useState(formData.cpf || "");
  const [isCpfValid, setIsCpfValid] = useState(
    cpfValidator.isValid(formData.cpf)
  );
  const [cpfTouched, setCpfTouched] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateForm({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleCpfChange = (event: { target: { value: string } }) => {
    const formattedCpf = event.target.value.replace(/\D/g, "");
    setCpf(formattedCpf);
    setIsCpfValid(cpfValidator.isValid(formattedCpf));
    setCpfTouched(true);
  };

  const formatCpf = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

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
        name="nomeProdutor"
        label="Nome do Produtor"
        variant="outlined"
        required
        value={formData.nomeProdutor || ""}
        onChange={handleInputChange}
      />
      <TextField
        id="cpf"
        name="cpf"
        label="CPF"
        variant="outlined"
        placeholder="000.000.000-00"
        required
        value={formatCpf(cpf)}
        onChange={handleCpfChange}
        error={cpfTouched && !isCpfValid}
        helperText={cpfTouched && !isCpfValid ? "CPF inválido" : ""}
      />
      <TextField
        id="idade"
        name="idade"
        label="Idade"
        variant="outlined"
        type="number"
        required
        value={formData.idade || ""}
        onChange={handleInputChange}
      />
      <TextField
        id="email"
        name="email"
        label="E-mail"
        variant="outlined"
        type="email"
        required
        value={formData.email || ""}
        onChange={handleInputChange}
      />
    </Box>
  );
}
