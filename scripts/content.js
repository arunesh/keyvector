// Space station tracking URL: https://www.n2yo.com/?s=25544&live=1


const satlat = document.querySelector("#satlat");
const satlng = document.querySelector("#satlng");

console.log("From content script");

function sendData(lat, lng) {
    $.post("http://localhost:9090/issloc",
        {lat:lat, lng: lng}, function (response) {
            if (response) console.log(response);
        });
}

const readingTimer = setInterval(()=> {
    console.log(satlat.innerHTML + " , " + satlng.innerHTML);
    sendData(satlat.innerHTML, satlng.innerHTML);
}, 1000);
