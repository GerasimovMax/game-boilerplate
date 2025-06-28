import { Canvas } from '@react-three/fiber'
import { DebugLevel } from '@/levels/DebugLevel'
import { KootaSystems } from '@/providers/KootaSystems'
import { InputProvider } from '@/providers/input/InputProvider'

function App() {
  return (
    <Canvas shadows>
      <InputProvider>
        <KootaSystems>
          <DebugLevel />
        </KootaSystems>
      </InputProvider>
    </Canvas>
  )
}

export default App
