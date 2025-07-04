import { useEffect } from 'react'
import { useWorld } from 'koota/react'
import { Position, Velocity, Controllable, Input, Physics } from '@/shared/traits'
import { Player as PlayerTrait, Speed } from './traits'
import { type Vector3 } from '@/types'

export function Player({ position = { x: 0, y: 0, z: 0 } }: { position?: Vector3 }) {
  const world = useWorld()

  useEffect(() => {
    const entity = world.spawn(
      PlayerTrait,
      Position(position),
      Velocity(),
      Controllable,
      Input(),
      Speed({ value: 2.5 }),
      Physics({ type: 'kinematic' })
    )

    return () => entity.destroy()
  }, [world, position])

  return null
}
