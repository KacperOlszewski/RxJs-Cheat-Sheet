import { demo as FromEventDemo } from "./from-event-observable-example/from-event-observable-example";
import { showDemo as generatorIteratorDemo } from "./generators&iterators/demo";
import { intervalDemo } from './1.basicObservable/basicObservable';
import { takeDemo } from './1.basicObservable/customTakeImplementation';
import { demo as buildInFeatures } from './2.buildInFunctions/demo';
import { LongPoolingDemo } from './4.long-pooling-example/long-pooling';
import { demo as switchMapVSFlatMap } from './5.merge-map-vs-switch-map/merge-map-vs-switch-map';
import { demo as SubjectDemo } from './3.subjects/subject';
import { demo as SpeechApiDemo } from './6.speech-api-example/speech';
import { SnapshotCamera } from './7.camera-snap-example/camera-snap';

//FromEventDemo();
//generatorIteratorDemo();
//intervalDemo();
//takeDemo();
//buildInFeatures();
//LongPoolingDemo();
//switchMapVSFlatMap();
//SubjectDemo();
//SpeechApiDemo();



new SnapshotCamera().setEventListeners();