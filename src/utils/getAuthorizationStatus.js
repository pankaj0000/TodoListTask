import { asyncStorageKeys } from "../dictionary";

export function getAuthorizationStatus() {
  const localStorageData = localStorage.getItem(asyncStorageKeys.login);
  if (localStorageData) {
    const parsedData = JSON.parse(localStorageData);
    if (Object.keys(parsedData).length > 0) {
      return parsedData;
    }
    return null;
  }
  return null
}
