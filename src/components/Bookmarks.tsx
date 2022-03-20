import React from 'react';
import {View} from 'react-native';
import {IssueList} from './Issues';
import {useBookmarks} from '../hooks/useBookmark';

export default () => {
  const bookmarks = useBookmarks();

  return (
    <View style={{flex: 1}}>
      <IssueList
        issues={bookmarks}
        isLoading={bookmarks.length === 0}
        error={undefined}
      />
    </View>
  );
};
