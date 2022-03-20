import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {IssueList, MemorizedIssueItem} from './Issues';
import {Octokit} from '@octokit/rest';
import {getBookmarks, Issue} from '../hooks';

export default () => {
  return (
    <View style={{flex: 1}}>
      <IssueList
        issues={bookmarkedIssues}
        repository={'react-native'}
        organization={'facebook'}
        isLoading={bookmarkedIssues.length === 0}
        error={null}
      />
    </View>
  );
};
