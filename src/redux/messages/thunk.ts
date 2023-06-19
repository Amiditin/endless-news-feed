import { AxiosError } from 'axios';

import { checkStatusCondition, createAppThunk } from '@/redux/utils';
import { messagesService } from '@/shared/api/services';

import { messagesName } from './slice';

import type { IMessageModel } from '@/shared/api/models';

export const messagesThunks = {
  findAll: createAppThunk<IMessageModel[]>(
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

  findNextById: createAppThunk<IMessageModel[], { id: string }>(
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

  findPrevById: createAppThunk<IMessageModel[], { id: string }>(
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
