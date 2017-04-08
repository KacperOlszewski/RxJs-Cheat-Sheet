export function createSubscriber(feed: string, callback?: Function) {
    return {
        next: (item: any) => {
            if (callback) callback(item);
            console.log(`${feed}.next = ${item}`)
        },
        error: (err: any) => {console.log(`${feed}.error = ${err.stack || err}`)},
        complete: () => {console.log('completed! - ' + feed)}
    }
}