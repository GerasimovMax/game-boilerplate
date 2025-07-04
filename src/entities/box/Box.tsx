import { useEffect } from 'react'
import { useWorld } from 'koota/react'
import { Box as BoxTrait } from './traits'
import { Position, Physics, Rotation } from '@/shared/traits'
import { quat } from 'gl-matrix'
import { type Vector3 } from '@/types'

export function Box({
  center = { x: 0, y: 0, z: 0 },
  count = 6,
  areaSize = 5
}: {
  center?: Vector3
  count?: number
  areaSize?: number
}) {
  const world = useWorld()

  useEffect(() => {
    const entities = Array.from({ length: count }).map(() => {
      const position = {
        x: center.x + (Math.random() - 0.5) * areaSize,
        y: center.y,
        z: center.z + (Math.random() - 0.5) * areaSize
      }

      const rotation = quat.create()
      quat.random(rotation)

      return world.spawn(
        BoxTrait,
        Position(position),
        Rotation({ x: rotation[0], y: rotation[1], z: rotation[2], w: rotation[3] }),
        Physics
      )
    })

    return () => {
      for (const entity of entities) {
        if (world.has(entity)) entity.destroy()
      }
    }
  }, [world, count, areaSize, center])

  return null
}
