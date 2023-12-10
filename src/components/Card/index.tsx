import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React from "react";
import { DescricaoFazendaForm } from "../Forms/DescFazendaForm";
import { InformacoesFazendaForm } from "../Forms/InfFazendaForm";
import { InformacoesPessoaisForm } from "../Forms/InfPessoaisForm";

export function CardGlobal() {
  const [activeStep, setActiveStep] = React.useState(0);

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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isStepValid = () => {
    // Aqui você pode adicionar a lógica de validação para permitir avançar entre as etapas
    return true; // Substitua por sua própria lógica de validação
  };

  const handleNextClick = () => {
    if (isStepValid()) {
      handleNext();
    }
  };

  const handleBackClick = () => {
    handleBack();
  };

  return (
    <div className="card">
      <Card className="card--cadastro">
        <CardContent className="card--cadastro__content">
          <div className="card--cadastro__content--header">
            <Typography variant="h3" component="div" className="title">
              Cadastro de Produtor Rural
            </Typography>
            {/* Outros elementos do cabeçalho */}
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
            <div>
              <Button disabled={activeStep === 0} onClick={handleBackClick}>
                Anterior
              </Button>
              <Button variant="contained" color="primary" onClick={handleNextClick}>
                {activeStep === 2 ? "Finalizar" : "Próximo"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
