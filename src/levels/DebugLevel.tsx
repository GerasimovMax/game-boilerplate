import { Camera } from '@/entities/camera/Camera'
import { Land } from '@/entities/land/Land'
import { LandRenderer } from '@/entities/land/LandRenderer'
import { Player } from '@/entities/player/Player'
import { PlayerRenderer } from '@/entities/player/PlayerRenderer'
import { Box } from '@/entities/box/Box'
import { BoxRenderer } from '@/entities/box/BoxRenderer'
import { Item } from '@/entities/item/Item'
import { ItemRenderer } from '@/entities/item/ItemRenderer'

export function DebugLevel() {
  return (
    <>
      <Camera
        position={{ x: 15, y: 15, z: 15 }}
        rotation={{ x: -35, y: 45, z: 0 }}
        fov={20}
      />
      <Land />
      <LandRenderer />
      <Player position={{ x: 0, y: 0.4, z: 0 }} />
      <PlayerRenderer />
      <Box center={{ x: 0, y: 0.5, z: 0 }} />
      <BoxRenderer />
      <Item position={{ x: 0, y: 0.5, z: 0 }} areaSize={8} />
      <ItemRenderer />

      <ambientLight />
      <directionalLight
        castShadow
        intensity={1}
        position={[0, 3, 3]}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
      />
    </>
  )
}
