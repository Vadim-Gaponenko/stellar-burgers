import { getFeedsApi } from '../../../src/utils/burger-api';

jest.mock('../../../src/utils/burger-api');

describe('feedsSlice', () => {
  it('should handle fulfilled getAllFeeds', async () => {
    const mockResponse = {
      orders: [{ _id: '1', name: 'Order 1', status: 'done' }],
      total: 1,
      totalToday: 1
    };

    getFeedsApi.mockResolvedValue(mockResponse);

    const result = await getFeedsApi();

    expect(result).toEqual(mockResponse);
  });

  it('should handle rejected getAllFeeds', async () => {
    const mockError = 'Failed to fetch';
    getFeedsApi.mockRejectedValue(new Error(mockError));

    await expect(getFeedsApi()).rejects.toThrow(mockError);
  });
});
