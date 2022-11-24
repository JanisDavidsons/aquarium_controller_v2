import jwtDecode from 'jwt-decode';
import { ACCESS_TOKEN, AXIOS } from "./endpoints";
import { PROJECT_PATH } from './env';

export const SIGN_IN_PATHNAME = 'loginPathname';
export const SIGN_IN_SEARCH = 'loginSearch';

export const getDefaultRoute = (features) => features.project ? `/${PROJECT_PATH}` : "/wifi";

export function verifyAuthorization() {
  return AXIOS.get('/verifyAuthorization');
}

export function signIn(request) {
  return AXIOS.post('/signIn', request);
}

/**
 * Fallback to sessionStorage if localStorage is absent. WebView may not have local storage enabled.
 */
export function getStorage() {
  return localStorage || sessionStorage;
}

export function storeLoginRedirect(location) {
  if (location) {
    getStorage().setItem(SIGN_IN_PATHNAME, location.pathname);
    getStorage().setItem(SIGN_IN_SEARCH, location.search);
  }
}

export function clearLoginRedirect() {
  getStorage().removeItem(SIGN_IN_PATHNAME);
  getStorage().removeItem(SIGN_IN_SEARCH);
}

export function fetchLoginRedirect(features) {
  const signInPathname = getStorage().getItem(SIGN_IN_PATHNAME);
  const signInSearch = getStorage().getItem(SIGN_IN_SEARCH);
  clearLoginRedirect();
  return {
    pathname: signInPathname || getDefaultRoute(features),
    search: (signInPathname && signInSearch) || undefined
  };
}

export const clearAccessToken = () => localStorage.removeItem(ACCESS_TOKEN);
export const decodeMeJWT = (accessToken) => jwtDecode(accessToken);

export function addAccessTokenParameter(url) {
  const accessToken = getStorage().getItem(ACCESS_TOKEN);
  if (!accessToken) {
    return url;
  }
  const parsedUrl = new URL(url);
  parsedUrl.searchParams.set(ACCESS_TOKEN, accessToken);
  return parsedUrl.toString();
}
