import { ShopsDatasource } from 'definitions/types';

export function getShopSearch(
  latitude: number,
  longitude: number
): Promise<ShopsDatasource> {
  return fetch(
    `https://staging-snap.tablecheck.com/v2/shop_search?geo_latitude=${latitude}&geo_longitude=${longitude}&shop_universe_id=57e0b91744aea12988000001&locale=en&per_page=50`
  )
    .then((data) => data.json())
    .catch((err) => err);
}
