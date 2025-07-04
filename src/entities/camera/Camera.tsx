
import { useRef, useEffect } from 'react'
import { useWorld } from 'koota/react'
import { PerspectiveCamera } from '@react-three/drei'
import { Mesh, Position, Rotation } from '@/shared/traits'
import { Camera as CameraTrait } from './traits'
import { type PerspectiveCamera as PerspectiveCameraType } from 'three'
import { type Vector3 } from '@/types'
import { quat } from 'gl-matrix'

export function Camera({
  position = { x: 0, y: 0, z: 0 },
  rotation = { x: 0, y: 0, z: 0 },
  fov = 50,
  near = 0.1,
  far = 100,
}: {
  position?: Vector3
  rotation?: Vector3
  fov?: number
  near?: number
  far?: number
}) {
  const world = useWorld()
  const ref = useRef<PerspectiveCameraType>(null)

  useEffect(() => {
    if (!ref.current) return

    const quaternion = quat.create()
    quat.fromEuler(quaternion, rotation.x, rotation.y, rotation.z)
    ref.current.position.set(position.x, position.y, position.z)
    ref.current.quaternion.set(quaternion[0], quaternion[1], quaternion[2], quaternion[3])

    const entity = world.spawn(
      CameraTrait,
      Position(position),
      Rotation({ x: quaternion[0], y: quaternion[1], z: quaternion[2], w: quaternion[3] }),
      Mesh(ref.current)
    )

    return () => entity.destroy()
  }, [world, position, rotation])

  return (
    <PerspectiveCamera
      ref={ref}
      makeDefault
      fov={fov}
      near={near}
      far={far}
    />
  )
}
