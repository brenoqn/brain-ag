import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormData {
  nomeProdutor: string;
  cpf: string;
  idade: number;
  email: string;
  cnpj: string;
  nomeFazenda: string;
  cidade: string;
  estado: string;
  areaTotal: number;
  areaAgricultavel: number;
  areaVegetacao: number;
  culturas: string[];
}

const initialState: FormData = {
  nomeProdutor: "",
  cpf: "",
  idade: 0, 
  email: "",
  cnpj: "",
  nomeFazenda: "",
  cidade: "", 
  estado: "",
  areaTotal: 0,
  areaAgricultavel: 0,
  areaVegetacao: 0,
  culturas: [],
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<FormData>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateForm } = formSlice.actions;

export default formSlice.reducer;
