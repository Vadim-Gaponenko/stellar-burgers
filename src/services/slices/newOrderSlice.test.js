import { placeNewOrder, newOrderSlice } from './newOrderSlice';
import { orderBurgerApi } from '../../../src/utils/burger-api';

jest.mock('../../../src/utils/burger-api');

describe('newOrderSlice', () => {
  const initialState = {
    orderRequest: false,
    orderModalData: null,
    error: undefined
  };

  it('should handle fulfilled placeNewOrder', () => {
    const mockOrder = { _id: '123', name: 'Burger' };
    const state = newOrderSlice.reducer(
      initialState,
      placeNewOrder.fulfilled({ order: mockOrder }, '', '')
    );

    expect(state).toEqual({
      orderRequest: false,
      orderModalData: mockOrder,
      error: undefined
    });
  });

  it('should handle rejected placeNewOrder', () => {
    const mockError = 'Failed to place order';
    const state = newOrderSlice.reducer(
      initialState,
      placeNewOrder.rejected(new Error(mockError), '', '')
    );

    expect(state).toEqual({
      orderRequest: false,
      orderModalData: null,
      error: mockError
    });
  });

  it('should handle pending placeNewOrder', () => {
    const state = newOrderSlice.reducer(
      initialState,
      placeNewOrder.pending('', '')
    );

    expect(state).toEqual({
      orderRequest: true,
      orderModalData: null,
      error: undefined
    });
  });
});
