import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Flex,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { alert } from "../../../utils/alert";

const { REACT_APP_API } = process.env;

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Ingresa un nombre de usuario"),
    password: Yup.string().required("Ingresa una contraseña"),
  });

  const onSubmit = () => {
    const { username, password } = values;
    fetch(`${REACT_APP_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status_code === 200) {
          localStorage.setItem("token", data?.result?.token);
          localStorage.setItem("username", data?.result?.user.userName);
          navigate("/", { replace: true });
        } else {
          alert();
        }
      });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    formik;

  return (
    <Flex align="center" justify="center" height="100%">
      <Flex
        bg="white"
        p={4}
        rounded="md"
        border="1px"
        color="border"
        flexDirection="column"
        width="440px"
      >
        <Heading as="h1" size="lg" color="font" alignSelf="flex-start" pb={2}>
          Iniciar sesión
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={2} align="flex-start" color="font">
            <FormControl>
              <FormLabel fontWeight="normal" htmlFor="username">
                Nombre de usuario
              </FormLabel>
              <Input
                name="username"
                type="text"
                variant="outline"
                focusBorderColor="primary"
                borderColor={errors.username && touched.username && "red"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {errors.username && touched.username && (
                <Text textAlign="left" color="error" pl={1}>
                  {errors.username}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="normal" htmlFor="password">
                Contraseña
              </FormLabel>
              <Input
                name="password"
                type="password"
                variant="outline"
                focusBorderColor="primary"
                borderColor={errors.password && touched.password && "red"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text textAlign="left" color="error" pl={1}>
                  {errors.password}
                </Text>
              )}
            </FormControl>
            <Button
              type="submit"
              bg="primary"
              width="full"
              color="button"
              _hover={{
                bg: "button",
                color: "primary",
                border: "1px",
              }}
            >
              Enviar
            </Button>
          </VStack>
        </form>
        <Text
          color="font"
          alignSelf="flex-start"
          pt={2}
          _hover={{ color: "link" }}
        >
          <Link to="/register">Registrarme</Link>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Login;
