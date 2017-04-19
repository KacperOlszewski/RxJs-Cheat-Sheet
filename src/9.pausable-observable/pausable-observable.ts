import { Observable } from 'rxjs';
import { createSubscriber } from "../helpers/createSubscriber";
import { lazyCaptureHtmlElements } from '../helpers/captureHTMLelements';
export const pausableTemplate = require('./pausable-observable.html');

export class PausableObservable {
    toggleButton: HTMLButtonElement;
    paused: boolean = true;

    constructor() {
        this.captureHTMLElements();

        this.pausableObservable.subscribe(
            createSubscriber('pausable observable stream')
        )
    }

    captureHTMLElements() {
        const elements = lazyCaptureHtmlElements();
        this.toggleButton = elements.button;
        this.toggleButton.innerText = this.setButtonText();
    }

    get intervalObservable() {
        return Observable.interval(600);
    }

    get stopObservableStream() {
        return Observable.never();
    }

    get toggleObservable() {
        return Observable.fromEvent(this.toggleButton, 'click')
            .map(() => this.paused = !this.paused)
            .do(() => this.toggleButton.innerText = this.setButtonText())
    }

    get pausableObservable() {
        return this.toggleObservable
            .switchMap(
                (pause: boolean) => {
                    console.log(!pause ? 'started' : 'stopped');
                    return pause ? this.stopObservableStream : this.intervalObservable
                }
            )
    }

    setButtonText() {
        return this.paused ? 'start' : 'stop';
    }
}
