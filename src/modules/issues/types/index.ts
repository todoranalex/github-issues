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
