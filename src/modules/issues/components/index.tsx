import {useTheme} from '@react-navigation/native';
import React from 'react';
import {FunctionComponent} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import GithubIcon from 'react-native-vector-icons/Octicons';
import {Button} from '../../generic/components';
import {IssueFilter, Issue} from '../types';
import useIssueItem from './hooks/useIssueItem';
import styles from './styles';

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

/***
 * Component used to display a large list of issues. It also allows pagination
 */
export const IssueList: FunctionComponent<{
  issues: Issue[];
  isLoading: boolean;
  error?: any;
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

/***
 * Component used to display an issue. By using the memoized version, we ensure it doesn't render unnecesarily. Allows bookmarking
 */
const IssueItem: FunctionComponent<{
  issue: Issue;
}> = ({issue}) => {
  const theme = useTheme();
  const {width} = useWindowDimensions();

  const {isBookmarked, onBookmark, onPress} = useIssueItem(issue);

  return (
    <TouchableOpacity
      onPress={onPress}
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
          onPress={onBookmark}
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

/***
 * Component used to display the available filters that can be applied to the issues list
 */
export const FilterItem: FunctionComponent<{
  value: IssueFilter;
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
