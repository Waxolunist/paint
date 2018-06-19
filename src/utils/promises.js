export function waitTillTrue(fn, ...args) {
    return new Promise((resolve, reject) => {
        var intervalId = setInterval(() => {
            let retVal = fn.apply(this, args)
            if(retVal) {
                clearInterval(intervalId);
                resolve(retVal);
            }
        }, 50);
    });
}