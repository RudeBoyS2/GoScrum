import { createSlice } from "@reduxjs/toolkit";

// const { REACT_APP_API } = process.env;

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

// export const getTasks = (path) => (dispatch) => {
//     dispatch(REQUEST);
//     fetch(`${REACT_APP_API}task/${path}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("loggedIn"),
//       },
//     })
//       .then((resp) => resp.json())
//       .then((data) => dispatch(SUCCESS(data.result)))
//       .catch((error) => dispatch(FAILURE(error)));
//   };

export const selectTasks = (state) => state.TASK.tasks;
export const selectLoading = (state) => state.TASK.loading;
export const selectError = (state) => state.TASK.error;

export const { REQUEST, SUCCESS, FAILURE } = tasksSlice.actions;

export default tasksSlice.reducer;
