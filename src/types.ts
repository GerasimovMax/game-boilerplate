import type { World } from "koota"

export type Vector3 = { x: number; y: number; z: number }
export type Quaternion = { x: number; y: number; z: number; w: number }

export type ECSSystemContext = { world: World, delta: number, keys: Set<string> }
export type ECSSystem = (context: ECSSystemContext) => void
export type ECSPhysicsSystem = ( world: World ) => void
