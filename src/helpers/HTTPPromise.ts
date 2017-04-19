import {Observable} from "rxjs";
export function getCountriesPromise(query: string = 'af') {
    const endpoint = `https://restcountries.eu/rest/v2/name/${query}`;

    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', endpoint);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(xhr.response);
            }/* else {
                reject(xhr.response);
            }*/
        };
        xhr.send();
    })
}

export function getCountriesObservable(query: string = 'af') {
    const endpoint = `https://restcountries.eu/rest/v2/name/${query}`;

    return new Observable((observer) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', endpoint);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                observer.next(xhr.response);
                observer.complete();
            }
        };
        xhr.send();
    })
}