import { Observable } from 'rxjs';
import { createSubscriber } from "../helpers/createSubscriber";
import { lazyCaptureHtmlElements } from '../helpers/captureHTMLelements';
export const speechTemplate = require('./speech.html');


export class SpeechApi {
    button: HTMLButtonElement;

    button2: HTMLButtonElement;

    printResults: Function;

    constructor() {
        this.captureHTMLElements();
        this.setEvents();
    }

    setEvents() {
        const clickStartSpeechStream = this.speechEventFire().subscribe(
            createSubscriber('speech', this.printResults)
        );

        const endSubscriptionButton = this.endSubscriptionButtonStream();

        endSubscriptionButton.subscribe(
            () => {
                clickStartSpeechStream.unsubscribe();
                this.printResults('All subscriptions Ended');
            }
        )
    }

    captureHTMLElements() {
        const elements = lazyCaptureHtmlElements();
        this.button = elements.button;
        this.button2 = elements.button2;
        this.printResults = elements.printResults;
    }

    getSpeechRecognitionApi() {
        const nativeWindow: any = window;
        const windowSpeechRecognition = nativeWindow && (
            nativeWindow.SpeechRecognition || nativeWindow.webkitSpeechRecognition ||
            nativeWindow.mozSpeechRecognition || nativeWindow.msSpeechRecogntion);

        return new windowSpeechRecognition();
    }

    listen(): Observable<string[]> {
        return new Observable<string[]> (observer => {
            const speech = this.getSpeechRecognitionApi();

            speech.lang = 'pl'; //Languages: http://stackoverflow.com/questions/14257598/what-are-language-codes-for-voice-recognition-languages-in-chromes-implementati
            //speech.continuous = true;  https://speechlogger.appspot.com/developers/

            const resultHandler = (e: any) => {
                const result = this.getSpeechResults(e.results);
                observer.next(result);
                observer.complete();
            };

            const errorHandler = (err: any) => {
                observer.error(err);
            };

            speech.addEventListener('result', resultHandler);
            speech.addEventListener('error', errorHandler);
            speech.start();

            return () => {
                console.log('listen event completed');
                speech.removeEventListener('result', resultHandler);
                speech.removeEventListener('error', errorHandler);
                speech.abort();
            };
        });
    }

    speechEventFire() {
        return Observable.fromEvent(this.button, 'click')
            .mergeMap(this.listen.bind(this));
    }

    getSpeechResults(results: any): string[] {
        return <string[]>(
            Array.from(results)
                .reduce(
                    (final: string[], result: any) => {
                        return final.concat(Array.from(result, (x: any) => x.transcript));
                    }, []
                )
        );
    }

    endSubscriptionButtonStream() {
        this.button2.innerText = 'end subscriptions';

        return new Observable((observer) => {
            const handleClickEvent = () => {
                observer.next();
                observer.complete();
            };

            this.button2.addEventListener('click', handleClickEvent);

            return () => {
                console.log('ended');
                this.button2.removeEventListener('click', handleClickEvent);
            }
        })
    }
}
