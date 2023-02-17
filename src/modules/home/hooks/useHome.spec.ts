import useHome from './useHome'
import { act } from 'react-test-renderer'
import { Alert } from 'react-native'
import { renderHook } from '../../generic/helpers/testing-library/renderHook'
import { mockedNavigate } from '../../../../__tests__/setup'

jest.mock('react-native', () => {
  return {
    Alert: {
      alert: jest.fn(),
    },
  }
})

describe('#useHome', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should provide method to change org', () => {
    const { result } = renderHook(useHome)
    act(() => {
      result.current.onOrganizationChange('some-org')
    })

    expect(result.current.githubDetails.organization).toBe('some-org')
  })

  it('should provide method to change repo', () => {
    const { result } = renderHook(useHome)

    act(() => {
      result.current.onRepositoryChange('some-repo')
    })

    expect(result.current.githubDetails.repository).toBe('some-repo')
  })

  it('should handle necessary actions on fetchIssues button press', async () => {
    const { result, rerender } = renderHook(useHome)

    act(async () => {
      result.current.onRepositoryChange('some-repo')

      result.current.onOrganizationChange('some-org')

      await rerender()

      result.current.onFetchIssuesPressed()

      expect(mockedNavigate).toBeCalledWith('Issues', {})
    })
  })

  it('should show an alert if there is no repo or no org setup when fetch issues button is pressed', () => {
    const { result } = renderHook(useHome)

    result.current.onFetchIssuesPressed()

    expect(Alert.alert).toBeCalled()
  })

  it('should provide onBookmarks pressed method', () => {
    const { result } = renderHook(useHome)

    result.current.onBookmarksPressed()

    expect(mockedNavigate).toBeCalledWith('Bookmarks', {})
  })
})
