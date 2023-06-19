import { store } from './store';

import type { AxiosError } from 'axios';

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;

export type TCondition = (_: unknown, api: { getState: () => TRootState }) => boolean | undefined;

export type TRequestStatuses = 'init' | 'loading' | 'error' | 'success';

export type TGetFetchData<TParams, TPayload> = (
  params: Required<TParams>,
  signal?: AbortSignal,
) => Promise<TPayload>;

export interface IAppThunkConfig {
  state: TRootState;
  dispatch: TAppDispatch;
  rejectValue: AxiosError;
}
