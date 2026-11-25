import { useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const THEME = {
  accent: "#65FFD9",
  highlight: "#36CFFF",
  primary: "#38E8D2",
  secondary: "#7C3AED",
  surface: "#071629",
};

function readCssVar(name, fallback) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return v || fallback;
}

function BrainModel({ mouseX, mouseY }) {
  const groupRef = useRef();
  const { scene } = useGLTF("/3d/highly_detailed_glowing_brain.glb");
  const themedSceneRef = useRef(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const targetRotY = mouseX * Math.PI * 0.5;
    const targetRotX = -mouseY * Math.PI * 0.3;
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      3,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      3,
      delta
    );
  });

  useEffect(() => {
    if (!scene) return;

    // Ensure CSS vars are painted before reading
    const id = requestAnimationFrame(() => {
      const accent = readCssVar("--accent", THEME.accent);
      const highlight = readCssVar("--highlight", THEME.highlight);
      const primary = readCssVar("--primary", THEME.primary);
      const secondary = readCssVar("--secondary", THEME.secondary);

      const accentColor = new THREE.Color(accent);
      const highlightColor = new THREE.Color(highlight);
      const primaryColor = new THREE.Color(primary);
      const secondaryColor = new THREE.Color(secondary);

      const clone = scene.clone(true);
      themedSceneRef.current = clone;

      clone.traverse((child) => {
        if (!child.isMesh) return;
        child.castShadow = true;
        child.receiveShadow = true;

        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];

        const newMaterials = materials.map((mat, i) => {
          const m = mat.clone();

          const t = (i % 3) / 2; // 0, 0.5, 1

          // Subtle theme tint instead of full replacement — keeps the model
          // from turning into a flat green/cyan blob.
          const tint = accentColor
            .clone()
            .lerp(highlightColor, t)
            .lerp(new THREE.Color("#ffffff"), 0.55); // 55% toward white

          if (m.color) {
            // Multiply existing color by tint (preserves texture detail)
            m.color.multiply(tint);
          }

          // Gentle emissive from the theme, capped low to avoid green wash
          if ("emissive" in m) {
            const em = primaryColor
              .clone()
              .lerp(secondaryColor, t * 0.5)
              .lerp(new THREE.Color("#ffffff"), 0.4);
            m.emissive.copy(em);
            m.emissiveIntensity = 0.15;
          }

          if ("metalness" in m) m.metalness = 0.4;
          if ("roughness" in m) m.roughness = 0.45;

          // If the model uses emissive maps, keep them but tone them down
          if (m.emissiveMap) {
            m.emissiveIntensity = Math.min(m.emissiveIntensity ?? 1, 0.6);
          }

          m.needsUpdate = true;
          return m;
        });

        child.material = Array.isArray(child.material)
          ? newMaterials
          : newMaterials[0];
      });

      // Fit to available space
      const box = new THREE.Box3().setFromObject(clone);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      const scale = 2.2 / maxDim;
      clone.scale.setScalar(scale);

      const scaledBox = new THREE.Box3().setFromObject(clone);
      const center = scaledBox.getCenter(new THREE.Vector3());
      clone.position.set(-center.x, -center.y, -center.z);
    });

    return () => {
      cancelAnimationFrame(id);
      const clone = themedSceneRef.current;
      if (!clone) return;
      clone.traverse((child) => {
        if (!child.isMesh) return;
        const mats = Array.isArray(child.material)
          ? child.material
          : [child.material];
        mats.forEach((m) => m.dispose());
      });
    };
  }, [scene]);

  return (
    <group ref={groupRef}>
      {themedSceneRef.current ? (
        <primitive object={themedSceneRef.current} />
      ) : (
        <primitive object={scene} />
      )}
    </group>
  );
}

export default function BrainCanvas({ mouseX, mouseY }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Neutral white lighting so the model isn't tinted green by the rig */}
      <ambientLight intensity={0.9} color="#ffffff" />
      <directionalLight position={[5, 5, 5]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-5, -3, 2]} intensity={0.6} color="#ffffff" />
      <pointLight position={[0, 0, 4]} intensity={0.4} color="#ffffff" />
      <Suspense fallback={null}>
        <BrainModel mouseX={mouseX} mouseY={mouseY} />
        <Environment preset="city" />
      </Suspense>
      <ContactShadows
        position={[0, -1.6, 0]}
        opacity={0.4}
        scale={8}
        blur={2.5}
        far={4}
      />
    </Canvas>
  );
}