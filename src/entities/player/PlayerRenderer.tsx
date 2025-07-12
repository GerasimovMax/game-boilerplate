import { useQueryFirst } from 'koota/react'
import { Player } from './traits'
import { EntityRenderer } from '@/shared/EntityRenderer'

export function PlayerRenderer() {
  const player = useQueryFirst(Player)

  if (!player) return null

  return (
    <EntityRenderer entity={player}>
      <PlayerView />
    </EntityRenderer>
  )
}

function PlayerView() {
  return (
    <mesh
      castShadow
      receiveShadow
    >
      <boxGeometry args={[0.3, 0.8, 0.3]} />
      <meshStandardMaterial color="red" />
    </mesh>
  )
}
