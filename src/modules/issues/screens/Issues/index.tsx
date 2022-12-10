import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Text, View} from 'react-native';
import {FilterItem, IssueList} from '../../components';
import usePresenter from '../../hooks/useIssues';
import styles from './styles';

/***
 * Component used to display the list of issues from Github. It also always filtering & pagination by dispatching the appropiate actions to the reducer.
 */
const Issues = () => {
  const {state, theme, onFilterActivated, onLoadMore} = usePresenter();
  const {org, filters, filter, issues, isLoading, error} = state;
  return (
    <React.Fragment>
      <Text style={{...styles.organizationName, color: theme.colors.text}}>
        {org}
      </Text>
      <View style={styles.filtersContainer}>
        {filters.map(value => {
          return (
            <FilterItem
              key={value}
              value={value}
              onActivate={() => onFilterActivated(value)}
              isActive={value === filter}
            />
          );
        })}
      </View>
      {state.isLoading && state.page === 1 ? (
        <ActivityIndicator
          testID="loading"
          size={24}
          color={theme.colors.primary}
          style={{flex: 1, backgroundColor: theme.colors.background}}
        />
      ) : (
        <IssueList
          onLoadMore={onLoadMore}
          issues={issues}
          isLoading={isLoading}
          error={error}
        />
      )}
    </React.Fragment>
  );
};

export default Issues;
