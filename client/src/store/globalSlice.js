import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: 1,
  newBoardModal: 0,
  updateBoardModal: 0,
  newTaskModal: 0,
  updateTaskModal: "",
  activeTab: "",
  viewTaskModal: "",
  theme: "dark",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setShowSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    setNewBoardModal: (state, action) => {
      state.newBoardModal = action.payload;
    },
    setUpdateBoardModal: (state, action) => {
      state.updateBoardModal = action.payload;
    },
    setNewTaskModal: (state, action) => {
      state.newTaskModal = action.payload;
    },
    setUpdateTaskModal: (state, action) => {
      state.updateTaskModal = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setViewTaskModal: (state, action) => {
      state.viewTaskModal = action.payload;
    },
  },
});

export const {
  setShowSidebar,
  setNewBoardModal,
  setNewTaskModal,
  setUpdateTaskModal,
  setActiveTab,
  setViewTaskModal,
  setTheme,
  setUpdateBoardModal,
} = globalSlice.actions;

export default globalSlice.reducer;
