export interface Location {
  text: string;
  type: string;
  payload: LocationPayload;
}

export interface Shop {
  payload: ShopPayload;
  text: string;
  type: string;
}

export interface Datasource {
  locations: Location[];
  shops: Shop[];
}

export interface ShopsDatasource {
  shops: DetailedShop[];
  meta: Meta;
}

export interface DetailedShop {
  location_kana_name: string;
  service_modes: string[];
  search_image: string;
  locale: string;
  location_name_translations: [];
  tags: string[];
  kana_name: string;
  cuisines: string[];
  budget_dinner_min: string;
  booking_page_mode: string;
  is_smartpay: boolean;
  name_translations: Translation[];
  name: string[];
  content_body_translations: Translation[];
  geocode: Geo;
  currency: string;
  tagline_translations: [];
  content_title_translations: Translation[];
  slug: string;
  budget_lunch_min: string;
  distance: number;
  _id: string;
  availability: [];
}

export interface Translation {
  translation: string;
  locale: string;
}

interface Geo {
  lat: number;
  lon: number;
}

interface LocationPayload {
  area: string;
  geo: Geo;
  location_type: string;
  term: string;
}

interface ShopPayload {
  shop_slug: string;
}

interface Meta {
  record_count: number;
}
