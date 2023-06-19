import {
  createAsyncThunk,
  type AsyncThunkOptions,
  type AsyncThunkPayloadCreator,
} from '@reduxjs/toolkit';

import type { IAppThunkConfig, TCondition, TRootState } from './types';

export const checkStatusCondition = (storeState: keyof TRootState): TCondition => {
  return (_, { getState }) => {
    const store = getState();

    return !(store[storeState]?.status === 'loading');
  };
};

export const createAppThunk = <Returned, ThunkArg = void>(
  type: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, IAppThunkConfig>,
  options?: AsyncThunkOptions<ThunkArg, IAppThunkConfig>,
) => {
  return createAsyncThunk(type, payloadCreator, options);
};
