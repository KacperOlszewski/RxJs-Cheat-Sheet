import {Observable} from "rxjs";

interface Route {
    path: string;
    template: string;
    controller?: Function;
}

export class Router {
    private routes: any = {};
    private routerOutletId: string;
    private routerOutlet: HTMLElement;
    private oldUrl: string;

    constructor(outletId: string, routes: Route[]) {
        this.routerOutletId = outletId;
        this.registerRoutes(routes);
        this.initialize();
    }

    private initialize() {
        const router = this.routeListener();

        router
            .do(() => this.setOutlet())
            .do(event => this.setLastUrl(event))
            .subscribe(event => this.reRoute())
    }

    private registerRoutes(routes: Route[]) {
        routes.forEach(({path, template, controller}) => {
            this.routes[path] = {
                template: template,
                controller: controller
            };
        });
    }

    private setLastUrl(e: HashChangeEvent) {
        this.oldUrl = e.oldURL || null;

        console.log(this.oldUrl);
    }

    private reRoute() {
        const url = location.hash.slice(1) || '/';
        const currentRoute = this.routes[url] || this.routes[0];

        this.routerOutlet.innerHTML = currentRoute.template;
        if (typeof currentRoute.controller === 'function') {
            new currentRoute.controller();
        }
    }

    private setOutlet() {
        if (!this.routerOutlet) {
            this.routerOutlet = document.getElementById(this.routerOutletId);
        }
    }

    private routeListener(): Observable<HashChangeEvent> {
        return new Observable((observer) => {
            const handleHash = (e: HashChangeEvent) => {
                observer.next(e);
            };
            window.addEventListener('hashchange', handleHash);
            window.addEventListener('load', handleHash);

            return () => {
                observer.complete();
                window.removeEventListener('hashchange', handleHash);
                window.removeEventListener('load', handleHash);
            }
        });
    }
}