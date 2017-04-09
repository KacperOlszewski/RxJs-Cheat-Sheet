import { Observable } from 'rxjs';
import { createSubscriber } from '../helpers/createSubscriber';
import { lazyCaptureHtmlElements } from "../helpers/captureHTMLelements";
export const fromEventTemplate = require('./from-event-observable-example.html');

export function demo() {
    const {button, input, button2} = lazyCaptureHtmlElements();

    const somePromise = (element: string) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (element !== 'error') {
                    resolve(element+ ' - switched to Promise')
                } else {
                    reject(new Error(element))
                }
            }, 400)
        })
    };

    const FromEventdemo = () => {
        const buttonStream = Observable.fromEvent(button, 'click');
        const inputStream = Observable.fromEvent(input, 'keyup')
            .map((e: any) => e.target.value)
            .distinctUntilChanged()
            .debounceTime(700)
            .switchMap(somePromise);

        buttonStream.subscribe(
            createSubscriber('button')
        );

        inputStream.subscribe((e: any) => {
            console.log('input:', e);
        });
    }

    const WrapApiInObservable = () => {
        button2.innerText = 'event listener wrapped in Observable';

        return new Observable((observer) => {
            const handleClickEvent = (e: MouseEvent) => {
                observer.next(['Event wrapped in observable', e.clientX]);
            };

            button2.addEventListener('click', handleClickEvent);

            return () => {
                observer.complete();
                button2.removeEventListener('click', handleClickEvent);
            }
        });
    }

    const addUnsubscrubeButton = (type: string, observable: any) => {
        const container =  document.getElementById('container');
        const element = document.createElement('input');

        element.type = type;
        element.value = 'unsubscribe wrapped Observable';
        element.name = type;
        element.onclick = () => {
            observable.unsubscribe();
        };
        container.appendChild(element);
    }

    FromEventdemo();

    const wrappedEvent = WrapApiInObservable().subscribe(
        createSubscriber('Event wrapped in observable')
    );

    addUnsubscrubeButton('button', wrappedEvent)
}

