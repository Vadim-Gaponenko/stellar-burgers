import store from './store';
import {
  addItem,
  clearAll,
  updateAll
} from './slices/constructorIngredientSlice';

describe('Срез конструктора', () => {
  beforeEach(() => {
    store.dispatch(clearAll());
  });

  it('должен иметь корректное начальное состояние', () => {
    const state = store.getState().constructorIngredient;

    expect(state).toEqual({
      bun: null,
      ingredients: []
    });
  });

  it('должен позволять добавлять ингредиент', () => {
    const mockIngredient = {
      _id: '1',
      name: 'Ингредиент 1',
      type: 'sauce',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 250,
      price: 100,
      image: '',
      image_large: '',
      image_mobile: ''
    };

    store.dispatch(addItem(mockIngredient));
    const newState = store.getState().constructorIngredient;

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients).toContainEqual(
      expect.objectContaining({ _id: mockIngredient._id })
    );
  });

  it('должен позволять очищать состояние', () => {
    const mockIngredient = {
      _id: '2',
      name: 'Ингредиент 2',
      type: 'sauce',
      proteins: 56,
      fat: 5,
      carbohydrates: 20,
      calories: 250,
      price: 100,
      image: '',
      image_large: '',
      image_mobile: ''
    };

    store.dispatch(addItem(mockIngredient));
    expect(store.getState().constructorIngredient.ingredients).toHaveLength(1); // Убедитесь, что ингредиент добавлен

    store.dispatch(clearAll());
    expect(store.getState().constructorIngredient).toEqual({
      bun: null,
      ingredients: []
    });
  });

  it('должен позволять обновлять все ингредиенты', () => {
    const mockIngredients = [
      {
        _id: '3',
        name: 'Ингредиент 3',
        type: 'sauce',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 250,
        price: 100,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        _id: '4',
        name: 'Ингредиент 4',
        type: 'sauce',
        proteins: 20,
        fat: 10,
        carbohydrates: 30,
        calories: 300,
        price: 150,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ];

    store.dispatch(updateAll(mockIngredients));
    expect(store.getState().constructorIngredient.ingredients).toHaveLength(2);
    expect(store.getState().constructorIngredient.ingredients).toEqual(
      mockIngredients
    );
  });
});
