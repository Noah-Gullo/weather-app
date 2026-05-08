import { da } from "date-fns/locale";
import "./styles.css";
import {format} from "date-fns"

class WeatherData{
    constructor(temp, tempmax, tempmin, icon, description){
        this.temp = temp;
        this.tempmax = tempmax;
        this.tempmin = tempmin;
        this.icon = icon;
        this.description = description;
    }

    get temp(){
        return this.temp;
    }

    get tempmax(){
        return this.tempmax;
    }

    get tempmin(){
        return this.tempmin;
    }

    get icon(){
        return this.icon;
    }

    get description(){
        return this.description;
    }
}

async function getData(location){
    try{
        const oneWeekInSeconds = 31536000;
        const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" 
        + location + "/" 
        + format(Date.now(), "yyyy-M-d") + "/"
        + format(Date.now() + oneWeekInSeconds, "yyyy-M-d")
        + "?key=" + "46NG7ZU8PRUUL8JJ8Q7KB5NB3"; 
        const response = await fetch(url);
        const data = await response.json();
        processData(data);
    }catch(error){
        console.log(error);
    }
}

function processData(data){
    console.log(data);
    let filtered = new WeatherData(
        temp = data.currentConditions.temp,
        tempmax = data.currentConditions.tempmax,
        tempmin = data.currentConditions.tempmin,
        icon = data.currentConditions.icon,
        description = data.currentConditions.description,
    );
    console.log("Temp: " + filtered.temp);
    return filtered;
}

getData("london");