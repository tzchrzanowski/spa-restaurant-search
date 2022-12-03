import { Datasource } from 'definitions/types';

export function getAutocomplete(
  inputValue: string | number
): Promise<Datasource> {
  return fetch(
    `https://staging-snap.tablecheck.com/v2/autocomplete?locale=en&shop_universe_id=57e0b91744aea12988000001&text=${inputValue}`
  )
    .then((data) => data.json())
    .catch((err) => err);
}
