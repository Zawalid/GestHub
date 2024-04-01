import { useState, useEffect } from 'react';

export function useLocalStorageState(key, initialState) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key],
  );

  return [value, setValue];
}

export function toLocalStorage(key,item) {
  let items =   localStorage.getItem(key) ? [...JSON.parse(localStorage.getItem(key))] : []
    function additem() {
      items = [...items, item];
      localStorage.setItem(key, JSON.stringify(items));
    }
    if (item && !items.includes(item)) additem();
  return { items };
}