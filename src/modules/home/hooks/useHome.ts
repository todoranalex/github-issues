import {useNavigation} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {Alert} from 'react-native';
import {StoreContext} from '../../generic/state/store';

const useHome = () => {
  const navigation = useNavigation();
  const [githubDetails, setGithubDetails] = useState<{
    repository: string;
    organization: string;
  }>({
    repository: '',
    organization: '',
  });
  const {issuesThunkReducer} = useContext(StoreContext);
  const [, thunkDispatch] = issuesThunkReducer;

  const onOrganizationChange = (organization: string) => {
    setGithubDetails(state => {
      return {...state, organization};
    });
  };

  const onRepositoryChange = (repository: string) => {
    setGithubDetails(state => {
      return {...state, repository};
    });
  };

  const onFetchIssuesPressed = () => {
    const {repository, organization} = githubDetails;
    if (repository.length > 0 && organization.length > 0) {
      thunkDispatch({
        type: 'set-repo',
        payload: {
          repo: githubDetails.repository,
        },
      });
      thunkDispatch({
        type: 'set-org',
        payload: {
          org: githubDetails.organization,
        },
      });
      thunkDispatch({
        type: 'set-filter',
        payload: {
          filter: 'open',
        },
      });
      navigation.navigate('Issues', {});
    } else {
      Alert.alert('Error', 'Please input an organization and a repository');
    }
  };

  const onBookmarksPressed = () => {
    navigation.navigate('Bookmarks', {});
  };

  return {
    githubDetails,

    onOrganizationChange,
    onRepositoryChange,

    onFetchIssuesPressed,
    onBookmarksPressed,
  };
};

export default useHome;
