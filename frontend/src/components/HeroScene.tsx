import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import type { Mesh } from 'three';

const OrbNode = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.elapsedTime * 0.3;
      ref.current.rotation.y = clock.elapsedTime * 0.5;
      ref.current.position.y = position[1] + Math.sin(clock.elapsedTime + position[0]) * 0.18;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.6} emissive={color} emissiveIntensity={0.15} />
      </mesh>
    </Float>
  );
};

const BackgroundRings = () => {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <ringGeometry args={[1.6, 2.6, 64]} />
      <meshBasicMaterial color="#D6E8F5" opacity={0.18} transparent />
    </mesh>
  );
};

export const HeroScene: React.FC = () => {
  const nodes = useMemo(
    () => [
      { position: [1.8, 0.8, 0], color: '#1E71B7' },
      { position: [-1.6, 0.5, 0.4], color: '#4A7C8E' },
      { position: [0.2, 1.4, -0.8], color: '#FAB95B' },
    ],
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[32px] bg-[#1e71b7]/5">
      <Canvas camera={{ position: [0, 1.2, 6], fov: 42 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 5, 3]} intensity={1.2} />
        <directionalLight position={[-4, 2, -2]} intensity={0.6} color="#4A7C8E" />

        <group position={[0, -0.5, 0]}>
          <BackgroundRings />
          {nodes.map((node) => (
            <OrbNode key={`${node.position.join('-')}`} position={node.position as [number, number, number]} color={node.color} />
          ))}
          <Float speed={0.8} rotationIntensity={0.4} floatIntensity={2}> 
            <mesh position={[0, 0.7, 0]}>
              <octahedronGeometry args={[1.1, 0]} />
              <meshStandardMaterial color="#FFFFFF" transparent opacity={0.15} roughness={0.2} metalness={0.4} />
            </mesh>
          </Float>
        </group>

        <ContactShadows position={[0, -1.2, 0]} opacity={0.25} width={9} blur={2} far={4} />
        <Environment preset="studio" />
        <OrbitControls enablePan={false} minDistance={4} maxDistance={8} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </div>
  );
};
