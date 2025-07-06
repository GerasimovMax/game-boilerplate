import { useRef, useEffect } from 'react'
import { CuboidCollider, BallCollider, CapsuleCollider, RigidBody, type RapierRigidBody, type RigidBodyTypeString, type RigidBodyAutoCollider } from '@react-three/rapier'
import { Mesh, RigidBody as RigidBodyTrait, Physics, Position, Rotation, Collider, type PhysicsType, type ColliderType, type AutoColliderType } from '@/shared/traits'
import { type Entity } from 'koota'
import { type Object3D } from 'three'
import { type ReactNode } from 'react'


const physicsTypeMapping: Record<PhysicsType, RigidBodyTypeString> = {
  static: 'fixed',
  kinematic: 'kinematicPosition',
  dynamic: 'dynamic',
}

const autoColliderTypeMapping: Record<AutoColliderType, RigidBodyAutoCollider> = {
  box: 'cuboid',
  sphere: 'ball'
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
  const collider = entity.get(Collider)

  return physics ? (
    <RigidBody
      ref={rigidBodyRef}
      type={physicsTypeMapping[physics.type]}
      colliders={collider ? false : autoColliderTypeMapping[physics.autoCollider!]}
    >
      {collider && <ColliderRenderer collider={collider} />}
      {children}
    </RigidBody>
  ) : (
    <group ref={ref}>
      {children}
    </group>
  )
}

function ColliderRenderer({ collider }: { collider: ColliderType | null }) {
  if (!collider) return null

  switch (collider.type) {
    case 'box':
      return <CuboidCollider args={[collider.size.x, collider.size.y, collider.size.z]} />
    case 'sphere':
      return <BallCollider args={[collider.radius]} />
    case 'capsule':
      return <CapsuleCollider args={[collider.radius, collider.height]} />
    default:
      return null
  }
}
