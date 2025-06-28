import { useWorld } from 'koota/react'
import { useEffect, useRef } from 'react'
import { Mesh } from '@/shared/traits'
import { RenderLand } from './RenderLand'
import { Land as LandTrait } from './traits'
import { type Object3D } from 'three'

export function Land() {
  const world = useWorld()
  const ref = useRef<Object3D>(null)

  useEffect(() => {
    if (!ref.current) return

    const entity = world.spawn(Mesh(ref.current), LandTrait)

    return () => entity.destroy()
  }, [world])

  return (
    <group ref={ref}>
      <RenderLand />
    </group>
  )
}
