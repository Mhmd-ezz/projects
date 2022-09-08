import { ApolloLink, Observable } from 'apollo-link';
import { SyncOfflineMutation } from './SyncOfflineMutation';
import { Injectable, Optional } from '@angular/core';

@Injectable()
export class QueueMutationLink extends ApolloLink {

    private storeKey: string;
    private queue: any[];
    private isOpen: boolean;
    private storage: Storage;

    constructor(
        @Optional() private _syncOfflineMutation?: SyncOfflineMutation
    ) {
        super()

        this.storage = window.localStorage
        this.storeKey = '@offlineQueueKey'
        this.queue = []
        this.isOpen = true
    }

    resync = async () => {

        // syncOfflineMutation = syncOfflineMutation || this._syncOfflineMutation
        this._syncOfflineMutation.init()
        this._syncOfflineMutation.sync()
        this.clearQueue()
    }

    open = async () => {
        
        this.isOpen = true

        await this.resync()

    }
    close = () => {
        this.isOpen = false
    }
    request = (operation, forward) => {
        if (this.isOpen) {
            return forward(operation)
        }
        else {
            //if it is close enqueue first before forwarding
            this.enqueue({ operation })
            //return {offline: true}
            //return forward(operation)
            return new Observable(() => {
                return () => ({ isOffline: true })
            })

        }
    }
    enqueue = (entry) => {
        const item = { ...entry }
        const { operation } = item
        const { query = {}, variables = {} } = operation || {}
        let definitions = []

        if (query && query.definitions)
            definitions = query.definitions.filter(e => e.operation === 'mutation')

        //store only if there are values for query.definitions
        if (definitions.length > 0) {
            query.definitions = definitions
            this.queue.push({ mutation: query, variables })

            //update the value of local storage
            this.storage.setItem(this.storeKey, JSON.stringify(this.queue))
        }

    }
    clearQueue = () => {
        this.queue = []
    }

}
