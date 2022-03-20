import {Octokit} from '@octokit/rest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Filter, Issue} from '../reducers/issuesReducer';

const BOOKMARKS_KEY = 'bookmarksKey';

class IssueService {
  octokitClient = new Octokit();

  private setBookmarks = async (bookmarks: Issue[]): Promise<void> => {
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  };

  getBookmarks = async (): Promise<Issue[]> => {
    const raw = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  handleBookmark = async (bookmark: Issue) => {
    const bookmarks = await this.getBookmarks();
    const savedBookmark = !!bookmarks.find(
      b => b.number === bookmark.number, // ensure the issue belongs to the repo..
    );
    if (!!savedBookmark) {
      console.log('bookmark will be removed!', savedBookmark);
      const filtered = bookmarks.filter(b => {
        return b.number !== bookmark.number;
      });
      await this.setBookmarks(filtered);

      console.log('bookmark removed, array is', filtered);
    } else {
      bookmarks.push(bookmark);
      await this.setBookmarks(bookmarks);
      console.log('bookmark added array is', bookmarks);
    }
  };

  isBookmarkedInStorage = async (bookmark: Issue): Promise<boolean> => {
    const bookmarks = await this.getBookmarks();
    return !!bookmarks.find(b => b.number === bookmark.number);
  };

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
