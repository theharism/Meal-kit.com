import { createSlice } from "@reduxjs/toolkit";

export const GroceriesSlice = createSlice({
  name: "Groceries",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      const item = {
        id: new Date(),
        title: action.payload.title,
        subTitle: action.payload.subTitle,
        description: action.payload.description,
      };
      state.push(item);
    },
    setItems: (state, action) => {
      return [...state, ...action.payload.items];
    },
  },
});

export const { addItem, setItems } = GroceriesSlice.actions;

export default GroceriesSlice.reducer;
