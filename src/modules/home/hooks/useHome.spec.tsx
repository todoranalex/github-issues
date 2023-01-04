import {IssuesReducer} from '../../issues';
import {initialState} from '../../issues/state/reducers/issuesReducer';
import {StoreProvider} from '../../generic/state/store';
import {renderHook} from '@testing-library/react-hooks';
import useHome from './useHome';
import React from 'react';
import {act} from 'react-test-renderer';
import {Alert} from 'react-native';

jest.mock('react-native', () => {
  return {
    Alert: {
      alert: jest.fn(),
    },
  };
});

const thunkDispatch = jest.fn();

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

describe('#useHome', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide method to change org', () => {
    const {result} = renderHook(() => useHome(), {wrapper});
    act(() => {
      result.current.onOrganizationChange('some-org');
    });

    expect(result.current.githubDetails.organization).toBe('some-org');
  });

  it('should provide method to change repo', () => {
    const {result} = renderHook(() => useHome(), {wrapper});

    act(() => {
      result.current.onRepositoryChange('some-repo');
    });

    expect(result.current.githubDetails.repository).toBe('some-repo');
  });

  it('should handle necessary actions on fetchIssues button press', async () => {
    const {result, rerender} = renderHook(() => useHome(), {wrapper});

    act(async () => {
      result.current.onRepositoryChange('some-repo');

      result.current.onOrganizationChange('some-org');

      await rerender();

      result.current.onFetchIssuesPressed();

      expect(thunkDispatch).toHaveBeenNthCalledWith(1, {
        type: 'set-repo',
        payload: {
          repo: 'some-repo',
        },
      });

      expect(thunkDispatch).toHaveBeenNthCalledWith(2, {
        type: 'set-repo',
        payload: {
          repo: 'some-org',
        },
      });

      expect(thunkDispatch).toHaveBeenNthCalledWith(3, {
        type: 'set-filter',
        payload: {
          filter: 'open',
        },
      });
    });
  });

  it('should show an alert if there is no repo or no org setup when fetch issues button is pressed', () => {
    const {result} = renderHook(() => useHome(), {wrapper});

    result.current.onFetchIssuesPressed();

    expect(Alert.alert).toBeCalled();
  });

  it('should provide onBookmarks pressed method', () => {
    const {result} = renderHook(() => useHome(), {wrapper});

    result.current.onBookmarksPressed()
  })
});
