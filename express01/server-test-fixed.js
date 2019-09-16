// run first express01/testdb.js if there is some error

const rp = require('request-promise');

const app = require('./server-fixed');
const { connectDb } = require('./models');

const port = 3000;

setImmediate(() => {
    connectDb().then(() => {
        app.listen(port);
    });
});

setTimeout(() => {
    //SEND 2 REQUESTS, AND ONE DIFFERENT
    let plist = [];
    for (let i = 1; i <= 2; i++) {
        let p = rp('http://localhost:3000/item/4');
        p.then((res) => {
            // console.log(res);
            if (res.indexOf('{"_id"') === -1 || res.indexOf('"iid":4') === -1)
                console.log('error');
        });
        plist.push(p);
    }

    let ptime = new Promise(function (resolve, reject) {
        setTimeout(() => {
            let pdiff = rp('http://localhost:3000/item/9?pretty=true');
            pdiff.then((res) => {
                // console.log(res);
                if (res.indexOf('{"_id"') !== -1 || res.indexOf('"iid": 9') === -1)
                    console.log('error diff');
                resolve();
            });
        }, 400);
    });
    plist.push(ptime);

    Promise.all(plist).then(() => process.exit());
}, 500);

