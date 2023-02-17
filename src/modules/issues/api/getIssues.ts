import { IssueFilter, Issue } from '../types'

const getUrl = (owner: string, repo: string, perPage: number, state: IssueFilter, page: number) =>
  `https://api.github.com/repos/${owner}/${repo}/issues?per_page=${perPage}&state=${state}&page=${page}`

const getIssues = async (
  repo: string,
  org: string,
  issuesPerPage: number,
  filter: IssueFilter,
  page: number
): Promise<Issue[]> => {
  try {
    const url = getUrl(org, repo, issuesPerPage, filter, page)
    const response = await fetch(url)
    const issues: Issue[] = await response.json()
    return issues.filter(issue => !issue.pull_request).map(issue => ({ ...issue, repo, org }))
  } catch (e) {
    return Promise.reject(e)
  }
}

export default getIssues
