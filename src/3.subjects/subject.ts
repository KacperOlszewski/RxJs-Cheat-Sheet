import { Subject, ReplaySubject, BehaviorSubject, AsyncSubject} from 'rxjs';
import {createSubscriber} from "../helpers/createSubscriber";

export function ReplaySubjectDemo() {
    console.log('Replay subject buffer last values');
    const replaySubject$ = new ReplaySubject(3);

    replaySubject$.next(1);
    replaySubject$.next(2);

    replaySubject$.subscribe(
        createSubscriber('first sub')
    );

    replaySubject$.next(3);
    replaySubject$.next(4);
    replaySubject$.next(5);

    replaySubject$.subscribe(
        createSubscriber('second sub')
    );
}

export function BehaviorSubjectDemo() {
    console.log('Behavior subject takes initial value, or buffer last one if available');
    const BehaviorSubject$ = new BehaviorSubject({loggedIn: false});
    const userStatusStream = BehaviorSubject$.map(u => u.loggedIn);

    userStatusStream.subscribe(
        createSubscriber('behaviorSubject')
    );

    BehaviorSubject$.next({loggedIn: true});
    BehaviorSubject$.next({loggedIn: false});

    userStatusStream.subscribe(
        createSubscriber('behaviorSubjectSecond')
    );

    BehaviorSubject$.next({loggedIn: true});

    userStatusStream.subscribe(
        createSubscriber('behaviorSubjectThird')
    );
}

export function AsyncSubjectDemo() {
    console.log('Async subject emits last value - only if completed');
    const AsyncSubject$ = new AsyncSubject();
    const apiCall = AsyncSubject$;

    apiCall.subscribe(
        createSubscriber('AsyncSubject')
    );

    apiCall.next(true);
    apiCall.next(true);
    apiCall.next(true);
    apiCall.next(false);

    apiCall.complete();
}

export function demo() {
    ReplaySubjectDemo();
    BehaviorSubjectDemo();
    AsyncSubjectDemo();
}