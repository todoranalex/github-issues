import { Dispatch, Reducer, ReducerState, useMemo, useReducer } from 'react'

export function isFunction(f: any): f is Function {
  return typeof f === 'function'
}

function useThunkReducer<S, A>(
  reducer: React.Reducer<S, A>,
  initialState: ReducerState<Reducer<S, A>>
): [S, (action: A | ((dispatch: Dispatch<A>) => void)) => void] {
  const [state, dispatch] = useReducer(reducer, initialState)

  const thunkDispatch = useMemo(
    () =>
      (action: A | ((dispatch: Dispatch<A>) => void)): void => {
        if (isFunction(action)) {
          return action(dispatch)
        }

        return dispatch(action)
      },
    [dispatch]
  )

  return [state, thunkDispatch]
}

export default useThunkReducer
