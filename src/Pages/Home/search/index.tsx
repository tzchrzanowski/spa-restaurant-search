import {
  Button,
  ButtonShape,
  ButtonSize,
  ButtonAppearance
} from '@tablecheck/tablekit-button';
import { Input } from '@tablecheck/tablekit-input';
import { Size } from '@tablecheck/tablekit-theme';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { SearchWrapper } from './styles';

export function SearchWindow(): JSX.Element {
  const [t, { language }] = useTranslation();
  const [inputValue, setInputValue] = React.useState<string | number>('');
  const navigate = useNavigate();

  const goToListPage = React.useCallback((): void => {
    navigate(`/en/shops?term=${inputValue}`);
  }, [inputValue, navigate]);

  React.useEffect(() => {
    if (inputValue) {
      goToListPage();
    }
  }, [inputValue, goToListPage]);

  const handleSearch = () => {
    if (inputValue !== '') {
      goToListPage();
    }
  };

  const hendleKeyDown = (key: string, currentInput: string): void => {
    if (key === 'Enter') setInputValue(currentInput);
    if (inputValue !== '') goToListPage();
  };

  return (
    <SearchWrapper>
      <Input
        lang={language}
        type="search"
        label={t('attributes.pages.search_caption')}
        width={Size.XXLarge}
        onKeyDown={(event) =>
          hendleKeyDown(event.key, event.currentTarget.value)
        }
        onBlur={(event) => setInputValue(event.currentTarget.value)}
      />
      <Button
        size={ButtonSize.Regular}
        shape={ButtonShape.Rounded}
        appearance={ButtonAppearance.Solid}
        onClick={() => handleSearch()}
      >
        {t('attributes.pages.search_button_caption')}
      </Button>
    </SearchWrapper>
  );
}
