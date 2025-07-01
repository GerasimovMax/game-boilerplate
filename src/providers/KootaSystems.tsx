import { useWorld } from 'koota/react'
import { useFrame } from '@react-three/fiber'
import { inputSystem, transformFromTraits, positionFromVelocity, syncPositionFromRigid } from '@/shared/systems'
import { playerController } from '@/entities/player/systems'
import { useInput } from '@/hooks/useInput'
import { type ReactNode } from 'react'

export function KootaSystems({ children }: { children: ReactNode }) {
  const world = useWorld()
  const keys = useInput()

  useFrame((_, delta) => {
    inputSystem(world, keys.current)
    transformFromTraits(world)
    positionFromVelocity(world, delta)
    syncPositionFromRigid(world)
    playerController(world)
  })

  return <>{children}</>
}
