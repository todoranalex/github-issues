import {DefaultTheme} from '@react-navigation/native';
import React from 'react';
import useBookmarksReducer, {
  BookmarksMiddlewareReducer,
} from './modules/bookmarks/hooks/useBookmarksReducer';
import Navigation from './modules/navigation';

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#1A1919',
    primary: 'white',
    text: '#999999',
  },
};

type AppContext = {
  bookmarksReducer: BookmarksMiddlewareReducer;
};

export const StoreContext = React.createContext<AppContext>({} as AppContext);

const App = () => {
  const bookmarksReducer = useBookmarksReducer();
  return (
    <StoreContext.Provider value={{bookmarksReducer}}>
      <Navigation theme={AppTheme} />
    </StoreContext.Provider>
  );
};

export default App;
