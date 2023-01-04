import React, {useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {StoreContext} from '../../generic/state/store';
import {IssueList} from '../../issues/components';
import {getBookmarks} from '../state/actions';

export default () => {
  const {bookmarksThunkReducer} = useContext(StoreContext);

  const [state, thunkDispatch] = bookmarksThunkReducer;

  useEffect(() => {
    thunkDispatch(getBookmarks());
  }, [thunkDispatch]);

  return (
    <View style={styles.container}>
      <IssueList
        issues={state.bookmarks}
        isLoading={state.loading}
        error={undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 24,
  },
});
