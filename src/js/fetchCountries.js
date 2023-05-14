// const url = 'https://restcountries.com/v3.1/all';

export async function fetchCountry(query) {
  return fetch(
    `https://restcountries.com/v3.1/name/${query}?fields=name,capital,population,flags,languages`
  ).then(response => {
    // Response handling
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}