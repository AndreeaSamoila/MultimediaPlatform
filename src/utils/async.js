import {URL} from "./CONSTANTS";

const asyncR = (url, body, cb) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", URL + url, true);
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
            cb(false, xhr.response);
        }
        if (this.readyState === XMLHttpRequest.DONE && this.status !== 200) {
            cb(true, xhr.response);
        }
    }
    xhr.send(JSON.stringify(body));
}

export default asyncR;