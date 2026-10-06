"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

const LOGO_SRC = "/images/cezar-chrome-logo-3d.png";

/**
 * A studio environment is generated procedurally (soft boxes plus a floor
 * gradient) and pre-filtered with PMREM, so the chrome reflections are real
 * without shipping an HDR file or reaching for an external host.
 */
function createStudioSource() {
  const width = 256;
  const height = 128;
  const data = new Uint8Array(width * height * 4);
  const gaussian = (value: number, centre: number, spread: number) =>
    Math.exp(-Math.pow((value - centre) / spread, 2));

  for (let y = 0; y < height; y += 1) {
    const v = y / height;
    for (let x = 0; x < width; x += 1) {
      const u = x / width;
      const sky = 0.05 + 0.42 * Math.pow(1 - v, 1.7);
      const key = gaussian(u, 0.22, 0.1) * gaussian(v, 0.2, 0.12);
      const fill = gaussian(u, 0.72, 0.13) * gaussian(v, 0.28, 0.16);
      const rim = gaussian(u, 0.5, 0.26) * gaussian(v, 0.05, 0.09);
      const value = Math.min(1, sky + key * 1.7 + fill * 1.05 + rim * 2.1);
      const index = (y * width + x) * 4;
      data[index] = Math.round(value * 255);
      data[index + 1] = Math.round(value * 252);
      data[index + 2] = Math.round(Math.min(255, value * 262));
      data[index + 3] = 255;
    }
  }

  const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function StudioEnvironment() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    const source = createStudioSource();
    const pmrem = new THREE.PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();
    const target = pmrem.fromEquirectangular(source);
    scene.environment = target.texture;
    source.dispose();
    pmrem.dispose();

    return () => {
      scene.environment = null;
      target.dispose();
    };
  }, [gl, scene]);

  return null;
}

type EmblemProps = {
  active: boolean;
  tiltRef: RefObject<number>;
  onReady: () => void;
};

function Emblem({ active, tiltRef, onReady }: EmblemProps) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const texture = useLoader(THREE.TextureLoader, LOGO_SRC);
  const gl = useThree((state) => state.gl);

  const { planeWidth, planeHeight, ringScaleX, ringScaleY } = useMemo(() => {
    const image = texture.image as HTMLImageElement | undefined;
    const aspect = image && image.width ? image.width / image.height : 1.2975;
    const width = 2.4;
    const height = width / aspect;
    return {
      planeWidth: width,
      planeHeight: height,
      ringScaleX: (width / 2) * 1.026,
      ringScaleY: (height / 2) * 1.026,
    };
  }, [texture]);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    texture.needsUpdate = true;
    onReady();
  }, [texture, gl, onReady]);

  useFrame((state, delta) => {
    if (!active || !group.current) return;
    const damping = Math.min(1, delta * 1.8);
    const time = state.clock.elapsedTime;
    const tilt = tiltRef.current ?? 0;

    const targetY = Math.sin(time * 0.3) * 0.3 + state.pointer.x * 0.2 + tilt * 0.28;
    const targetX = Math.sin(time * 0.22) * 0.08 - state.pointer.y * 0.12 + tilt * 0.1;
    const targetZ = Math.sin(time * 0.18) * 0.03 - state.pointer.x * 0.05;

    group.current.rotation.y += (targetY - group.current.rotation.y) * damping;
    group.current.rotation.x += (targetX - group.current.rotation.x) * damping;
    group.current.rotation.z += (targetZ - group.current.rotation.z) * damping;
    group.current.position.y = Math.sin(time * 0.55) * 0.045;

    if (ring.current) {
      ring.current.rotation.z = Math.sin(time * 0.3) * 0.02;
    }
  });

  return (
    <group ref={group}>
      {/* Backing plate creates the impression of milled metal thickness */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[planeWidth, planeHeight]} />
        <meshPhysicalMaterial
          map={texture}
          transparent
          alphaTest={0.4}
          color="#7c7c7c"
          metalness={1}
          roughness={0.45}
          envMapIntensity={1.1}
        />
      </mesh>

      {/* The CEZAR monogram itself, rendered in polished chrome */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[planeWidth, planeHeight]} />
        <meshPhysicalMaterial
          map={texture}
          transparent
          alphaTest={0.4}
          color="#ffffff"
          metalness={1}
          roughness={0.12}
          envMapIntensity={1.6}
          clearcoat={0.5}
          clearcoatRoughness={0.14}
        />
      </mesh>

      {/* Real chrome ring framing the emblem */}
      <mesh ref={ring} position={[0, 0, 0.03]} scale={[ringScaleX, ringScaleY, 1]}>
        <torusGeometry args={[1, 0.011, 20, 240]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={1}
          roughness={0.09}
          envMapIntensity={1.8}
          clearcoat={0.6}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  );
}

type ChromeEmblemProps = {
  /** True while the section is on screen. */
  active: boolean;
  /** True when the visitor has not asked for reduced motion. */
  animate: boolean;
  /** 0 - 1 scroll progress across the section. */
  tiltRef: RefObject<number>;
  onReady: () => void;
};

export function ChromeEmblem({ active, animate, tiltRef, onReady }: ChromeEmblemProps) {
  return (
    <Canvas
      frameloop={active && animate ? "always" : "demand"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.6], fov: 30, near: 0.1, far: 20 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
      }}
      className="h-full w-full"
      style={{ touchAction: "pan-y" }}
    >
      <StudioEnvironment />
      <ambientLight intensity={0.4} />
      <directionalLight position={[3.5, 4, 6]} intensity={2.4} color="#ffffff" />
      <directionalLight position={[-4, -2, -3]} intensity={1.1} color="#8d1538" />
      <Suspense fallback={null}>
        <Emblem active={active} tiltRef={tiltRef} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
