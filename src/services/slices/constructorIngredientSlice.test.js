import configureMockStore from 'redux-mock-store';
import {
  addItem,
  deleteItem,
  clearAll,
  updateAll
} from './constructorIngredientSlice';

const mockStore = configureMockStore();

describe('constructorSlice', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      constructorIngredient: {
        bun: null,
        ingredients: []
      }
    });
  });

  it('should add a bun', () => {
    const mockBun = {
      _id: '2',
      name: 'Bun 1',
      type: 'bun',
      proteins: 8,
      fat: 3,
      carbohydrates: 20,
      calories: 250,
      price: 150,
      image: 'bun_image_url',
      image_large: 'bun_image_large_url',
      image_mobile: 'bun_image_mobile_url'
    };

    store.dispatch(addItem(mockBun));
    const actions = store.getActions();

    expect(actions).toEqual([
      {
        type: 'constructorIngredient/addItem',
        payload: { ...mockBun, id: expect.any(String) }
      }
    ]);
  });

  it('should delete an ingredient', () => {
    const mockIngredient = {
      _id: '1',
      name: 'Ingredient 1',
      type: 'main',
      proteins: 10,
      fat: 5,
      carbohydrates: 15,
      calories: 200,
      price: 100,
      image: 'image_url',
      id: '1'
    };

    store.dispatch(addItem(mockIngredient));
    store.dispatch(deleteItem({ id: '1' }));
    const actions = store.getActions();

    expect(actions).toEqual([
      {
        type: 'constructorIngredient/addItem',
        payload: { ...mockIngredient, id: expect.any(String) }
      },
      { type: 'constructorIngredient/deleteItem', payload: { id: '1' } }
    ]);
  });

  it('should clear all ingredients', () => {
    store.dispatch(clearAll());
    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'constructorIngredient/clearAll' }]);
  });

  it('should update all ingredients', () => {
    const mockUpdate = [
      {
        _id: '2',
        name: 'Bun 1',
        type: 'bun',
        proteins: 8,
        fat: 3,
        carbohydrates: 20,
        calories: 250,
        price: 150,
        image: 'bun_image_url'
      }
    ];

    store.dispatch(updateAll(mockUpdate));
    const actions = store.getActions();
    expect(actions).toEqual([
      { type: 'constructorIngredient/updateAll', payload: mockUpdate }
    ]);
  });
});
