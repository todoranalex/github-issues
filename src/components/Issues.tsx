import {
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import React, {FunctionComponent, useEffect, useReducer, useRef} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {FlatList, Text, View} from 'react-native';
import issuesReducer, {
  Filter,
  initialState,
  Issue,
} from '../reducers/issuesReducer';
import GithubIcon from 'react-native-vector-icons/Octicons';
import {NavigationParamList} from './App';
import {Button} from './Home';
import useBookmark from '../hooks/useBookmark';
import {Octokit} from '@octokit/rest';
import issueService from '../services/IssueService';

type IssuesRouteProps = RouteProp<NavigationParamList, 'Issues'>;

const issueIcons = {
  open: {
    icon: 'issue-opened',
    color: 'green',
  },
  closed: {
    icon: 'issue-closed',
    color: 'purple',
  },
};

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
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 24,
        }}>
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

export const IssueList: FunctionComponent<{
  issues: Issue[];
  isLoading: boolean;
  error: any;
  onLoadMore?(): void;
}> = ({issues, isLoading, error, onLoadMore}) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      {issues.length === 0 || error ? (
        <View style={styles.emptyScreen}>
          <GithubIcon name={'mark-github'} color={'white'} size={32} />
          <Text style={styles.emptyScreenText}>
            {error ? 'Woops, something went wrong ;(' : 'Wow, such empty ;('}
          </Text>
        </View>
      ) : (
        <FlatList
          ListFooterComponent={() => {
            if (!onLoadMore) {
              return <React.Fragment />;
            }
            return (
              <View style={{marginHorizontal: 64, paddingVertical: 24}}>
                {isLoading ? (
                  <ActivityIndicator
                    size={24}
                    color={theme.colors.primary}
                    style={{
                      height: 64,
                      flex: 1,
                      backgroundColor: theme.colors.background,
                    }}
                  />
                ) : (
                  <Button
                    borderColor={theme.colors.text}
                    text="Load more"
                    onPress={() => {
                      onLoadMore?.();
                    }}
                  />
                )}
              </View>
            );
          }}
          style={styles.container}
          data={issues}
          keyExtractor={item => `${item.title} - ${item.number}`}
          renderItem={({item}) => {
            return <MemorizedIssueItem issue={item} />;
          }}
        />
      )}
    </View>
  );
};

const IssueItem: FunctionComponent<{
  issue: Issue;
}> = ({issue}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const [isBookmarked, setBookmark] = useBookmark(issue);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('IssueDetails', {});
      }}
      activeOpacity={0.84}
      key={`${issue.title} - ${issue.number}`}
      style={styles.issueItemContainer}>
      <View style={styles.issueItemInner}>
        <GithubIcon
          name={
            issue.state === 'open'
              ? issueIcons.open.icon
              : issueIcons.closed.icon
          }
          size={24}
          color={
            issue.state === 'open'
              ? issueIcons.open.color
              : issueIcons.closed.color
          }
          style={styles.issueItemIcon}
        />
        <View style={{flex: 1}}>
          <Text
            style={{
              ...styles.issueItemHeaderText,
              color: theme.colors.text,
            }}>
            {`${issue.org} / ${issue.repo} #${issue.number}`}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              ...styles.issueItemTitle,
              color: theme.colors.primary,
            }}>
            {issue.title}
          </Text>
          <View style={styles.labelsContainer}>
            {issue.labels.map(label => {
              return (
                <View
                  key={label.id}
                  style={{
                    ...styles.label,
                    backgroundColor: `#${label.color}`,
                  }}>
                  <Text style={{color: 'black'}}>{label.name}</Text>
                </View>
              );
            })}
          </View>
          {issue.comments > 0 && (
            <View style={styles.comment}>
              <GithubIcon size={16} name="comment" color={theme.colors.text} />
              <Text
                style={{
                  color: theme.colors.text,
                  fontSize: 14,
                  marginLeft: 3,
                }}>
                {issue.comments}
              </Text>
            </View>
          )}
        </View>
        <GithubIcon
          name={isBookmarked ? 'heart-fill' : 'heart'}
          size={24}
          color={theme.colors.primary}
          onPress={() => {
            setBookmark();
          }}
        />
      </View>
      <View style={{...styles.separator, width}} />
    </TouchableOpacity>
  );
};

export const MemorizedIssueItem = React.memo(
  IssueItem,
  (prevProps, props) => prevProps.issue.number === props.issue.number,
);

const FilterItem: FunctionComponent<{
  value: Filter;
  isActive: boolean;
  onActivate(): void;
}> = ({value, isActive, onActivate}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity style={styles.filterItem} onPress={onActivate}>
      <Text style={{color: theme.colors.primary}}>
        {value.replace(value[0], value[0].toUpperCase())}
      </Text>
      {isActive && (
        <GithubIcon
          size={16}
          name={'check-circle-fill'}
          color={theme.colors.primary}
          style={{marginLeft: 4}}
        />
      )}
    </TouchableOpacity>
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
  issueItemContainer: {
    paddingTop: 24,
  },
  issueItemInner: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  issueItemIcon: {
    marginRight: 8,
  },
  issueItemHeaderText: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  issueItemTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  labelsContainer: {flexDirection: 'row', flexWrap: 'wrap', marginTop: 8},
  label: {
    borderRadius: 50,
    marginRight: 4,
    marginBottom: 4,
    paddingVertical: 2,
    paddingHorizontal: 8,
    alignSelf: 'baseline',
  },
  comment: {
    flexDirection: 'row',
    alignSelf: 'baseline',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: '#212121',
  },
  separator: {
    height: 1,
    opacity: 0.3,
    backgroundColor: 'gray',
    marginTop: 24,
  },
  filterItem: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    backgroundColor: '#778899',
    flexDirection: 'row',
  },
});
