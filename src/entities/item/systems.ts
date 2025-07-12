import { Item } from './traits'
import { Player } from '../player/traits'
import { Triggers } from '@/shared/traits'
import { type ECSSystem } from '@/types'

export const itemController: ECSSystem = ({ world }) => {
  const entities = world.query(Item, Triggers)

  for (const entity of entities) {
    const triggers = entity.get(Triggers)
    const player = triggers?.find((e) => e.has(Player))

    if (player) {
      entity.destroy()
    }
  }
}
