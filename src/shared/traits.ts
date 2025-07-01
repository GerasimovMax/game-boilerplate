import { trait } from 'koota'
import { Object3D } from 'three'
import { type RapierRigidBody, type RigidBodyTypeString } from '@react-three/rapier'

export const Position = trait({ x: 0, y: 0, z: 0 })
export const Rotation = trait({ x: 0, y: 0, z: 0 })
export const Velocity = trait({ x: 0, y: 0, z: 0 })
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
