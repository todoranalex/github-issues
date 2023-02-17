import { mockGetIssuesParams, getIssuesResponse } from '../mocks'
import { IssueFilter } from '../types'
import getIssues from './getIssues'

const mockGetIssues = jest.fn()

mockGetIssues
  .mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(getIssuesResponse),
    })
  )
  .mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.reject('Boom!'),
    })
  )

beforeAll(() => {
  global.fetch = mockGetIssues
})

const unmockedFetch = global.fetch

afterAll(() => {
  global.fetch = unmockedFetch
})

describe('#getIssues', () => {
  it('should fetch issues', async () => {
    const { repo, org, per_page, page, state } = mockGetIssuesParams
    const issues = await getIssues(repo, org, per_page, state as IssueFilter, page)
    expect(issues).toStrictEqual(getIssuesResponse)
  })

  it('should throw on fetch fail', async () => {
    const { repo, org, per_page, page, state } = mockGetIssuesParams
    let error
    try {
      await getIssues(repo, org, per_page, state as IssueFilter, page)
    } catch (e) {
      error = e
    }
    expect(error).toStrictEqual('Boom!')
  })
})
