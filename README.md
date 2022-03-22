# github-issues

react-native-github-issues

https://user-images.githubusercontent.com/37213839/159453474-5a469758-405f-469e-b5b8-ceff2d41d9d7.mp4

## Features

- Fetch github issues for a given public organization and repository
- Allow issues filtering by state - open, closed or all 
- Paginate the issues list 
- Bookmark an issue 
- Display bookmarked issues separately 

## How to Setup

**Step 1:** git clone the repo

**Step 2:** cd to the cloned repo

**Step 3:** Install the packages with `npm install` (make sure `node` is installed) 

**Step 3:** Run `pod install` in `ios` folder (make sure `cocoapods` is installed)

**Step 4**: Start the Metro bundler with `npx react-native start --reset-cache`

**Step 5:** Run the app with `npx react-native run-ios` or `npx react-native run-android`

**Step 6:** Run tests with `npm test`

## Implementation overview

A custom Issue Type was created to map the objects received from the github API (via `@octokit.js/rest`)
```typescript
type Issue = {
  title: string;
  state: string;
  number: number;
  labels: {
    id: number;
    name: string;
    description: string;
    color: string;
  }[];
  updated_at: string;
  comments: number;
  repo: string;
  org: string;
  assignees?: string[];
  assignee?: {
    name?: string;
    avatarUrl?: string;
  };
  eventsUrl?: string;
  labelsUrl?: string;
  commentsUrl?: string;
  repoUrl?: string;
};
```
The API calls are handled by a dedicated service class, `issuesService`, which exposes via an interface it's available methods
```typescript
interface IIssueService {
  getIssues(repo: string, org: string, issuesPerPage: number,filter: Filter, page: number): Promise<Issue[]>;
  getIssue(repo: string, org: string, issueNumber: number): Promise<Issue>;
}
```
The 
```tsx 
<IssueList>
  <IssueItem/>
  <IssueItem/>
    <IssueDetails/>
  ...
</IssueList>

```
components are used to display both the issues from the server and the bookmarked ones and also an individual issue. 
The API is consumed through a custom reducer, `issuesReducer`, by dispatching actions from the above component. 
The Action is defined as 
```typescript
type Action =
  | {
      type: 'fetch-next-page';
    }
  | {
      type: 'filter';
      payload: {
        filter: Filter;
      };
    }
  | {
      type: 'fetch-success';
      payload: {
        issues: Issue[];
      };
    }
  | {
      type: 'error';
      payload: {
        error: any;
      };
    };
```
The reducer will then handle the state of the issues list, by handling fetches, pagination and filtering

```tsx
<Bookmarks>
  <IssueList/>
</Bookmarks>
``` 
Bookmark component is used to show the bookmarked issues. A custom hook, `useBookmarks()`, is used to handle the received by calling the  
``bookmarksService``. This service handles the `AsyncStorage` getters & setters for issues. 
```typescript
interface IIBookmarksService {
  getBookmarks(): Promise<Issue[]>;
  handleBookmark(bookmark: Issue): void;
  isBookmarkedInStorage(bookmark: Issue): Promise<boolean>;
}
```
The service is also used by the `useBookmark()` hook to control the UI state for a bookmark item. It provides a boolean value and a setter method. 
Finally, ``useIssue()`` custom hook is used to fetch and handle the issue details data. It's used on the ```<IssueDetails/>``` component. Initially, while the full details are loading, default fields available 
on the ```Issue``` object will be shown, the full details being loaded afterwards. 

For testing, ``jest``, ``rn-testing-library`` and ``nock`` (for api mocking) were used. 





