import { createSelector } from '@reduxjs/toolkit';

import type { TRootState } from '@/redux/types';

const getMessages = (state: TRootState) => state.messages;

export const getMessagesItems = createSelector(getMessages, (messages) => {
  return messages.items;
});

export const getMessagesLastItemId = createSelector(getMessages, (messages) => {
  return messages.lastItemId;
});

export const getFavoriteItemsId = createSelector(getMessages, (messages) => {
  return messages.favoriteItemsId;
});

export const getMessagesStatus = createSelector(getMessages, (messages) => {
  return messages.status;
});
