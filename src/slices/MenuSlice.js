import { createSlice } from "@reduxjs/toolkit";

export const MenuSlice = createSlice({
  name: "Menu",
  initialState: {
    recipes: [],
    total_price: 0,
    bonus: 0,
    selectedItems: "",
    purchase: false,
  },
  reducers: {
    addRecipe: (state, action) => {},
    setMenu: (state, action) => {
      state.recipes = action.payload.recipes;
      state.total_price = action.payload.total_price;
      state.bonus = action.payload.bonus;
    },
    addSelectedItems: (state, action) => {
      const newItem = action.payload.id;
      const updatedItems = state.selectedItems
        ? `${state.selectedItems},${newItem}`
        : `${newItem}`;
      state.selectedItems = updatedItems;
    },
    removeSelectedItem: (state, action) => {
      const itemToRemove = action.payload.id;
      if (state.selectedItems) {
        const itemsArray = state.selectedItems
          .split(",")
          .map((item) => parseInt(item));
        const updatedItemsArray = itemsArray.filter(
          (item) => item !== itemToRemove
        );
        state.selectedItems = updatedItemsArray.join(",");
      }
    },
    clearSelectedItems: (state, action) => {
      state.selectedItems = "";
    },
    setPurchase: (state, action) => {
      state.purchase = action.payload.status;
    },
  },
});

export const {
  setMenu,
  addSelectedItems,
  removeSelectedItem,
  clearSelectedItems,
  setPurchase,
} = MenuSlice.actions;

export default MenuSlice.reducer;
