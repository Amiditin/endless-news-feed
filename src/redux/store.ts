import { configureStore } from '@reduxjs/toolkit';

import { messagesReducer } from './messages';

export const store = configureStore({
  reducer: {
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});
