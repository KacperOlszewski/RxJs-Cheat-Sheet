const button: HTMLElement = document.getElementById('btn1');
const button2: HTMLElement = document.getElementById('btn2');
const results: HTMLElement = document.getElementById('results');
const input: HTMLElement = document.getElementById('input');

export {button, button2, input, results};

export function printResults(res: any) {
    results.innerText = res;
}