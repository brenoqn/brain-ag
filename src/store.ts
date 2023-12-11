import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import { v4 as uuidv4 } from 'uuid';
export interface ProdutorRural {
  id: string;
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

const produtoresIniciais: ProdutorRural[] = [
  {
    id: uuidv4(),
    nomeProdutor: "João Silva",
    cpf: "123.456.789-00",
    idade: 40,
    email: "joao@example.com",
    cnpj: "21.677.561/0001-08",
    nomeFazenda: "Encanto",
    cidade: "Bom Jesus do Goiás",
    estado: "Goiás",
    areaTotal: 500,
    areaAgricultavel: 250,
    areaVegetacao: 150,
    culturas: ["Soja", "Milho", "Algodão"],
  },
  
  {
    id: uuidv4(),
    nomeProdutor: "Maria Oliveira",
    cpf: "987.654.321-00",
    idade: 35,
    email: "maria@example.com",
    cnpj: "12.345.678/0001-90",
    nomeFazenda: "Sol Nascente",
    cidade: "Santa Rita do Passa Quatro",
    estado: "São Paulo",
    areaTotal: 300,
    areaAgricultavel: 200,
    areaVegetacao: 50,
    culturas: ["Soja", "Milho", "Algodão", "Café", "Cana de Açúcar"],
  },
  {
    id: uuidv4(),
    nomeProdutor: "Carlos Pereira",
    cpf: "111.222.333-44",
    idade: 50,
    email: "carlos@example.com",
    cnpj: "33.444.555/0001-77",
    nomeFazenda: "Terra Firme",
    cidade: "Dourados",
    estado: "Mato Grosso do Sul",
    areaTotal: 800,
    areaAgricultavel: 500,
    areaVegetacao: 200,
    culturas: ["Milho", "Algodão", "Café", "Cana de Açúcar"],
  },
  {
    id: uuidv4(),
    nomeProdutor: "Ana Torres",
    cpf: "555.666.777-88",
    idade: 45,
    email: "ana@example.com",
    cnpj: "88.999.000/0001-11",
    nomeFazenda: "Arco-Íris",
    cidade: "Petrolina",
    estado: "Pernambuco",
    areaTotal: 400,
    areaAgricultavel: 150,
    areaVegetacao: 100,
    culturas: ["Algodão", "Café"],
  },
];

const produtoresSlice = createSlice({
  name: "produtores",
  initialState: produtoresIniciais,
  reducers: {
    adicionarProdutor: (state, action: PayloadAction<ProdutorRural>) => {
      state.push(action.payload);
    },
    editarProdutor: (state, action: PayloadAction<ProdutorRural>) => {
      const index = state.findIndex(produtor => produtor.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    excluirProdutor: (state, action: PayloadAction<string>) => {
      return state.filter(produtor => produtor.id !== action.payload);
    },
  },
});

export const { adicionarProdutor, editarProdutor, excluirProdutor } =
  produtoresSlice.actions;

const produtoresReducer = produtoresSlice.reducer;

export const store = configureStore({
  reducer: {
    form: formReducer,
    produtores: produtoresReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
