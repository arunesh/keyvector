var express = require('express');
var app = express();

var fs = require('fs');


const PORT = 9090;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.post('/issloc', (req, resp) => {
    console.log("Received values:" + JSON.stringify(req.body));
    if (req.body.lat && req.body.lng) {
        var lat = req.body.lat;
        var lng = req.body.lng;

        var now = Date.now();
        const csv = `${lat}, ${lng}, ${now}\n`;
        fs.appendFileSync("iss-location.csv", csv);
        resp.send({ Success: `Received lat = ${lat}, lng = ${lng}`, redirect: true});
    } else {
        resp.send({ Success: "Failed.", redirect: false});
    }
});

const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
