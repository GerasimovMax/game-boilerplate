import { Mesh, Position, Rotation, Velocity, Input } from './traits'
import { type World } from 'koota'
import { multiply, add } from './math'

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
      mesh.rotation.set(rotation.x, rotation.y, rotation.z)
    }
  }
}

export const positionFromVelocity = (world: World, delta: number) => {
  const entities = world.query(Position, Velocity)

  for (const entity of entities) {
    const velocity = entity.get(Velocity)
    const position = entity.get(Position)

    if (velocity && position) {
      const displacement = multiply(velocity, delta)
      const nextPosition = add(position, displacement)
      entity.set(Position, nextPosition)
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
