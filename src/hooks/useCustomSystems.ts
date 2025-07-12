
import { playerController } from '@/entities/player/systems'
import { boxController } from '@/entities/box/systems'
import { itemController } from '@/entities/item/systems'
import type { ECSSystem } from '@/types'

export const useCustomSystems = (): ECSSystem[] => {
  return [
    playerController,
    boxController,
    itemController
  ]
}
