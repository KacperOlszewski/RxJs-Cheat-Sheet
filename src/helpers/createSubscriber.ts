export function createSubscriber(feed: string) {
    return {
        next: (item: any) => {console.log(`${feed}.next = ${item}`)},
        error: (err: any) => {console.log(`${feed}.error = ${err.stack || err}`)},
        complete: () => {console.log('completed! - ' + feed)}
    }
}