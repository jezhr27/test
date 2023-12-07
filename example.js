const _ = require("robotjs");
const monitor = require('active-window');
const clipboardy = require('clipboardy');

const mapTime = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 1000, 1500, 2000];
const scrollMap = [-30, -20, -10, 10, 20, 30];

async function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, mapTime[Math.floor(Math.random() * mapTime.length)]);
    });
}

async function isElectron() {
    return new Promise((resolve, reject) => {
        try {
            monitor.getActiveWindow((window) => {
                resolve(window.app === 'Electron');
            })
        } catch (err) {
            resolve(false);
        }
    });
}

async function call() {
    if(await isElectron()) {
        const n = scrollMap[Math.floor(Math.random() * scrollMap.length)];

        for(let i = 0; (n > 1 ? i < n : i > n); (n > 1 ? i++ : i--)) _.scrollMouse(0, i);

        await delay();
        _.mouseClick('left');
        await delay();
        _.keyTap('left', ['command']);
        await delay();
        _.keyTap('right', ['command', 'shift']);
        await delay();
        // _.keyTap('command', ['shift']);
        _.keyToggle('x', 'down');
        // _.keyTap('x')
        // _.typeString('x');
        await delay();
        
        
        // // console.log(await clipboardy.read());

        // _.typeString('test');


    }
    await delay();
    call();
}

(async function() {
    try {
        await call();
    } catch(err) {
        console.log(err);
    }
})();