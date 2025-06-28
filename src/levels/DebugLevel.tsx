import { Land } from '@/entities/land'
import { Camera } from '@/entities/camera'
import { Player } from '@/entities/player'
import { degToRad } from '@/shared/math'

export function DebugLevel() {
  return (
    <>
      <Camera
        position={{ x: 0, y: 3, z: 0 }}
        rotation={{ x: degToRad(-50), y: degToRad(-32), z: degToRad(-32) }}
      />
      <Land />
      <Player position={{ x: 0, y: 0, z: 0 }} />
      <ambientLight />
      <directionalLight
        castShadow
        intensity={1}
        position={[-2.97, 3.17, 0]}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
      />
    </>
  )
}
