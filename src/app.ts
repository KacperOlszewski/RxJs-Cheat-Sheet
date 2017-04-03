import 'core-js';
import 'zone.js/dist/zone';

import { Observable } from 'rxjs';

const button: HTMLElement = document.getElementById('btn1');
const stream = new Observable((observer) => {
    observer.next('waaat')
});

button.addEventListener('click', () => {
    stream
        .map(n => n +' puss')
        .subscribe(
            (n) => {
                console.log(n);
            }
        );
});

