import styled from "styled-components";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { EnvData, Environment } from "@xliic/common/env";

import { saveEnv, useFeatureDispatch } from "./slice";
import EnvKeyValue from "./EnvKeyValue";
import AddNewRow from "./AddNewRow";

export default function EnvironmentForm({
  name,
  data,
}: {
  name: keyof EnvData;
  data: Environment;
}) {
  const dispatch = useFeatureDispatch();

  const defaultValues = wrapEnvironment(data);

  const methods = useForm({
    defaultValues,
    mode: "onChange",
  });

  const { handleSubmit, control } = methods;

  function onSubmit(data: { values: Item[] }) {
    const environment = unwrapEnvironment(data);
    dispatch(saveEnv({ name, environment }));
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "values",
  });

  return (
    <FormProvider {...methods}>
      <Form onChange={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id}>
            <EnvKeyValue
              name={`values.${index}`}
              remove={() => {
                remove(index);
                handleSubmit(onSubmit)();
              }}
            />
          </div>
        ))}
        <div>
          <AddNewRow append={append} />
        </div>
      </Form>
    </FormProvider>
  );
}

const Form = styled.form`
  padding: 8px;
`;

interface Item {
  key: string;
  value: string;
}

function wrapEnvironment(environment: Environment): { values: Item[] } {
  const wrapped = Object.entries(environment).map(([key, value]) => ({ key, value }));
  return { values: wrapped };
}

function unwrapEnvironment(data: { values: Item[] }): Environment {
  const environment: Environment = {};
  for (const item of data.values) {
    environment[item.key] = item.value;
  }
  return environment;
}
