const express = require('express');
const QRCode = require('qrcode')
const app = express();
const os = require('os');
const fs = require('fs')

app.use(express.static('public'))
app.use('/public', express.static('public'))
app.listen(9090)

fs.readdir('./public', (err, files) => {
    files.forEach(function (item, index, array) {
        QRCode.toString(TotalIp + item, { type: 'terminal', errorCorrectionLevel: ' L ', version: 3 }, function (err, url) {
            console.log(url)
        })
    });

})

function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.address.toString().indexOf('192.168') == 0) {
                return alias.address;
            }
        }
    }
}
const Ip = getIPAdress();
const TotalIp = "http://" + Ip + ":9090/static/"