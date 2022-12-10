import {fetchIssues, setFilter, setOrg, setPage, setRepo} from '.';
import getIssues from '../../api/getIssues';
import {mockIssue1, mockIssue2} from '../../mocks';

jest.mock('../../api/getIssues');

const mockedIssues = [mockIssue1, mockIssue2];

const getIssuesMock = getIssues as jest.Mock;

const dispatch = jest.fn();

describe('#issuesActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchIssues', () => {
    it('should dispatch fetch-issues pending, then dispatch fetch-success', async () => {
      getIssuesMock.mockResolvedValue(mockedIssues);

      fetchIssues('some-repo', 'some-org', 10, 'all', 1)(dispatch);

      expect(dispatch).toHaveBeenNthCalledWith(1, {type: 'fetch-issues'});

      await expect(getIssuesMock()).resolves.toBe(mockedIssues);

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: 'fetch-success',
        payload: {
          issues: mockedIssues,
        },
      });
    });

    it('should dispatch fetch-error if getIssues throws', async () => {
      const error = new Error('Boom!');
      getIssuesMock.mockRejectedValue(error);

      fetchIssues('some-repo', 'some-org', 10, 'all', 1)(dispatch);

      await expect(getIssuesMock()).rejects.toBe(error);

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: 'fetch-error',
        payload: {
          error,
        },
      });
    });
  });

  describe('setFilter', () => {
    it('should return corresponding action', () => {
      const action = setFilter('closed');
      expect(action).toStrictEqual({
        type: 'set-filter',
        payload: {
          filter: 'closed',
        },
      });
    });
  });
  describe('setPage', () => {
    it('should return corresponding action', () => {
      const action = setPage(2);
      expect(action).toStrictEqual({
        type: 'set-page',
        payload: {
          page: 2,
        },
      });
    });
  });
  describe('setOrg', () => {
    it('should return corresponding action', () => {
      const action = setOrg('some-org');
      expect(action).toStrictEqual({
        type: 'set-org',
        payload: {
          org: 'some-org',
        },
      });
    });
  });
  describe('setRepo', () => {
    it('should return corresponding action', () => {
      const action = setRepo('some-repo');
      expect(action).toStrictEqual({
        type: 'set-repo',
        payload: {
          repo: 'some-repo',
        },
      });
    });
  });
});
