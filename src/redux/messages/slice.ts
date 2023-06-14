import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { messagesThunks } from './thunk';

import type { IMessagesState } from './types';
import type { IMessageModel } from '@/shared/api/models';

const favoriteMessagesName = 'favoriteMessages';

const initialState: IMessagesState = {
  items: [],
  lastItemId: '1',
  favoriteItemsId: JSON.parse(localStorage.getItem(favoriteMessagesName) || '[]'),
  status: 'init',
};

const findLastMessageId = (items: IMessageModel[], lastItemId: string) => {
  return String(
    items.reduce((lastId, item) => {
      const itemId = Number.isNaN(+item.id) ? 1 : +item.id;

      return lastId > itemId ? lastId : itemId;
    }, +lastItemId),
  );
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addFavorite: (state, { payload }: PayloadAction<string>) => {
      state.favoriteItemsId.push(payload);

      localStorage.setItem(favoriteMessagesName, JSON.stringify(state.favoriteItemsId));
    },

    removeFavorite: (state, { payload }: PayloadAction<string>) => {
      state.favoriteItemsId = state.favoriteItemsId.filter((id) => id !== payload);

      localStorage.setItem(favoriteMessagesName, JSON.stringify(state.favoriteItemsId));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(messagesThunks.findAll.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(messagesThunks.findAll.fulfilled, (state, action) => {
      state.items = action.payload;
      state.lastItemId = findLastMessageId(action.payload, state.lastItemId);
      state.status = 'success';
    });
    builder.addCase(messagesThunks.findAll.rejected, (state) => {
      state.status = 'error';
    });

    builder.addCase(messagesThunks.findNextById.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(messagesThunks.findNextById.fulfilled, (state, action) => {
      state.items.push(...action.payload);
      state.lastItemId = findLastMessageId(action.payload, state.lastItemId);
      state.status = 'success';
    });
    builder.addCase(messagesThunks.findNextById.rejected, (state) => {
      state.status = 'error';
    });
  },
});

export const {
  actions: messagesActions,
  reducer: messagesReducer,
  name: messagesName,
} = messagesSlice;
