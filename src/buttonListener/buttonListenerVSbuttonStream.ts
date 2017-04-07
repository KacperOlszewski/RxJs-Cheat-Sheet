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

    const stream = new Observable((observer) => {
        observer.next('waaat')
    });

    button.addEventListener('click', () => {
        stream
            .map(n => n + ' puss')
            .subscribe(
                (n) => {
                    console.log(n);
                }
            );
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
            const result = element + 'async';

            resolve(result)
        }, 1000)
    })
};