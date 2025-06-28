import { createContext } from 'react'
import { useKeyboard } from '@/hooks/useKeyboard'

export const InputContext = createContext<ReturnType<typeof useKeyboard> | null>(null)
