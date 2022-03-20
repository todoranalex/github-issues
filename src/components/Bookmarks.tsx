import React from 'react';
import {StyleSheet, View} from 'react-native';
import useBookmarks from '../hooks/useBookmarks';
import {IssueList} from './IssuesComponents';

export default () => {
  const bookmarks = useBookmarks();

  return (
    <View style={styles.container}>
      <IssueList
        issues={bookmarks}
        isLoading={bookmarks.length === 0}
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
