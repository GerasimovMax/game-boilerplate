import { useRef, useEffect } from 'react'
import { RigidBody, type RapierRigidBody } from '@react-three/rapier'
import { Mesh, RigidBody as RigidBodyTrait, Physics, Position, Rotation } from '@/shared/traits'
import { vector3ToArray } from '@/shared/utils'
import { type Entity } from 'koota'
import { type Object3D } from 'three'
import { type ReactNode } from 'react'

export function EntityRenderer({ entity, children }: { entity: Entity; children: ReactNode }) {
  const ref = useRef<Object3D>(null)
  const rigidBodyRef = useRef<RapierRigidBody>(null)

  useEffect(() => {
    if (!entity) return
    const physics = entity.get(Physics)

    if (physics && rigidBodyRef.current) {
      entity.add(RigidBodyTrait(rigidBodyRef.current))
      return () => entity.remove(RigidBodyTrait)
    }

    if (ref.current) {
      entity.add(Mesh(ref.current))
      return () => entity.remove(Mesh)
    }
  }, [entity])

  const physics = entity.get(Physics)
  const position = entity.get(Position) || { x: 0, y: 0, z: 0 }
  const rotation = entity.get(Rotation) || { x: 0, y: 0, z: 0 }

  return physics ? (
    <RigidBody
      ref={rigidBodyRef}
      type={physics.type}
      position={vector3ToArray(position)}
      rotation={vector3ToArray(rotation)}
    >
      {children}
    </RigidBody>
  ) : (
    <group
      ref={ref}
      position={vector3ToArray(position)}
      rotation={vector3ToArray(rotation)}
    >
      {children}
    </group>
  )
}
