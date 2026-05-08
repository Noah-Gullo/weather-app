import "./styles.css";
import {format} from "date-fns"

async function getData(location){
    try{
        const oneWeekInSeconds = 31536000;
        const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" 
        + location + "/" 
        + format(Date.now(), "yyyy-M-d") + "/"
        + format(Date.now() + oneWeekInSeconds, "yyyy-M-d")
        + "?key=HX6ZYM4HCT33AWBA8V2HENJ28"; 
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    }catch(error){
        console.log(error);
    }
}

getData("london");