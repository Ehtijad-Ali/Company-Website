import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, Stars } from '@react-three/drei'
import * as THREE from 'three'

function GlobeModel() {
  const group = useRef()
  const { scene } = useGLTF('/models/ear.glb')

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.003
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05
    }
  })

  return (
    <group ref={group} scale={[1.8, 1.8, 1.8]}>
      <primitive object={scene} />
    </group>
  )
}

function Particles() {
  const mesh = useRef()
  const count = 800
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12
  }

  useFrame(({ clock }) => {
    if (mesh.current) mesh.current.rotation.y = clock.getElapsedTime() * 0.04
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#6366f1" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

export default function Globe3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#6366f1" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a855f7" />
      <pointLight position={[0, 5, 0]} intensity={0.4} color="#06b6d4" />
      <Stars radius={60} depth={40} count={1500} factor={3} fade speed={1} />
      <Particles />
      <Suspense fallback={null}>
        <GlobeModel />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI * 0.65}
        minPolarAngle={Math.PI * 0.35}
      />
    </Canvas>
  )
}

useGLTF.preload('/models/ear.glb')
