import {Issue} from '../types';

export const mockIssue1: Issue = {
  number: 1,
  title: 'title1',
  state: 'open',
  labels: [],
  updated_at: '10',
  repo: 'repo1',
  org: 'org1',
  comments_url: '',
  comments: 0,
};
export const mockIssue2: Issue = {
  number: 2,
  title: 'title2',
  state: 'open',
  labels: [],
  updated_at: '10',
  repo: 'repo2',
  org: 'org2',
  comments_url: '',
  comments: 0,
};
export const mockIssue3: Issue = {
  number: 3,
  title: 'title3',
  state: 'open',
  labels: [],
  updated_at: '10',
  repo: 'repo3',
  org: 'org3',
  comments_url: '',
  comments: 0,
};

export const mockGetIssuesParams = {
  repo: 'react-native',
  org: 'facebook',
  per_page: 30,
  state: 'open',
  page: 1,
};

export const getIssuesResponse = [mockIssue1, mockIssue2, mockIssue3];
