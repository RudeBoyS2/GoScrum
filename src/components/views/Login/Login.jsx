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
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import * as Yup from "yup";
import { alert } from "../../../utils/alert";
import { buttonHoverColor } from "../../../utils/colorModeValues";

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
    <Flex
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0 }}
      align="center"
      justify="center"
      height="100%"
      bg={useColorModeValue("bg", "bgDark")}
    >
      <Flex
        mb={2}
        px={4}
        pt={3}
        pb={2}
        bg={useColorModeValue("bg", "bgDark")}
        rounded="lg"
        boxShadow={{ md: "2xl" }}
        flexDirection="column"
        width="440px"
      >
        <Heading
          as="h1"
          size="lg"
          color={useColorModeValue("font", "bg")}
          alignSelf="flex-start"
          pb={2}
        >
          Iniciar sesión
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={2} align="flex-start" color="font">
            <FormControl>
              <FormLabel
                fontWeight="normal"
                htmlFor="username"
                color={useColorModeValue("font", "bg")}
              >
                Nombre de usuario
              </FormLabel>
              <Input
                color={useColorModeValue("font", "bg")}
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
              <FormLabel
                fontWeight="normal"
                htmlFor="password"
                color={useColorModeValue("font", "bg")}
              >
                Contraseña
              </FormLabel>
              <Input
                color={useColorModeValue("font", "bg")}
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
              _hover={useColorModeValue(
                buttonHoverColor.light,
                buttonHoverColor.dark
              )}
              _active={{
                bg: "white",
                color: "primary",
                border: "1px",
              }}
            >
              Enviar
            </Button>
          </VStack>
        </form>
        <Text
          color={useColorModeValue("font", "bg")}
          alignSelf="flex-start"
          pt={1}
          _hover={{ color: "link" }}
          fontSize="14px"
        >
          <Link to="/register">Registrarme</Link>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Login;
