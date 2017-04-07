import {Observable} from "rxjs";
import {createSubscriber} from "../helpers/createSubscriber";

const outer = (operatorType: string) => {
    console.log(operatorType + ' - start');
    return Observable
        .interval(1100)
        .take(2);
};
const inside = (x: number) => {
    return Observable
        .interval(500)
        .take(4)
        .map(y => `outer: ${x}, inside: ${y}`)
};

function switchMap() {
    outer('switchMap')
        .switchMap(inside)
        .subscribe(createSubscriber('switchMap'));
}

function mergeMap() {
    outer('mergeMap (aka flatMap)')
        .mergeMap(inside)
        .subscribe(createSubscriber('mergeMap'));
}

export function demo() {
    switchMap();

    setTimeout(() => {
        mergeMap();
    }, 7000)
}