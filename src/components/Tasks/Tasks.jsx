import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import debounce from "lodash.debounce";
import TasksList from "./TasksList/TasksList";
import {
  getTasks,
  selectTasks,
  selectLoading,
  selectError,
} from "./TasksSlice";
import {
  Text,
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
