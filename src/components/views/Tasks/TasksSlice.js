import { createSlice } from "@reduxjs/toolkit";

const { REACT_APP_API } = process.env;

// REDUCERS
export const tasksSlice = createSlice({
  name: "TASK",
  initialState: {
    loading: false,
    tasks: [],
    error: "",
  },
  reducers: {
    REQUEST: (state) => {
      state.loading = true;
    },
    SUCCESS: (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    },
    FAILURE: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// HELPER FUNCTIONS
export const getTasks = (path) => (dispatch) => {
  dispatch(REQUEST);
  fetch(`${REACT_APP_API}/task/${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      dispatch(SUCCESS(data.result));
    })
    .catch((error) => {
      dispatch(FAILURE(error));
    });
};

export const deleteTask = (id) => (dispatch) => {
  dispatch(REQUEST);
  fetch(`${REACT_APP_API}/task/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((resp) => resp.json())
    .then(() => dispatch(getTasks("")))
    .catch((error) => dispatch(FAILURE(error)));
};

export const editCardStatus = (data) => (dispatch) => {
  const statusArray = ["NEW", "IN PROGRESS", "FINISHED"];

  const newStatusIndex =
    statusArray.indexOf(data.status) > 1
      ? 0
      : statusArray.indexOf(data.status) + 1;

  dispatch(REQUEST());
  fetch(`${REACT_APP_API}/task/${data._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    mode: "cors",
    body: JSON.stringify({
      task: {
        title: data.title,
        importance: data.importance,
        status: statusArray[newStatusIndex],
        description: data.description,
      },
    }),
  })
    .then((resp) => resp.json())
    .then(() => dispatch(getTasks("")))
    .catch((error) => dispatch(FAILURE(error)));
};

// SELECTORS
export const selectTasks = (state) => state.TASK.tasks;
export const selectLoading = (state) => state.TASK.loading;
export const selectError = (state) => state.TASK.error;

// ACTION'S IMPORTS
export const { REQUEST, SUCCESS, FAILURE } = tasksSlice.actions;

export default tasksSlice.reducer;
