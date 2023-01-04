import {act, renderHook} from '@testing-library/react-hooks';
import useThunkReducer, {isFunction} from '.';

describe('#middlewares', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  type State = {
    someParam: string;
  };

  type Action = {
    type: 'change-some-param';
    payload: {
      someParam: string;
    };
  };

  const initialState: State = {
    someParam: 'some-value',
  };

  const funcAction = (someParam: string) => (dispatch: any) => {
    dispatch({
      type: 'change-some-param',
      payload: {someParam},
    });
  };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'change-some-param':
        return {...state, someParam: action.payload.someParam};
    }
  };

  describe('isFunction util', () => {
    it('should detect if argument is a function', () => {
      expect(isFunction(jest.fn())).toBeTruthy();
      expect(
        isFunction({
          property: 'some-property',
        }),
      ).toBeFalsy();
    });
  });

  describe('useThunkReducer', () => {
    it('should update state if object action is received', async () => {
      const {result} = renderHook(() => useThunkReducer(reducer, initialState));

      const [state, thunkDispatch] = result.current;

      expect(state).toStrictEqual(initialState);

      act(async () => {
        // Update state via action object
        thunkDispatch({
          type: 'change-some-param',
          payload: {
            someParam: 'some-changed-value-via-plain-obj-action',
          },
        });

        // State is updated
        expect(state).toStrictEqual({
          someParam: 'some-changed-value-via-plain-obj-action',
        });
      });
    });

    it('should update state if function action is received', async () => {
      const {result} = renderHook(() => useThunkReducer(reducer, initialState));

      const [state, thunkDispatch] = result.current;

      expect(state).toStrictEqual(initialState);

      act(async () => {
        // Update state via action function
        thunkDispatch(funcAction('some-changed-value-via-func-action'));

        // State is updated
        expect(state).toStrictEqual({
          someParam: 'some-changed-value-via-func-action',
        });
      });
    });
  });
});
