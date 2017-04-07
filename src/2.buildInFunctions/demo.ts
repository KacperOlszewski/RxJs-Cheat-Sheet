import {ObservableBuildInFeatures} from "./buildInFeatures";
import {createSubscriber} from "../helpers/createSubscriber";

export function demo() {
    const ObservableBuildIn = new ObservableBuildInFeatures();

    ObservableBuildIn.interval(500)
        .take(5)
        .subscribe(createSubscriber('buildInInterval'));

    ObservableBuildIn.timer(5000)
        .subscribe(createSubscriber('timer'));

    ObservableBuildIn.range()
        .subscribe(createSubscriber('range'));

    ObservableBuildIn.from([10, 20, 'klops'])
        .subscribe(createSubscriber('from'));

    ObservableBuildIn.from(generator())
        .subscribe(createSubscriber('from - generator'));
}

function* generator() {
    yield 12;
    yield 'generator';
    yield 23;
}