import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem('items')) || [],
  filterTasks: false
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { title, content, endDate, columnName, assignees, priority } = action.payload;
      const newTask = {
        id: nanoid(),
        title: title,
        content: content,
        columnName: columnName,
        startDate: new Date().toLocaleDateString(),
        endDate: endDate,
        assignees: assignees,
        priority: priority,
        isIssue: false
      }
      state.tasks = [...state.tasks, newTask];
      localStorage.setItem('items', JSON.stringify(state.tasks));
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('items', JSON.stringify(state.tasks));
    },
    updateTask: (state, {payload: { id, title, content, endDate }}) => {
      state.tasks = state.tasks.map(task => task.id === id ? {...task, title, content, endDate} : task);
      localStorage.setItem('items', JSON.stringify(state.tasks));
    },
    handleFilterTasks: (state, action) => {
      state.filterTasks = action.payload;
    }
  }
});

export const { addTask, removeTask, updateTask, handleFilterTasks } = taskSlice.actions;

export default taskSlice.reducer;