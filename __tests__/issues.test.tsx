import issuesReducer, {
  Filter,
  initialState,
} from '../src/reducers/issuesReducer';
import issueService from '../src/services/IssueService';
import {
  getIssuesResponse,
  mockGetIssueParams,
  mockGetIssuesBadParams,
  mockGetIssuesParams,
  mockIssue1,
  mockIssue2,
  mockIssue3,
  mockReturnCodes,
  notFoundResponse,
} from './resources';
import {mockGetIssues, mockGetIssue} from './utils';

describe('cover tests for issue list reducer and services', () => {
  test('reducer fetch success', () => {
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
    const {repo, org, per_page, page, state} = mockGetIssuesParams;
    const path = `/repos/${org}/${repo}/issues`;
    mockGetIssues(
      path,
      {per_page, state, page},
      getIssuesResponse,
      mockReturnCodes.success,
    );
    const issues = await issueService.getIssues(
      repo,
      org,
      per_page,
      state as Filter,
      page,
    );
    expect(issues).toHaveLength(3);
    expect(issues[0].number).toBe(getIssuesResponse[0].number);
    expect(issues[1].number).toBe(getIssuesResponse[1].number);
    expect(issues[2].number).toBe(getIssuesResponse[2].number);
  });

  test('fail to get issues, by providing an inexistent repo & org', async () => {
    const {repo, org, per_page, page, state} = mockGetIssuesBadParams;
    const path = `/repos/${org}/${repo}/issues`;
    try {
      mockGetIssues(
        path,
        {per_page, state, page},
        notFoundResponse,
        mockReturnCodes.notFound,
      );
      await issueService.getIssues(repo, org, per_page, state as Filter, page);
    } catch (e: any) {
      expect(e).toBeDefined();
      expect(e.status).toBe(mockReturnCodes.notFound);
      expect(e.response.data.message).toBe(notFoundResponse.message);
      expect(e.response.data.documentation_url).toBe(
        notFoundResponse.documentation_url,
      );
    }
  });

  test('get a single issue successfully', async () => {
    const {repo, org, issueNumber} = mockGetIssueParams;
    const path = `/repos/${org}/${repo}/issues/${issueNumber}`;
    mockGetIssue(path, mockIssue1);
    const issue = await issueService.getIssue(repo, org, issueNumber);
    expect(issue).toBeDefined();
    expect(issue.number).toBe(mockIssue1.number);
  });
});
