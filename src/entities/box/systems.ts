import { Box } from './traits'
import { Position, Physics } from '@/shared/traits'
import { type World } from 'koota'

export const boxController = (world: World) => {
  const boxes = world.query(Box)
  if (!boxes) return

  for (const box of boxes) {
    const position = box.get(Position)
    if (position && position.y < -10) {
      box.destroy()
      world.spawn(
        Box,
        Position({ x: 0, y: 1.5, z: 0 }),
        Physics
      )
    }
  }
}
