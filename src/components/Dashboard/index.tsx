import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import "./styles.scss";

export function Dashboard() {
  const navigate = useNavigate();
  const produtores = useSelector((state: RootState) => state.produtores);
  const totalFazendas = produtores.length;
  const totalAreaHectares = produtores.reduce(
    (total, produtor) => total + produtor.areaTotal,
    0
  );
  const chartContainerEstados = useRef<HTMLCanvasElement>(null);
  const chartContainerCulturas = useRef<HTMLCanvasElement>(null);
  const chartContainerUsoSolo = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const estadosData: { [key: string]: number } = {};
    const culturasData: { [key: string]: number } = {};
    let areaAgricultavel = 0;
    let areaVegetacao = 0;

    produtores.forEach((produtor) => {
      estadosData[produtor.estado] = (estadosData[produtor.estado] || 0) + 1;

      produtor.culturas.forEach((cultura) => {
        culturasData[cultura] = (culturasData[cultura] || 0) + 1;
      });

      areaAgricultavel += produtor.areaAgricultavel;
      areaVegetacao += produtor.areaVegetacao;
    });

    renderizarGraficoPizza(
      chartContainerEstados.current,
      estadosData,
      "Fazendas por Estado"
    );
    renderizarGraficoPizza(
      chartContainerCulturas.current,
      culturasData,
      "Fazendas por Cultura"
    );
    renderizarGraficoUsoSolo(
      chartContainerUsoSolo.current,
      areaAgricultavel,
      areaVegetacao
    );
  }, [produtores]);

  const renderizarGraficoPizza = (
    canvasRef: HTMLCanvasElement | null,
    data: { [key: string]: number },
    label: string
  ) => {
    if (canvasRef) {
      const chartLabels = Object.keys(data);
      const chartData = Object.values(data);

      new Chart(canvasRef, {
        type: "pie",
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: label,
              data: chartData,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#FF8A80",
                "#A1887F",
                "#FFD700",
                "#FFA500",
                "#FF8C00",
                "#FF4500",
                "#FF0000",
                "#4682B4",
                "#1E90FF",
                "#00BFFF",
                "#87CEEB",
                "#ADD8E6",
                "#32CD32",
                "#9ACD32",
                "#FF1493",
                "#8A2BE2",
                "#00FFFF",
                "#7FFF00",
                "#FF69B4",
                "#FF7F50",
                "#B0C4DE",
                "#20B2AA",
              ],
            },
          ],
        },
      });
    }
  };

  const renderizarGraficoUsoSolo = (
    canvasRef: HTMLCanvasElement | null,
    areaAgricultavel: number,
    areaVegetacao: number
  ) => {
    if (canvasRef) {
      new Chart(canvasRef, {
        type: "pie",
        data: {
          labels: ["Área Agricultável", "Área de Vegetação"],
          datasets: [
            {
              label: "Uso do Solo",
              data: [areaAgricultavel, areaVegetacao],
              backgroundColor: ["#FF6384", "#36A2EB"],
            },
          ],
        },
      });
    }
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleNavigateLista = () => {
    navigate("/lista");
  };

  return (
    <Card className="card">
      <div className="card__header">
        <Typography variant="h3" component="div" className="title">
          Dashboard
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
              onClick={handleNavigateLista}
            >
              Lista
            </Button>
          </div>
          <Card style={{ marginBottom: "20px", marginTop: "20px" }}>
            <CardContent>
              <h2>Total de Fazendas: {totalFazendas}</h2>
              <h2>Total de Área em Hectares: {totalAreaHectares}</h2>
              <div className="chart-container">
                <div className="chart">
                  <h2>Gráfico de Pizza por Estado</h2>
                  <canvas
                    ref={chartContainerEstados}
                    width="400"
                    height="400"
                  ></canvas>
                </div>
                <div className="chart">
                  <h2>Gráfico de Pizza por Cultura</h2>
                  <canvas
                    ref={chartContainerCulturas}
                    width="400"
                    height="400"
                  ></canvas>
                </div>
                <div className="chart">
                  <h2>Gráfico de Pizza por Uso do Solo</h2>
                  <canvas
                    ref={chartContainerUsoSolo}
                    width="400"
                    height="400"
                  ></canvas>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </div>
    </Card>
  );
}
