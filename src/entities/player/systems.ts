import { type World } from 'koota'
import { Player } from './traits'
import { Input, Velocity, Controllable } from '@/shared/traits'
import { Speed } from './traits'
import { vec3 } from 'gl-matrix'

export const playerController = (world: World) => {
  const player = world.queryFirst(Player, Controllable)
  if (!player) return

  const input = player.get(Input)
  const speed = player.get(Speed)
  if (input) {
    const direction = vec3.create()

    if (input.up) {
      direction[0] -= 1
      direction[2] -= 1
    }
    if (input.down) {
      direction[0] += 1
      direction[2] += 1
    }
    if (input.left) {
      direction[0] -= 1
      direction[2] += 1
    }
    if (input.right) {
      direction[0] += 1
      direction[2] -= 1
    }

    const velocity = vec3.create()
    vec3.normalize(velocity, direction)
    vec3.scale(velocity, velocity, speed?.value ?? 1)

    player.set(Velocity, { x: velocity[0], y: velocity[1], z: velocity[2] })
  }
}
