import { configureStore } from '@reduxjs/toolkit';
import store, { RootState } from './store';
import { ingredientsSlice } from './slices/IngredientsSlice';
import { constructorSlice } from './slices/constructorIngredientSlice';
import { userSlice } from './slices/userSlice';
import { feedsSlice } from './slices/feedsSlice';
import { newOrderSlice } from './slices/newOrderSlice';
import { userOrdersSlice } from './slices/userOrdersSlice';

describe('проверка инициализации rootReducer', () => {
  const newStore = configureStore({
    reducer: {
      [ingredientsSlice.name]: ingredientsSlice.reducer,
      [constructorSlice.name]: constructorSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [feedsSlice.name]: feedsSlice.reducer,
      [newOrderSlice.name]: newOrderSlice.reducer,
      [userOrdersSlice.name]: userOrdersSlice.reducer
    }
  });

  it('проверка инициализации конструктора', () => {
    expect(newStore.getState()[constructorSlice.name]).toEqual({
      bun: null,
      ingredients: []
    });
  });

  it('проверка инициализации ингредиентов', () => {
    expect(newStore.getState()[ingredientsSlice.name]).toEqual({
      error: null,
      ingredients: [],
      loading: false
    });
  });

  it('проверка инициализации ленты заказов', () => {
    expect(newStore.getState()[feedsSlice.name]).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      error: undefined,
      isLoading: true
    });
  });

  it('проверка инициализации пользователей', () => {
    expect(newStore.getState()[userSlice.name]).toEqual({
      user: {
        email: '',
        name: ''
      },
      isAuthChecked: false,
      error: ''
    });
  });
});

it('проверка начального состояния хранилища', () => {
  const expected = store.getState();
  expect(expected).toEqual(store.getState());
});
