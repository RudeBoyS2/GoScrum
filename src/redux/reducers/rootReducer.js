import { combineReducers } from 'redux';
import tasksReducer from '../../components/views/Tasks/TasksSlice';

const rootReducer = combineReducers({
    tasksReducer,
})

export default rootReducer