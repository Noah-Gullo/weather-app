import "./styles.css";
import {format} from "date-fns"

async function getData(location){
    try{
        const oneWeekInSeconds = 31536000;
        const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" 
        + location + "/" 
        + "?key=" + "46NG7ZU8PRUUL8JJ8Q7KB5NB3"; 
        const response = await fetch(url);
        const data = await response.json();
        return processData(data);
    }catch(error){
        console.log(error);
    }
}

function processData(data){
    console.log(data);
    const filtered = {
        "location": data.address.toUpperCase(),
        "temperature": data.currentConditions.temp,
        "icon": data.currentConditions.icon,
        "precipitation": "Precipitation: " + data.currentConditions.precip + "%",
        "humidity": "Humidity: " + data.currentConditions.humidity + "%",
        "wind": "Wind Speed: " + data.currentConditions.windspeed + "mph",
        "condition": "Condition: " + data.currentConditions.conditions,
        "date": new Date(Date.now()),
        "description": "Description: " + data.description,
    };

    return filtered;
}

let weatherData = await getData("san luis obispo");

for (const [key, value] of Object.entries(weatherData)) {
  console.log(`${value}`);
}