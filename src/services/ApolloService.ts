import {createUploadLink} from "apollo-upload-client";
import {setContext} from "apollo-link-context";
import {ApolloLink} from "apollo-link";
import {ApolloClient, InMemoryCache} from "apollo-boost";
import {NormalizedCacheObject} from "@apollo/client";
import {makeObservable, observable} from "mobx";

import {GRAPHQL_ENDPOINT} from "../../config";


class ApolloService {
    private readonly _httpLink: ApolloLink;
    private readonly _link: ApolloLink;
    private _authLink: ApolloLink;

    public graphqlClient: ApolloClient<NormalizedCacheObject>;

    constructor() {
        makeObservable<ApolloService, never>(
            this,
            {
                graphqlClient: observable,
            }
        );

        this._httpLink = createUploadLink({
            uri: GRAPHQL_ENDPOINT,
        });

        this._authLink = setContext((_, { headers }) => {
            const accessToken = localStorage.getItem('accessToken');

            return {
                headers: {
                    ...headers,
                    authorization: accessToken ? `Bearer ${accessToken}` : '',
                },
            };
        });

        this._link = ApolloLink.from([
            this._authLink.concat(this._httpLink),
        ]);

        this.graphqlClient = new ApolloClient({
            link: this._link,
            cache: new InMemoryCache(),
        });
    }
}


export default ApolloService;
