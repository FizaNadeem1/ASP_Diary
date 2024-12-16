import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import Utils from './utils/utils';
import abpUserConfigurationService from './services/abpUserConfigurationService';
import initializeStores from './stores/storeInitializer';
import registerServiceWorker from './registerServiceWorker';
import { loadStripe } from '@stripe/stripe-js';
import AppConsts from './lib/appconst';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe(AppConsts.stripeKey as string);

declare var abp: any;

Utils.setLocalization();

abpUserConfigurationService.getAll().then(data => {
  Utils.extend(true, abp, data.data.result);
  abp.clock.provider = Utils.getCurrentClockProvider(data.data.result.clock.provider);

  moment.locale(abp.localization.currentLanguage.name);

  if (abp.clock.provider.supportsMultipleTimezone) {
    moment.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
  }

  const stores = initializeStores();

  ReactDOM.render(
    <Provider {...stores}>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement
  );

  registerServiceWorker();
});
