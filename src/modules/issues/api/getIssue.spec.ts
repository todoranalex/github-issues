import getIssue from './getIssue';
import {
  mockGetIssueParams,
  mockGetIssue,
  mockIssue1,
  mockGetIssueBadParams,
  mockReturnCodes,
} from '../mocks';

describe('#getIssue', () => {
  it('should fetch issue details', async () => {
    const {repo, org, issueNumber} = mockGetIssueParams;
    const path = `/repos/${org}/${repo}/issues/${issueNumber}`;
    mockGetIssue(path, mockIssue1, mockReturnCodes.success);
    const issue = await getIssue(repo, org, issueNumber);
    expect(issue).toBeDefined();
    expect(issue.number).toBe(mockIssue1.number);
  });

  it('should throw error on issue details fetch error', async () => {
    const {repo, org, issueNumber} = mockGetIssueBadParams;
    const path = `/repos/${org}/${repo}/issues/${issueNumber}`;
    try {
      mockGetIssue(path, mockIssue1, mockReturnCodes.notFound);
      await getIssue(repo, org, issueNumber as unknown as number);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
