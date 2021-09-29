import { fetchJson } from '../../utils';

export const GoodWishes = fetchJson<string[]>('https://react-start-2g1yi0mjdea00e6d-1258126186.tcloudbaseapp.com/waoooo/good-wishes.json');