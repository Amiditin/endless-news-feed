import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { checkStatusCondition } from '@/redux/conditions';
import { messagesService } from '@/shared/api/services';

import { messagesName } from './slice';

import type { IMessageModel } from '@/shared/api/models';
import type { TThunkConfig } from '@/redux/types';

export const messagesThunks = {
  findAll: createAsyncThunk<IMessageModel[], undefined, TThunkConfig>(
    `${messagesName}/findAll`,
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await messagesService.findAll();

        return data.Messages;
      } catch (error) {
        return rejectWithValue(error as AxiosError);
      }
    },
    { condition: checkStatusCondition('messages') },
  ),

  findNextById: createAsyncThunk<IMessageModel[], { id: string }, TThunkConfig>(
    `${messagesName}/findNextById`,
    async (params, { rejectWithValue }) => {
      try {
        const { data } = await messagesService.findNextById(params);

        if (typeof data === 'string' || data.Messages.length === 0) {
          return rejectWithValue(new AxiosError('New message not found'));
        }

        return data.Messages;
      } catch (error) {
        return rejectWithValue(error as AxiosError);
      }
    },
    { condition: checkStatusCondition('messages') },
  ),

  findPrevById: createAsyncThunk<IMessageModel[], { id: string }, TThunkConfig>(
    `${messagesName}/findPrevById`,
    async (params, { rejectWithValue }) => {
      try {
        const { data } = await messagesService.findPrevById(params);

        if (typeof data === 'string' || data.Messages.length === 0) {
          return rejectWithValue(new AxiosError('New message not found'));
        }

        return data.Messages;
      } catch (error) {
        return rejectWithValue(error as AxiosError);
      }
    },
    { condition: checkStatusCondition('messages') },
  ),
};
