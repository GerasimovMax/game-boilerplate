import { useContext } from 'react'
import { InputContext } from '@/providers/input/InputContext'

export function useInput() {
  const context = useContext(InputContext)
  if (!context) throw new Error('useInput must be used within an <InputProvider>')
  return context
}
