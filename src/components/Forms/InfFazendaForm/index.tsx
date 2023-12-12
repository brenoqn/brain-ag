import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { cnpj as cnpjValidator } from "cpf-cnpj-validator";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../../../formSlice";
import { RootState } from "../../../store";
import { ChangeEvent } from "react";

interface Estado {
  id: number;
  nome: string;
  sigla: string;
}

interface Cidade {
  id: number;
  nome: string;
}

export function InformacoesFazendaForm() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);

  const [cnpj, setCnpj] = useState(formData.cnpj || "");
  const [isCnpjValid, setIsCnpjValid] = useState(true);
  const [estados, setEstados] = useState<Estado[]>([]); 
  const [cidades, setCidades] = useState<Cidade[]>([]);

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

  useEffect(() => {
    async function fetchEstados() {
      try {
        const response = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
        );
        const data = await response.json();
        setEstados(data);
      } catch (error) {
        console.error("Erro ao buscar estados:", error);
      }
    }

    fetchEstados();
  }, []);

  const handleEstadoChange = async (event: ChangeEvent<{ value: unknown }>) => {
    const estadoSelecionado = event.target.value as string;
    dispatch(updateForm({ ...formData, estado: estadoSelecionado }));
  
    try {
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`
      );
      const data = await response.json();
      setCidades(data);
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
      setCidades([]);
    }
  };
  
  const handleCidadeChange = (event: ChangeEvent<{ value: unknown }>) => {
    const cidadeSelecionada = event.target.value as string;
    dispatch(updateForm({ ...formData, cidade: cidadeSelecionada }));
  };
  
  const formatCnpj = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  return (
    <Box
      sx={{
        "& > .MuiTextField-root": { width: "100%", marginBottom: "12px" },
        "& > .MuiFormControl-root:not(:last-child)": { marginBottom: "16px" },
      }}
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

      <FormControl fullWidth>
        <InputLabel id="estado-label">Estado</InputLabel>
        <Select
          labelId="estado-label"
          id="estado"
          name="estado"
          variant="outlined"
          label="Estado"
          required
          value={formData.estado || ""}
          onChange={handleEstadoChange}
        >
          {estados.map((estado) => (
            <MenuItem key={estado.id} value={estado.sigla}>
              {estado.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="cidade-label">Cidade</InputLabel>
        <Select
          labelId="cidade-label"
          id="cidade"
          name="cidade"
          variant="outlined"
          label="Cidade"
          required
          value={formData.cidade || ""}
          onChange={handleCidadeChange}
        >
          {cidades.map((cidade) => (
            <MenuItem key={cidade.id} value={cidade.nome}>
              {cidade.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
