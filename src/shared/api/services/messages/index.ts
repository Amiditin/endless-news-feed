import { axios } from '@/shared/api/axios';
import { apiRoutes } from '@/shared/api/apiRoutes';

import type { IMessagesService } from './types';

const messagesRoute = apiRoutes.root;

export const messagesService: IMessagesService = {
  findAll: (_, config) => {
    return axios.post(messagesRoute, { actionName: 'MessagesLoad', messageId: '0' }, config);
  },
  findNextById: async ({ id }, config) => {
    return axios.post(messagesRoute, { actionName: 'MessagesLoad', messageId: id }, config);
  },
};
