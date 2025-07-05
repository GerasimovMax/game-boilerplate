import { type World } from 'koota'
import { Player } from './traits'
import { Input, DesiredVelocity, Controllable } from '@/shared/traits'
import { Speed } from './traits'
import { vec3 } from 'gl-matrix'

export const playerController = (world: World) => {
  const player = world.queryFirst(Player, Controllable)
  if (!player) return

  const input = player.get(Input)
  const speed = player.get(Speed)?.value ?? 1
  const direction = vec3.create()

  if (input?.up) vec3.add(direction, direction, [-1, 0, -1])
  if (input?.down) vec3.add(direction, direction, [1, 0, 1])
  if (input?.left) vec3.add(direction, direction, [-1, 0, 1])
  if (input?.right) vec3.add(direction, direction, [1, 0, -1])

  const hasInput = vec3.length(direction) > 0

  const velocity = vec3.create()
  if (hasInput) {
    vec3.normalize(velocity, direction)
    vec3.scale(velocity, velocity, speed)
  }

  const desired = vec3.create()
  if (hasInput) {
    vec3.normalize(desired, direction)
    vec3.scale(desired, desired, speed)
  }

  player.set(DesiredVelocity, {
    x: desired[0],
    y: desired[1],
    z: desired[2]
  })
}
