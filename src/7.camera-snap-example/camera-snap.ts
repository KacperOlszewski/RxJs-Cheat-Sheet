import {canvas, video, button2, button, input, container} from '../helpers/captureHTMLelements';

function getNativeNavigator(): Navigator {
    return navigator
}


export class SnapshotCamera {

    snapId = 0;

    nativeNavigator: Navigator = getNativeNavigator();

    video: HTMLVideoElement = video;

    canvas: HTMLCanvasElement = canvas;

    buttonStart: HTMLButtonElement = button;

    buttonEnd: HTMLButtonElement = button2;

    stream: MediaStream;

    initWidth = 400;

    initHeight = 500;

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
        this.setElementDisplay(input, false);
        this.setElementDisplay(video, false);
        this.setElementDisplay(canvas, false);

        this.buttonStart.addEventListener('click', this.startSnapshot.bind(this));
        this.buttonEnd.addEventListener('click', this.stopSnapshot.bind(this));
        this.video.addEventListener('click', this.takeSnapshot.bind(this));
    }

    stopSnapshot() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        this.setElementDisplay(video, false);
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

        container.appendChild(element);
    }
}
