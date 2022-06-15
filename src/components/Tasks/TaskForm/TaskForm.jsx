import React from "react";
import { useDispatch } from "react-redux";
import { postNewTask } from "../TasksSlice";
import { useFormik } from "formik";
import {
  initialValues,
  validationSchema,
} from "./taskFormUtils";
import { buttonHoverColor } from "../../../utils/colorModeValues"
import {
  Stack,
  FormControl,
  Input,
  Heading,
  Select,
  Textarea,
  Button,
  Text,
  VStack,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";

const TaskForm = () => {
  const toast = useToast();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(postNewTask(data));
    resetForm();
    toast({
      title: "Tarea creada correctamente.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
    errors,
    values,
    touched,
  } = formik;

  return (
    <>
      <Heading as="h1" size="lg" alignSelf="flex-start" fontWeight="bold">
        Crear tarea
      </Heading>
      <Heading
        as="p"
        size="sm"
        alignSelf="flex-start"
        fontWeight="semibold"
        pl={0.5}
      >
        Crea tus tareas
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack>
          <Stack width="100%" direction={{ base: "column", md: "row" }}>
            <FormControl>
              <Input
                height="35px"
                borderRadius="xl"
                name="title"
                type="text"
                variant="outline"
                size="sm"
                placeholder="Título"
                borderColor={errors.title && touched.title && "red"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              {errors.title && touched.title && (
                <Text textAlign="left" color="error" pl={1}>
                  {errors.title}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <Select
                height="35px"
                borderRadius="xl"
                name="status"
                placeholder="Seleccionar un estado"
                size="xs"
                borderColor={errors.status && touched.status && "red"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.status}
              >
                <option value="NEW">Nueva</option>
                <option value="IN PROGRESS">En proceso</option>
                <option value="FINISHED">Finalizadas</option>
              </Select>
              {errors.status && touched.status && (
                <Text textAlign="left" color="error" pl={1}>
                  {errors.status}
                </Text>
              )}
            </FormControl>
            <FormControl>
              <Select
                height="35px"
                borderRadius="xl"
                name="importance"
                placeholder="Seleccionar una prioridad"
                size="xs"
                borderColor={errors.importance && touched.importance && "red"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.importance}
              >
                <option value="LOW">Baja</option>
                <option value="MEDIUM">Media</option>
                <option value="HIGH">Alta</option>
              </Select>
              {errors.importance && touched.importance && (
                <Text textAlign="left" color="error" pl={1}>
                  {errors.importance}
                </Text>
              )}
            </FormControl>
          </Stack>
          <FormControl>
            <Textarea
              borderRadius="xl"
              name="description"
              type="text"
              variant="outline"
              placeholder="Descripción"
              borderColor={errors.description && touched.description && "red"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            {errors.description && touched.description && (
              <Text textAlign="left" color="error" pl={1}>
                {errors.description}
              </Text>
            )}
          </FormControl>
          <Button
            alignSelf="flex-start"
            type="submit"
            bg="primary"
            width="100px"
            height="40px"
            color="white"
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
            Crear
          </Button>
        </VStack>
      </form>
    </>
  );
};

export default TaskForm;
