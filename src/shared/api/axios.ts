import _axios from 'axios';
import qs from 'qs';

import { baseBackendURL } from './apiRoutes';

export const axios = _axios.create({
  baseURL: baseBackendURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  paramsSerializer: {
    serialize: (params) => qs.stringify(params),
  },
});
