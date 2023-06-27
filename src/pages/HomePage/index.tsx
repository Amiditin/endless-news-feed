import { useId, useRef, useState } from 'react';
import { Typography, Tooltip } from 'antd';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import clsx from 'clsx';

import { getMessagesItems, getMessagesLastItemId, messagesThunks } from '@/redux/messages';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';

import { ListMessages } from './ListMessages';

import styles from './Home.module.scss';

const { Title } = Typography;

export const HomePage: React.FC = () => {
  const [isFirstOld, setIsFirstOld] = useState(false);
  const scrollableBoxId = useId();
  const dispatch = useAppDispatch();

  const messages = useAppSelector(getMessagesItems);
  const lastMessageId = useAppSelector(getMessagesLastItemId);

  const shouldLoadPrev = useRef(true);

  const handleLoadPrev = () => {
    if (shouldLoadPrev.current) {
      dispatch(messagesThunks.findPrevById({ id: lastMessageId }));
    }

    shouldLoadPrev.current = false;

    setTimeout(() => {
      shouldLoadPrev.current = true;
    }, 1000);
  };

  return (
    <main className={styles.home}>
      <Title level={2}>
        Последние сообщения
        <Tooltip title={isFirstOld ? 'Режим: сначала старые' : 'Режим: сначала новые'}>
          <VerticalAlignBottomOutlined
            className={clsx(styles.icon_sort, !isFirstOld && styles.icon_sort_rotate)}
            onClick={() => setIsFirstOld((prev) => !prev)}
          />
        </Tooltip>
      </Title>
      <div
        id={scrollableBoxId}
        className={clsx(styles.scrollable_box, isFirstOld && styles.flex_dir_reverse)}>
        <InfiniteScroll
          dataLength={messages.length}
          scrollableTarget={scrollableBoxId}
          next={handleLoadPrev}
          scrollThreshold="500px"
          inverse={isFirstOld}
          loader={null}
          hasMore>
          <ListMessages isFirstOld={isFirstOld} />
        </InfiniteScroll>
      </div>
    </main>
  );
};
