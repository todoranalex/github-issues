import issuesReducer, {initialState} from '../src/reducers/issuesReducer';
import issueService from '../src/services/IssueService';
import {mockIssue, mockIssue2, mockIssue3} from './utils';

describe('Issue List', () => {
  test('reducer fetch success', () => {
    expect(
      issuesReducer(initialState, {
        type: 'fetch-success',
        payload: {
          issues: [mockIssue, mockIssue2, mockIssue3],
        },
      }),
    ).toEqual({
      ...initialState,
      isLoading: false,
      issues: [mockIssue, mockIssue2, mockIssue3],
    });
  });

  test('reducer pagination', () => {
    expect(issuesReducer(initialState, {type: 'fetch-next-page'})).toEqual({
      ...initialState,
      page: initialState.page + 1,
    });
  });

  test('reducer filter', () => {
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

  test('reducer error', () => {
    expect(
      issuesReducer(initialState, {
        type: 'error',
        payload: {error: {message: 'error!'}},
      }),
    ).toEqual({...initialState, isLoading: false, error: {message: 'error!'}});
  });

  test('get issues successfuly', async () => {
    const issues = await issueService.getIssues(
      'react-native',
      'facebook',
      30,
      'open',
      1,
    );
    expect(issues.length > 0);
  });

  test('its not possible to fetch more issues than per_page setting', async () => {
    const issues = await issueService.getIssues(
      'react-native',
      'facebook',
      100,
      'open',
      1,
    );
    expect(issues.length <= 100);
  });

  test('fail to get issues, by providing an inexistent repo & org', async () => {
    try {
      await issueService.getIssues(
        'react-native137812379',
        'facebook1234590-1-87',
        30,
        'open',
        1,
      );
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  test('get a single issue', async () => {
    const issue = await issueService.getIssue(
      'react-native',
      'facebook',
      33384,
    );
    expect(issue).toBeDefined();
  });
});
