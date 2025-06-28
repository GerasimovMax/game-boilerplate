import { createWorld } from 'koota'
import { WorldProvider } from 'koota/react'
import { useMemo, type ReactNode } from 'react'

export function RootProvider({ children }: { children: ReactNode }) {
  const world = useMemo(() => createWorld(), [])

  return <WorldProvider world={world}>{children}</WorldProvider>
}
