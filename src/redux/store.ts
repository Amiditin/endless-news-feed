import { configureStore } from '@reduxjs/toolkit';

import { postsReducer } from './posts';
import { messagesReducer } from './messages';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});
