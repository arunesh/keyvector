// Space station tracking URL: https://www.n2yo.com/?s=25544&live=1


const satlat = document.querySelector("satlat");
const satlng = document.querySelector("satlng");

const readingTimer = setInterval((){
    console.log(satlat.innerHTML + " , " + satlng.innerHTML);
}, 1000);