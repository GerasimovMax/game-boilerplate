import { Player } from './traits'
import { Input, Controllable, Position, Velocity } from '@/shared/traits'
import { Speed } from './traits'
import { vec3 } from 'gl-matrix'
import type { ECSSystem } from '@/types'

export const playerController: ECSSystem = ({ world, delta }) => {
  const player = world.queryFirst(Player, Controllable)
  if (!player) return

  const input = player.get(Input)
  const speed = player.get(Speed)?.value ?? 1
  const direction = vec3.create()
  const damping = 10

  if (input?.up) vec3.add(direction, direction, [-1, 0, -1])
  if (input?.down) vec3.add(direction, direction, [1, 0, 1])
  if (input?.left) vec3.add(direction, direction, [-1, 0, 1])
  if (input?.right) vec3.add(direction, direction, [1, 0, -1])

  const hasInput = vec3.length(direction) > 0
  const targetVelocity = vec3.create()

  if (hasInput) {
    vec3.normalize(targetVelocity, direction)
    vec3.scale(targetVelocity, targetVelocity, speed)
  }

  const current = player.get(Velocity) ?? { x: 0, y: 0, z: 0 }
  const currentVec = vec3.fromValues(current.x, current.y, current.z)

  vec3.lerp(currentVec, currentVec, targetVelocity, delta * damping)

  const position = player.get(Position)
  if (position) {
    const radius = 0.15
    const boundary = 5

    const posVec = vec3.fromValues(position.x, 0, position.z)

    const displacement = vec3.create()
    vec3.scale(displacement, currentVec, delta)

    const nextPos = vec3.create()
    vec3.add(nextPos, posVec, displacement)

    const minX = nextPos[0] - radius
    const maxX = nextPos[0] + radius
    const minZ = nextPos[2] - radius
    const maxZ = nextPos[2] + radius

    if (minX < -boundary || maxX > boundary) {
      currentVec[0] = 0
    }
    if (minZ < -boundary || maxZ > boundary) {
      currentVec[2] = 0
    }
  }

  player.set(Velocity, {
    x: currentVec[0],
    y: currentVec[1],
    z: currentVec[2]
  })
}
