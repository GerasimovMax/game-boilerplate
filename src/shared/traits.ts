import { trait, type Entity } from 'koota'
import { Object3D } from 'three'
import { type RapierRigidBody } from '@react-three/rapier'
import { type Quaternion, type Vector3 } from '@/types'

export type PhysicsType = 'dynamic' | 'static' | 'kinematic'
export type ColliderType =
  { type: 'box'; size: { x: number; y: number; z: number }, isTrigger?: boolean } |
  { type: 'sphere'; radius: number, isTrigger?: boolean } |
  { type: 'capsule'; radius: number; height: number, isTrigger?: boolean }
export type AutoColliderType = 'box' | 'sphere'

export const Position = trait<Vector3>({ x: 0, y: 0, z: 0 })
export const Velocity = trait<Vector3>({ x: 0, y: 0, z: 0 })
export const DesiredVelocity = trait<Vector3>({ x: 0, y: 0, z: 0 })
export const Damping = trait({ value: 10 })
export const Rotation = trait<Quaternion>({ x: 0, y: 0, z: 0, w: 1 })

export const Mesh = trait(() =>new Object3D())
export const RigidBody = trait(() => ({}) as RapierRigidBody)
export const Physics = trait<{ type: PhysicsType , autoCollider: AutoColliderType | undefined, isTrigger: boolean | undefined }>({ type: 'dynamic', autoCollider: undefined, isTrigger: undefined })
export const Collider = trait((collider: ColliderType = { type: 'box', size: { x: 1, y: 1, z: 1 } }) => {
  switch (collider.type) {
    case 'box':
      return { type: 'box', size: collider.size, isTrigger: collider.isTrigger } as ColliderType
    case 'sphere':
        return { type: 'sphere', radius: collider.radius, isTrigger: collider.isTrigger } as ColliderType
    case 'capsule':
      return { type: 'capsule', radius: collider.radius, height: collider.height, isTrigger: collider.isTrigger } as ColliderType
    default:
      throw new Error('Invalid collider type')
  }
})
export const CollisionEvents = trait()
export const Collisions = trait(() => [] as Entity[])
export const TriggerEvents = trait()
export const Triggers = trait(() => [] as Entity[])

export const Controllable = trait()
export const Input = trait({
  up: false,
  down: false,
  left: false,
  right: false,
  use: false
})
