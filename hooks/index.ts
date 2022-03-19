import {useEffect, useReducer, useRef} from 'react';
import {Endpoints} from '@octokit/types';
import {Octokit} from '@octokit/rest';

const initialState: State = {
  issues: [],
  filter: 'open',
  isLoading: true,
  error: undefined,
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

type State = {
  issues: Issue[];
  filter: Filter;
  isLoading: boolean;
  error: any;
};

type Action = {
  type: 'fetch' | 'success' | 'error';
  filter: Filter;
  payload: Issue[];
  error: any;
};

type FetchIssuesParameters =
  Endpoints['GET /repos/{owner}/{repo}/issues']['parameters'];
type FetchIssuesResponse =
  Endpoints['GET /repos/{owner}/{repo}/issues']['response'];

const reducer = (state: State, action: Action): State => {
  console.log('DISPATCHED', state, action);
  const {type, payload, filter, error} = action;
  switch (type) {
    case 'fetch': {
      return {...state, isLoading: true};
    }
    case 'success': {
      const newFilter = state.filter !== filter;
      return {
        ...state,
        filter,
        isLoading: false,
        issues: newFilter ? [...payload] : [...state.issues, ...payload],
      };
    }
    case 'error': {
      return {...state, isLoading: false, error};
    }
  }
};

export type Filter = 'all' | 'closed' | 'open';

type Configuration = {
  page: number;
  filter: Filter;
  organization: string;
  repository: string;
};

export function useGithubbIssues(configuration: Configuration) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {page, filter, organization, repository} = configuration;
  const octokitClient = useRef(new Octokit()).current;

  useEffect(() => {
    const getIssues = async () => {
      try {
        dispatch({
          type: 'fetch',
          payload: [],
          filter,
          error: undefined,
        });
        const data = await octokitClient.rest.issues.listForRepo({
          owner: organization,
          per_page: 20,
          repo: repository,
          state: filter,
          page,
        });
        const filtered = data.data
          .filter(d => !d.pull_request)
          .map(f => f as Issue);
        dispatch({
          type: 'success',
          payload: filtered,
          filter,
          error: undefined,
        });
      } catch (e) {
        dispatch({
          type: 'error',
          payload: [],
          filter,
          error: e,
        });
      }
    };
    getIssues();
  }, [page, filter]);
  return state;
}
