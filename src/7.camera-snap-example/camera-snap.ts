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

    width = 400;

    height = 500;

    startSnapshot() {
        const { canvas, video, width, height } = this;
        canvas.width = canvas.height = 0;

        canvas.hidden = true;
        video.hidden = false;

        this.nativeNavigator
            .getUserMedia({
                audio: false,
                video: {
                    width: width,
                    height: height
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
        input.hidden = true;

        this.buttonStart.addEventListener('click', this.startSnapshot.bind(this));
        this.buttonEnd.addEventListener('click', this.stopSnapshot.bind(this));
        this.video.addEventListener('click', this.takeSnapshot.bind(this));
    }

    stopSnapshot() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        this.video.src = null;
    }

    takeSnapshot() {
        const { canvas, video } = this;
        this.snapId++;

        canvas.hidden = false;
        video.hidden = true;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        canvas.onclick = () => this.startSnapshot();

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
