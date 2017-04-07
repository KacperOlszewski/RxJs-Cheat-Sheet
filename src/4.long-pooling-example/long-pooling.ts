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
    const intervalTime = 500;

    const someHttpMock = () => {
        backendQueue++;

        return Observable.of(
            new BackendResponse(
                'someData: '+backendQueue,
                backendQueue > 3
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
