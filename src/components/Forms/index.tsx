import { Field, Form, Formik, FormikHelpers } from "formik";

interface FormData {
  cpf: string;
  cnpj: string;
  producerName: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  agriculturalArea: number | string;
  vegetationArea: number | string;
  crops: string[];
}

export function Forms() {
  const initialValues: FormData = {
    cpf: "",
    cnpj: "",
    producerName: "",
    farmName: "",
    city: "",
    state: "",
    totalArea: 0,
    agriculturalArea: 0,
    vegetationArea: 0,
    crops: [],
  };

  const handleSubmit = (values: FormData, actions: FormikHelpers<FormData>) => {
    console.log(values);
    actions.setSubmitting(false);
  };

  const validateForm = (values: FormData) => {
    const errors: Partial<FormData> = {};

    if (!values.cpf && !values.cnpj) {
      errors.cpf = "CPF ou CNPJ é obrigatório";
      errors.cnpj = "CPF ou CNPJ é obrigatório";
    }

    if (values.cpf && !isValidCPF(values.cpf)) {
      errors.cpf = "CPF inválido";
    }
    if (values.cnpj && !isValidCNPJ(values.cnpj)) {
      errors.cnpj = "CNPJ inválido";
    }

    const agricultural = Number(values.agriculturalArea);
    const vegetation = Number(values.vegetationArea);
    const total = Number(values.totalArea);

    if (isNaN(agricultural) || isNaN(vegetation) || isNaN(total)) {
      errors.agriculturalArea = "Valor inválido";
      errors.vegetationArea = "Valor inválido";
    } else if (agricultural + vegetation > total) {
      errors.agriculturalArea =
        "A soma de áreas excede a área total da fazenda";
      errors.vegetationArea = "A soma de áreas excede a área total da fazenda";
    }

    return errors;
  };

  const isValidCPF = (cpf: string) => {
    return cpf.length === 11;
  };

  const isValidCNPJ = (cnpj: string) => {
    return cnpj.length === 14;
  };

  return (
    <div>
      <h1>Cadastro de Produtor Rural</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validateForm}
      >
        <Form>
          <label htmlFor="cpf">CPF</label>
          <Field id="cpf" name="cpf" placeholder="123.456.789-00" />

          <label htmlFor="cnpj">CNPJ</label>
          <Field id="cnpj" name="cnpj" placeholder="12.345.678/0001-90" />

          <label htmlFor="producerName">Nome do Produtor</label>
          <Field
            id="producerName"
            name="producerName"
            placeholder="João Silva"
          />

          <label htmlFor="farmName">Nome da Fazenda</label>
          <Field id="farmName" name="farmName" placeholder="Fazenda Feliz" />

          <label htmlFor="city">Cidade</label>
          <Field id="city" name="city" placeholder="Cidade" />

          <label htmlFor="state">Estado</label>
          <Field id="state" name="state" placeholder="Estado" />

          <label htmlFor="totalArea">Área Total (ha)</label>
          <Field id="totalArea" name="totalArea" type="number" />

          <label htmlFor="agriculturalArea">Área Agricultável (ha)</label>
          <Field id="agriculturalArea" name="agriculturalArea" type="number" />

          <label htmlFor="vegetationArea">Área de Vegetação (ha)</label>
          <Field id="vegetationArea" name="vegetationArea" type="number" />

          <label htmlFor="crops">Culturas Plantadas</label>
          <Field id="crops" name="crops" component="select" multiple={true}>
            <option value="Soja">Soja</option>
            <option value="Milho">Milho</option>
            <option value="Algodão">Algodão</option>
            <option value="Café">Café</option>
            <option value="Cana de Açúcar">Cana de Açúcar</option>
          </Field>

          <button type="submit">Enviar</button>
        </Form>
      </Formik>
    </div>
  );
}
