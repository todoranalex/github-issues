import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {StoreContext} from '../../../generic/store';
import {IssueList} from '../../../issues/components';

export default () => {
  const {bookmarksThunkReducer} = useContext(StoreContext);

  const [state] = bookmarksThunkReducer;
  
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
