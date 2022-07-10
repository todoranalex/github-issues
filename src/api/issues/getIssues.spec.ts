import getIssues from './getIssues';
import {
  mockGetIssuesParams,
  mockGetIssues,
  getIssuesResponse,
  mockReturnCodes,
  mockGetIssuesBadParams,
  notFoundResponse,
} from './mocks';
import {Filter} from './types';

describe('#getIssues', () => {
  it('should fetch issues successfuly', async () => {
    const {repo, org, per_page, page, state} = mockGetIssuesParams;
    const path = `/repos/${org}/${repo}/issues`;
    mockGetIssues(
      path,
      {per_page, state, page},
      getIssuesResponse,
      mockReturnCodes.success,
    );
    const issues = await getIssues(repo, org, per_page, state as Filter, page);
    expect(issues).toHaveLength(3);
    expect(issues[0].number).toBe(getIssuesResponse[0].number);
    expect(issues[1].number).toBe(getIssuesResponse[1].number);
    expect(issues[2].number).toBe(getIssuesResponse[2].number);
  });

  test('should fail to fetch issues by providing an inexistent repo & org', async () => {
    const {repo, org, per_page, page, state} = mockGetIssuesBadParams;
    const path = `/repos/${org}/${repo}/issues`;
    try {
      mockGetIssues(
        path,
        {per_page, state, page},
        notFoundResponse,
        mockReturnCodes.notFound,
      );
      await getIssues(repo, org, per_page, state as Filter, page);
    } catch (e: any) {
      expect(e).toBeDefined();
      expect(e.status).toBe(mockReturnCodes.notFound);
      expect(e.response.data.message).toBe(notFoundResponse.message);
      expect(e.response.data.documentation_url).toBe(
        notFoundResponse.documentation_url,
      );
    }
  });
});
