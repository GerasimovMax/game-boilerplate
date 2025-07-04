import { useQueryFirst } from 'koota/react'
import { Land } from './traits'
import { EntityRenderer } from '@/shared/EntityRenderer'

export function LandRenderer() {
  const land = useQueryFirst(Land)

  if (!land) return null

  return (
    <EntityRenderer entity={land}>
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[10, 0.2, 10]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </EntityRenderer>
  )
}
