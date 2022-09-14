import axios from 'axios';
import authenticateResponse from './authenticateResponse';

axios.interceptors.response.use(...authenticateResponse);
