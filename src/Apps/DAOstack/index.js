/*
* This is a boilerplate structure to get you through the process of building your first app with Alice
* We've included all the necessary features for you to build out your entire application using the
* Camera,
* Push Notifications,
* Maps,
* Payments,
*
* And all the navigation necessary for you to build a full feature app.
*
* Please see the documentation for more info on how to build out more features into Alice.
* */

import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Redemptions from './Screens/Redemptions'
import Proposals from './Screens/Proposals'
import Holders from './Screens/Holders'
import History from './Screens/History'
import DAOstack from './Screens/DAOs'
import NewProposal from './Screens/NewProposal'
import ReputationRequest from "./Screens/ReputationRequest";
import RequestComplete from "./Screens/RequestComplete";
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider, Query, graphql } from 'react-apollo';
import React, {Component} from "react";
import {NavigationBar} from "../../AliceComponents/NavigationBar";

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://subgraph.daostack.io/subgraphs/name/v24',
    fetchOptions: {
      mode: "no-cors",
    },
  }),
  cache: new InMemoryCache()
});

const DAOHomePage =  createBottomTabNavigator({
  // Your ExampleMaps's Tab Navigator's names are defined here as a default
  DAOstackHome: Proposals,
  DAOstackRedemptions: Redemptions,
  DAOstackHolders: Holders,
  DAOstackHistory: History
},
  {
    tabBarOptions: {
      style: {
        backgroundColor: '#3078CA',
        borderTopColor: 'transparent',
      },
      showLabel: false,
    },
  });

DAOHomePage.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
};

const App = createStackNavigator({
  DAOstack: DAOstack,
	DAOHomePage: DAOHomePage,
  NewProposal: NewProposal,
  ReputationRequest: ReputationRequest,
  RequestComplete: RequestComplete,
})

const AppContainer = createAppContainer(App);

export default class DAOstackContainer extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer/>
      </ApolloProvider>
    );
  }
}
