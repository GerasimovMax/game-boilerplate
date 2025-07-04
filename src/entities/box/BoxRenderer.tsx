import { useQuery } from 'koota/react'
import { Box } from './traits'
import { EntityRenderer } from '@/shared/EntityRenderer'

export function BoxRenderer() {
  const boxes = useQuery(Box)

  if (!boxes) return null

  return (
    <>
      {boxes.map((entity) => (
        <EntityRenderer key={entity} entity={entity} >
          <BoxView />
        </EntityRenderer>
      ))}
    </>
  )
}

export function BoxView() {
  return (
    <mesh position={[0, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  )
}
