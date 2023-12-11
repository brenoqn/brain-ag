import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { RootState, adicionarProdutor } from "../../store";
import { DescricaoFazendaForm } from "../Forms/DescFazendaForm";
import { InformacoesFazendaForm } from "../Forms/InfFazendaForm";
import { InformacoesPessoaisForm } from "../Forms/InfPessoaisForm";
import "./styles.scss";

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

export function CardGlobal() {
  const [activeStep, setActiveStep] = React.useState(0);
  const formData = useSelector((state: RootState) => state.form);
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <InformacoesPessoaisForm />;
      case 1:
        return <InformacoesFazendaForm />;
      case 2:
        return <DescricaoFazendaForm />;
      default:
        return "Unknown step";
    }
  };

  const handleBackClick = () => {
    handleBack();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isStepValid = (step: number, formData: FormData) => {
    switch (step) {
      case 0:
        return (
          formData.nomeProdutor !== "" &&
          formData.cpf !== "" &&
          formData.idade !== 0 &&
          formData.email !== ""
        );
      case 1:
        return (
          formData.nomeFazenda !== "" &&
          formData.cnpj !== "" &&
          formData.cidade !== "" &&
          formData.estado !== ""
        );
      case 2:
        return (
          formData.areaTotal !== 0 &&
          formData.areaAgricultavel !== 0 &&
          formData.areaVegetacao !== 0 &&
          formData.culturas.length > 0
        );
      default:
        return true;
    }
  };

  const handleNextClick = () => {
    if (isStepValid(activeStep, formData)) {
      setShowErrorMessage(false);
      handleNext();
    } else {
      setShowErrorMessage(true);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSubmit = () => {
    dispatch(
      adicionarProdutor({
        ...formData,
        id: uuidv4(),
      })
    );
    navigate("/lista");
  };

  return (
    <div className="card">
      <Card className="card--cadastro">
        <CardContent className="card--cadastro__content">
          <div className="card--cadastro__content--header">
            <Typography variant="h3" component="div" className="title">
              Cadastro de Produtor Rural
            </Typography>
            <img className="logo" src="/logo.png" />
          </div>
          <div className="card--cadastro__content--body">
            <Stepper activeStep={activeStep} alternativeLabel>
              <Step>
                <StepLabel>Informações Pessoais</StepLabel>
              </Step>
              <Step>
                <StepLabel>Informações da Fazenda</StepLabel>
              </Step>
              <Step>
                <StepLabel>Descrição da Fazenda</StepLabel>
              </Step>
            </Stepper>
            {getStepContent(activeStep)}
            {showErrorMessage && (
              <div
                style={{ color: "red", textAlign: "center", margin: "10px 0" }}
              >
                Por favor, preencha todos os campos obrigatórios.
              </div>
            )}
            <div className="buttons">
              <Button disabled={activeStep === 0} onClick={handleBackClick}>
                Anterior
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={activeStep === 2 ? handleSubmit : handleNextClick}
              >
                {activeStep === 2 ? "Finalizar" : "Próximo"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
