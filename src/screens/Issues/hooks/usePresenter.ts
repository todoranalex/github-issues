import {RouteProp, useTheme, useRoute} from '@react-navigation/native';
import {useReducer, useEffect} from 'react';
import getIssues from '../../../api/issues/getIssues';
import issuesReducer, {
  initialState,
} from '../../../state/reducers/issuesReducer';
import {NavigationParamList} from '../../Entry/App';

type IssuesRouteProps = RouteProp<NavigationParamList, 'Issues'>;

const usePresenter = () => {
  const theme = useTheme();
  const {organization, repository} = useRoute<IssuesRouteProps>().params;
  const [state, dispatch] = useReducer(issuesReducer, {
    ...initialState,
    repo: repository,
    org: organization,
  });
  const {org, repo, filter, page, issuesPerPage} = state;

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const issues = await getIssues(repo, org, issuesPerPage, filter, page);
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
    fetchIssues();
  }, [state.page, state.filter]);

  return {
    theme,
    organization,
    ...state,
    isLoadingMore: state.isLoading && state.page === 1,
    dispatch,
  };
};

export default usePresenter;
