import {useTheme} from '@react-navigation/native';
import useIssues from './useIssues';
import {renderHook, act} from '@testing-library/react-hooks';
import React, {createContext} from 'react';
import {IssuesDispatch, IssuesReducer, IssuesState} from '../state';
import Store, {StoreProvider} from '../../generic/store';
import issuesReducer, {initialState} from '../state/reducers/issuesReducer';
import {fetchIssues} from '../state/actions';
import {mockIssue1, mockIssue2} from '../mocks';

const thunkDispatch = jest.fn();

jest.mock('../state/actions');

const fetchIssuesMock = fetchIssues as jest.Mock;

fetchIssuesMock.mockReturnValue([mockIssue1, mockIssue2]);

const issuesThunkReducerMock: IssuesReducer = [
  {
    ...initialState,
    org: 'facebook',
    repo: 'react-native',
  },
  thunkDispatch,
];

const wrapper = ({children}: {children: any}) => (
  <StoreProvider
    children={children}
    issuesThunkReducer={issuesThunkReducerMock}
    bookmarksThunkReducer={{} as any}
  />
);

describe('#useIssues', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide issues list', () => {
    renderHook(() => useIssues(), {
      wrapper,
    });

    expect(thunkDispatch).toBeCalled();

    const issues = thunkDispatch.mock.calls[0][0];

    expect(issues).toStrictEqual([mockIssue1, mockIssue2]);
  });

  it('should provide method to activate filter', () => {
    const {result} = renderHook(() => useIssues(), {
      wrapper,
    });

    result.current.onFilterActivated('closed');

    expect(thunkDispatch).toBeCalledWith({
      type: 'set-filter',
      payload: {filter: 'closed'},
    });
  });

  it('should provide method to load more issues', () => {
    const {result} = renderHook(() => useIssues(), {
      wrapper,
    });

    result.current.onLoadMore();

    expect(thunkDispatch).toBeCalledWith({
      type: 'set-page',
      payload: {
        page: 2,
      },
    });
  });
});
