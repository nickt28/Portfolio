let autocomplete
function initialize() {
  var input = document.getElementById('searchTextField')
  autocomplete = new google.maps.places.Autocomplete(input)

  const options = {
    fields: ["address_components","geometry","name"],
    types: ["(cities)"],
  };
  autocomplete = new google.maps.places.Autocomplete(input, options)
  autocomplete.addListener('place_changed', onPlaceChanged)
}

function onPlaceChanged() {
  var place = autocomplete.getPlace()
  if(place.geometry){
    getLocations(place.name)
    highlightCountry(place.address_components.slice(-1)[0].short_name)
  } else {
    getLocations(place.name)
  }
}

const url = 'http://api.openweathermap.org'
// const mapsAndPlacesApiKey = 'AIzaSyCllC58k5ap3vMqyKsmtKnnTPrBzdczJ2A'
const openWeatherMapApiKey = '58598ecc7b95ec78992388426bbfc196'
const msg = document.querySelector(".top-banner .msg");

function getLocations(place) {
  fetch(`${url}/geo/1.0/direct?q=${place}&limit=5&appid=${openWeatherMapApiKey}`, { method: 'get' })
  .then(response => response.json())
  .then(locations => {
    let responceNum = locations.length
    if (responceNum === 0) {
      msg.textContent = "Please search for a valid city 😩";
    } else {
      for (let i = 0; i < responceNum; i++) {
        console.log(locations[i])
        getWeather([locations[i].lat,locations[i].lon])
      }
    }
  })
  .catch(err => {
    console.error('Request failed', err)
  })
}

function highlightCountry(country) {
  console.log('Country: '+country)
}

//Not me drop in code Other ----------------------------------------------------------------------
const grid = document.querySelector(".grid-weather");

function getWeather(coordinates) {
  fetch(`${url}/data/2.5/weather?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${openWeatherMapApiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;

      const div = document.createElement("div");
      div.classList.add("grid-item");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <div><p>humidity: ${Math.round(main.humidity)}</p></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      div.innerHTML = markup;
      grid.appendChild(div);
    })
  msg.textContent = "";
}