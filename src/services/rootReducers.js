import { combineSlices } from '@reduxjs/toolkit';
import { constructorSlice } from './slices/constructorIngredientSlice';
import { feedsSlice } from './slices/feedsSlice';
import { ingredientsSlice } from './slices/IngredientsSlice';
import { newOrderSlice } from './slices/newOrderSlice';
import { userOrdersSlice } from './slices/userOrdersSlice';
import { userSlice } from './slices/userSlice';

export const rootReducer = combineSlices(
  constructorSlice,
  feedsSlice,
  ingredientsSlice,
  newOrderSlice,
  userOrdersSlice,
  userSlice
);
