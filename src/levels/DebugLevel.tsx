import { Camera } from '@/entities/camera/Camera'
import { Land } from '@/entities/land/Land'
import { LandRenderer } from '@/entities/land/LandRenderer'
import { Player } from '@/entities/player/Player'
import { PlayerRenderer } from '@/entities/player/PlayerRenderer'
import { degToRad } from '@/shared/math'

export function DebugLevel() {
  return (
    <>
      <Camera
        position={{ x: 0, y: 3, z: 0 }}
        rotation={{ x: degToRad(-50), y: degToRad(-32), z: degToRad(-32) }}
      />
      <Land />
      <LandRenderer />
      <Player position={{ x: 0, y: 1, z: 0 }} />
      <PlayerRenderer />
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
