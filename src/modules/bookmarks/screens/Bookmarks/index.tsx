import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {StoreContext} from '../../../../App';
import {IssueList} from '../../../issues/components';

export default () => {
  const {bookmarksReducer} = useContext(StoreContext);
  const {bookmarks, loading} = bookmarksReducer;
  return (
    <View style={styles.container}>
      <IssueList issues={bookmarks} isLoading={loading} error={undefined} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 24,
  },
});
