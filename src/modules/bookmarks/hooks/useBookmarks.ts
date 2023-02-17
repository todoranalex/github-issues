import { useContext, useEffect } from 'react'
import { StoreContext } from '../../generic/state/store'
import { getBookmarks } from '../state/actions'

const useBookmarks = () => {
  const { bookmarksThunkReducer } = useContext(StoreContext)
  const [state, thunkDispatch] = bookmarksThunkReducer

  useEffect(() => {
    thunkDispatch(getBookmarks())
  }, [thunkDispatch])

  return { state }
}

export default useBookmarks
