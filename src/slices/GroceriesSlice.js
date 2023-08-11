import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

export const GroceriesSlice = createSlice({
  name: "Groceries",
  initialState: {
    ingredients: [],
    selectedItems: [],
    use_inventory: false,
  },
  reducers: {
    addItem: (state, action) => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let randomString = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
      }
      const item = {
        ingredient: {
          id: randomString,
          name: action.payload.name,
          grams: action.payload.grams,
          price: action.payload.price,
        },
      };
      state.ingredients.push(item);
      async function write() {
        const jsonValue = JSON.stringify(state.ingredients);
        await AsyncStorage.setItem("Groceries", jsonValue);
      }

      write().then(() => console.log("done Groceries"));
    },
    appendIngredients: (state, action) => {
      const data = action.payload.inventory;
      const save = action.payload.save;

      if (data != null) {
        //state.ingredients = state.ingredients.concat(data);
        state.ingredients = data;
        async function write() {
          const jsonValue = JSON.stringify(state.ingredients);
          await AsyncStorage.setItem("Groceries", jsonValue);
        }
        if (save) {
          write().then(() => console.log("done Groceries"));
        }
      }
    },
    addSelectedIngredients: (state, action) => {
      const newItem = action.payload.id;

      state.selectedItems.push(newItem); // Push the new item to the selectedItems array
    },
    removeSelectedIngredients: (state, action) => {
      const itemToRemove = action.payload.id;

      state.selectedItems = state.selectedItems.filter(
        (item) => item !== itemToRemove
      ); // Remove the item from the selectedItems array using filter
    },
    clearSelectedIngredients: (state) => {
      state.selectedItems = []; // Clear the selectedItems array
    },
    deleteIngredients: (state, action) => {
      const selectedIds = state.selectedItems;
      state.ingredients = state.ingredients.filter(
        (item) => !selectedIds.includes(item.ingredient.id)
      );

      // Clear the selectedItems array after deleting
      state.selectedItems = [];

      async function write() {
        const jsonValue = JSON.stringify(state.ingredients);
        await AsyncStorage.setItem("Groceries", jsonValue);
      }

      write().then(() => console.log("done Groceries"));
    },
    setItems: (state, action) => {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload.items],
      };
    },
    setUse_Inventory: (state, action) => {
      state.use_inventory = action.payload.value;
    },
  },
});

export const {
  addItem,
  setItems,
  appendIngredients,
  addSelectedIngredients,
  removeSelectedIngredients,
  clearSelectedIngredients,
  deleteIngredients,
  setUse_Inventory,
} = GroceriesSlice.actions;

export default GroceriesSlice.reducer;
