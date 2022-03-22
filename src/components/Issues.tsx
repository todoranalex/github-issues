import {RouteProp, useRoute, useTheme} from '@react-navigation/native';
import React, {useEffect, useReducer} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import issuesReducer, {initialState} from '../reducers/issuesReducer';
import {NavigationParamList} from './App';
import issueService from '../services/IssueService';
import {FilterItem, IssueList} from './Generic';

type IssuesRouteProps = RouteProp<NavigationParamList, 'Issues'>;

/***
 * Component used to display the list of issues from Github. It also always filtering & pagination by dispatching the appropiate actions to the reducer. 
 */
export default () => {
  const theme = useTheme();
  const {organization, repository} = useRoute<IssuesRouteProps>().params;
  const [state, dispatch] = useReducer(issuesReducer, {
    ...initialState,
    repo: repository,
    org: organization,
  });
  const {org, repo, filter, page, issuesPerPage} = state;

  useEffect(() => {
    const getIssues = async () => {
      try {
        const issues = await issueService.getIssues(
          repo,
          org,
          issuesPerPage,
          filter,
          page,
        );
        dispatch({
          type: 'fetch-success',
          payload: {
            issues,
          },
        });
      } catch (error) {
        dispatch({
          type: 'error',
          payload: {
            error,
          },
        });
      }
    };
    getIssues();
  }, [state.page, state.filter]);

  return (
    <React.Fragment>
      <Text style={{...styles.organizationName, color: theme.colors.text}}>
        {organization}
      </Text>
      <View style={styles.filtersContainer}>
        {state.filters.map(value => {
          return (
            <FilterItem
              key={value}
              value={value}
              onActivate={() => {
                dispatch({
                  type: 'filter',
                  payload: {
                    filter: value,
                  },
                });
              }}
              isActive={value === state.filter}
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
          {...state}
          onLoadMore={() => {
            dispatch({
              type: 'fetch-next-page',
            });
          }}
        />
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyScreenText: {marginTop: 8, color: 'white', alignSelf: 'center'},
  organizationName: {
    marginLeft: 24,
    marginBottom: 8,
  },
  filtersContainer: {
    flexDirection: 'row',
    marginLeft: 24,
  },
});
