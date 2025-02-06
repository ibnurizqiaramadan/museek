'use server';

import { CustomError } from '@/data/responseTypes';
import { getAPIPathMap } from '@/data/apiRoutes';

/**
 * Represents the available API paths.
 * @typedef {keyof ReturnType<typeof getAPIPathMap>} API_PATH
 */
type API_PATH = keyof ReturnType<typeof getAPIPathMap>;

/**
 * Represents the response type for a given API path.
 * @template S
 * @typedef {ReturnType<typeof getAPIPathMap>[S]['response']} DataHelperResponse
 */
type DataHelperResponse<S extends API_PATH> = ReturnType<typeof getAPIPathMap>[S]['response'];

type FetchMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

/**
 * Options for making a request.
 * @interface RequestOptions
 * @property {API_PATH} url - The API endpoint to request.
 * @property {FetchMethods} [method='GET'] - The HTTP method to use.
 * @property {Record<string, string>} [body] - The body of the request.
 * @property {Record<string, string>} [query] - Query parameters for the request.
 * @property {Record<string, string>} [params] - URL parameters for the request.
 * @property {Record<string, string>} [headers] - Custom headers for the request.
 */
interface RequestOptions {
  url: API_PATH;
  method?: FetchMethods;
  body?: Record<string, string>;
  query?: Record<string, string>;
  params?: Record<string, string>;
  headers?: Record<string, string>;
}

/**
 * Custom data response type.
 * @template T
 * @typedef {Array<DataHelperResponse<T> | null, CustomError | null>} CustomDataResponse
 */
export type CustomDataResponse<T extends API_PATH> = [DataHelperResponse<T> | null, CustomError | null];

/**
 * Makes an API request.
 * @template URL
 * @param {RequestOptions} options - The options for the request.
 * @returns {Promise<CustomDataResponse<URL>>} The response data and error.
 */
async function request<URL extends API_PATH>({ url, method = 'GET', headers = {}, query = {}, params = {}, body = {} }: RequestOptions): Promise<CustomDataResponse<URL>> {
  const API_PATH_MAP = getAPIPathMap();
  const version = API_PATH_MAP[url].version;

  try {
    const parsedUrl = url.replace(/:(\w+)/g, (_, param) => params[param]);
    const apiUrl = process.env[`API_URL_${version.toUpperCase()}`];
    const queryString = new URLSearchParams(query).toString();
    const fullUrl = `${apiUrl}/${parsedUrl}?${queryString}`;

    const startTime = Date.now();

    const response = await fetch(fullUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': `gothru-maps-frontend-${process.env.NODE_ENV}`,
        ...headers,
      },
      ...(method.toLocaleLowerCase() !== 'get' && { body: JSON.stringify(body) }),
    });

    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      const errorText = await response.text(); // Get the error response text
      console.error(`Error: ${response.status} - ${errorText}`);
      return [ null, { statusCode: response.status, errors: { message: `Error: ${response.status}`, details: errorText } } as CustomError ];
    }

    // Attempt to parse the response as JSON
    const data = await response.json() as DataHelperResponse<URL>;
    const endTime = Date.now();
    const duration = endTime - startTime;
    console.info(` API : ${method} ${fullUrl} - ${duration}ms`);

    return [ data, null ];
  } catch (error) {
    console.error(error);
    return [ null, error as CustomError ];
  }
}

/**
 * Makes a GET request.
 * @template URL
 * @param {Omit<RequestOptions, 'method'>} options - The options for the request.
 * @returns {Promise<CustomDataResponse<URL>>} The response data and error.
 */
export const get = async <URL extends API_PATH>(options: Omit<RequestOptions, 'method'>): Promise<CustomDataResponse<URL>> => request<URL>({ ...options, method: 'GET' });

/**
 * Makes a POST request.
 * @template URL
 * @param {Omit<RequestOptions, 'method'>} options - The options for the request.
 * @returns {Promise<CustomDataResponse<URL>>} The response data and error.
 */
export const post = async <URL extends API_PATH>(options: Omit<RequestOptions, 'method'>): Promise<CustomDataResponse<URL>> => request<URL>({ ...options, method: 'POST' });

/**
 * Makes a PUT request.
 * @template URL
 * @param {Omit<RequestOptions, 'method'>} options - The options for the request.
 * @returns {Promise<CustomDataResponse<URL>>} The response data and error.
 */
export const put = async <URL extends API_PATH>(options: Omit<RequestOptions, 'method'>): Promise<CustomDataResponse<URL>> => request<URL>({ ...options, method: 'PUT' });

/**
 * Makes a DELETE request.
 * @template URL
 * @param {Omit<RequestOptions, 'method'>} options - The options for the request.
 * @returns {Promise<CustomDataResponse<URL>>} The response data and error.
 */
export const del = async <URL extends API_PATH>(options: Omit<RequestOptions, 'method'>): Promise<CustomDataResponse<URL>> => request<URL>({ ...options, method: 'DELETE' });

/**
 * Makes a PATCH request.
 * @template URL
 * @param {Omit<RequestOptions, 'method'>} options - The options for the request.
 * @returns {Promise<CustomDataResponse<URL>>} The response data and error.
 */
export const patch = async <URL extends API_PATH>(options: Omit<RequestOptions, 'method'>): Promise<CustomDataResponse<URL>> => request<URL>({ ...options, method: 'PATCH' });


/**
 * Makes an API request with automatic method selection.
 * @template URL
 * @param {Omit<RequestOptions, 'method'>} options - The options for the request.
 * @returns {Promise<CustomDataResponse<URL>>} The response data and error.
 */
export const DataRequest = async <URL extends API_PATH>(
  options: Omit<RequestOptions, 'method'>
): Promise<CustomDataResponse<URL>> => {
  const API_PATH_MAP = getAPIPathMap();
  const method = API_PATH_MAP[options.url].method;
  return request<URL>({ ...options, method });
};

