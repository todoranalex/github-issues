import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import GithubIcon from 'react-native-vector-icons/Octicons';
import {Input, Button} from '../../../generic/components';
import useHome from '../../hooks/useHome';

/***
 * Component used as the main entry point for the app.
 */
const Home = () => {
  const theme = useTheme();
  const {width} = useWindowDimensions();

  const {
    githubDetails,
    onOrganizationChange,
    onRepositoryChange,
    onFetchIssuesPressed,
    onBookmarksPressed,
  } = useHome();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <GithubIcon name="mark-github" color={theme.colors.primary} size={128} />
      <Text style={{color: theme.colors.primary, ...styles.subtitle}}>
        Your GitHub issues fetcher app
      </Text>
      <View style={{width: width - 128}}>
        <Input
          testID={'orgInputTestID'}
          label={'Organization'}
          value={githubDetails.organization}
          placeholder={'e.g facebook'}
          onChangeText={onOrganizationChange}
        />
        <Input
          testID={'repoInputTestID'}
          label={'Repository'}
          value={githubDetails.repository}
          placeholder={'e.g react-native'}
          onChangeText={onRepositoryChange}
        />
        <Button
          testID="fetchIssuesButtonTestID"
          text={'Fetch Issues'}
          icon={'rocket'}
          onPress={onFetchIssuesPressed}
        />
        <Button
          testID="bookmarksButtonTestID"
          text={'Bookmarks'}
          icon={'heart-fill'}
          onPress={onBookmarksPressed}
        />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    marginTop: 24,
    marginBottom: 16,
  },
});
