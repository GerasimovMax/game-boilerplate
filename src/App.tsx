import { Canvas } from '@react-three/fiber'
import { InputProvider } from '@/providers/input/InputProvider'
import { KootaSystems } from '@/providers/KootaSystems'
import { Physics } from '@react-three/rapier'
import { DebugLevel } from '@/levels/DebugLevel'
import { isDebug } from '@/shared/config'

function App() {
  return (
    <Canvas shadows>
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
