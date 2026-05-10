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
        "temp": data.currentConditions.temp,
        "tempmax": data.days[0].tempmax,
        "tempmin": data.days[0].tempmin,
        "icon": data.currentConditions.icon,
        "description": data.description,
    };
    return filtered;
}

let weatherData = await getData("morocco");
console.log(weatherData);
console.log("Temperature: " + weatherData.temp);
console.log("Max Temperature: " + weatherData.tempmax);
console.log("Minimum Temperature: " + weatherData.tempmin);
console.log("Icon: " + weatherData.icon);
console.log("Description: " + weatherData.description);