import { trait } from 'koota'
import { Object3D } from 'three'
import { type RapierRigidBody, type RigidBodyTypeString } from '@react-three/rapier'
import { type Quaternion, type Vector3 } from '@/types'

export const Position = trait<Vector3>({ x: 0, y: 0, z: 0 })
export const Velocity = trait<Vector3>({ x: 0, y: 0, z: 0 })
export const Rotation = trait<Quaternion>({ x: 0, y: 0, z: 0, w: 1 })

export const Mesh = trait(() =>new Object3D())
export const Physics = trait<{ type: RigidBodyTypeString }>({ type: 'dynamic' })
export const RigidBody = trait(() => ({}) as RapierRigidBody)

export const Controllable = trait()
export const Input = trait({
  up: false,
  down: false,
  left: false,
  right: false,
  use: false
})
