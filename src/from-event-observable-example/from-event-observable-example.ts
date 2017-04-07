import { Observable } from 'rxjs';
import { createSubscriber } from '../helpers/createSubscriber';

export function demo() {
    const button: HTMLElement = document.getElementById('btn1');
    const input: HTMLElement = document.getElementById('input');
    const buttonStream = Observable.fromEvent(button, 'click');
    const inputStream = Observable.fromEvent(input, 'keyup')
        .map((e: any) => e.target.value)
        .distinctUntilChanged()
        .debounceTime(700)
        .switchMap(somePromise);

    button.addEventListener('click', () => {
        console.log('classic event listener');
    });

    buttonStream.subscribe(
        createSubscriber('button')
    );

    inputStream.subscribe((e: any) => {
        console.log('input:', e);
    })
}

const somePromise = (element: string) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (element !== 'error') {
                resolve(element+ 'from Promise')
            } else {
                reject(new Error(element))
            }
        }, 1000)
    })
};