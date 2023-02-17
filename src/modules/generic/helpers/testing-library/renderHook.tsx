import { RenderHookOptions, renderHook as renderHookFn } from '@testing-library/react-hooks'
import React from 'react'
import StoreMock from '../../state/store/mocks'

/**
 * Custom `renderHook` function implementation to be able to easily wrap test environment providers
 *
 * https://testing-library.com/docs/react-testing-library/setup/#custom-render
 */
export const renderHook = <TProps, TResult>(
  callback: (props: TProps) => TResult,
  options?: RenderHookOptions<TProps>
) => {
  const result = renderHookFn(callback, {
    wrapper: ({ children }) => <StoreMock {...options}>{children}</StoreMock>,
    ...options,
  })

  return {
    ...result,
  }
}

export { act } from '@testing-library/react-hooks'

export type { RenderResult } from '@testing-library/react-hooks'
