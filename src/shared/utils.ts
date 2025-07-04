import { type Vector3 } from '@/types'

export function vector3ToArray(v: Vector3): [number, number, number] {
  return [v.x, v.y, v.z]
}

export function arrayToVector3(arr: [number, number, number]): Vector3 {
  return { x: arr[0], y: arr[1], z: arr[2] }
}

export function degToRad(degrees: number): number {
  return degrees * Math.PI / 180
}
