import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import { SearchWindow } from './search';
import { HomeHeadline, HomeWrapper } from './styles';

export function Home(): JSX.Element {
  const [t, { language }] = useTranslation();

  return (
    <HomeWrapper>
      <HomeHeadline>
        {t('attributes.titles.headline_restaurant_search')}
      </HomeHeadline>
      <Outlet />
      <Helmet>
        <title lang={language}>{`${t(
          'attributes.titles.headline_restaurant_search'
        )} - ${t('keywords.app_name')}`}</title>
      </Helmet>
      <SearchWindow />
    </HomeWrapper>
  );
}
