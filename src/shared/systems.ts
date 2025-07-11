import { Mesh, Position, Rotation, Velocity, Input, Physics, RigidBody, DesiredVelocity, Damping, Collider } from './traits'
import { type World } from 'koota'
import { vec3 } from 'gl-matrix'

/**
 * Smoothly interpolates velocity towards desired velocity based on damping.
 * Ignores entities with dynamic bodies.
 */
export const velocityFromDesiredVelocity = (world: World, delta: number) => {
  const entities = world.query(Velocity, DesiredVelocity)
    .filter((entity) => entity.get(Physics)?.type !== 'dynamic')

  for (const entity of entities) {
    const current = entity.get(Velocity) || { x: 0, y: 0, z: 0 }
    const desired = entity.get(DesiredVelocity) || { x: 0, y: 0, z: 0 }
    const damping = entity.get(Damping)?.value

    const currentVec = vec3.fromValues(current.x, current.y, current.z)
    const desiredVec = vec3.fromValues(desired.x, desired.y, desired.z)

    if (damping) {
      vec3.lerp(currentVec, currentVec, desiredVec, delta * damping)
    } else {
      vec3.copy(currentVec, desiredVec)
    }

    entity.set(Velocity, {
      x: currentVec[0],
      y: currentVec[1],
      z: currentVec[2]
    })
  }
}

/**
 * Sets position from velocity.
 * Affects only simple entities or kinematic bodies.
 */
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

/**
 * Sets mesh position and rotation from position and rotation traits.
 * Doesn't affect entities with colliders.
 */
export const transformMeshFromTraits = (world: World) => {
  const entities = world.query(Position, Mesh)
    .filter((entity) => !entity.get(Collider))

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

/**
 * Sets traits position, rotation and velocity from rigid body.
 * Only effects dynamic entities.
 */
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

    const rigidVelocity = rigidBody?.linvel()
    if (rigidVelocity && entity.has(Velocity)) {
      entity.set(Velocity, {
        x: rigidVelocity.x,
        y: rigidVelocity.y,
        z: rigidVelocity.z
      })
    }
  }
}

/** Sets kinematic body position and rotation from traits. */
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

/** Applies force to dynamic bodies based on their desired velocity. */
export const applyForceFromDesiredVelocity = (world: World) => {
  const entities = world.query(Physics, RigidBody)
    .filter((entity) => entity.get(Physics)?.type === 'dynamic')

  for (const entity of entities) {
    const rigidBody = entity.get(RigidBody)
    if (!rigidBody) continue

    const desiredVelocity = entity.get(DesiredVelocity)
    if (desiredVelocity) {
      rigidBody.addForce(desiredVelocity, true)
    }
  }
}

/** Simple input system. */
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
