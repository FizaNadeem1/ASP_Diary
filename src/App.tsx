import './App.css';

import * as React from 'react';

import Router from './components/Router';
import SessionStore from './stores/sessionStore';
import SignalRAspNetCoreHelper from './lib/signalRAspNetCoreHelper';
import Stores from './stores/storeIdentifier';
import { inject } from 'mobx-react';

export interface IAppProps {
  sessionStore?: SessionStore;
}

@inject(Stores.SessionStore)
class App extends React.Component<IAppProps> {
  async componentDidMount() {
    await this.props.sessionStore!.getCurrentLoginInformations();
    const features = this.props.sessionStore!.currentLogin.application.features;

    // Handle features as an object
    if (typeof features === 'object' && !Array.isArray(features)) {
      if (features['SignalR'] && features['SignalR.AspNetCore']) {
        SignalRAspNetCoreHelper.initSignalR();
      }
    } else if (Array.isArray(features)) {
      // Handle features as an array
      const signalR = features.find((f) => f.name === 'SignalR')?.included;
      const signalRAspNetCore = features.find((f) => f.name === 'SignalR.AspNetCore')?.included;
    
      if (signalR && signalRAspNetCore) {
        SignalRAspNetCoreHelper.initSignalR();
      }
    }
    // if (!!this.props.sessionStore!.currentLogin.user && this.props.sessionStore!.currentLogin.application.features['SignalR']) {
    //   if (this.props.sessionStore!.currentLogin.application.features['SignalR.AspNetCore']) {
    //     SignalRAspNetCoreHelper.initSignalR();
    //   }
    // }
  }

  public render() {
    return <Router />;
  }
}

export default App;
