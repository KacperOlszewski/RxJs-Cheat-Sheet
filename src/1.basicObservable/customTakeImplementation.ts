import {Observable} from "rxjs";
import { createInterval } from "./basicObservable";
import { createSubscriber } from "../helpers/createSubscriber";

export function take(sourceObservable: Observable<any>, amount: number) {

    return new Observable((observer) => {
        let count = 0;

        const subscription = sourceObservable.subscribe({
            next(item: any) {
                observer.next(item);
                count++;

                if (count >= amount) {
                    observer.complete();
                }
            },
            error(err) {
                observer.error(err);
            },
            complete() {
                observer.complete();
            }
        });

        return () => subscription.unsubscribe()
    });
}

export function takeDemo() {
    const takeFive = take(createInterval(800), 5);

    takeFive.subscribe(
        createSubscriber('customTakeFive')
    )
}