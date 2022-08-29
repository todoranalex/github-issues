import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Text, View} from 'react-native';
import {FilterItem, IssueList} from '../../components';
import usePresenter from '../../hooks/usePresenter';
import styles from './styles';

/***
 * Component used to display the list of issues from Github. It also always filtering & pagination by dispatching the appropiate actions to the reducer.
 */
const Issues = () => {
  const {state, theme, isLoadingMore, thunkDispatch} = usePresenter();
  const {org, filters, filter, issues, page, isLoading, error} = state;
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
              onActivate={() => {
                thunkDispatch({type: 'set-filter', payload: {filter: value}});
              }}
              isActive={value === filter}
            />
          );
        })}
      </View>
      {isLoadingMore ? (
        <ActivityIndicator
          testID="loading"
          size={24}
          color={theme.colors.primary}
          style={{flex: 1, backgroundColor: theme.colors.background}}
        />
      ) : (
        <IssueList
          onLoadMore={() => {
            thunkDispatch({
              type: 'set-page',
              payload: {
                page: page + 1,
              },
            });
          }}
          issues={issues}
          isLoading={isLoading}
          error={error}
        />
      )}
    </React.Fragment>
  );
};

export default Issues;
