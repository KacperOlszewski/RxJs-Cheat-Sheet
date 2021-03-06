export function lazyCaptureHtmlElements() {
    const button: HTMLButtonElement = <HTMLButtonElement>document.getElementById('btn1');
    const button2: HTMLButtonElement = <HTMLButtonElement>document.getElementById('btn2');
    const results: HTMLElement = document.getElementById('results');
    const input: HTMLInputElement = <HTMLInputElement>document.getElementById('input');
    const container: HTMLElement = document.getElementById('container');

    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
    const video: HTMLVideoElement = <HTMLVideoElement>document.getElementById('video');

    const printResults = (res: any) => {
        results.innerText = res;
    };

    return {button, button2, input, results, canvas, video, container, printResults}
}