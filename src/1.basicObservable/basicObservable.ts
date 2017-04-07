import { Observable } from "rxjs/Observable";
import { createSubscriber } from "../helpers/createSubscriber";

export function createInterval(time: number) {
    return new Observable((observer) => {
        let index = 0;
        let interval = setInterval(() => {
            observer.next(index++)
        }, time);

        return () => {
            clearInterval(interval);
        }
    })
}

export function intervalDemo() {
    const everySec = createInterval(100);
    const subscription = everySec.subscribe(
        createSubscriber('intervalDemo')
    );

    setTimeout(() => {
        subscription.unsubscribe()
    }, 500)
}
