import { getUserOrders, userOrdersSlice } from './userOrdersSlice';
import { getOrdersApi } from '../../../src/utils/burger-api';

jest.mock('../../../src/utils/burger-api');

describe('userOrdersSlice', () => {
  const initialState = {
    orders: [],
    isLoading: true
  };

  it('should handle fulfilled getUserOrders', () => {
    const mockOrders = [{ _id: '1', name: 'Order 1' }];
    const state = userOrdersSlice.reducer(
      initialState,
      getUserOrders.fulfilled(mockOrders, '', '')
    );

    expect(state).toEqual({
      orders: mockOrders,
      isLoading: false
    });
  });

  it('should handle pending getUserOrders', () => {
    const state = userOrdersSlice.reducer(
      initialState,
      getUserOrders.pending('', '')
    );

    expect(state).toEqual({
      orders: [],
      isLoading: true
    });
  });

  it('should handle rejected getUserOrders', () => {
    const state = userOrdersSlice.reducer(
      initialState,
      getUserOrders.rejected('', '', '')
    );

    expect(state).toEqual({
      orders: [],
      isLoading: false
    });
  });
});
