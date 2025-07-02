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

export function PlayerView() {
  return (
    <mesh
      castShadow
      receiveShadow
      position={[0, 0.4, 0]}
    >
      <boxGeometry args={[0.3, 0.8, 0.3]} />
      <meshStandardMaterial color="red" />
    </mesh>
  )
}
