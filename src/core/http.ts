import axios from 'axios';
import envConfig from '~config/env';

type HTTPResponse<T> = { status: string | boolean; message: string; data: T };

const http = axios.create({ baseURL: envConfig.SERVER_BASE_URL });

export default http;
export type { HTTPResponse };
