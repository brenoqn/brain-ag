import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
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

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   field: keyof ProdutorRural
  // ) => {
  //   setEditData({ ...editData, [field]: e.target.value });
  // };

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleNavigateDashboard = () => {
    navigate("/dashboard");
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
          <div className="navigate">
            <Button
              variant="contained"
              color="primary"
              onClick={handleNavigateHome}
            >
              Cadastro
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNavigateDashboard}
            >
              Dashboard
            </Button>
          </div>
          <TableContainer
            component={Paper}
            sx={{ overflowX: "auto", marginTop: "20px" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(produtorInicial).map(
                    (key) =>
                      key !== "id" && (
                        <TableCell
                          key={key}
                          sx={{
                            display:
                              key === "Actions"
                                ? { xs: "none", sm: "table-cell" }
                                : "table-cell",
                            fontSize: 12,
                            textAlign: key === "cpf" ? "center" : "",
                          }}
                        >
                          {key}
                        </TableCell>
                      )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {produtores.map((produtor) => (
                  <TableRow key={produtor.id}>
                    {Object.keys(produtor).map(
                      (key) =>
                        key !== "id" && (
                          <TableCell
                            key={key}
                            sx={{
                              whiteSpace:
                                key === "cpf" || key === "cnpj"
                                  ? "nowrap"
                                  : "inherit",
                              overflow:
                                key === "cpf" || key === "cnpj"
                                  ? "hidden"
                                  : "inherit",
                              textOverflow:
                                key === "cpf" || key === "cnpj"
                                  ? "ellipsis"
                                  : "inherit",
                              textAlign:
                                key === "areaTotal" ||
                                key === "areaAgricultavel" ||
                                key === "areaVegetacao" ||
                                key === "idade"
                                  ? "center"
                                  : "",
                              fontSize: 12,
                            }}
                          >
                            {Array.isArray(produtor[key as keyof ProdutorRural])
                              ? (
                                  produtor[
                                    key as keyof ProdutorRural
                                  ] as string[]
                                ).join(", ")
                              : produtor[key as keyof ProdutorRural]}
                          </TableCell>
                        )
                    )}
                    <TableCell>
                      <Button
                        onClick={() => excluir(produtor.id)}
                        sx={{
                          background: "red",
                          color: "white",
                          fontSize: 12,
                        }}
                      >
                        Excluir
                      </Button>
                      {editId !== produtor.id && (
                        <Button
                          sx={{
                            fontSize: 12,
                          }}
                          onClick={() => edit(produtor.id)}
                        >
                          Editar
                        </Button>
                      )}
                      {editId === produtor.id && (
                        <Button onClick={() => handleSave()}>
                          Salvar Edição
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </div>
    </Card>
  );
}
