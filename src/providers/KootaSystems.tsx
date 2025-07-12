import { useWorld } from 'koota/react'
import { useFrame } from '@react-three/fiber'
import { useBeforePhysicsStep, useAfterPhysicsStep } from '@react-three/rapier'
import { useInput } from '@/hooks/useInput'
import { useCustomSystems } from '@/hooks/useCustomSystems'
import {
  inputSystem,
  transformMeshFromTraits,
  velocityFromDesiredVelocity,
  positionFromVelocity,
  syncTransformFromRigid,
  transformKinematicFromTraits,
  applyForceFromDesiredVelocity,
} from '@/shared/systems'
import { type ReactNode } from 'react'

export function KootaSystems({ children }: { children: ReactNode }) {
  const world = useWorld()
  const keys = useInput()
  const customSystems = useCustomSystems()

  useFrame((_, delta) => {
    const context = { world, delta, keys: keys.current }

    inputSystem(context)

    for (const system of customSystems) {
      system(context)
    }

    velocityFromDesiredVelocity(context)
    positionFromVelocity(context)
    transformMeshFromTraits(context)
  })

  useBeforePhysicsStep(() => {
    transformKinematicFromTraits(world)
    applyForceFromDesiredVelocity(world)
  })

  useAfterPhysicsStep(() => {
    syncTransformFromRigid(world)
  })

  return <>{children}</>
}
