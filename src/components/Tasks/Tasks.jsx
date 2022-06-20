import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";
// import Header from "../views/Header/Header";
import TasksList from "./TasksList/TasksList";
// import TaskForm from "./TaskForm/TaskForm";
// import TaskCard from "./TaskCard/TaskCard";
// import {
//   searchInputColor,
//   tasksDivBackground,
// } from "../../utils/colorModeValues";
import {
  getTasks,
  selectTasks,
  selectLoading,
  selectError,
} from "./TasksSlice";
import {
  // Container,
  // Stack,
  // FormControl,
  // HStack,
  // Input,
  // Heading,
  // Select,
  // RadioGroup,
  // Radio,
  // VStack,
  Text,
  // Spinner,
  // useColorModeValue,
} from "@chakra-ui/react";

const Tasks = () => {
  const [list, setList] = useState([]);
  const [firstList, setFirstList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("ALL");
  const [radioTask, setRadioTask] = useState("ALL");
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getTasks(radioTask === "ME" ? "me" : ""));
  }, [radioTask, dispatch]);

  useEffect(() => {
    if (tasks?.length) {
      setList(tasks);
      setFirstList(tasks);
      if (selectedPriority !== "ALL") {
        setList(tasks.filter((data) => data.importance === selectedPriority));
      }
    }
  }, [tasks, selectedPriority]);

  useEffect(() => {
    if (search) {
      setList((prev) =>
        prev.filter((data) => {
          return data.title.toLowerCase().includes(search);
        })
      );
    } else {
      setSelectedPriority("ALL");
      setList(firstList);
    }
  }, [search]);

  useEffect(() => {
    if (!tasks.length) setList([]);
  }, [tasks]);

  const handleSearch = debounce((e) => {
    if (tasks.length) {
      setSearch(e?.target?.value);
    }
  }, 400);

  const handleImportanceChange = (e) => {
    setSelectedPriority(e.currentTarget.value);
  };

  // const searchInputColor = useColorModeValue(
  //   { opacity: 1, color: "bgDark" },
  //   { opacity: 1, color: "button" }
  // );

  // const tasksDivBackground = useColorModeValue("bg", "bgDark");

  // const renderCards = (text) => {
  //   return list
  //     ?.filter((data) => data.status === text)
  //     .map((data) => <TaskCard data={data} key={data._id} />);
  // };

  if (error)
    return (
      <Text mt={6} textAlign="center">
        Hubo un error
      </Text>
    );

  return (
    <TasksList
      loading={loading}
      handleSearch={handleSearch}
      handleImportanceChange={handleImportanceChange}
      radioTask={radioTask}
      selectedPriority={selectedPriority}
      setRadioTask={setRadioTask}
      setSelectedPriority={setSelectedPriority}
      list={list}
    />
  );
};

export default Tasks;
