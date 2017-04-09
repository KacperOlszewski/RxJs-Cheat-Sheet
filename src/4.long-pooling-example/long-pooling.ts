import { Observable } from 'rxjs';
import {createSubscriber} from "../helpers/createSubscriber";

class BackendResponse {
    constructor(
        public data: string,
        public completed: boolean
    ) {}
}

export function LongPoolingDemo() {
    let backendQueue = 0;
    const successResponseAfter = 4;
    const intervalTime = 500;

    const someHttpMock = () => {
        backendQueue++;

        return Observable.of(
            new BackendResponse(
                `returns data after ${backendQueue} hits`,
                backendQueue >= successResponseAfter
            )
        )
    };
    const longPooling$ = Observable.interval(intervalTime)
        .flatMap(someHttpMock)
        .skipWhile((n: BackendResponse) => !n.completed)
        .first();

    longPooling$
        .map((resp: BackendResponse) => resp.data)
        .subscribe(
            createSubscriber('longPooling')
        );
}
