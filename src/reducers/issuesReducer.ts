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

export type Filter = 'all' | 'closed' | 'open';

export const initialState: State = {
  issues: [],
  org: '',
  repo: '',
  filter: 'open',
  filters: ['open', 'closed', 'all'],
  page: 1,
  issuesPerPage: 50,
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

  /***
 * Reducer used to handle the state of the Github issues.  
 */
const issuesReducer = (state: State, action: Action): State => {
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

export default issuesReducer;
