export type Issue = {
  title: string
  state: string
  number: number
  labels: IssueLabel[]
  updated_at: string
  comments_url: string
  comments: number
  repo: string
  org: string
  pull_request?: object
}

export type IssueLabel = {
  id: string
  url: string
  name: string
  color: string
  default: boolean
  description: string
}

export interface IssueUser {
  login: string
  id: number
  avatar_url: string
  url: string
  html_url: string
}

export type IssueFilter = 'all' | 'closed' | 'open'
