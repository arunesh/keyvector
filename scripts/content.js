// Space station tracking URL: https://www.n2yo.com/?s=25544&live=1


const satlat = document.querySelector("#satlat");
const satlng = document.querySelector("#satlng");

console.log("From content script");

var dataBuffer = [];
var jqxhrPromise = undefined;
var inBufferMode = false;

// Keeps buffering until the previous POST finishes (success or fail).
function sendData(lat, lng) {

    dataBuffer.push([lat, lng, Date.now()]);

    if (!inBufferMode) {
        var dataCopy = dataBuffer;
        dataBuffer = [];
        console.log("Sending to server: " + dataCopy.length);
        jqxhrPromise = $.post("http://localhost:9090/issloc",
            {data:JSON.stringify(dataCopy)}, function (response) {
                if (response) console.log(response);
            });

        jqxhrPromise.always(() => {
            // Turn off buffering.
            inBufferMode = false;
            console.log("Buffering turned off at len = " + dataBuffer.length);
        });
    } else {
        console.log("In buffering mode for lat/lng =" + lat + ", " + lng);
    }

}

const readingTimer = setInterval(() => {
    console.log(satlat.innerHTML + " , " + satlng.innerHTML);
    sendData(satlat.innerHTML, satlng.innerHTML);
}, 1000);
