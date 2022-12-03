import {
  Button,
  ButtonShape,
  ButtonSize,
  ButtonAppearance
} from '@tablecheck/tablekit-button';
import {
  Item,
  ItemGroup,
  ItemGroupOrientation
} from '@tablecheck/tablekit-item';
import { Panel, PanelPosition } from '@tablecheck/tablekit-panel';
import { Spinner, SpinnerSize } from '@tablecheck/tablekit-spinner';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

import { DetailedShop, Geo } from 'definitions/types';
import { getAutocomplete } from 'services/autocomplete';
import { selectTranslation } from 'services/handleTranslation';
import { getShopSearch } from 'services/shop_search';

import { ShopDetails } from './ShopDetails';
import { ListWrapper, SpinnerWrapper } from './styles';

export function ShopsList(): JSX.Element {
  const location = useLocation();
  const [detailedShops, setDetailedShops] = React.useState<DetailedShop[]>([]);
  const [term, setTerm] = React.useState<string | number>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [hadNoResults, setNoResults] = React.useState<boolean>(false);
  const [selectedShop, setSelectedShop] = React.useState<DetailedShop>();
  const [isFetchingData, setIsFetchingData] = React.useState<boolean>(false);

  const [t, { language }] = useTranslation();
  const navigate = useNavigate();

  const getShopsFromGeoLoc = (geolocation: Geo): void => {
    getShopSearch(geolocation.lat, geolocation.lon).then((shopsData) => {
      setDetailedShops(shopsData.shops);
    });
  };

  const handleSelectedShop = (clickedShop: DetailedShop): void => {
    setSelectedShop(clickedShop);
    setIsOpen(true);
  };

  const closeSidebar = (): void => {
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (location.search) {
      setTerm(location.search.split('=')[1]);
      if (term) {
        setIsFetchingData(true);
        getAutocomplete(term).then((data) => {
          setIsFetchingData(false);
          if (data.locations) {
            getShopsFromGeoLoc(data.locations[0].payload.geo);
          } else {
            setNoResults(true);
          }
        });
      }
    }
  }, [location.search, term]);

  return (
    <>
      {isFetchingData ? (
        <SpinnerWrapper>
          <Spinner size={SpinnerSize.Large} />
        </SpinnerWrapper>
      ) : (
        <ListWrapper>
          {hadNoResults ? (
            <Button
              size={ButtonSize.Large}
              shape={ButtonShape.Rounded}
              appearance={ButtonAppearance.Solid}
              onClick={() => {
                navigate(`/${language}`);
              }}
            >
              {t('attributes.pages.no_results')}
            </Button>
          ) : (
            <ItemGroup orientation={ItemGroupOrientation.Vertical}>
              {detailedShops.map((shop) => (
                <Item key={shop._id} onClick={() => handleSelectedShop(shop)}>
                  {shop?.name_translations.length > 0
                    ? selectTranslation(shop?.name_translations, language)
                    : shop.name}
                </Item>
              ))}
            </ItemGroup>
          )}
        </ListWrapper>
      )}
      <Panel
        isOpen={isOpen}
        onClickOutside={() => setIsOpen(false)}
        position={PanelPosition.Right}
        width="400px"
      >
        {selectedShop ? (
          <ShopDetails shop={selectedShop} closeSidebar={closeSidebar} />
        ) : (
          ''
        )}
      </Panel>
    </>
  );
}
