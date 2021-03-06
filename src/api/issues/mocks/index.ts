import {Issue} from '../types';
import nock from 'nock';
const BASE_URL = 'https://api.github.com:443';

export const mockIssue1: Issue = {
  number: 1,
  title: 'title1',
  state: 'open',
  labels: [],
  updated_at: '10',
  comments: 0,
  repo: 'repo1',
  org: 'org1',
};
export const mockIssue2: Issue = {
  number: 2,
  title: 'title2',
  state: 'open',
  labels: [],
  updated_at: '10',
  comments: 0,
  repo: 'repo2',
  org: 'org2',
};
export const mockIssue3: Issue = {
  number: 3,
  title: 'title3',
  state: 'open',
  labels: [],
  updated_at: '10',
  comments: 0,
  repo: 'repo3',
  org: 'org3',
};

export const mockGetIssuesParams = {
  repo: 'react-native',
  org: 'facebook',
  per_page: 30,
  state: 'open',
  page: 1,
};

export const mockGetIssuesBadParams = {
  repo: 'react-native137812379',
  org: 'facebook1234590-1-87',
  per_page: 30,
  state: 'open',
  page: 1,
};

export const mockGetIssueParams = {
  repo: 'react-native',
  org: 'facebook',
  issueNumber: 33384,
};

export const mockGetIssueBadParams = {
  repo: 'react-native123131634',
  org: 'facebook',
  issueNumber: -59656,
};

export const mockReturnCodes = {
  success: 200,
  notFound: 404,
};

export const getIssuesResponse = [mockIssue1, mockIssue2, mockIssue3];

export const notFoundResponse = {
  message: 'Not Found',
  documentation_url:
    'https://docs.github.com/rest/reference/issues#list-repository-issues',
};

export function mockGetIssues(
  path: string,
  query: Record<string, any>,
  responseBody: Record<string, any>,
  statusCode: number,
) {
  nock(BASE_URL, {encodedQueryParams: true})
    .get(path)
    .query(query)
    .reply(statusCode, responseBody);
}

export function mockGetIssue(
  path: string,
  responseBody: Record<string, any>,
  statusCode: number,
) {
  nock(BASE_URL, {encodedQueryParams: true})
    .get(path)
    .reply(statusCode, responseBody);
}
