import {lazyCaptureHtmlElements} from '../helpers/captureHTMLelements';
export const snapShotTemplate = require('./camera-span.html');

function getNativeNavigator(): Navigator {
    return navigator
}

export class SnapshotCamera {
    snapId = 0;

    nativeNavigator: Navigator = getNativeNavigator();

    video: HTMLVideoElement;

    canvas: HTMLCanvasElement;

    buttonStart: HTMLButtonElement;

    buttonEnd: HTMLButtonElement;

    container: HTMLElement;

    stream: MediaStream;

    initWidth = 400;

    initHeight = 500;

    constructor() {
        this.captureHTMLElements();
        this.setEventListeners();
    }

    captureHTMLElements() {
        const elements = lazyCaptureHtmlElements();

        this.video = elements.video;
        this.canvas = elements.canvas;
        this.buttonStart = elements.button;
        this.buttonEnd = elements.button2;
        this.container = elements.container;

        console.log(elements);
    }

    startSnapshot() {
        const { canvas, video, initWidth, initHeight } = this;

        this.setElementDisplay(canvas, false);
        this.setElementDisplay(video, true);

        this.nativeNavigator
            .getUserMedia({
                audio: false,
                video: {
                    width: initWidth,
                    height: initHeight
                }
            },
            (stream: MediaStream) => {
                this.stream = stream;
                video.src = URL.createObjectURL(stream);
                video.onloadedmetadata = (e) => {
                    video.play();
                };
            },
            (err: MediaStreamError) => {
                console.error(err);
            });
    }

    setEventListeners() {
        this.buttonStart.innerText = 'Turn Camera ON';
        this.buttonEnd.innerText = 'Turn Camera OFF';
        this.video.style.cursor = 'pointer';

        this.setElementDisplay(this.video, false);
        this.setElementDisplay(this.canvas, false);

        this.buttonStart.addEventListener('click', this.startSnapshot.bind(this));
        this.buttonEnd.addEventListener('click', this.stopSnapshot.bind(this));
        this.video.addEventListener('click', this.takeSnapshot.bind(this));
    }

    stopSnapshot() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        this.setElementDisplay(this.video, false);
    }

    setElementDisplay(elem: HTMLElement, isBlock: boolean) {
        isBlock ?
            elem.style.display = 'block':
            elem.style.display = 'none';
    }

    takeSnapshot() {
        const { canvas, video } = this;
        this.snapId++;
        this.setElementDisplay(canvas, true);
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.onclick = () => this.startSnapshot();

        this.setElementDisplay(video, false);

        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const blob = canvas.toDataURL();

        this.generateDownloadLink(blob.replace("image/png", "image/octet-stream"));
    }

    generateDownloadLink(img: string) {
        const name = this.snapId + '-image.png';
        const element: HTMLAnchorElement = <HTMLAnchorElement>document.createElement('a');
        element.href = img;
        element.style.display = 'block';
        element.setAttribute('download', name);
        element.innerText = 'Download: '+ name;

        this.container.appendChild(element);
    }
}
