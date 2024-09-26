import { expect, test } from '@jest/globals';
import { rootReducer } from './rootReducers';
import store from './store.ts';

describe(' настройка и работы ', () => {
  const testState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

  test('проверим, что возвращает состояние по умолчанию', () => {
    expect(testState).toEqual(store.getState());
  });
});
