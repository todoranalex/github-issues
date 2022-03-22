import {Issue} from '../src/reducers/issuesReducer';
import nock from 'nock';
const BASE_URL = 'https://api.github.com:443';

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

export function mockGetIssue(path: string, responseBody: Record<string, any>) {
  nock(BASE_URL, {encodedQueryParams: true}).get(path).reply(200, responseBody);
}
