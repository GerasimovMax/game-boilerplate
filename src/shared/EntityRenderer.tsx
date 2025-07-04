import { useRef, useEffect } from 'react'
import { RigidBody, type RapierRigidBody, type RigidBodyTypeString } from '@react-three/rapier'
import { Mesh, RigidBody as RigidBodyTrait, Physics, Position, Rotation } from '@/shared/traits'
import { type Entity } from 'koota'
import { type Object3D } from 'three'
import { type ReactNode } from 'react'


const physicsTypeMapping: Record<string, RigidBodyTypeString> = {
  static: 'fixed',
  kinematic: 'kinematicPosition',
  dynamic: 'dynamic',
}

export function EntityRenderer({ entity, children }: { entity: Entity; children: ReactNode }) {
  const ref = useRef<Object3D>(null)
  const rigidBodyRef = useRef<RapierRigidBody>(null)

  useEffect(() => {
    if (!entity) return

    const physics = entity.get(Physics)
    const position = entity.get(Position) || { x: 0, y: 0, z: 0 }
    const rotation = entity.get(Rotation) || { x: 0, y: 0, z: 0, w: 1 }

    if (physics && rigidBodyRef.current) {
      entity.add(RigidBodyTrait(rigidBodyRef.current))
      rigidBodyRef.current.setTranslation(position, false)
      rigidBodyRef.current.setRotation(rotation, false)

      return () => {
        rigidBodyRef.current = null
        entity.remove(RigidBodyTrait)
      }
    }

    if (ref.current) {
      entity.add(Mesh(ref.current))
      ref.current.position.set(position.x, position.y, position.z)
      ref.current.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)

      return () => {
        ref.current = null
        entity.remove(Mesh)
      }
    }
  }, [entity])

  const physics = entity.get(Physics)

  return physics ? (
    <RigidBody
      ref={rigidBodyRef}
      type={physicsTypeMapping[physics.type]}
    >
      {children}
    </RigidBody>
  ) : (
    <group ref={ref}>
      {children}
    </group>
  )
}
