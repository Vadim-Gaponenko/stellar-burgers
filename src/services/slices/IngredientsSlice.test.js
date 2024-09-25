import { getIngredientsApi } from '../../../src/utils/burger-api';
import { getIngredientsList, ingredientsSlice } from './IngredientsSlice';

jest.mock('../../../src/utils/burger-api');

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  it('should handle fulfilled getIngredientsList', async () => {
    const mockResponse = [
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 5,
        calories: 100,
        price: 50,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ];

    getIngredientsApi.mockResolvedValue(mockResponse);

    const state = ingredientsSlice.reducer(
      initialState,
      getIngredientsList.fulfilled(mockResponse, '', '')
    );

    expect(state).toEqual({
      ingredients: mockResponse,
      loading: false,
      error: null
    });
  });

  it('should handle rejected getIngredientsList', async () => {
    const mockError = 'Failed to fetch';
    getIngredientsApi.mockRejectedValue(new Error(mockError));

    const state = ingredientsSlice.reducer(
      initialState,
      getIngredientsList.rejected(new Error(mockError), '', '')
    );

    expect(state).toEqual({
      ingredients: [],
      loading: false,
      error: mockError
    });
  });

  it('should handle pending getIngredientsList', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      getIngredientsList.pending('', '')
    );

    expect(state).toEqual({
      ingredients: [],
      loading: true,
      error: null
    });
  });
});
