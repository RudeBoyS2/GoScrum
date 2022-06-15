import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../components/Tasks/TasksSlice";

export const store = configureStore({
  reducer: {
    TASK: tasksReducer,
  },
});
