import { useEffect, useLayoutEffect, useState } from 'react';
import { List, Typography, Avatar, Button, Tooltip } from 'antd';
import {
  LayoutOutlined,
  SettingOutlined,
  UserOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import clsx from 'clsx';

import { getMessagesItems, getMessagesLastItemId, messagesThunks } from '@/redux/messages';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { parseDate } from '@/shared/helpers';

import { FavoriteMessageStatus } from './FavoriteMessageStatus';

import styles from './Home.module.scss';

const { Title, Text } = Typography;

export const HomePage: React.FC = () => {
  const [isSortAcs, setIsSortAcs] = useState(true);
  const dispatch = useAppDispatch();

  const messages = useAppSelector(getMessagesItems);
  const lastMessageId = useAppSelector(getMessagesLastItemId);

  useLayoutEffect(() => {
    dispatch(messagesThunks.findAll());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(messagesThunks.findNextById({ id: lastMessageId }));
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, lastMessageId]);

  return (
    <main className={styles.home}>
      <Title level={2}>
        Последние сообщения
        <Tooltip title={isSortAcs ? 'Сначала старые' : 'Сначала новые'}>
          <VerticalAlignBottomOutlined
            className={clsx(styles.icon_sort, !isSortAcs && styles.icon_sort_rotate)}
            onClick={() => setIsSortAcs((prev) => !prev)}
          />
        </Tooltip>
      </Title>
      <List
        itemLayout="horizontal"
        dataSource={isSortAcs ? messages : messages.slice().reverse()}
        renderItem={(item) => (
          <List.Item className={styles.message}>
            <div className={styles.message_top}>
              <div className={styles.author}>
                <Avatar className={styles.avatar} size={40} icon={<UserOutlined />} />
                <div className={styles.title}>
                  <Text strong>{item.author}</Text>
                  <Text italic>{item.channel}</Text>
                </div>
              </div>
              <div className={styles.buttons}>
                <Button disabled>Левый</Button>
                <Button disabled>Центр</Button>
                <Button disabled>Правый</Button>
              </div>
              <div className={styles.icons}>
                <VerticalAlignTopOutlined className={styles.icon} rotate={90} />
                <LayoutOutlined className={styles.icon} />
                <SettingOutlined className={styles.icon} />
                <FavoriteMessageStatus messageId={item.id} />
              </div>
            </div>
            <div className={styles.content}>
              <span className={styles.time}>{parseDate(item.date)}</span>
              <p className={styles.text}>
                <Text>{item.content}</Text>
                <Text type="secondary">Далее</Text>
              </p>
            </div>
            <div className={styles.attachments}>
              {item.attachments.map((attachment) =>
                attachment.type === 'image' ? (
                  <img className={styles.image} src={attachment.url} key={item.id} alt="Content" />
                ) : (
                  <video className={styles.video} key={item.id} controls>
                    <track kind="captions" />
                    <source src={attachment.url} />
                    <a href={attachment.url}>Скачайте видео</a>. //{' '}
                  </video>
                ),
              )}
            </div>
          </List.Item>
        )}
      />
    </main>
  );
};
