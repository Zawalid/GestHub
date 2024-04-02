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

export function toLocalStorage(key,item,droped) {
  let items =   localStorage.getItem(key) ? [...JSON.parse(localStorage.getItem(key))] : []
    function additem() {
      items = [...items, item];
      localStorage.setItem(key, JSON.stringify(items));
  }
  function dropItem() {
    items = items.filter(e => e !== item)
      localStorage.setItem(key, JSON.stringify(items));

  }
  if (item && !items.includes(item)) additem();
  if (droped) dropItem()
  return { items };
}