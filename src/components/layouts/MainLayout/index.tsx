import { Outlet, ScrollRestoration } from 'react-router-dom';

import { usePageTitles } from '@/shared/hooks';
import { routes } from '@/router';

export const MainLayout: React.FC = () => {
  usePageTitles(routes);

  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
};
