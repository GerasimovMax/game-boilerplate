
import { useRef, useEffect } from 'react'
import { useWorld } from 'koota/react'
import { OrthographicCamera } from '@react-three/drei'
import { Mesh, Position, Rotation } from '@/shared/traits'
import { Camera as CameraTrait } from './traits'
import { type OrthographicCamera as OrthographicCameraImpl } from 'three'
import { type Vector3 } from '@/types'

export function Camera({
  position = { x: 0, y: 0, z: 0 },
  rotation = { x: 0, y: 0, z: 0 },
}: {
  position?: Vector3
  rotation?: Vector3
}) {
  const world = useWorld()
  const ref = useRef<OrthographicCameraImpl>(null)

  useEffect(() => {
    if (!ref.current) return

    const entity = world.spawn(
      CameraTrait,
      Position(position),
      Rotation(rotation),
      Mesh(ref.current)
    )

    return () => entity.destroy()
  }, [world, position, rotation])

  return (
    <OrthographicCamera
      ref={ref}
      makeDefault
      zoom={100}
    />
  )
}
