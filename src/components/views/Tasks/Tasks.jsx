import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";
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
} from "@chakra-ui/react";

const { REACT_APP_API } = process.env;

const Tasks = () => {
  const [list, setList] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState("ALL")
  const [value, setValue] = useState("1");

  useEffect(() => {
    fetch(`${REACT_APP_API}/task`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (selectedPriority === "ALL") {
          setList(data.result);
        } else {
          setList(data.result.filter((data) => data.importance === selectedPriority))
        }
      });
  }, [selectedPriority, list]);

  // useEffect(() => {
  //   fetch(`${REACT_APP_API}/task`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setRenderList(data.result);
  //     });
  // }, []);


  // const renderNewCards = () => {
  //   return renderList
  //     ?.filter((data) => data.status === "NEW")
  //     .map((data) => <TaskCard data={data} key={data._id} />);
  // };

  // const renderInProgressCards = () => {
  //   return renderList
  //     ?.filter((data) => data.status === "IN PROGRESS")
  //     .map((data) => <TaskCard data={data} key={data._id} />);
  // };

  // const renderFinishedCards = () => {
  //   return renderList
  //     ?.filter((data) => data.status === "FINISHED")
  //     .map((data) => <TaskCard data={data} key={data._id} />);
  // };

  const renderNewCards = () => {
    return list
      ?.filter((data) => data.status === "NEW")
      .map((data) => <TaskCard data={data} key={data._id} />);
  };

  const renderInProgressCards = () => {
    return list
      ?.filter((data) => data.status === "IN PROGRESS")
      .map((data) => <TaskCard data={data} key={data._id} />);
  };

  const renderFinishedCards = () => {
    return list
      ?.filter((data) => data.status === "FINISHED")
      .map((data) => <TaskCard data={data} key={data._id} />);
  };

  // const handleImportanceChange = (e) => {
  //   if (e.currentTarget.value === "ALL") {
  //     setRenderList(list);
  //   } else {
  //     setRenderList(
  //       list.filter((data) => data.importance === e.currentTarget.value)
  //     );
  //   }
  // };

  const handleImportanceChange = (e) => {
    setSelectedPriority(e.currentTarget.value)
  };

  return (
    <Stack
      direction={{ base: "column", xl: "row" }}
      width="100%"
      minHeight="100%"
      spacing={0}
    >
      <Stack width="100%" p={5} justify="flex-start">
        <TaskForm />
      </Stack>
      <Stack
        // border={{ base: "0px", md: "1px" }}
        boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
        width="100%"
        minHeight="100%"
        mt={6}
        py={4}
        px={4}
        bg="bg"
      >
        <Heading as="h2" size="md" alignSelf="flex-start">
          Mis tareas
        </Heading>
        <HStack spacing={10} justify="space-between">
          <RadioGroup onChange={setValue} value={value}>
            <Stack direction={{ base: "column", sm: "row" }}>
              <Radio value="ALL">Todas</Radio>
              <Radio value="ME" width="100px">
                Mis tareas
              </Radio>
            </Stack>
          </RadioGroup>
          <Stack direction={{ base: "column", md: "row" }}>
            <FormControl>
              <Input
                type="search"
                placeholder="Buscar por título..."
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
                // value={values.importance}
              >
                <option value="ALL">Seleccionar una prioridad</option>
                <option value="LOW">Baja</option>
                <option value="MEDIUM">Media</option>
                <option value="HIGH">Alta</option>
              </Select>
            </FormControl>
          </Stack>
        </HStack>
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
            <Text fontSize="xl" fontWeight="bold" alignSelf="flex-start" pl="1">
              Nuevas
            </Text>
            {renderNewCards()}
          </VStack>
          <VStack
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            p={2}
            borderRadius="xl"
            width="100%"
          >
            <Text fontSize="xl" fontWeight="bold" alignSelf="flex-start" pl="1">
              En proceso
            </Text>
            {renderInProgressCards()}
          </VStack>
          <VStack
            boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
            p={2}
            borderRadius="xl"
            width="100%"
          >
            <Text fontSize="xl" fontWeight="bold" alignSelf="flex-start" pl="1">
              Finalizadas
            </Text>
            {renderFinishedCards()}
          </VStack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Tasks;
