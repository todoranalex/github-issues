import {useEffect, useReducer, useRef} from 'react';
import {Octokit} from '@octokit/rest';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = 'bookmarksKey';

export const getBookmarks = async (): Promise<Issue[]> => {
  const raw = await AsyncStorage.getItem(BOOKMARKS_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const setBookmarks = (bookmarks: Issue[]): void => {
  AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
};

export const handleBookmark = async (bookmark: Issue) => {
  const bookmarks = await getBookmarks();
  if (
    !!bookmarks.find(
      b => b.number === bookmark.number && b.updated_at === b.updated_at, //maybe check repo?
    )
  ) {
    setBookmarks(bookmarks.filter(b => b.number !== bookmark.number));
  } else {
    bookmarks.push(bookmark);
    setBookmarks(bookmarks);
  }
};

export type Issue = {
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
};

type Filter = 'all' | 'closed' | 'open';

const initialState: State = {
  issues: [],
  org: '',
  repo: '',
  filter: 'open',
  filters: ['open', 'closed', 'all'],
  page: 1,
  issuesPerPage: 20,
  isLoading: true,
  error: undefined,
};

type State = {
  issues: Issue[];
  org: string;
  repo: string;
  filter: Filter;
  filters: Filter[];
  issuesPerPage: number;
  page: number;
  isLoading: boolean;
  error: any;
};

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

const reducer = (state: State, action: Action): State => {
  console.log('DISPATCHED', state, action);
  switch (action.type) {
    case 'fetch-success': {
      return {
        ...state,
        isLoading: false,
        issues: [...state.issues, ...action.payload.issues],
      };
    }
    case 'filter': {
      return {
        ...state,
        isLoading: true,
        issues: [],
        page: 1,
        filter: action.payload.filter,
      };
    }
    case 'fetch-next-page': {
      return {...state, isLoading: true, page: state.page + 1};
    }
    case 'error': {
      return {...state, isLoading: false, error: action.payload.error};
    }
  }
};

export function useGithubbIssues(repository: string, organization: string) {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    repo: repository,
    org: organization,
  });
  // auth: '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'
  const octokitClient = useRef(new Octokit()).current;
  const {org, repo, filter, page, issuesPerPage} = state;

  useEffect(() => {
    const getIssues = async () => {
      try {
        const data = await octokitClient.rest.issues.listForRepo({
          owner: org,
          repo: repo,
          per_page: issuesPerPage,
          state: filter,
          page: page,
        });
        console.log(data);
        const issues = data.data
          .filter(d => !d.pull_request) // filter pull requests
          .map(f => f as Issue);
        dispatch({
          type: 'fetch-success',
          payload: {
            issues,
          },
        });
      } catch (error) {
        dispatch({
          type: 'error',
          payload: {
            error,
          },
        });
      }
    };
    getIssues();
  }, [state.page, state.filter]);

  return {state, dispatch};
}
