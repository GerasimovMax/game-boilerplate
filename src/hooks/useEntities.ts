import { useEffect, useState } from 'react'
import { useWorld } from 'koota/react'
import type { Entity, Trait } from 'koota'

export function useEntities<T extends Trait>(trait: T) {
  const world = useWorld()
  const [entities, setEntities] = useState<Entity[]>([])

  useEffect(() => {
    const existing = [...world.query(trait)]
    setEntities(existing)

    const onAdd = (entity: Entity) =>
      setEntities((prev) => (prev.includes(entity) ? prev : [...prev, entity]))

    const onRemove = (entity: Entity) =>
      setEntities((prev) => prev.filter((e) => e !== entity))

    const unsubAdd = world.onAdd(trait, onAdd)
    const unsubRemove = world.onRemove(trait, onRemove)

    return () => {
      unsubAdd()
      unsubRemove()
    }
  }, [world, trait])

  return entities
}

export function useEntity<T extends Trait>(trait: T) {
  const world = useWorld()
  const [entity, setEntity] = useState<Entity | null>(null)

  useEffect(() => {
    const existing = world.queryFirst(trait)
    setEntity(existing ?? null)

    const onAdd = (entity: Entity) => setEntity(entity)
    const onRemove = () => setEntity(null)

    const unsubAdd = world.onAdd(trait, onAdd)
    const unsubRemove = world.onRemove(trait, onRemove)

    return () => {
      unsubAdd()
      unsubRemove()
    }
  }, [world, trait])

  return entity
}
