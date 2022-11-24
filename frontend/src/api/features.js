import { AXIOS } from './endpoints';

export function readFeatures() {
  return AXIOS.get('/features');
}
