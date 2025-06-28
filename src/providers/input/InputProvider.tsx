import { type ReactNode } from 'react'
import { useKeyboard } from '@/hooks/useKeyboard'
import { InputContext } from './InputContext'

export function InputProvider({ children }: { children: ReactNode }) {
  const keys = useKeyboard()
  return <InputContext.Provider value={keys}>{children}</InputContext.Provider>
}
