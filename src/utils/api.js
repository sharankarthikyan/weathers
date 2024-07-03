export function constructURL(baseURL, params) {
  const url = new URL(baseURL);

  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key]);
  });

  return url.toString();
}
