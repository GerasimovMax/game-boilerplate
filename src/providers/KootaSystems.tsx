import { useWorld } from 'koota/react'
import { useFrame } from '@react-three/fiber'
import { useInput } from '@/hooks/useInput'
import { useBeforePhysicsStep, useAfterPhysicsStep } from '@react-three/rapier'
import {
  inputSystem,
  transformFromTraits,
  velocityFromDesiredVelocity,
  positionFromVelocity,
  syncTransformFromRigid,
  transformKinematicFromTraits
} from '@/shared/systems'
import { playerController } from '@/entities/player/systems'
import { boxController } from '@/entities/box/systems'
import { type ReactNode } from 'react'

export function KootaSystems({ children }: { children: ReactNode }) {
  const world = useWorld()
  const keys = useInput()

  useFrame((_, delta) => {
    inputSystem(world, keys.current)
    playerController(world)
    boxController(world)
    velocityFromDesiredVelocity(world, delta)
    positionFromVelocity(world, delta)
    transformFromTraits(world)
  })

  useBeforePhysicsStep(() => {
    transformKinematicFromTraits(world)
  })

  useAfterPhysicsStep(() => {
    syncTransformFromRigid(world)
  })

  return <>{children}</>
}
