import { trait } from 'koota'
import { Object3D } from 'three'
import { type RapierRigidBody } from '@react-three/rapier'
import { type Quaternion, type Vector3 } from '@/types'

export const Position = trait<Vector3>({ x: 0, y: 0, z: 0 })
export const Velocity = trait<Vector3>({ x: 0, y: 0, z: 0 })
export const DesiredVelocity = trait<Vector3>({ x: 0, y: 0, z: 0 })
export const Damping = trait({ value: 10 })
export const Rotation = trait<Quaternion>({ x: 0, y: 0, z: 0, w: 1 })

export const Mesh = trait(() =>new Object3D())
export const Physics = trait<{ type: 'dynamic' | 'static' | 'kinematic' }>({ type: 'dynamic' })
export const RigidBody = trait(() => ({}) as RapierRigidBody)

export const Controllable = trait()
export const Input = trait({
  up: false,
  down: false,
  left: false,
  right: false,
  use: false
})
