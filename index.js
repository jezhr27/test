const _ = require("robotjs");
const activeWindow = require('active-win');

let oldMousePos;
let mouseTimer;
let oldMousePostData;

const mapTime = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 1000, 1500, 2000];
const keys = ['left', 'right', 'up', 'down', 'pageup', 'pagedown', async () => {
    const k = ['up', 'down'];
    _.keyTap('tab', 'control');
    for (let i = 0; i <= (Math.floor(Math.random() * 5)); i++) {
        const tk = k[Math.floor(Math.random() * k.length)];
        _.keyTap(tk);
    }
    _.keyTap('enter');
}]

async function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, mapTime[Math.floor(Math.random() * mapTime.length)]);
    });
}

function isMouseNotChanged() {
    const newPos = JSON.stringify(_.getMousePos());
    const mp = oldMousePos === newPos;
    if(!mp && oldMousePostData !== newPos) {
        if(mouseTimer) clearTimeout(mouseTimer);
        mouseTimer = setTimeout(() => {
            oldMousePos = newPos;
        }, 120000);
    }
    oldMousePostData = newPos;
    return mp;
}

async function isVisualStudioCode() {
    return new Promise((resolve, reject) => {
        if(isMouseNotChanged()) {
            activeWindow().then(result => {
                const re = !!result && (result.owner.name === 'Visual Studio Code' || result.owner.name === 'Code');
                
                if(!re && result) {
                    switch(result.owner.name) {
                        case 'Android File Transfer':
                            _.keyTap('enter');
                            break;
                        case 'Docker Desktop':
                            
                            break;
                        default:
                            _.keyTap('escape');
                            console.log(result);
                    }
                }
               
                resolve(re);
            }).catch(() => {
                resolve(false);
            });
        } else {
            resolve(false);
        }
    });
}

async function call() {
    try {
        if (await isVisualStudioCode()) {
            const tk = keys[Math.floor(Math.random() * keys.length)];
            if (typeof tk === 'function') {
                await tk();
            } else {
                _.keyTap(tk);
            }
        }
    } catch(err) {
    } finally {
        await delay();
        await call();
    }
}

(async function () {
    try {
        oldMousePos = JSON.stringify(_.getMousePos());
        await call();
    } catch(err) {
        console.log(err);
    }
})();