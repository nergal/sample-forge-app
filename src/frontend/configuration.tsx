import React, { useEffect, useState } from "react";
import ForgeReconciler, {
  Button,
  Form,
  FormFooter,
  FormHeader,
  FormSection,
  Label,
  RequiredAsterisk,
  SectionMessage,
  Textfield,
  Text,
  useForm,
  Box,
} from "@forge/react";
import { invoke } from "@forge/bridge";

type TokenFormData = {
  token: string;
};

const MESSAGE_DISPLAY_TIME = 3000;

const Configuration = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isTokenLoading, setIsTokenLoading] = useState(true);

  const {
    getFieldId,
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<TokenFormData>({
    defaultValues: { token: "" },
  });

  const onSubmit = async (data: TokenFormData) => {
    setIsTokenLoading(true);
    await invoke("setToken", { token: data.token });
  };

  useEffect(() => {
    let timeoutHandle: NodeJS.Timeout;

    invoke<{ token: string | null }>("getToken").then(() => {
      register("token").onChange({ target: { value: '' } } as any);
      setIsTokenLoading(false);
      setShowSuccessMessage(true);
      timeoutHandle = setTimeout(() => setShowSuccessMessage(false), MESSAGE_DISPLAY_TIME);
    });

    return () => clearTimeout(timeoutHandle);
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader title="Login">
        Required fields are marked with an asterisk <RequiredAsterisk />
      </FormHeader>
      <FormSection>
        {showSuccessMessage && (
          <Box paddingBlockEnd="space.200">
            <SectionMessage appearance="success">
              <Text>Token was successfully saved in the configuration.</Text>
            </SectionMessage>
          </Box>
        )}

        <Label labelFor={getFieldId("token")}>GitHub Token</Label>
        <Textfield
          isMonospaced
          isDisabled={isTokenLoading}
          {...register("token", { required: true })}
        />
      </FormSection>
      <FormFooter>
        <Button appearance="subtle" type="reset">
          Reset
        </Button>
        <Button
          appearance="primary"
          isDisabled={!isValid || isTokenLoading}
          type="submit"
        >
          Save
        </Button>
      </FormFooter>
    </Form>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <Configuration />
  </React.StrictMode>
);
