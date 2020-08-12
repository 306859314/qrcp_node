const express = require('express');
const QRCode = require('qrcode')
const app = express();
const os = require('os');
const fs = require('fs');
// const child_process=require('child_process')
const open = require('open');

app.use(express.static('public'))
app.use('/public', express.static('public'))
app.listen(9090)

var opts={
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    quality: 0.3,
    margin: 1,
    color: {
        dark:"#FFFFFF",
        light:"#000000"
    }
}
var targetPath='./target/'
fs.readdir('./public', (err, files) => {
    files.forEach(function (item, index, array) {
        QRCode.toFile(targetPath+item.replace(/\.[^\.]+$/,'.png'),TotalIp + item, opts,(err)=>{
            var path=targetPath+item.replace(/\.[^\.]+$/,'.png');
            open(path)
        })
    });
})

function getIPAdress() {
    var interfaces = os.networkInterfaces();
    // console.log(interfaces);
    for (var devName in interfaces) {
        // console.log(devName);
        if(devName!='WLAN')continue
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
const TotalIp = "http://" + Ip + ":9090/public/"
// console.log(Ip);