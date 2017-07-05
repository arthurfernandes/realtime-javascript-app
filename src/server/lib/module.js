import {Observable} from "rxjs";

//Every method can initiate asynchronously

/* eslint no-unused-vars: "off"*/

export class ModuleBase {
    init$() {
        return Observable.empty();
    }

    registerClient(client) {

    }

    clientRegistered(client) {

    }
}
