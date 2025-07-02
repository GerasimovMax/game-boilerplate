import { useQueryFirst } from 'koota/react'
import { Land } from './traits'
import { EntityRenderer } from '@/shared/EntityRenderer'

export function LandRenderer() {
  const land = useQueryFirst(Land)

  if (!land) return null

  return (
    <EntityRenderer entity={land}>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </EntityRenderer>
  )
}
