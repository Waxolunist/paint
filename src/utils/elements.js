import { waitTillTrue } from './promises.js';

export function waitForId(root, id) {
    return waitTillTrue(
        (r, i) => r.getElementById(i), 
        root, id);
};