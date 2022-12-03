import { ButtonShape, ButtonAppearance } from '@tablecheck/tablekit-button';
import {
  Item,
  ItemGroup,
  ItemGroupOrientation
} from '@tablecheck/tablekit-item';
import { Spinner, SpinnerSize } from '@tablecheck/tablekit-spinner';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { DetailedShop } from 'definitions/types';
import { selectTranslation } from 'services/handleTranslation';

import {
  ShopDetailsWrapper,
  ShopImage,
  ImageSpinnerWrapper,
  DescriptionSection,
  CloseButtonWrapper
} from './styles';

interface Props {
  shop: DetailedShop;
  closeSidebar: () => void;
}

export function ShopDetails(props: Props): JSX.Element {
  const [isImageLoaded, setIsImageLoaded] = React.useState<boolean>(false);
  const [displayCaption, setDisplayCaption] = React.useState<string>('none');

  const [t, { language }] = useTranslation();
  const { shop, closeSidebar } = props;

  React.useEffect(() => {
    if (isImageLoaded) {
      setDisplayCaption('');
    }
  }, [isImageLoaded]);

  return (
    <ShopDetailsWrapper>
      <ItemGroup orientation={ItemGroupOrientation.Vertical}>
        {isImageLoaded ? (
          ''
        ) : (
          <Item height="200px" isDisabled>
            <ImageSpinnerWrapper>
              <Spinner size={SpinnerSize.Large} />
            </ImageSpinnerWrapper>
          </Item>
        )}
        <ShopImage
          src={shop?.search_image}
          alt=""
          style={{ display: displayCaption }}
          onLoad={() => setIsImageLoaded(true)}
        />
        <DescriptionSection>
          {shop?.name_translations.length > 0 ? (
            <Item>{selectTranslation(shop?.name_translations, language)}</Item>
          ) : (
            ''
          )}
          {shop?.content_title_translations.length > 0 ? (
            <Item>
              {selectTranslation(shop?.content_title_translations, language)}
            </Item>
          ) : (
            ''
          )}
          {shop?.content_body_translations.length > 0 ? (
            <Item lang={language}>
              {selectTranslation(shop?.content_body_translations, language)}
            </Item>
          ) : (
            ''
          )}
          <Item>
            {t('attributes.pages.currency')} : {shop?.currency}
          </Item>
          {shop?.budget_dinner_min ? (
            <Item>
              {t('attributes.pages.budget_dinner_min')}{' '}
              {shop?.budget_dinner_min}
            </Item>
          ) : (
            ''
          )}
          {shop?.is_smartpay === true ? (
            <Item>{t('attributes.pages.smartpay')}</Item>
          ) : (
            ''
          )}

          {shop?.cuisines.length > 0 ? (
            <ItemGroup
              headingText={t('attributes.pages.cuisine')}
              orientation={ItemGroupOrientation.Horizontal}
              headingStyles={{ margin: 0 }}
            >
              {shop?.cuisines.map((cuisine) => (
                <Item key={cuisine} isDisabled>
                  {cuisine}
                </Item>
              ))}
            </ItemGroup>
          ) : (
            ''
          )}
          {shop?.service_modes.length > 0 ? (
            <ItemGroup
              headingText={t('attributes.pages.service_type')}
              orientation={ItemGroupOrientation.Horizontal}
              headingStyles={{ margin: 0 }}
            >
              {shop?.service_modes.map((serviceMode) => (
                <Item key={serviceMode} isDisabled>
                  {serviceMode}
                </Item>
              ))}
            </ItemGroup>
          ) : (
            ''
          )}
          {shop?.tags.length > 0 ? (
            <ItemGroup
              headingText={t('attributes.pages.tags')}
              orientation={ItemGroupOrientation.Horizontal}
              headingStyles={{ margin: 0 }}
            >
              {shop?.tags.map((tag) => (
                <Item key={tag} isDisabled>
                  {tag}
                </Item>
              ))}
            </ItemGroup>
          ) : (
            ''
          )}
        </DescriptionSection>
      </ItemGroup>
      <CloseButtonWrapper
        onClick={() => closeSidebar()}
        lang={language}
        shape={ButtonShape.Sharp}
        appearance={ButtonAppearance.Solid}
      >
        {t('actions.close_panel')}
      </CloseButtonWrapper>
    </ShopDetailsWrapper>
  );
}
