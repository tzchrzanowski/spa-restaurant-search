import styled from '@emotion/styled';
import { Button } from '@tablecheck/tablekit-button';
import { ItemGroup } from '@tablecheck/tablekit-item';

export const ShopDetailsWrapper = styled('div')`
  max-width: initial;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const ShopImage = styled.img`
  width: 100%;
  max-width: 500px;
  max-height: 200px;
  margin: 0 auto;
`;

export const ImageSpinnerWrapper = styled('div')`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export const DescriptionSection = styled(ItemGroup)`
  min-height: 50%;
  max-height: 90%;
  height: 80%;
  overflow-y: scroll;
`;

export const CloseButtonWrapper = styled(Button)`
  position: fixed;
  bottom: 0;
  width: 100%;
`;
