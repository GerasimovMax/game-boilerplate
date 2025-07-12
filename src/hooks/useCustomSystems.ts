
import { playerController } from '@/entities/player/systems'
import { boxController } from '@/entities/box/systems'
import type { ECSSystem } from '@/types'

export const useCustomSystems = (): ECSSystem[] => {
  return [
    playerController,
    boxController
  ]
}
