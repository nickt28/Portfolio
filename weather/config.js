const OPEN_WEATHER_MAP_API_KEY = '58598ecc7b95ec78992388426bbfc196';

// Create the script tag, set the appropriate attributes
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCllC58k5ap3vMqyKsmtKnnTPrBzdczJ2A&libraries=places&callback=initMap';
script.async = true;

// Attach your callback function to the `window` object
window.initMap = function() {
    initialize()
};

// Append the 'script' element to 'head'
document.head.appendChild(script);
