import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Input,
  Button,
  Flex,
  FormControl,
  FormLabel,
  VStack,
  HStack,
  Heading,
  Text,
  Select,
  Switch,
  useColorModeValue,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";

const { REACT_APP_API } = process.env;

const Register = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${REACT_APP_API}/auth/data`)
      .then((response) => response.json())
      .then((data) => setData(data.result));
  }, []);

  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
    email: "",
    teamID: "",
    role: "",
    continent: "",
    region: "",
    switch: false,
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, "El usuario debe contener 6 caracteres como mínimo")
      .required("Ingresa un nombre de usuario"),
    password: Yup.string().required("Ingresa una contraseña"),
    email: Yup.string()
      .email("Ingresa un email válido")
      .required("Ingresa una dirección de correo electrónico"),
    role: Yup.string().required("Selecciona un rol"),
    continent: Yup.string().required("Selecciona un continente"),
    region: Yup.string().required("Selecciona una región"),
  });

  const onSubmit = () => {
    const teamID = !values.teamID ? uuidv4() : values.teamID;
    console.log({ values, teamID });
    fetch(`${REACT_APP_API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          userName: values.username,
          password: values.password,
          email: values.email,
          teamID,
          role: values.role,
          continent: values.continent,
          region: values.region,
        },
      }),
    });
    navigate("/login", { replace: true });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    errors,
    touched,
  } = formik;

  const handleChangeContinent = (value) => {
    setFieldValue("continent", value);
    if (value !== "America") setFieldValue("region", "Otro");
  };

  const textColor = useColorModeValue("font", "bg");

  return (
    <Flex align="center" justify="center" height="100%" mt={1}>
      <Flex
        mb={2}
        px={4}
        pt={3}
        pb={2}
        bg={useColorModeValue("bg", "bgDark")}
        rounded="lg"
        boxShadow={{ md: "2xl" }}
        flexDirection="column"
        width="420px"
      >
        <Heading
          as="h1"
          fontSize={{ base: "25px", lg: "22px", "2xl": "25px" }}
          color={textColor}
          alignSelf="flex-start"
          pb={2}
        >
          Registro
        </Heading>
        <form onSubmit={handleSubmit} height="500px">
          <VStack spacing={2} align="flex-start" color="font">
            <FormControl>
              <FormLabel
                mb={0}
                htmlFor="username"
                fontWeight="normal"
                color={textColor}
              >
                Nombre de usuario
              </FormLabel>
              <Input
                color={textColor}
                height={{ base: "35px", "2xl": "40px" }}
                name="username"
                type="text"
                variant="outline"
                focusBorderColor="primary"
                borderColor={errors.username && touched.username && "red"}
                onBlur={handleBlur}
                onChange={handleChange}
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
                mb={0}
                htmlFor="password"
                color={textColor}
              >
                Contraseña
              </FormLabel>
              <Input
                color={textColor}
                height={{ base: "35px", "2xl": "40px" }}
                name="password"
                type="password"
                variant="outline"
                focusBorderColor="primary"
                borderColor={errors.password && touched.password && "red"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text textAlign="left" color="error" pl={1}>
                  {errors.password}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel
                fontWeight="normal"
                mb={0}
                htmlFor="email"
                color={textColor}
              >
                Email
              </FormLabel>
              <Input
                color={textColor}
                height={{ base: "35px", "2xl": "40px" }}
                name="email"
                type="email"
                variant="outline"
                focusBorderColor="primary"
                borderColor={errors.email && touched.email && "red"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              {errors.email && touched.email && (
                <Text textAlign="left" color="error" pl={1}>
                  {errors.email}
                </Text>
              )}
            </FormControl>
            <HStack>
              <Switch
                colorScheme="orange"
                value={values.switch}
                onChange={() => {
                  setFieldValue("switch", !values.switch);
                }}
              />
              <Text fontSize="14px" color={textColor}>
                Perteneces a un equipo ya creado
              </Text>
            </HStack>
            {values.switch && (
              <FormControl>
                <FormLabel
                  fontWeight="normal"
                  mb={0}
                  htmlFor="role"
                  color={textColor}
                >
                  Por favor, introduce el identificador de equipo
                </FormLabel>
                <Input
                  color={textColor}
                  type="text"
                  name="teamID"
                  value={values.teamID}
                  onChange={handleChange}
                />
              </FormControl>
            )}
            <FormControl>
              <FormLabel
                fontWeight="normal"
                mb={0}
                htmlFor="role"
                color={textColor}
              >
                Rol
              </FormLabel>
              <Select
                color={textColor}
                height={{ base: "35px", "2xl": "40px" }}
                name="role"
                borderColor={errors.role && touched.role && "red"}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Selecciona un rol"
                value={values.role}
              >
                {data?.Rol?.map((rol) => (
                  <option value={rol} key={rol}>
                    {rol}
                  </option>
                ))}
              </Select>
              {errors.role && touched.role && (
                <Text textAlign="left" color="error" pl={1}>
                  {errors.role}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel
                fontWeight="normal"
                mb={0}
                htmlFor="continent"
                color={textColor}
              >
                Continente
              </FormLabel>
              <Select
                color={textColor}
                height={{ base: "35px", "2xl": "40px" }}
                name="continent"
                borderColor={errors.continent && touched.continent && "red"}
                onBlur={handleBlur}
                onChange={(e) => handleChangeContinent(e.currentTarget.value)}
                placeholder="Selecciona un continente"
                value={values.continent}
              >
                {data?.continente?.map((continente) => (
                  <option value={continente} key={continente}>
                    {continente}
                  </option>
                ))}
              </Select>
              {errors.continent && touched.continent && (
                <Text textAlign="left" color="error" pl={1}>
                  {errors.continent}
                </Text>
              )}
            </FormControl>
            {values.continent === "America" && (
              <FormControl>
                <FormLabel
                  fontWeight="normal"
                  mb={0}
                  htmlFor="region"
                  color={textColor}
                >
                  Región
                </FormLabel>
                <Select
                  color={textColor}
                  height={{ base: "35px", "2xl": "40px" }}
                  name="region"
                  borderColor={errors.region && touched.region && "red"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Selecciona una región"
                  value={values.region}
                >
                  {data?.region?.map((region) => (
                    <option value={region} key={region}>
                      {region}
                    </option>
                  ))}
                </Select>
                {errors.region && touched.region && (
                  <Text textAlign="left" color="error" pl={1}>
                    {errors.region}
                  </Text>
                )}
              </FormControl>
            )}
            <Button
              height={{ base: "35px", "2xl": "40px" }}
              type="submit"
              bg="primary"
              width="full"
              color="button"
              _hover={{
                bg: "button",
                color: "primary",
                border: "1px",
              }}
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
          color={textColor}
          alignSelf="flex-start"
          pt={1}
          _hover={{ color: "link" }}
        >
          <Link to="/login">Ir a Iniciar sesión</Link>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Register;
