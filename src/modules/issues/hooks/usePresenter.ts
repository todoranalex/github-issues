import {useTheme} from '@react-navigation/native';
import {useContext, useEffect} from 'react';
import {StoreContext} from '../../generic/store';
import {fetchIssues} from '../state/actions';

const usePresenter = () => {
  const theme = useTheme();

  const {issuesThunkReducer} = useContext(StoreContext);

  const [state, thunkDispatch] = issuesThunkReducer;

  const {page, filter, org, repo, issuesPerPage} = state;

  useEffect(() => {
    thunkDispatch(fetchIssues(repo, org, issuesPerPage, filter, page));
  }, [page, filter, org, repo, issuesPerPage, thunkDispatch]);

  return {
    theme,
    state,
    isLoadingMore: state.isLoading && state.page === 1,
    thunkDispatch,
  };
};

export default usePresenter;
