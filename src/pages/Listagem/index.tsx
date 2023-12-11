import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ProdutorRural,
  RootState,
  editarProdutor,
  excluirProdutor,
} from "../../store";
import "./styles.scss";

export function ListaProdutores() {
  const produtorInicial: ProdutorRural = {
    id: "",
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
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<ProdutorRural>(produtorInicial);

  const produtores = useSelector((state: RootState) => state.produtores);
  const dispatch = useDispatch();

  const excluir = (id: string) => {
    dispatch(excluirProdutor(id));
  };

  const edit = (id: string) => {
    setEditId(id);
    const produtor = produtores.find((p) => p.id === id);
    if (produtor) {
      setEditData(produtor);
    } else {
      setEditData(produtorInicial);
    }
  };

  const handleSave = (id: string) => {
    dispatch(editarProdutor({ ...editData, id }));
    setEditId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof ProdutorRural) => {
    setEditData({ ...editData, [field]: e.target.value });
  };
  

  return (
    <Card className="card">
      <CardContent>
        <div className="card__header">
          <Typography variant="h3" component="div" className="title">
            Cadastro de Produtor Rural
          </Typography>
          <img className="logo" src="/logo.png" />
        </div>

        {produtores.map((produtor) => (
          <Card key={produtor.id} style={{ marginBottom: "10px" }}>
            <CardContent>
              {editId === produtor.id ? (
                // Inputs para edição
                <div>
                  <input
                    type="text"
                    value={editData.nomeProdutor}
                    onChange={(e) => handleChange(e, "nomeProdutor")}
                  />
                  {/* Adicionar inputs para outros campos conforme necessário */}
                  <Button onClick={() => handleSave(produtor.id)}>
                    Salvar Edição
                  </Button>
                </div>
              ) : (
                // Exibição normal
                <div>
                  <Typography variant="h5" component="h2">
                    {produtor.nomeProdutor}
                  </Typography>
                  {/* ... Outras informações do produtor */}
                </div>
              )}
              <Typography color="textSecondary">CPF: {produtor.cpf}</Typography>
              <Typography color="textSecondary">
                Idade: {produtor.idade} anos
              </Typography>
              <Typography color="textSecondary">
                Email: {produtor.email}
              </Typography>
              <Typography color="textSecondary">
                CNPJ: {produtor.cnpj}
              </Typography>
              <Typography color="textSecondary">
                Fazenda: {produtor.nomeFazenda}
              </Typography>
              <Typography color="textSecondary">
                Cidade: {produtor.cidade}
              </Typography>
              <Typography color="textSecondary">
                Estado: {produtor.estado}
              </Typography>
              <Typography color="textSecondary">
                Área Total: {produtor.areaTotal} ha
              </Typography>
              <Typography color="textSecondary">
                Área Agricultável: {produtor.areaAgricultavel} ha
              </Typography>
              <Typography color="textSecondary">
                Área de Vegetação: {produtor.areaVegetacao} ha
              </Typography>
              <Typography color="textSecondary">
                Culturas: {produtor.culturas.join(", ")}
              </Typography>
            </CardContent>

            <button onClick={() => excluir(produtor.id)}>Excluir</button>
            {editId !== produtor.id && (
              <button onClick={() => edit(produtor.id)}>Editar</button>
            )}
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
