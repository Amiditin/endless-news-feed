import type { TCondition, TRootState } from './types';

export const checkStatusCondition = (storeState: keyof TRootState): TCondition => {
  return (_, { getState }) => {
    const store = getState();

    return !(store[storeState]?.status === 'loading');
  };
};
