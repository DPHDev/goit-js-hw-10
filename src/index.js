import './css/styles.css';
import { fetchCountry } from './js/fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

input.addEventListener(
  'input',
  debounce(() => {
    const query = input.value;
    if (query !== '') {
      fetchCountry(query)
        .then(countries => renderCountry(countries))
        .catch(error => console.log(error));
    }
  }, DEBOUNCE_DELAY)
);

function renderCountry(countries) {
  if (countries.length == 1) {
    let markup = countries
      .map(country => {
        return `
            <div class="img-text">
                <img class="country-limg"src=${country.flags.png} width = 80px> 
                <h2> ${country.name.common} </h2>
            </div>
            <p><b>Capital:</b> ${country.capital}</p>
            <p><b>Population:</b> ${country.population}</p>
            <p><b>Languages:</b> ${Object.values(country.languages).join(
              ', '
            )}</p>
        `;
      })
      .join('');
    countryList.innerHTML = '';
    countryInfo.innerHTML = markup;
  } else if (countries.length >= 2 && countries.length <= 10) {
    let markup = countries
      .map(country => {
        return `
            <li class="country-info" >
                <div class="country-img">
                <img src=${country.flags.png} alt="" width = 80px>
                </div>
                <div class="country-content">
                    <h2>${country.name.common}</h2>
                </div>
            </li>
        `;
      })
      .join('');
    countryInfo.innerHTML = '';
    countryList.innerHTML = markup;
  } else {
    Notiflix.Notify.info(
      'Se encontraron demasiadas coincidencias. Introduzca un nombre más específico.'
    );
  }
}
