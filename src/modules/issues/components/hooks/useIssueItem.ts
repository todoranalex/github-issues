import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react'
import { Issue } from '../..'
import { removeBookmark, addBookmark } from '../../../bookmarks/state/actions'
import { StoreContext } from '../../../generic/state/store'

const useIssueItem = (issue: Issue) => {
  const navigation = useNavigation()

  const { bookmarksThunkReducer } = useContext(StoreContext)
  const [state, thunkDispatch] = bookmarksThunkReducer

  const isBookmarked = !!state.bookmarks.find(b => b.number === issue.number)

  const onBookmark = () => {
    const isBookmarked = state.bookmarks.find(b => b.number === issue.number)

    if (isBookmarked) {
      thunkDispatch(removeBookmark(issue))
    } else {
      thunkDispatch(addBookmark(issue))
    }
  }

  const onPress = () => {
    navigation.navigate('IssueDetails', { issue })
  }

  return {
    isBookmarked,

    onBookmark,
    onPress,
  }
}

export default useIssueItem
