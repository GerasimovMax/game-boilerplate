import { useEffect } from 'react'
import { useWorld } from 'koota/react'
import { Land as LandTrait } from './traits'
import { Physics } from '@/shared/traits'

export function Land() {
  const world = useWorld()

  useEffect(() => {
    const entity = world.spawn(
      LandTrait,
      Physics({ type: 'fixed' })
    )

    return () => entity.destroy()
  }, [world])

  return null
}
