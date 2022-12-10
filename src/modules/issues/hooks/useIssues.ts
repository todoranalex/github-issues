import {useTheme} from '@react-navigation/native';
import {useContext, useEffect} from 'react';
import {StoreContext} from '../../generic/store';
import {fetchIssues, setFilter, setPage} from '../state/actions';
import {IssueFilter} from '../types';

const useIssues = () => {
  const theme = useTheme();

  const {issuesThunkReducer} = useContext(StoreContext);
  const [state, thunkDispatch] = issuesThunkReducer;

  const {page, filter, org, repo, issuesPerPage} = state;

  useEffect(() => {
    thunkDispatch(fetchIssues(repo, org, issuesPerPage, filter, page));
  }, [page, filter, org, repo, issuesPerPage, thunkDispatch]);

  const onFilterActivated = (filter: IssueFilter) => {
    thunkDispatch(setFilter(filter));
  };

  const onLoadMore = () => {
    thunkDispatch(setPage(page + 1));
  };

  return {
    theme,
    state,

    onFilterActivated,
    onLoadMore,
  };
};

export default useIssues;
