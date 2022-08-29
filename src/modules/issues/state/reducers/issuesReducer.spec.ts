import {mockIssue1, mockIssue2, mockIssue3} from '../../mocks';
import issuesReducer, {initialState} from './issuesReducer';

describe('#issuesReducer', () => {
  it('should handle fetch issues', () => {
    expect(
      issuesReducer(initialState, {
        type: 'fetch-issues',
      }),
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('should handle fetch success', () => {
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

  it('should handle fetch error', () => {
    expect(
      issuesReducer(initialState, {
        type: 'fetch-error',
        payload: {
          error: 'Boom!',
        },
      }),
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Boom!',
    });
  });

  it('should handle set page', () => {
    expect(
      issuesReducer(initialState, {
        type: 'set-page',
        payload: {
          page: 4,
        },
      }),
    ).toEqual({
      ...initialState,
      page: 4,
    });
  });

  it('should handle set repo', () => {
    expect(
      issuesReducer(initialState, {
        type: 'set-repo',
        payload: {
          repo: 'some-repo',
        },
      }),
    ).toEqual({
      ...initialState,
      repo: 'some-repo',
    });
  });

  it('should handle set org', () => {
    expect(
      issuesReducer(initialState, {
        type: 'set-org',
        payload: {
          org: 'some-org',
        },
      }),
    ).toEqual({
      ...initialState,
      org: 'some-org',
    });
  });

  it('should handle set filter', () => {
    expect(
      issuesReducer(initialState, {
        type: 'set-filter',
        payload: {
          filter: 'closed',
        },
      }),
    ).toEqual({
      ...initialState,
      filter: 'closed',
    });
  });
});
