import {Octokit} from '@octokit/rest';
import {Issue} from './types';

const getIssue = async (
  repo: string,
  org: string,
  issueNumber: number,
): Promise<Issue> => {
  const octokitClient = new Octokit();
  try {
    const rawResponse = await octokitClient.rest.issues.get({
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

export default getIssue;
