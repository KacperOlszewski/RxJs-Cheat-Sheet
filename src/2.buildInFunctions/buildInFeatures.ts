import {Observable} from "rxjs";

export class ObservableBuildInFeatures {
    observable = Observable;

    interval(time: number) {
        return this.observable.interval(time)
    }

    timer(time: number) {
        return this.observable.timer(time)
    }

    of(...args: any[]) { // takes arguments
        return this.observable.of(...args)
    }

    from(arrayLike: any) { //ArrayLike
        return this.observable.from(arrayLike)
    }

    empty() { // no value - but completes
        return this.observable.empty()
    }

    throw(err: any) {
        return this.observable.throw(err)
    }

    range() {
        return this.observable.range(10, 20)
    }
}