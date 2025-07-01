import { useEntity } from '@/hooks/useEntities'

import { Player } from './traits'
import { EntityRenderer } from '@/shared/EntityRenderer'

export function PlayerRenderer() {
  const player = useEntity(Player)

  if (!player) return null

  return (
    <EntityRenderer entity={player}>
      <PlayerView />
    </EntityRenderer>
  )
}

export function PlayerView() {
  return (
    <mesh
      castShadow
      position={[0, 0.4, 0]}
      receiveShadow
    >
      <boxGeometry args={[0.3, 0.8, 0.3]} />
      <meshStandardMaterial color="red" />
    </mesh>
  )
}
