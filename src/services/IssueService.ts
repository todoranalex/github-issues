import {Octokit} from '@octokit/rest';
import {Filter, Issue} from '../reducers/issuesReducer';

/***
 * Class Service which handles communication with the GithubAPI
 * */
class IssueService {
  private octokitClient = new Octokit();

  getIssues = async (
    repo: string,
    org: string,
    issuesPerPage: number,
    filter: Filter,
    page: number,
  ): Promise<Issue[]> => {
    try {
      const rawResponse = await this.octokitClient.rest.issues.listForRepo({
        owner: org,
        repo: repo,
        per_page: issuesPerPage,
        state: filter,
        page: page,
      });
      const issues = rawResponse.data
        .filter(rawData => !rawData.pull_request) // filter pull requests
        .map(filteredIsssue => {
          return {
            ...filteredIsssue,
            org,
            repo,
          } as Issue;
        });
      return issues;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  getIssue = async (
    repo: string,
    org: string,
    issueNumber: number,
  ): Promise<Issue> => {
    try {
      const rawResponse = await this.octokitClient.rest.issues.get({
        owner: org,
        repo,
        issue_number: issueNumber,
      });
      return {
        ...rawResponse.data,
        org,
        repo,
        assignee: {
          name: rawResponse.data.assignee?.name,
          avatarUrl: rawResponse.data.assignee?.avatar_url,
        },
        repoUrl: rawResponse.data.repository_url,
        eventsUrl: rawResponse.data.events_url,
        commentsUrl: rawResponse.data.comments_url,
        labelsUrl: rawResponse.data.labels_url,
      } as Issue;
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

const issueService = new IssueService();
export default issueService;
