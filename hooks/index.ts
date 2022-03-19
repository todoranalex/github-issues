import {useEffect, useReducer, useRef} from 'react';
import {Endpoints} from '@octokit/types';
import {Octokit} from '@octokit/rest';

const initialState: State = {
  issues: [],
  isLoading: true,
  error: undefined,
};

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
  comments: string;
};

type State = {
  issues: Issue[];
  isLoading: boolean;
  error: any;
};

type Action = {
  type: 'fetch' | 'success' | 'error';
  payload: Issue[];
  error: any;
};

type FetchIssuesParameters =
  Endpoints['GET /repos/{owner}/{repo}/issues']['parameters'];
type FetchIssuesResponse =
  Endpoints['GET /repos/{owner}/{repo}/issues']['response'];

const reducer = (state: State, action: Action): State => {
  const {type, payload, error} = action;
  switch (type) {
    case 'fetch': {
      return {...state, isLoading: true};
    }
    case 'success': {
      return {
        ...state,
        isLoading: false,
        issues: [...state.issues, ...payload],
      };
    }
    case 'error': {
      return {...state, isLoading: false, error};
    }
  }
};

export function useGithubbIssues(page: number) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const octokitClient = useRef(new Octokit()).current;

  useEffect(() => {
    const getIssues = async () => {
      try {
        dispatch({
          type: 'fetch',
          payload: [],
          error: undefined,
        });
        const data = await octokitClient.rest.issues.listForRepo({
          owner: 'facebook',
          per_page: 20,
          repo: 'react-native',
          page,
        });
        console.log(data);
        const filtered = data.data
          .filter(d => !d.pull_request)
          .map(f => f as Issue);
        dispatch({
          type: 'success',
          payload: filtered,
          error: undefined,
        });
      } catch (e) {
        dispatch({
          type: 'error',
          payload: [],
          error: e,
        });
      }
    };
    getIssues();
  }, [page]);

  return {state};
}
