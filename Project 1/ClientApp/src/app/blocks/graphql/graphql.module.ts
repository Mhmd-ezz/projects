import { setApolloClient } from './graphql.service';
// import { ApolloLink } from 'apollo-link';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApolloLink, DefaultOptions, InMemoryCache, split } from '@apollo/client/core';
// import { setContext } from '@apollo/link-context';
import { setContext } from "@apollo/client/link/context";
// import { setContext } from 'apollo-link-context';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { OAuthService } from 'angular-oauth2-oidc';
// Apollo
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import OfflineLink from 'apollo-link-offline';
import { CachePersistor } from 'apollo3-cache-persist';
import { AuthService } from 'app/blocks/auth/auth.service';
import { QueueMutationLink } from 'app/blocks/graphql/QueueMutationLink';
import { SyncOfflineMutation } from 'app/blocks/graphql/SyncOfflineMutation';
import { environment } from 'environments/environment';
import * as localforage from 'localforage';
import * as moment from 'moment';
import { throwError } from 'rxjs';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { LocalDbInstances } from '../enum/local-db-instances.enum';
import { LocalDbStorenameInstanceEnum } from '../enum/local-db-storename-instance.enum';
import { AppUtils } from '../utils';
import { LocalDbInstancesService } from './../common/local-db-instances.service';
import { TenantsService } from './../services/tenants.service';
import { DrugBase, GrantorBase, LocationBase, LookupBase, MediaFileBase, PatientBase, TagBase } from './generated/bases';

import * as fromRoot from '../../store/reducers';
import * as fromSelectors from '../../store/selectors';
import { Store as NgrxStore } from '@ngrx/store';


@NgModule({
    providers: [SyncOfflineMutation, QueueMutationLink,
    ],
    imports: [],
    exports: [HttpClientModule]
})
export class GraphQLModule {
    // Private
    private offlineIsSet: boolean = false;
    private uri: string;
    private _defaultOptions: DefaultOptions = {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
            errorPolicy: 'all'
        },
        query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all'
        },
        mutate: {
            errorPolicy: 'all'
        }
    };

    constructor(
        private apollo: Apollo,
        private httpLink: HttpLink,
        public SyncOfflineMutation: SyncOfflineMutation,
        public _queueMutationLink: QueueMutationLink,
        private _authService: AuthService,
        private _localDbInstancesService: LocalDbInstancesService,
        private _tenantsService: TenantsService,
        private _store: NgrxStore<fromRoot.AppState>,
    ) {

        // @ Create apollo instance when tenant is loaded
        this._store.select(fromSelectors.getTenant)
            // this._tenantsService.currentTenant$
            .subscribe(tenant => {

                if (tenant && !this.apollo.client) {

                    this.uri = environment.backEnd.toString() + '/graphql';

                    const __errorLink = onError(({ graphQLErrors, networkError }) => {
                        if (graphQLErrors) {
                            graphQLErrors.map(({ message, locations, path }) =>
                                console.error(
                                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                                )
                            );
                        }
                        if (networkError) {
                            console.error(`[Network error]: ${networkError}`);
                        }
                    });

                    const __httpLink = this.httpLink.create({
                        uri: this.uri,
                    });

                    const client = new SubscriptionClient(
                        environment.backEndWs.toString() + `?access_token=${this._authService.getaccessToken()}`,
                        {
                            reconnect: true,
                            lazy: true,
                            wsOptionArguments: [{ // This are passed as extra arguments to the WebSocket constructor
                                headers: {
                                    // Whatever headers you like
                                    authorization: this._authService.getaccessToken() ? `Bearer ${this._authService.getaccessToken()}` : ''
                                }
                            }],
                            // connectionParams: () => { return "HASAN" },
                            inactivityTimeout: 6000,
                            reconnectionAttempts: 99
                        });

                    const wsClient = new WebSocketLink(client)

                    // client.onConnected((e, a) => {
                    //     console.log('connecting', e, a, client.status)
                    // });

                    // const wsClient = new WebSocketLink({
                    //     uri: environment.backEndWs.toString() + `?abc=123&access_token= Bearer ${this._authService.getaccessToken()}`,
                    //     options: {
                    //         reconnect: true,
                    //         lazy: true,
                    //         timeout: 5000,
                    //         connectionParams: {
                    //             headers: {
                    //                 Authorization: this._authService.getaccessToken() ? `Bearer ${this._authService.getaccessToken()}` : ''
                    //             }
                    //         }
                    //     },
                    // });

                    const cache = new InMemoryCache({
                        addTypename: true,
                        // dataIdFromObject: object => {
                        //     // if (!object.__typename) {
                        //     //    throw new Error('GraphQL response missing __typename: ' + JSON.stringify(object))
                        //     // }
                        //     switch (object.__typename) {
                        //         case 'GeneralCondition':
                        //             return `${object.__typename}:${object.id}`;
                        //         case 'GeneralFollowup':
                        //             return `${object.__typename}:${object.id}`;
                        //         case 'GeneralOperation':
                        //             return `${object.__typename}:${object.id}`;
                        //         case 'CardiologyCondition':
                        //             return `${object.__typename}:${object.id}`;
                        //         case 'CardiologyCondition':
                        //             return `${object.__typename}:${object.id}`;
                        //         case 'CardiologyFollowup':
                        //             return `${object.__typename}:${object.id}`;
                        //         case 'Drug':
                        //             return `${object.__typename}:${object.id}`;
                        //         case 'MediaFile':
                        //             return `${object.__typename}:${object.id}`;
                        //         case 'Location':
                        //             return `${object.__typename}:${object.id}`;
                        //         case 'Lookup':
                        //             return `${object.__typename}:${object['groupKey']}:${object['text']
                        //                 }`;

                        //         case 'Contact':
                        //             return `${object.__typename}:${object.id}`;

                        //         case 'Patient':
                        //             // @ if specialities is present than this object is normal patient typename
                        //             if (!!object['patientInfo'] && !!object['patientInfo']['specialities']) {
                        //                 return `${object.__typename}:${object.id}`;
                        //             } else {
                        //                 // @ if specialities is not present than this object is LightPatient
                        //                 return `LightPatient:${object.id}`;
                        //             }

                        //         case 'PatientsMediaFiles':
                        //             return `${object.__typename}:${object.id}`;
                        //         default:
                        //             return defaultDataIdFromObject(object);
                        //     }
                        // },

                        // https://www.apollographql.com/docs/react/advanced/caching.html#cacheRedirect
                        typePolicies: {
                            // @ Describe how fragments are stored in cache
                            Lookup: {
                                keyFields: ['groupKey', 'text'],
                            },
                            Patient:{
                                fields:{
                                    patientInfo:{
                                         merge(existing, incoming, { mergeObjects }) {
                                            return mergeObjects(existing, incoming);
                                          },
                                    }
                                }
                            },
                            // @ Describe how queries are stored in ROOT
                            Query: {
                                fields: {
                                    patients: {
                                        keyArgs: false,
                                        read: (existing = [],) => existing,
                                        merge: AppUtils.mergeArrayByField<PatientBase>("id"),
                                    },
                                    patient(_, { args, toReference }) {
                                        return toReference({
                                            __typename: "Patient",
                                            id: args.id,
                                        })
                                    },
                                    drugs: {
                                        keyArgs: false,
                                        read: (existing = [],) => existing,
                                        merge: AppUtils.mergeArrayByField<DrugBase>("id"),
                                    },
                                    drug(_, { args, toReference }) {
                                        return toReference({
                                            __typename: "Drug",
                                            id: args.id,
                                        })
                                    },
                                    grantors: {
                                        keyArgs: false,
                                        read: (existing = [],) => existing,
                                        merge: AppUtils.mergeArrayByField<GrantorBase>("id"),
                                    },
                                    grantor(_, { args, toReference }) {
                                        return toReference({
                                            __typename: "Grantor",
                                            id: args.id,
                                        })
                                    },
                                    contacts: {
                                        keyArgs: false,
                                        //read: (existing = [],) => existing,
                                        // merge: AppUtils.mergeArrayByField<ContactBase>("id"),
                                    },
                                    contact(_, { args, toReference }) {
                                        return toReference({
                                            __typename: "Contact",
                                            id: args.id,
                                        })
                                    },
                                    Lookup: {
                                        read: (existing = [], { args, toReference }) => {
                                            return toReference({
                                                __typename: "Lookup",
                                                groupKey: args.group,
                                                text: args.text
                                            })
                                        },
                                    },
                                    lookupsByGroup: {
                                        keyArgs: ['group'],
                                        read: (existing = [],) => existing,
                                        merge: AppUtils.mergeArrayByField<LookupBase>("text"),
                                    },
                                    lookupByText(_, { args, toReference }) {
                                        return toReference({
                                            __typename: "Lookup",
                                            groupKey: args.group,
                                            text: args.text
                                        })
                                    },
                                    mediaFiles: {
                                        keyArgs: false,
                                        read: (existing = [],) => existing,
                                        merge: AppUtils.mergeArrayByField<MediaFileBase>("id"),
                                    },
                                    mediaFile(_, { args, toReference }) {
                                        return toReference({
                                            __typename: "MediaFile",
                                            id: args.id,
                                        })
                                    },
                                    location: {
                                        keyArgs: false,
                                        read: (existing = [],) => existing,
                                        merge: AppUtils.mergeArrayByField<LocationBase>("id"),
                                    },
                                    tags: {
                                        keyArgs: false,
                                        read: (existing = [],) => existing,
                                        merge: AppUtils.mergeArrayByField<TagBase>("id"),
                                    },
                                    tag(_, { args, toReference }) {
                                        return toReference({
                                            __typename: "Tag",
                                            id: args.id,
                                        })
                                    },
                                    // location(_, { args, toReference }) {
                                    //     return toReference({
                                    //         __typename: "Location",
                                    //         id: args.id,
                                    //     })
                                    // }

                                    // drug: (_, args, { getCacheKey }) =>
                                    //     getCacheKey({ __typename: 'Drug', id: args.id }),

                                    // patient: (_, args, { getCacheKey }) =>
                                    //     getCacheKey({ __typename: 'Patient', id: args.id }),

                                    // lookup: (_, args, { getCacheKey }) =>
                                    //     getCacheKey({ __typename: 'Lookup', id: args.id }),

                                    // lookup: (_, args, { getCacheKey }) =>
                                    //     // @ dataIdFromObject object keys are groupKey and text
                                    //     getCacheKey({
                                    //         __typename: 'Lookup',
                                    //         groupKey: args.group,
                                    //         text: args.text
                                    //     }),
                                    // mediaFile: (_, args, { getCacheKey }) =>
                                    //     getCacheKey({ __typename: 'MediaFile', id: args.id }),

                                    // location: (_, args, { getCacheKey }) =>
                                    //     getCacheKey({ __typename: 'Location', id: args.id })
                                }
                            }
                        }
                    });

                    // https://github.com/apollographql/apollo-client/issues/1564
                    // https://gist.github.com/cdelgadob/4041818430bc5802016332dbe5611570
                    const cleanTypenameLink = new ApolloLink((operation, forward) => {
                        if (operation.variables) {
                            operation.variables = omitDeep(
                                operation.variables,
                                '__typename'
                            );
                        }
                        return forward(operation)
                            .map(data => {
                                return data;
                            });
                    });

                    function omitDeep(obj, key) {
                        const keys = Object.keys(obj);
                        const newObj = {};
                        keys.forEach(i => {
                            if (i !== key) {
                                const val = obj[i];

                                if (Array.isArray(val)) {
                                    newObj[i] = omitDeepArrayWalk(val, key);
                                } else if (val instanceof moment) {
                                    newObj[i] = moment(val).toJSON();
                                } else if (val instanceof Date) {
                                    // @ Always transfor dates to utc
                                    // newObj[i] = moment(val).utc().format('YYYY-MM-DDTHH:mm:ssZZ');
                                    newObj[i] = moment(val).toJSON();
                                    // console.log("graphql", val, newObj[i])
                                } else if (typeof val === 'object' && val !== null) {
                                    newObj[i] = omitDeep(val, key);
                                } else {
                                    newObj[i] = val;
                                }
                            }
                        });
                        return newObj;
                    }

                    function omitDeepArrayWalk(arr, key) {
                        return arr.map(val => {
                            if (Array.isArray(val)) {
                                return omitDeepArrayWalk(val, key);
                            } else if (typeof val === 'object') {
                                return omitDeep(val, key);
                            }
                            return val;
                        });
                    }

                    // -----------------------------------------------
                    //      Persistor
                    // -----------------------------------------------

                    // @ Bug fixes
                    const storage = localforage as any;
                    // const storage = this._localDbInstancesService.getGQLCachePersistorInstance() as any;

                    const persistor = new CachePersistor({
                        cache: cache,
                        // @ [storage]: for ease of use in case of development use window.localStorage 
                        // @ which make it easy to view cached object and arrays while indexdb in production will stringify data and make it dificult to view 
                        // @ [key] : append tenantId to item key just to seperate data between each tenant
                        key: !environment.production ? `apollo-cache-persist-${tenant.id}` : undefined,
                        storage: environment.production ? storage : window.localStorage, // switch to localforage on production  
                        maxSize: false, // Defaults to 1048576 (1 MB). For unlimited cache size, provide false.
                        debug: false
                    });
                    // Move restore data from storage to apollo cache
                    // persistor.restore();

                    // @ Make persistor global variable 
                    window.GraphQlCachePersistor = persistor as any;

                    const SCHEMA_VERSION = environment.GQL_SCHEMA_VERSION;
                    const SCHEMA_VERSION_KEY = 'apollo-schema-version';

                    // Read the current schema version from AsyncStorage.
                    const currentVersion = window.localStorage.getItem(SCHEMA_VERSION_KEY);

                    if (currentVersion === SCHEMA_VERSION) {
                        // If the current version matches the latest version,
                        // we're good to go and can restore the cache.
                        persistor.restore();
                    } else {
                        // Otherwise, we'll want to purge the outdated persisted cache
                        // and mark ourselves as having updated to the latest version.
                        persistor.purge();
                        window.localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION);
                    }

                    // -----------------------------------------------
                    //      Links
                    // -----------------------------------------------
                    const retryLink = new RetryLink({
                        attempts: {
                            max: 2
                            // retryIf: (error, operation) => {
                            //     return !!error ;
                            //     const cachedResponse = cache.readQuery({
                            //         query: operation.query,
                            //         variables: operation.variables
                            //     });
                            //     return !!error && cachedResponse == null;
                            // }
                        }
                    });

                    const offlineStorage = localforage.createInstance({
                        name: `${LocalDbInstances.MedciliaData}-${tenant.id}`,
                        storeName: LocalDbStorenameInstanceEnum.offlineQueue,
                        driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
                    });

                    const offlineLink = new OfflineLink({
                        storage: offlineStorage,
                        retryInterval: 30000,
                        sequential: true,
                    });

                    const authLink = onError(({ graphQLErrors, networkError }) => {
                        if (graphQLErrors) {
                            graphQLErrors.map(({ message, locations, path }) => {
                                // @ if message conatins "Authorization" then logout
                                if (message.indexOf('Authorization') !== -1) {
                                    console.error(`[Unauthorized]: Message: ${message}`);
                                }
                            });
                        }
                    });

                    const authenticationLink = setContext((_, { headers }) => {
                        // get the authentication token from local storage if it exists

                        const token = this._authService.getaccessToken();

                        // return the headers to the context so httpLink can read them
                        return {
                            headers: {
                                ...headers,
                                authorization: token ? `Bearer ${token}` : ''
                            }
                        };
                    });

                    // using the ability to split links, you can send data to each link
                    // depending on what kind of operation is being sent
                    interface Definintion {
                        kind: string;
                        operation?: string;
                    };

                    const link = split(
                        ({ query }) => {
                            const { kind, operation }: Definintion = getMainDefinition(query);
                            return kind === 'OperationDefinition' && operation === 'subscription';
                        },
                        wsClient,
                        __httpLink,
                    );
                    // using the ability to split links, you can send data to each link
                    // depending on what kind of operation is being sent
                    // const link = split(
                    //     // split based on operation type
                    //     ({query}) => {
                    //         let definition = getMainDefinition(query);
                    //         return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';

                    //     },
                    //     wsClient ,
                    //     __httpLink,
                    //   );

                    const __link = ApolloLink.from([
                        // + ---- Other Links
                        cleanTypenameLink,
                        retryLink,
                        // queueLink,
                        offlineLink,
                        __errorLink,
                        authLink,
                        link
                        // + ---- don't touch this Link
                        // __httpLink
                    ]);

                    // create Apollo
                    apollo.create({
                        // link: authenticationLink.concat(__link),
                        link: __link,
                        cache: cache,
                        defaultOptions: {
                            watchQuery: {
                                fetchPolicy: 'cache-and-network',
                                errorPolicy: 'all'
                            },
                            query: {
                                fetchPolicy: 'network-only',
                                errorPolicy: 'all'
                            },
                            mutate: {
                                errorPolicy: 'all'
                            }
                        }
                    });

                    setApolloClient(this.apollo)

                    // @ setup offlineLink only when client is authenticated
                    this._authService.isAuthenticated$.subscribe(event => {
                        if (event) {
                            if (!this.offlineIsSet) {
                                offlineLink.setup(this.apollo.client);
                                this.offlineIsSet = true;
                            }
                        }
                    });

                }
            })
    }
}
