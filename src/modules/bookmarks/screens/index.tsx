import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IssueList} from '../../issues/components';
import useBookmarks from '../hooks/useBookmarks';

export default () => {
  const {state} = useBookmarks();

  return (
    <View style={styles.container}>
      <IssueList
        issues={state.bookmarks}
        isLoading={state.loading}
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
