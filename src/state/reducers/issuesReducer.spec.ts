import {mockIssue1, mockIssue2, mockIssue3} from '../../api/issues/mocks';
import issuesReducer, {initialState} from './issuesReducer';

describe('#issuesReducer', () => {
  it('should fetch success', () => {
    expect(
      issuesReducer(initialState, {
        type: 'fetch-success',
        payload: {
          issues: [mockIssue1, mockIssue2, mockIssue3],
        },
      }),
    ).toEqual({
      ...initialState,
      isLoading: false,
      issues: [mockIssue1, mockIssue2, mockIssue3],
    });
  });

  it('should fetch next page', () => {
    expect(issuesReducer(initialState, {type: 'fetch-next-page'})).toEqual({
      ...initialState,
      page: initialState.page + 1,
    });
  });

  it('should filter issues', () => {
    expect(
      issuesReducer(initialState, {
        type: 'filter',
        payload: {
          filter: 'closed',
        },
      }),
    ).toEqual({
      ...initialState,
      filter: 'closed',
    });
  });

  it('should throw an error if fetch fails', () => {
    expect(
      issuesReducer(initialState, {
        type: 'error',
        payload: {error: {message: 'error!'}},
      }),
    ).toEqual({...initialState, isLoading: false, error: {message: 'error!'}});
  });
});
