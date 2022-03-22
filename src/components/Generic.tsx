import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {FunctionComponent} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import GithubIcon from 'react-native-vector-icons/Octicons';
import useBookmark from '../hooks/useBookmark';
import {Issue, Filter} from '../reducers/issuesReducer';

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
 * Generic components used in the App.
 */

export const Input: FunctionComponent<{
  label: string;
  value: string;
  placeholder: string;
  testID: string;
  onChangeText(value: string): void;
}> = ({label, value, placeholder, testID, onChangeText}): JSX.Element => {
  const theme = useTheme();
  return (
    <View>
      <Text style={{color: theme.colors.primary, ...styles.textInputInfo}}>
        {label}
      </Text>
      <TextInput
        testID={testID}
        onChangeText={onChangeText}
        keyboardAppearance="dark"
        style={{
          ...styles.textInput,
          borderColor: theme.colors.primary,
          color: theme.colors.primary,
        }}
        placeholderTextColor={theme.colors.text}
        placeholder={placeholder}
        value={value}
      />
    </View>
  );
};

export const Button: FunctionComponent<{
  text: string;
  icon?: string;
  borderColor?: string;
  testID?: string;
  onPress(): void;
}> = ({text, icon, borderColor, testID, onPress}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      style={{
        ...styles.button,
        borderColor: borderColor ?? theme.colors.primary,
      }}>
      <View style={styles.buttonInnerContainer}>
        <Text style={{...styles.buttonText, color: theme.colors.primary}}>
          {text}
        </Text>
        {icon && (
          <GithubIcon name={icon} size={24} color={theme.colors.primary} />
        )}
      </View>
    </TouchableOpacity>
  );
};

/***
 * Component used to display a large list of issues. It also allows pagination
 */
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

/***
 * Component used to display an issue. By using the memoized version, we ensure it doesn't render unnecesarily. Allows bookmarking
 */
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
        navigation.navigate('IssueDetails', {issue});
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

/***
 * Component used to display the available filters that can be applied to the issues list
 */
export const FilterItem: FunctionComponent<{
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

/***
 * Component used to override the default navigation header
 */
export const NavigationHeaderItem: FunctionComponent<{
  title?: string;
  onPress(): void;
}> = ({title, onPress}) => {
  return (
    <View style={styles.navHeaderContainer}>
      <GithubIcon
        onPress={onPress}
        name={'arrow-left'}
        color={'white'}
        size={24}
      />
      {title && <Text style={styles.navHeaderTitle}>{title}</Text>}
    </View>
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
  textInputInfo: {
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    height: 48,
    marginBottom: 16,
    paddingLeft: 8,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: 48,
    marginBottom: 8,
  },
  buttonInnerContainer: {flexDirection: 'row', paddingHorizontal: 48},
  buttonText: {
    fontSize: 20,
    marginRight: 8,
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
  navHeaderContainer: {
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navHeaderTitle: {
    color: 'white',
    marginLeft: 16,
    fontSize: 20,
    fontWeight: '700',
  },
});
