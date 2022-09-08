import { LocalDbInstances } from 'app/blocks/enum/local-db-instances.enum';
import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import * as localforage from 'localforage';
import { Store, clear } from 'idb-keyval';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-general',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

    swUpdateAvailable = false;
    constructor(
        private swUpdate: SwUpdate,
        private _snackBar: MatSnackBar,

    ) { }

    ngOnInit() {

        if (this.swUpdate.isEnabled) {

            this.swUpdate.checkForUpdate().then(d => {
                console.log('CheckForUpdate ...', d);
            });

            this.swUpdate.available.subscribe((d) => {
                this.swUpdateAvailable = true;
                
                if (confirm('New version available. Load New Version?')) {
                    window.location.reload();
                }
            });
        }
    }

    updateSw() {
        window.location.reload();
    }

    cleanLocalData() {

        if ('caches' in window) {
            caches.keys()
              .then(function(keyList) {
                  return Promise.all(keyList.map(function(key) {
                      return caches.delete(key);
                  }));
              });
        }

        // @ Clear persisted Graphql data
        window.GraphQlCachePersistor.purge();

        // @ Clear settings and other data
        localforage.dropInstance({
            name: LocalDbInstances.MedciliaData,
        });

        // @ Clear media
        const medciliaMediaStore = new Store(LocalDbInstances.MedciliaMedia, 'filesQueue');
        clear(medciliaMediaStore);

        this._snackBar.open('Local data cleared.', 'CLOSE', {
            panelClass: 'm-24',
            duration: 3000,
        });

        window.location.reload();
    }

}
