import { createTitle } from "./helpers/createH2Title";
import { intervalDemo } from './1.basicObservable/basicObservable';
import { takeDemo } from './1.basicObservable/customTakeImplementation';
import { demo as buildInFeatures } from './2.buildInFunctions/demo';
import { demo as SubjectDemo } from './3.subjects/subject';
import { LongPoolingDemo } from './4.long-pooling-example/long-pooling';
import { demo as switchMapVSFlatMap } from './5.merge-map-vs-switch-map/merge-map-vs-switch-map';
import { showDemo as generatorIteratorDemo } from "./generators&iterators/demo";
import { demo as FromEventDemo, fromEventTemplate } from "./from-event-observable-example/from-event-observable-example";
import { SpeechApi, speechTemplate } from './6.speech-api-example/speech';
import { SnapshotCamera, snapShotTemplate } from './7.camera-snap-example/camera-snap';
import { Router, Route } from './8.router/router';



const routes: Route[] = [
    {path: '/', template: createTitle('Basic Observable Interval'), controller: intervalDemo},
    {path: '/page1', template: createTitle('Custom take(5) demo'), controller: takeDemo},
    {path: '/page2', template: createTitle('Rx Build in primitives'), controller: buildInFeatures},
    {path: '/page3', template: createTitle('Subjects'), controller: SubjectDemo},
    {path: '/page4', template: createTitle('Long Pooling Demo'), controller: LongPoolingDemo},
    {path: '/page5', template: createTitle('mergeMap vs SwitchMap'), controller: switchMapVSFlatMap},

    {path: '/page8', template: createTitle(fromEventTemplate), controller: FromEventDemo},
    {path: '/page9', template: createTitle('Generators & Iterators Demo'), controller: generatorIteratorDemo},
    {path: '/page10', template: speechTemplate, controller: SpeechApi},
    {path: '/page11', template: snapShotTemplate, controller: SnapshotCamera}
];

new Router('router-outlet', routes);