import { useRef } from 'react'
import { Mesh } from 'three'
import { useQuery } from 'koota/react'
import { useFrame } from '@react-three/fiber'
import { Item } from './traits'
import { EntityRenderer } from '@/shared/EntityRenderer'

export function ItemRenderer() {
  const items = useQuery(Item)

  if (!items) return null

  return (
    <>
      {items.map((entity) => (
        <EntityRenderer key={entity} entity={entity} >
          <ItemView />
        </EntityRenderer>
      ))}
    </>
  )
}

function ItemView() {
  const mesh = useRef<Mesh>(null)
  const time = useRef(Math.random() * Math.PI * 2)

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.position.y = Math.sin(time.current) * 0.1
      time.current += delta
    }
  })

  return (
    <mesh ref={mesh} castShadow receiveShadow>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}
