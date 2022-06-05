import {setupWorker} from "msw";
import * as handlers  from "./handlers"

let handlersArr = [];

for (let handler in handlers){
    handlersArr.push(handlers[handler])
}

export const  worker = setupWorker(...handlersArr);
