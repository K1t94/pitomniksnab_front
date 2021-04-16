import React, {FunctionComponent} from "react";
import {ApolloProvider as ApolloClientProvider} from "@apollo/client/react/context/ApolloProvider";
import {ApolloProvider} from "react-apollo";
import {provider, useInstance} from "react-ioc";

import ApolloService from "./services/ApolloService";


const ApolloBase: FunctionComponent<{}> = ({ children }) => {
    const { graphqlClient } = useInstance(ApolloService);

    return (
        <ApolloProvider client={graphqlClient}>
            <ApolloClientProvider client={graphqlClient}>
                {children}
            </ApolloClientProvider>
        </ApolloProvider>
    );
}


export default provider(ApolloService)(ApolloBase);
