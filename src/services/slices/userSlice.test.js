import {
  register,
  login,
  apiGetUser,
  updateUser,
  logout,
  userSlice
} from './userSlice';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../../../src/utils/burger-api';

jest.mock('../../../src/utils/burger-api');

describe('userSlice', () => {
  const initialState = {
    isAuthChecked: false,
    user: { email: '', name: '' },
    error: ''
  };

  it('should handle fulfilled register', () => {
    const mockUser = { email: 'test@example.com', name: 'Test User' };
    registerUserApi.mockResolvedValue({ user: mockUser });

    const state = userSlice.reducer(
      initialState,
      register.fulfilled({ user: mockUser }, '', '')
    );

    expect(state).toEqual({
      isAuthChecked: true,
      user: mockUser,
      error: ''
    });
  });

  it('should handle rejected register', () => {
    const mockError = 'Registration failed';
    const state = userSlice.reducer(
      initialState,
      register.rejected(new Error(mockError), '', '')
    );

    expect(state).toEqual({
      isAuthChecked: false,
      user: { email: '', name: '' },
      error: mockError
    });
  });

  it('should handle fulfilled login', () => {
    const mockUser = { email: 'test@example.com', name: 'Test User' };
    loginUserApi.mockResolvedValue({ user: mockUser });

    const state = userSlice.reducer(
      initialState,
      login.fulfilled({ user: mockUser }, '', '')
    );

    expect(state).toEqual({
      isAuthChecked: true,
      user: mockUser,
      error: ''
    });
  });

  it('should handle rejected login', () => {
    const mockError = 'Login failed';
    const state = userSlice.reducer(
      initialState,
      login.rejected(new Error(mockError), '', '')
    );

    expect(state).toEqual({
      isAuthChecked: false,
      user: { email: '', name: '' },
      error: mockError
    });
  });

  it('should handle fulfilled apiGetUser', () => {
    const mockUser = { email: 'test@example.com', name: 'Test User' };
    getUserApi.mockResolvedValue({ user: mockUser });

    const state = userSlice.reducer(
      initialState,
      apiGetUser.fulfilled({ user: mockUser }, '', '')
    );

    expect(state).toEqual({
      isAuthChecked: true,
      user: mockUser,
      error: ''
    });
  });

  it('should handle rejected apiGetUser', () => {
    const mockError = 'Failed to get user';
    const state = userSlice.reducer(
      initialState,
      apiGetUser.rejected(new Error(mockError), '', '')
    );

    expect(state).toEqual({
      isAuthChecked: false,
      user: { email: '', name: '' },
      error: mockError
    });
  });

  it('should handle fulfilled updateUser', () => {
    const mockUser = { email: 'new@example.com', name: 'New User' };
    updateUserApi.mockResolvedValue({ user: mockUser });

    const state = userSlice.reducer(
      initialState,
      updateUser.fulfilled({ user: mockUser }, '', '')
    );

    expect(state).toEqual({
      isAuthChecked: true,
      user: mockUser,
      error: ''
    });
  });

  it('should handle rejected updateUser', () => {
    const mockError = 'Update failed';
    const state = userSlice.reducer(
      initialState,
      updateUser.rejected(new Error(mockError), '', '')
    );

    expect(state).toEqual({
      isAuthChecked: false,
      user: { email: '', name: '' },
      error: mockError
    });
  });

  it('should handle fulfilled logout', () => {
    const state = userSlice.reducer(
      initialState,
      logout.fulfilled(undefined, '', '')
    );

    expect(state).toEqual({
      isAuthChecked: false,
      user: { email: '', name: '' },
      error: ''
    });
  });
});
