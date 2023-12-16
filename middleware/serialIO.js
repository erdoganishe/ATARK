const {SerialPort} = require('serialport');
const Lock = require('../model/Lock');
const { format } = require('date-fns');
const { v4: uuid} = require('uuid');

function serialIO(){
    var port;
        port = new SerialPort({path:'COM4', baudRate: 9600 }, (err) => {
            if(err)console.log(err);
            else startCon(port);
        });
}

function startCon(port){
    if(!port) return;
    let iskfst = false;
    let kid = "";

    port.on('data', async function(data){
        const datas = data.toString();
        // get bool data: is Able to change lock keys data
        if(datas.includes("gb")){
            let id = datas.split(":")[1].split("\n")[0].split("\r")[0];            
            const lock = await Lock.findById(id).exec();
            console.log(lock.isAbleToChange.toString());
            port.write(lock.isAbleToChange.toString(), (err) => {
                if (err) {
                  return console.log('Error on write: ', err.message);
                }
                console.log(lock.isAbleToChange.toString());
              });
        } 
        // get set key command: add/remove keys
        if(datas.includes("sk")){
            let key = datas.split("\r")[0].split("sk:")[1].split("\n")[0];
            if(iskfst){
                console.log("KeyTRUE: '" + key+ "'"
                );
                const lock = await Lock.findById(key).exec();
                if(lock.keys.indexOf(kid) == -1){
                    lock.keys.push(kid);
                    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
                    const logItem = `${dateTime}\t${key}\tadd\t${kid}`;
                    console.log(logItem);
                    lock.log.push(logItem);
                } else {
                    // delete all elements from keys arr, that eq to kid
                    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
                    const logItem = `${dateTime}\t${key}\trm\t${kid}`;
                    console.log(logItem);
                    lock.keys.pull(kid);
                    lock.log.push(logItem);
                }
                const resut = await lock.save();
                console.log(resut);
            } else {
                console.log("KeyFALSE: '" + key+ "'"
                );
                kid = key;
            }
            iskfst = !iskfst;

        }
        // write data in console
        if(datas.includes("dr")){
            if(datas.includes("dr:b")){
                let rd ="";
                rd+=datas.split("\r")[0].split("dr:b")[1];
                const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
                const logItem = `${dateTime}\t${rd}\ttry-open`;

                const lock = await Lock.findById(rd).exec();
                lock.log.push(logItem);
                const resut = await lock.save();
                console.log(resut);
            }
            //console.log("RD: '" + datas + "'");
        }
        // send all available keys to arduino
        if(datas.includes("gk")){

            let id = datas.split(":")[1].split("\n")[0].split("\r")[0];
            let sStr = "bk";
             const lock = await Lock.findById(id).exec();
            lock.keys.forEach((key)=>{
                sStr+=":" + key;
            });
            port.write(sStr, (err) => {
                if (err) {
                    return console.log('Error on write: ', err.message);
                }
            });
        }
    });
}

module.exports = serialIO;