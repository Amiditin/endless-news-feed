import { Tooltip } from 'antd';
import { StarTwoTone } from '@ant-design/icons';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { getFavoriteItemsId, messagesActions } from '@/redux/messages';

import styles from './FavoriteMessageStatus.module.scss';

interface IFavoriteMessageStatusProps {
  messageId: string;
}

export const FavoriteMessageStatus: React.FC<IFavoriteMessageStatusProps> = ({ messageId }) => {
  const dispatch = useAppDispatch();

  const isFavoriteMessage = useAppSelector(getFavoriteItemsId).includes(messageId);

  const handleSwitchFavorite = () => {
    if (isFavoriteMessage) {
      dispatch(messagesActions.removeFavorite(messageId));
    } else {
      dispatch(messagesActions.addFavorite(messageId));
    }
  };

  return (
    <Tooltip title={isFavoriteMessage ? 'Удалить из избранного' : 'Добавить в избранное'}>
      <StarTwoTone
        className={clsx(styles.icon_star, isFavoriteMessage && styles.icon_star_active)}
        onClick={handleSwitchFavorite}
      />
    </Tooltip>
  );
};
