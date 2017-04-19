import { Observable } from 'rxjs';
import { createSubscriber } from '../helpers/createSubscriber';
import { lazyCaptureHtmlElements } from "../helpers/captureHTMLelements";
export const printTemplate = require('./print-service.html');

export function demo() {
    const {button} = lazyCaptureHtmlElements();
    const printService = new PrintService();


    const buttonStream = Observable.fromEvent(button, 'click');

    buttonStream.subscribe(
        () => printService.print()
    );

    printService.printFinishedStream.subscribe(
        createSubscriber('print finished')
    );
}

export class PrintService {
    private window: Window;
    private mediaQueryList: MediaQueryList;

    constructor() {
        this.window = window;
    }

    print() {
        this.window.print();
    }

    get printFinishedStream() {
        return new Observable((observer) => {
            const afterPrint = () => {
                observer.next('print end');
            };

            const afterPrintListener = (mql: MediaQueryList) => {
                if (!mql.matches) afterPrint();
            };

            if (this.window.matchMedia) {
                this.mediaQueryList = this.window.matchMedia('print');
                this.mediaQueryList.addListener(afterPrintListener);
            }

            this.window.onafterprint = afterPrint;

            return () => {
                this.window.onafterprint = null;
                this.mediaQueryList.removeListener(afterPrintListener);
            }
        });
    }
}