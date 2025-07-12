import { useRef, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Object3D } from 'three'
import type { Entity, Trait } from 'koota'
import { CuboidCollider, BallCollider, CapsuleCollider, RigidBody } from '@react-three/rapier'
import type { RapierRigidBody, RigidBodyTypeString, RigidBodyAutoCollider, CollisionPayload, ColliderProps } from '@react-three/rapier'
import { Mesh, RigidBody as RigidBodyTrait, Physics, Position, Rotation, Collider, CollisionEvents, Collisions, TriggerEvents, Triggers } from '@/shared/traits'
import type { PhysicsType, ColliderType, AutoColliderType } from '@/shared/traits'

const physicsTypeMapping: Record<PhysicsType, RigidBodyTypeString> = {
  static: 'fixed',
  kinematic: 'kinematicPosition',
  dynamic: 'dynamic',
} as const

const autoColliderTypeMapping: Record<AutoColliderType, RigidBodyAutoCollider> = {
  box: 'cuboid',
  sphere: 'ball'
} as const

enum ActiveCollisionTypes {
  DEFAULT = 15,
  ALL = 60943
}

export function EntityRenderer({ entity, children }: { entity: Entity; children: ReactNode }) {
  const ref = useRef<Object3D>(null)
  const rigidBodyRef = useRef<RapierRigidBody>(null)

  useEffect(() => {
    if (!entity) return

    const physics = entity.get(Physics)
    const position = entity.get(Position) || { x: 0, y: 0, z: 0 }
    const rotation = entity.get(Rotation) || { x: 0, y: 0, z: 0, w: 1 }

    if (physics && rigidBodyRef.current) {
      entity.add(RigidBodyTrait(rigidBodyRef.current))
      rigidBodyRef.current.setTranslation(position, false)
      rigidBodyRef.current.setRotation(rotation, false)

      return () => {
        rigidBodyRef.current = null
        entity.remove(RigidBodyTrait)
      }
    }

    if (ref.current) {
      entity.add(Mesh(ref.current))
      ref.current.position.set(position.x, position.y, position.z)
      ref.current.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w)

      return () => {
        ref.current = null
        entity.remove(Mesh)
      }
    }
  }, [entity])

  function updateEntityListTrait(entity: Entity, trait: Trait, value: Entity[]) {
    if (value.length === 0) {
      entity.remove(trait)
    } else if (entity.has(trait)) {
      entity.set(trait, value)
    } else {
      entity.add(trait(value))
    }
  }

  function getOtherEntity(event: CollisionPayload) {
    const userData = event.other.rigidBody?.userData ?? event.other.colliderObject?.parent?.userData
    return (userData as { entity: Entity | undefined })?.entity ?? null
  }

  function createEventHandlers(trait: Trait) {
    return {
      onEnter: (event: CollisionPayload) => {
        const other = getOtherEntity(event)
        if (!entity || !other) return

        const existing = entity.get(trait) ?? []
        if (!existing.includes(other)) {
          updateEntityListTrait(entity, trait, [...existing, other])
        }
      },
      onExit: (event: CollisionPayload) => {
        const other = getOtherEntity(event)
        if (!entity || !other) return

        const existing = entity.get(trait) ?? []
        const updated = existing.filter((e) => e !== other)
        updateEntityListTrait(entity, trait, updated)
      }
    }
  }

  const physics = entity.get(Physics)
  const collider = entity.get(Collider)
  const hasCollisionEvents = !!entity.get(CollisionEvents)
  const hasTriggerEvents = !!entity.get(TriggerEvents)
  const activeCollisionTypes = physics?.isTrigger || physics?.type === 'kinematic' ? ActiveCollisionTypes.ALL : ActiveCollisionTypes.DEFAULT
  const collisionHandlers = hasCollisionEvents ? createEventHandlers(Collisions) : undefined
  const triggerHandlers = hasTriggerEvents ? createEventHandlers(Triggers) : undefined

  return physics ? (
    <RigidBody
      ref={rigidBodyRef}
      type={physicsTypeMapping[physics.type]}
      colliders={collider ? false : autoColliderTypeMapping[physics.autoCollider!]}
      userData={{ entity }}
      sensor={physics.isTrigger}
      activeCollisionTypes={activeCollisionTypes}
      onCollisionEnter={collisionHandlers?.onEnter}
      onCollisionExit={collisionHandlers?.onExit}
      onIntersectionEnter={triggerHandlers?.onEnter}
      onIntersectionExit={triggerHandlers?.onExit}
    >
      {collider && <ColliderRenderer collider={collider} />}
      {children}
    </RigidBody>
  ) : (
    <group ref={ref} userData={{ entity }}>
      {collider?.isTrigger && (
        <ColliderRenderer
          collider={collider}
          events={hasTriggerEvents}
          onIntersectionEnter={triggerHandlers?.onEnter}
          onIntersectionExit={triggerHandlers?.onExit}
        />
      )}
      {children}
    </group>
  )
}

function ColliderRenderer({
  collider,
  events,
  onIntersectionEnter,
  onIntersectionExit
}: {
  collider: ColliderType,
  events?: boolean,
  onIntersectionEnter?: (_event: CollisionPayload) => void,
  onIntersectionExit?: (_event: CollisionPayload) => void
}) {
  if (!collider) return null

  const props: ColliderProps = {
    sensor: collider.isTrigger,
    activeCollisionTypes: collider.isTrigger ? ActiveCollisionTypes.ALL : ActiveCollisionTypes.DEFAULT,
    onIntersectionEnter: events ? onIntersectionEnter : undefined,
    onIntersectionExit: events ? onIntersectionExit : undefined
  }

  switch (collider.type) {
    case 'box':
      return <CuboidCollider args={[collider.size.x, collider.size.y, collider.size.z]} {...props} />
    case 'sphere':
      return <BallCollider args={[collider.radius]} {...props} />
    case 'capsule':
      return <CapsuleCollider args={[collider.height / 2 - collider.radius, collider.radius]} {...props} />
    default:
      return null
  }
}
