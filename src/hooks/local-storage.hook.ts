import {
  objectDecrypt,
  objectEncrypt,
} from '../utilities/encrypt-object.utility';

export function useSetLocalStorage<T>(item: string, value: T) {
  if (typeof window === 'undefined') {
    console.error('localStorage is not available on the server.');
    return;
  }

  const encryptValue: string | null = objectEncrypt<T>(value);

  if (encryptValue) {
    localStorage.setItem(item, encryptValue);
    return;
  }

  console.error('Data could not be encrypted');
  localStorage.setItem(item, JSON.stringify(value));
}

export function useGetLocalStorage<T>(item: string): T | null {
  if (typeof window === 'undefined') {
    console.error('localStorage is not available on the server.');
    return null;
  }

  const getItemLocalStorage: string | null = localStorage.getItem(item);

  if (getItemLocalStorage) {
    const decryptValue: T | null = objectDecrypt<T>(getItemLocalStorage);

    if (!decryptValue) {
      const valueLocalStorage: T = JSON.parse(getItemLocalStorage);

      console.error('Data will not be decrypted');
      return valueLocalStorage;
    }

    return decryptValue;
  }

  return null;
}
