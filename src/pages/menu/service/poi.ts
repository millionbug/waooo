import { fetchJson } from '@utils';
import key from '../data/gaode';

export interface Poi {
  id: number;
  name: string;
  address: string;
  location: string;
  distance: string;
  tel: number;
  photos: ({
    title: string;
    url: string;
  } | null)[]
};

export function FetchPoi(optioins: {
  location: string;
  radius: number;
  types: string;
}): Promise<{
  status: '0' | '1';
  info: string;
  pois: Poi[];
}> {
  return fetchJson({
    url: 'https://restapi.amap.com/v3/place/around',
    data: {
      key,
      location: optioins.location,
      types: optioins.types
    }
  })
}