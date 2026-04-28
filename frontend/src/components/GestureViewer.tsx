import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

const HandShape = () => (
  <group>
    <mesh position={[0, 0.3, 0]}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial color="#1e71b7" roughness={0.35} metalness={0.15} />
    </mesh>
    {[-0.6, -0.25, 0, 0.25, 0.55].map((x) => (
      <mesh key={x} position={[x, 1.25, 0]} rotation={[Math.PI / 2.5, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 1.8, 20]} />
        <meshStandardMaterial color="#d6e8f5" roughness={0.3} />
      </mesh>
    ))}
  </group>
);

export const GestureViewer: React.FC = () => {
  return (
    <div className="h-full overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[var(--surface)]">
      <div className="border-b border-[color:var(--border)] bg-[var(--bg)] px-6 py-4">
        <p className="text-sm font-semibold text-[var(--text)]">3D Gesture Viewer</p>
      </div>
      <div className="h-[320px] w-full">
        <Canvas camera={{ position: [0, 1.6, 5], fov: 35 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[4, 8, 5]} intensity={1.1} />
          <HandShape />
          <OrbitControls enablePan={false} minDistance={3} maxDistance={8} />
          <Environment preset="city" />
        </Canvas>
      </div>
    </div>
  );
};
