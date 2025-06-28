import { useRef, useEffect } from 'react'
import { useWorld } from 'koota/react'
import { Mesh, Position, Velocity, Controllable, Input } from '@/shared/traits'
import { RenderPlayer } from './RenderPlayer'
import { Player as PlayerTrait } from './traits'
import { type Object3D } from 'three'
import { type Vector3 } from '@/types'

export function Player({ position = { x: 0, y: 0, z: 0 } }: { position?: Vector3 }) {
  const world = useWorld()
  const ref = useRef<Object3D>(null)

  useEffect(() => {
    if (!ref.current) return

    const entity = world.spawn(
      PlayerTrait,
      Position(position),
      Velocity(),
      Controllable,
      Input(),
      Mesh(ref.current)
    )

    return () => entity.destroy()
  }, [world, position])

  return (
    <group ref={ref}>
      <RenderPlayer />
    </group>
  )
}
