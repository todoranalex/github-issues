import {useNavigation, useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import GithubIcon from 'react-native-vector-icons/Octicons';
import {Button, Input} from './IssuesComponents';

/***
 * Component used as the main entry point for the app.
 */
export default () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const [githubDetails, setGithubDetails] = useState<{
    repository: string;
    organization: string;
  }>({
    repository: '',
    organization: '',
  });

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
          onChangeText={organization => {
            setGithubDetails(state => {
              return {...state, organization};
            });
          }}
        />
        <Input
          testID={'repoInputTestID'}
          label={'Repository'}
          value={githubDetails.repository}
          placeholder={'e.g react-native'}
          onChangeText={repository => {
            setGithubDetails(state => {
              return {...state, repository};
            });
          }}
        />
        <Button
          testID="fetchIssuesButtonTestID"
          text={'Fetch Issues'}
          icon={'rocket'}
          onPress={() => {
            const {repository, organization} = githubDetails;
            if (repository.length > 0 && organization.length > 0) {
              navigation.navigate('Issues', {
                organization: organization.toLowerCase(),
                repository: repository.toLowerCase(),
              });
            } else {
              Alert.alert(
                'Error',
                'Please input an organization and a repository',
              );
            }
          }}
        />
        <Button
          testID="bookmarksButtonTestID"
          text={'Bookmarks'}
          icon={'heart-fill'}
          onPress={() => {
            navigation.navigate('Bookmarks', {});
          }}
        />
      </View>
    </ScrollView>
  );
};

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
