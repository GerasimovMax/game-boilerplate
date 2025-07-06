import { trait } from 'koota'
import { Object3D } from 'three'
import { type RapierRigidBody } from '@react-three/rapier'
import { type Quaternion, type Vector3 } from '@/types'

export type PhysicsType = 'dynamic' | 'static' | 'kinematic'
export type ColliderType =
  { type: 'box'; size: { x: number; y: number; z: number } } |
  { type: 'sphere'; radius: number } |
  { type: 'capsule'; radius: number; height: number }
export type AutoColliderType = 'box' | 'sphere'

export const Position = trait<Vector3>({ x: 0, y: 0, z: 0 })
export const Velocity = trait<Vector3>({ x: 0, y: 0, z: 0 })
export const DesiredVelocity = trait<Vector3>({ x: 0, y: 0, z: 0 })
export const Damping = trait({ value: 10 })
export const Rotation = trait<Quaternion>({ x: 0, y: 0, z: 0, w: 1 })

export const Mesh = trait(() =>new Object3D())
export const RigidBody = trait(() => ({}) as RapierRigidBody)
export const Physics = trait<{ type: PhysicsType , autoCollider: AutoColliderType | undefined }>({ type: 'dynamic', autoCollider: undefined })
export const Collider = trait((collider: ColliderType = { type: 'box', size: { x: 1, y: 1, z: 1 } }) => {
  switch (collider.type) {
    case 'box':
      return { type: 'box', size: collider.size } as ColliderType
    case 'sphere':
        return { type: 'sphere', radius: collider.radius } as ColliderType
    case 'capsule':
      return { type: 'capsule', radius: collider.radius, height: collider.height } as ColliderType
    default:
      throw new Error('Invalid collider type')
  }
})

export const Controllable = trait()
export const Input = trait({
  up: false,
  down: false,
  left: false,
  right: false,
  use: false
})
