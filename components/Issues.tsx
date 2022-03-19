import {
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import React, {FunctionComponent, useRef, useState} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {FlatList, Text, View} from 'react-native';
import {Filter, Issue, useGithubbIssues} from '../hooks';
import GithubIcon from 'react-native-vector-icons/Octicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationParamList} from './App';

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
  const filters = useRef(['open', 'closed', 'all'] as Filter[]).current;
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<Filter>('open');
  const {issues, isLoading, error} = useGithubbIssues({
    page,
    filter,
    organization,
    repository,
  });
  return (
    <React.Fragment>
      {/* <Toolbar /> */}
      <Text style={{marginLeft: 24, marginBottom: 8, color: theme.colors.text}}>
        {organization}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 24,
        }}>
        {filters.map(value => {
          return (
            <FilterItem
              value={value}
              onActivate={() => {
                setFilter(value);
              }}
              isActive={value === filter}
            />
          );
        })}
      </View>
      {isLoading && page === 1 ? (
        <ActivityIndicator
          size={24}
          color={theme.colors.primary}
          style={{flex: 1, backgroundColor: theme.colors.background}}
        />
      ) : (
        <View style={styles.container}>
          {issues.length === 0 ? (
            <View style={styles.emptyScreen}>
              <GithubIcon name={'mark-github'} color={'white'} size={32} />
              <Text style={styles.emptyScreenText}>Wow, such empty ;(</Text>
            </View>
          ) : (
            <FlatList
              bounces={false}
              onEndReachedThreshold={200}
              onEndReached={() => {
                setPage(page + 1);
              }}
              style={styles.container}
              data={issues}
              keyExtractor={item => `${item.title} - ${item.number}`}
              renderItem={({item}) => {
                return (
                  <MemorizedIssueItem
                    issue={item}
                    repository={repository}
                    organization={organization}
                  />
                );
              }}
            />
          )}
        </View>
      )}
    </React.Fragment>
  );
};

const IssueItem: FunctionComponent<{
  issue: Issue;
  organization: string;
  repository: string;
}> = ({issue, organization, repository}) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
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
            {`${organization} / ${repository} #${issue.number}`}
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

        <Text style={{color: theme.colors.text}}>
          {issue.updated_at.slice(0, 4)}
        </Text>
      </View>
      <View style={{...styles.separator, width}} />
    </TouchableOpacity>
  );
};

const MemorizedIssueItem = React.memo(
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
  issueItemContainer: {
    paddingTop: 24,
  },
  issueItemInner: {
    paddingHorizontal: 24,
    flex: 1,
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
