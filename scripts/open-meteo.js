const locations = [
    {name: "Tokyo",    latitude: 35.6895, longitude: 139.6917},
    {name: "Oslo",     latitude: 59.9114, longitude:  10.7579},
    {name: "Madrid",   latitude: 40.4167, longitude:  -3.7037},
    {name: "Paris",    latitude: 48.8647, longitude:   2.3490},
    {name: "Helsinki", latitude: 60.1920, longitude:  24.9458}
    {name: "Lillehammer", latitude: 61.1151, longitude:  10.4662}
    {name: "Gjovik", latitude: 60.79574, longitude:  10.6915}
    
]

let selectedCity


function findLocation(city) {
    let loc;
    for (let i = 0; i < locations.length; i++) {
        if (city === locations[i].name) {
            loc = locations[i]
            return loc
        }
    }
    return ""
}

async function getData(city) {
    let location = findLocation(city)
    if (location === "")
        return;

    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`
    try {
        const response = await fetch(URL)
        if (!response.ok) {
            throw new Error(`${response.status}`)
        }
        const data = await response.json()
        console.log(data)                                   // this gets displayed in console every interval
        displayWeather(location.name, data.current_weather)
        
    } catch(error) {
        console.error("Failed to fetch data:", error);
    }
}

function displayWeather(city, weatherData) {
    const weatherContainer = document.getElementById("weather-container")
    const weatherDiv = document.getElementById("displayWeather")
    weatherDiv.innerHTML2 = "";

    weatherDiv.innerHTML = `
        <h3>Weather in ${city}</h3>
        <p>Temperature: ${weatherData.temperature} ℃</p>
        <p>Windspeed: ${weatherData.windspeed} km/h</p>
    `;
    
    weatherContainer.appendChild(weatherDiv);

}

document.getElementById("city").addEventListener("change", function() {
    selectedCity = this.value
    getData(selectedCity)
})

setInterval(function() {
    if (selectedCity) {
        //console.log("hello")   // DEBUG
        getData(selectedCity)
    }
},5000)                         // updates every 5 sec
