import { createSlice } from "@reduxjs/toolkit";

export const GroceriesSlice = createSlice({
  name: "Groceries",
  initialState: [
    { id: 1, title: "todo1", subTitle: "500 gm", price: "500" },
    { id: 2, title: "todo2", subTitle: "500 gm", price: "500" },
    { id: 3, title: "todo3", subTitle: "500 gm", price: "500" },
    { id: 4, title: "todo4", subTitle: "500 gm", price: "500" },
    { id: 5, title: "todo5", subTitle: "500 gm", price: "500" },
    { id: 6, title: "todo1", subTitle: "500 gm", price: "500" },
    { id: 7, title: "todo2", subTitle: "500 gm", price: "500" },
    { id: 8, title: "todo3", subTitle: "500 gm", price: "500" },
    { id: 9, title: "todo4", subTitle: "500 gm", price: "500" },
    { id: 10, title: "todo5", subTitle: "500 gm", price: "500" },
  ],
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
  },
});

export const { addItem } = GroceriesSlice.actions;

export default GroceriesSlice.reducer;
