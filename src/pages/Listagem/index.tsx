import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const excluir = (id: string) => {
    dispatch(excluirProdutor(id));
  };

  const edit = (id: string) => {
    setEditId(id);
    const produtor = produtores.find((p) => p.id === id);
    if (produtor) {
      setEditData({ ...produtor });
    } else {
      setEditData(produtorInicial);
    }
  };

  const handleSave = () => {
    dispatch(editarProdutor(editData));
    setEditId(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof ProdutorRural
  ) => {
    setEditData({ ...editData, [field]: e.target.value });
  };
  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <Card className="card">
      <div className="card__header">
        <Typography variant="h3" component="div" className="title">
          Lista de Produtores Rurais Cadastrados
        </Typography>
        <img className="logo" src="/logo.png" alt="Logo" />
      </div>
      <div className="card__body">
        <CardContent>
          <Button variant="contained" color="primary" onClick={handleNavigate}>
            Cadastro
          </Button>
          {produtores.map((produtor) => (
            <Card
              key={produtor.id}
              style={{ marginBottom: "20px", marginTop: "20px" }}
            >
              <CardContent>
                {Object.keys(produtor).map((key) => {
                  if (key !== "id") {
                    return (
                      <div key={key} style={{ marginBottom: "10px" }}>
                        {key === "nomeProdutor" ? (
                          <Typography variant="h6" gutterBottom>
                            {produtor[key as keyof ProdutorRural]}
                          </Typography>
                        ) : (
                          <div>
                            {editId === produtor.id ? (
                              <TextField
                                label={
                                  key.charAt(0).toUpperCase() + key.slice(1)
                                }
                                value={
                                  key === "culturas" &&
                                  Array.isArray(
                                    produtor[key as keyof ProdutorRural]
                                  )
                                    ? (
                                        produtor[
                                          key as keyof ProdutorRural
                                        ] as string[]
                                      ).join(", ")
                                    : produtor[key as keyof ProdutorRural]
                                }
                                onChange={(e) =>
                                  handleChange(e, key as keyof ProdutorRural)
                                }
                                variant="outlined"
                                fullWidth
                                margin="normal"
                              />
                            ) : (
                              <Typography variant="subtitle1" gutterBottom>
                                {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                                {key === "culturas" &&
                                Array.isArray(
                                  produtor[key as keyof ProdutorRural]
                                )
                                  ? (
                                      produtor[
                                        key as keyof ProdutorRural
                                      ] as string[]
                                    ).join(", ")
                                  : produtor[key as keyof ProdutorRural]}
                              </Typography>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
              </CardContent>

              <Button onClick={() => excluir(produtor.id)}>Excluir</Button>
              {editId !== produtor.id && (
                <Button onClick={() => edit(produtor.id)}>Editar</Button>
              )}
              {editId === produtor.id && (
                <Button onClick={() => handleSave()}>Salvar Edição</Button>
              )}
            </Card>
          ))}
        </CardContent>
      </div>
    </Card>
  );
}
