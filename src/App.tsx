import {DefaultTheme} from '@react-navigation/native';
import React from 'react';

import Navigation from './modules/navigation';
import Store from './modules/generic/state/store';

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#1A1919',
    primary: 'white',
    text: '#999999',
  },
};

const App = () => {
  return (
    <Store>
      <Navigation theme={AppTheme} />
    </Store>
  );
};

export default App;
