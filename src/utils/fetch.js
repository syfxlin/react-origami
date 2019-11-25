import axios from 'axios';
import config from '../config';

const fetch = axios.create({
  baseURL: config.baseURL
});

export default fetch;
