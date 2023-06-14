import type { IModelId, TAxiosRequest } from '@/shared/api/services/types';

export interface IAttachmentModel {
  type: 'video' | 'image';
  url: string;
}

export interface IMessageModel extends IModelId {
  author: string;
  content: string;
  channel: string;
  date: string;
  attachments: IAttachmentModel;
  senderNumber: string;
  region: string;
}

export interface IFindMessages {
  Messages: IMessageModel[];
}

export interface IMessagesService {
  findAll: TAxiosRequest<void, IFindMessages>;

  findNextById: TAxiosRequest<IModelId, IFindMessages>;
}
