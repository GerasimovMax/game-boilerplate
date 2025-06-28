import { type World } from 'koota'
import { Player } from './traits'
import { Input, Velocity, Controllable } from '@/shared/traits'
import { normalize } from '@/shared/math'

export const playerController = (world: World) => {
  const player = world.queryFirst(Player, Controllable)
  if (!player) return

  const input = player.get(Input)
  if (input) {
    const direction = { x: 0, y: 0, z: 0 }

    if (input.up) {
      direction.x += 1
      direction.z -= 1
    }
    if (input.down) {
      direction.x -= 1
      direction.z += 1
    }
    if (input.left) {
      direction.x -= 1
      direction.z -= 1
    }
    if (input.right) {
      direction.x += 1
      direction.z += 1
    }

    const velocity = normalize(direction)
    player.set(Velocity, velocity)
  }
}
