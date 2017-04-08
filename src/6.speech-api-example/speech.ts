import { Observable } from 'rxjs';
import { createSubscriber } from "../helpers/createSubscriber";
import { button, button2, printResults } from '../helpers/captureHTMLelements';

function  getSpeechRecognitionApi() {
    const nativeWindow: any = window;
    const windowSpeechRecognition = nativeWindow && (
            nativeWindow.SpeechRecognition || nativeWindow.webkitSpeechRecognition ||
            nativeWindow.mozSpeechRecognition || nativeWindow.msSpeechRecogntion);

    return new windowSpeechRecognition();
}

function listen(): Observable<string[]> {
    return new Observable<string[]> (observer => {
        const speech = getSpeechRecognitionApi();

        speech.lang = 'pl'; //Languages: http://stackoverflow.com/questions/14257598/what-are-language-codes-for-voice-recognition-languages-in-chromes-implementati
        //speech.continuous = true;  https://speechlogger.appspot.com/developers/

        const resultHandler = (e: any) => {
            const result = getSpeechResults(e.results);
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

function speechEventFire() {
    return Observable.fromEvent(button, 'click')
        .mergeMap(listen);
}

function getSpeechResults(results: any): string[] {
    return <string[]>(
        Array.from(results)
            .reduce(
                (final: string[], result: any) => {
                    return final.concat(Array.from(result, (x: any) => x.transcript));
                }, []
            )
    );
}

export function demo() {
    const clickStartSpeechStream = speechEventFire().subscribe(
        createSubscriber('speech', printResults)
    );

    const endSubscriptionButton = endSubscriptionButtonStream();

    endSubscriptionButton.subscribe(
        () => {
            clickStartSpeechStream.unsubscribe();
            printResults('All subscriptions Ended');
        }
    )
}

function endSubscriptionButtonStream() {
    button2.innerText = 'end subscriptions';

    return new Observable((observer) => {
        const handleClickEvent = () => {
            observer.next();
            observer.complete();
        };

        button2.addEventListener('click', handleClickEvent);

        return () => {
            console.log('ended');
            button2.removeEventListener('click', handleClickEvent);
        }
    })
}