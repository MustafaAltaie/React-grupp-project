import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem('items')) || []
}
// localStorage.removeItem('items')
console.log(JSON.parse(localStorage.getItem('items')))
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
    }
  }
});

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;