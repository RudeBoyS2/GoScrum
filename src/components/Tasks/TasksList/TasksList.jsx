import TaskForm from "../TaskForm/TaskForm";
import TaskCard from "../TaskCard/TaskCard";
import {
  searchInputColor,
  backgroundColor,
} from "../../../utils/colorModeValues";
import {
  Stack,
  FormControl,
  HStack,
  Input,
  Heading,
  Select,
  RadioGroup,
  Radio,
  VStack,
  Text,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";

const TasksList = ({
  loading,
  handleSearch,
  radioTask,
  setRadioTask,
  selectedPriority,
  setSelectedPriority,
  list,
}) => {
  const handleImportanceChange = (e) => {
    setSelectedPriority(e.currentTarget.value);
  };

  const renderCards = (text) => {
    return list
      ?.filter((data) => data.status === text)
      .map((data) => <TaskCard data={data} key={data._id} />);
  };

  return (
    <Stack
      direction={{ base: "column", xl: "row" }}
      width="100%"
      minHeight="100%"
      spacing={0}
      gap={2}
      py={2}
      px={2}
    >
      <Stack width={{ base: "100%", xl: "90%" }} p={5} justify="flex-start">
        <TaskForm />
      </Stack>
      <Stack
        boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.8) 0px 3px 7px -3px"
        borderRadius="xl"
        width="100%"
        minHeight="100%"
        py={4}
        px={4}
        bg={useColorModeValue(backgroundColor.light, backgroundColor.dark)}
      >
        <Heading as="h2" size="md" alignSelf="flex-start">
          Mis tareas
        </Heading>
        <HStack spacing={10} justify="space-between">
          <RadioGroup onChange={setRadioTask} value={radioTask}>
            <Stack direction={{ base: "column", sm: "row" }}>
              <Radio fontSize="15px" colorScheme="orange" value="ALL">
                <Text fontSize="15px" pt={0.5}>
                  Todas
                </Text>
              </Radio>
              <Radio colorScheme="orange" value="ME" width="100px">
                <Text fontSize="15px" pt={0.5}>
                  Mis tareas
                </Text>
              </Radio>
            </Stack>
          </RadioGroup>
          <Stack direction={{ base: "column", md: "row" }}>
            <FormControl>
              <Input
                type="search"
                placeholder="Buscar por título..."
                _placeholder={useColorModeValue(
                  searchInputColor.light,
                  searchInputColor.dark
                )}
                onChange={handleSearch}
                size="xs"
                height="35px"
                width="190px"
              />
            </FormControl>
            <FormControl>
              <Select
                height="35px"
                width="190px"
                name="importance"
                size="xs"
                onChange={handleImportanceChange}
                value={selectedPriority}
              >
                <option value="ALL">Seleccionar una prioridad</option>
                <option value="LOW">Baja</option>
                <option value="MEDIUM">Media</option>
                <option value="HIGH">Alta</option>
              </Select>
            </FormControl>
          </Stack>
        </HStack>
        {!list ? (
          <Stack paddingTop={5}>
            <Text textAlign="center">Agrega una tarea para comenzar</Text>
          </Stack>
        ) : loading ? (
          <Stack height="100%" align="center" justify="center">
            <Spinner
              thickness="4px"
              speed="0.5s"
              emptyColor="gray.200"
              color="primary"
              size="xl"
            />
          </Stack>
        ) : (
          <Stack
            direction={{ base: "column", xl: "row" }}
            justify="space-between"
            height="100%"
            align="start"
            spacing={{ base: "6", xl: "3" }}
          >
            <VStack
              boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
              p={2}
              borderRadius="xl"
              width="100%"
            >
              <Text
                fontSize="xl"
                fontWeight="bold"
                alignSelf="flex-start"
                pl="1"
              >
                Nuevas
              </Text>
              {renderCards("NEW")}
            </VStack>
            <VStack
              boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
              p={2}
              borderRadius="xl"
              width="100%"
            >
              <Text
                fontSize="xl"
                fontWeight="bold"
                alignSelf="flex-start"
                pl="1"
              >
                En proceso
              </Text>
              {renderCards("IN PROGRESS")}
            </VStack>
            <VStack
              boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
              p={2}
              borderRadius="xl"
              width="100%"
            >
              <Text
                fontSize="xl"
                fontWeight="bold"
                alignSelf="flex-start"
                pl="1"
              >
                Finalizadas
              </Text>
              {renderCards("FINISHED")}
            </VStack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default TasksList;
