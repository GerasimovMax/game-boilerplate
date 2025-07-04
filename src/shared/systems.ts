import { Mesh, Position, Rotation, Velocity, Input, Physics, RigidBody } from './traits'
import { type World } from 'koota'
import { vec3 } from 'gl-matrix'

/** Set mesh position and rotation from position and rotation traits */
export const transformFromTraits = (world: World) => {
  const entities = world.query(Position, Mesh)

  for (const entity of entities) {
    const mesh = entity.get(Mesh)
    if (!mesh) continue

    const position = entity.get(Position)
    if (position) {
      mesh.position.set(position.x, position.y, position.z)
    }

    const rotation = entity.get(Rotation)
    if (rotation) {
      mesh.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)
    }
  }
}

/** Effect only on simple entities or physics with type kinematic */
export const positionFromVelocity = (world: World, delta: number) => {
  const entities = world.query(Position, Velocity)
    .filter((entity) => !entity.has(Physics) || entity.get(Physics)?.type === 'kinematic')

  for (const entity of entities) {
    const velocity = entity.get(Velocity)
    const position = entity.get(Position)

    if (velocity && position) {
      const posVec = vec3.fromValues(position.x, position.y, position.z)
      const velVec = vec3.fromValues(velocity.x, velocity.y, velocity.z)

      const displacement = vec3.create()
      vec3.scale(displacement, velVec, delta)

      const nextPosVec = vec3.create()
      vec3.add(nextPosVec, posVec, displacement)

      entity.set(Position, {
        x: nextPosVec[0],
        y: nextPosVec[1],
        z: nextPosVec[2]
      })
    }
  }
}

/** Set traits position and rotation from rigid body */
export const syncTransformFromRigid = (world: World) => {
  const entities = world.query(Physics, RigidBody)
    .filter((entity) => entity.get(Physics)?.type === 'dynamic')

  for (const entity of entities) {
    const rigidBody = entity.get(RigidBody)

    const rigidPosition = rigidBody?.translation()
    if (rigidPosition && entity.has(Position)) {
      entity.set(Position, rigidPosition)
    }

    const rigidRotation = rigidBody?.rotation()
    if (rigidRotation && entity.has(Rotation)) {
      entity.set(Rotation, rigidRotation)
    }
  }
}

/** Set kinematic body position from traits position */
export const transformKinematicFromTraits = (world: World) => {
  const entities = world.query(Physics, RigidBody)
    .filter((entity) => entity.get(Physics)?.type === 'kinematic')

  for (const entity of entities) {
    const rigidBody = entity.get(RigidBody)
    if (!rigidBody) continue

    const position = entity.get(Position)
    if (position) {
      rigidBody.setNextKinematicTranslation(position)
    }

    const rotation = entity.get(Rotation)
    if (rotation) {
      rigidBody.setNextKinematicRotation(rotation)
    }
  }
}

export const inputSystem = (world: World, keys: Set<string>) => {
  const entities = world.query(Input)

  for (const entity of entities) {
    const isPressed = (key: string) => keys.has(key)

    entity.set(Input, {
      up: isPressed('w') || isPressed('arrowup'),
      down: isPressed('s') || isPressed('arrowdown'),
      left: isPressed('a') || isPressed('arrowleft'),
      right: isPressed('d') || isPressed('arrowright'),
      use: isPressed('e')
    })
  }
}
