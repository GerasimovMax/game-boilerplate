import { useEffect } from 'react'
import { useWorld } from 'koota/react'
import { Item as ItemTrait } from './traits'
import { Position, Collider, TriggerEvents } from '@/shared/traits'
import { type Vector3 } from '@/types'

export function Item({
  position = { x: 0, y: 0, z: 0 },
  count = 6,
  areaSize = 5
}: {
  position?: Vector3
  count?: number
  areaSize?: number
}) {
  const world = useWorld()

  useEffect(() => {
    const entities = Array.from({ length: count }).map(() => {
      const randomPosition = {
        x: position.x + (Math.random() - 0.5) * areaSize,
        y: position.y,
        z: position.z + (Math.random() - 0.5) * areaSize
      }

      return world.spawn(
        ItemTrait,
        Position(randomPosition),
        Collider({ type: 'sphere', radius: 0.15, isTrigger: true }),
        TriggerEvents
      )
    })

    return () => {
      for (const entity of entities) {
        if (world.has(entity)) entity.destroy()
      }
    }
  }, [world, count, areaSize, position])

  return null
}
