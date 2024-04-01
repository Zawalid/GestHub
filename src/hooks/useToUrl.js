export function setToUrl(key, value, params, setparams) {
  params.set(key, value);
  setparams(params);
}
