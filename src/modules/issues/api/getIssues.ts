import {Octokit} from '@octokit/rest';
import {Filter, Issue} from './types';

const getIssues = async (
  repo: string,
  org: string,
  issuesPerPage: number,
  filter: Filter,
  page: number,
): Promise<Issue[]> => {
  const octokitClient = new Octokit();
  try {
    const rawResponse = await octokitClient.rest.issues.listForRepo({
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

export default getIssues;
