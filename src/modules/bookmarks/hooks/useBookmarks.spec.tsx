import {renderHook} from '@testing-library/react-hooks';
import {StoreProvider} from '../../generic/state/store';
import {mockIssue1, mockIssue3} from '../../issues/mocks';
import {BookmarksReducer} from '../state';
import {getBookmarks} from '../state/actions';
import {initialState} from '../state/reducers';
import useBookmarks from './useBookmarks';
import React from 'react';

jest.mock('../state/actions');

const thunkDispatch = jest.fn();

const bookmarksThunkReducerMock: BookmarksReducer = [
  {
    ...initialState,
    bookmarks: [mockIssue1, mockIssue3],
  },
  thunkDispatch,
];

const wrapper = ({children}: {children: any}) => (
  <StoreProvider
    children={children}
    issuesThunkReducer={{} as any}
    bookmarksThunkReducer={bookmarksThunkReducerMock}
  />
);

describe('#useBookmarks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve bookmarks state', () => {
    const {result} = renderHook(() => useBookmarks(), {
      wrapper,
    });

    expect(thunkDispatch).toBeCalledWith(getBookmarks());

    expect(result.current.state.bookmarks).toStrictEqual([mockIssue1, mockIssue3])

  });
});
