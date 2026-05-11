import "./styles.css";
import {format} from "date-fns"

const form = document.querySelector("form");
const locationField = document.getElementById("locationField");
const searchButton = document.getElementById("searchButton");
const dataDisplay = document.getElementById("dataDisplay");
dataDisplay.setAttribute("visible", "false");
let weatherData = {};
let previousRequest = ""; 

async function getData(location){
    try{
        const errorText = document.getElementById("errorText");
        errorText.setAttribute("visible", "false");
        const oneWeekInSeconds = 31536000;
        const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" 
        + location + "/" 
        + "?key=" + "46NG7ZU8PRUUL8JJ8Q7KB5NB3"; 
        const response = await fetch(url);
        if(response.status === 400){
            errorText.setAttribute("visible", "true");
            errorText.textContent = "Location not found. Please try again.";
            dataDisplay.setAttribute("visible", "false");
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        return processData(data);
    }catch(error){
        console.log(error);
    }
}

function processData(data){
    const filtered = {
        "location": data.address.toUpperCase(),
        "temperature": data.currentConditions.temp,
        "icon": data.currentConditions.icon,
        "precipitation": "Precipitation: " + data.currentConditions.precip + "%",
        "humidity": "Humidity: " + data.currentConditions.humidity + "%",
        "windspeed": "Wind Speed: " + data.currentConditions.windspeed + "mph",
        "condition": "Condition: " + data.currentConditions.conditions,
        "date": new Date(Date.now()),
        "description": "Description: " + data.description,
    };

    return filtered;
}

searchButton.addEventListener("click", async () => {
    event.preventDefault();
    const userInput = locationField.value;
    if(userInput != previousRequest && userInput.trim().length != 0){
        submitRequest(userInput);
    }
    previousRequest = userInput;
});

async function submitRequest(value){
    weatherData = await getData(value);
    if(weatherData != null){
        displayData(weatherData);
    }
}

function displayData(data){
    dataDisplay.setAttribute("visible", "true");
    
    const location = document.getElementById("location");
    location.textContent = weatherData.location;

    const precipitation = document.getElementById("precipitation");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");

    precipitation.textContent = weatherData.precipitation;
    humidity.textContent = weatherData.humidity;
    wind.textContent = weatherData.windspeed;

    const condition = document.getElementById("condition");
    const date = document.getElementById("date");
    const description = document.getElementById("description");

    condition.textContent = weatherData.condition;
    date.textContent = weatherData.date;
    description.textContent = weatherData.description;
}   