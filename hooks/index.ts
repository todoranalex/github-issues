import { useEffect, useReducer, useRef } from "react";
import { Endpoints } from "@octokit/types";
import { Octokit } from "@octokit/rest";

const initialState: State = {
  data: null,
  isLoading: true,
  error: undefined,
};

type State = {
  data: FetchIssuesResponse;
  isLoading: boolean;
  error: any;
};

type Action = {
  type: "fetch" | "success" | "error";
  payload: FetchIssuesResponse;
  error: any;
};

type FetchIssuesParameters =
  Endpoints["GET /repos/{owner}/{repo}/issues"]["parameters"];
type FetchIssuesResponse =
  Endpoints["GET /repos/{owner}/{repo}/issues"]["response"];

const reducer = (state: State, action: Action) => {
  const { type, payload, error } = action;
  switch (type) {
    case "fetch": {
      return { ...state, isLoading: true };
    }
    case "success": {
      return { ...state, isLoading: false, data: payload };
    }
    case "error": {
      return { ...state, isLoading: false, error };
    }
  }
};

export function useGithubbIssues(page: number) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const octokitClient = useRef(new Octokit()).current;

  useEffect(() => {
    const getIssues = async () => {
      try {
        const data = await octokitClient.rest.issues.listForRepo({
          owner: "facebook",
          per_page: 20,
          repo: "react-native",
          page,
        });
        console.log(data);
        const filtered = data.data.filter((d) => !d.pull_request);
        dispatch({
          type: "success",
          payload: data,
          error: undefined,
        });
      } catch (e) {
        dispatch({
          type: "error",
          payload: null,
          error: e,
        });
      }
    };
    getIssues();
  }, [page]);

  return { state };
}
