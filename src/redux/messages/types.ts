import type { IMessageModel } from '@/shared/api/models';
import type { TRequestStatuses } from '@/redux/types';

export interface IMessagesState {
  items: IMessageModel[];
  lastItemId: string;
  status: TRequestStatuses;
}
