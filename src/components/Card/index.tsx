import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
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
}

export function CardGlobal() {
  const [activeStep, setActiveStep] = React.useState(0);
  const formData = useSelector((state: RootState) => state.form);

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
    console.log('Voltando para o step anterior');
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isStepValid = (formData: FormData) => {
    console.log('Validando:', formData);
    const isValid = formData.nomeProdutor !== '' && formData.cpf !== '' && formData.idade !== 0 && formData.email !== '';
    console.log('É válido?', isValid);
    return isValid;
  };

  const handleNextClick = () => {
    console.log('Clicou em Próximo, Dados Atuais:', formData);
    if (isStepValid(formData)) {
      handleNext();
    } else {
      console.log('Falha na validação, não pode avançar.');
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSubmit = () => {
    console.log('Dados finais no submit:', formData);
  };

  return (
    <div className="card">
      <Card className="card--cadastro">
        <CardContent className="card--cadastro__content">
          <div className="card--cadastro__content--header">
            <Typography variant="h3" component="div" className="title">
              Cadastro de Produtor Rural
            </Typography>
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
