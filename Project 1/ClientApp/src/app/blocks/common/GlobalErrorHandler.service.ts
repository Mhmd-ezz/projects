import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
    
    constructor() { }

    handleError(error: any): void {
        // do something with the exception

        // @ add tenant id / date 
        // @ send to server 

        console.error('Global Error Handler : ',  error);
    }
}
