import { Translation } from 'definitions/types';

const getFirstTransaltionElement = (translations: Translation[]): string =>
  translations[0].translation;

export function selectTranslation(
  translations: Translation[],
  language: string
): string {
  if (translations.length > 0) {
    let selectedTranslation = getFirstTransaltionElement(translations);
    translations.map((iteratedTranslation) => {
      if (iteratedTranslation.locale === language)
        selectedTranslation = iteratedTranslation.translation;
      return selectedTranslation;
    });
    return selectedTranslation;
  }
  return '';
}
