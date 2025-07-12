import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { InputProvider } from '@/providers/input/InputProvider'
import { KootaSystems } from '@/providers/KootaSystems'
import { Physics } from '@react-three/rapier'
import { DebugLevel } from '@/levels/DebugLevel'
import { isDebug } from '@/shared/config'

function App() {
  return (
    <Canvas shadows>
      {isDebug && <Stats />}
      <InputProvider>
        <Physics debug={isDebug} timeStep="vary">
          <KootaSystems>
            <DebugLevel />
          </KootaSystems>
        </Physics>
      </InputProvider>
    </Canvas>
  )
}

export default App
