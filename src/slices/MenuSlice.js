import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

export const MenuSlice = createSlice({
  name: "Menu",
  initialState: {
    recipes: [],
    total_price: 0,
    bonus: 0,
    selectedItems: "",
    purchase: false,
    purchasedRecipes: [],
    inventory: [],
  },
  reducers: {
    addPurchasedRecipe: (state, action) => {
      const data = action.payload.purchasedRecipes;
      const save = action.payload.purchasedRecipes;
      if (data != null) {
        state.purchasedRecipes = state.purchasedRecipes.concat(data);
        async function write() {
          const jsonValue = JSON.stringify(state.purchasedRecipes);
          await AsyncStorage.setItem("Menu", jsonValue);
        }
        if (save) {
          write();
        }
      }
    },
    completePurchasedRecipe: (state, action) => {
      const recipeIdToRemove = action.payload.id;

      // Filter out the recipe with the specified ID from the purchasedRecipes array
      const updatedPurchasedRecipes = state.purchasedRecipes.filter(
        (recipe) => recipe.id !== recipeIdToRemove
      );

      async function write() {
        const jsonValue = JSON.stringify(updatedPurchasedRecipes);
        await AsyncStorage.setItem("Menu", jsonValue);
      }
      write();

      return {
        ...state,
        purchasedRecipes: updatedPurchasedRecipes,
      };
    },

    setMenu: (state, action) => {
      state.recipes = action.payload.recipes;
      state.total_price = action.payload.total_price;
      state.bonus = action.payload.bonus;
      state.inventory = action.payload.inventory;
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
  addPurchasedRecipe,
  completePurchasedRecipe,
} = MenuSlice.actions;

export default MenuSlice.reducer;
