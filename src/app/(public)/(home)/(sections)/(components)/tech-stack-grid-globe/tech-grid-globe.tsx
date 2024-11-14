"use client";
import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

interface Technology {
  id: string;
  name: string;
  color: string;
}

const technologies: Technology[] = [
  { id: "next", name: "Next.js", color: "#000000" },
  { id: "tailwind", name: "Tailwind", color: "#38BDF8" },
  { id: "react", name: "React", color: "#61DAFB" },
  { id: "js", name: "JavaScript", color: "#F7DF1E" },
  { id: "material", name: "Material UI", color: "#007FFF" },
  { id: "vercel", name: "Vercel", color: "#000000" },
  { id: "typescript", name: "TypeScript", color: "#3178C6" }
];

const ConnectionLines = ({ points }: { points: THREE.Vector3[] }) => {
  const lineRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const vertices: number[] = [];
    const colors: number[] = [];
    const color = new THREE.Color("#4080ff");

    // Create lines between all points
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        vertices.push(points[i].x, points[i].y, points[i].z);
        vertices.push(points[j].x, points[j].y, points[j].z);
        colors.push(color.r, color.g, color.b);
        colors.push(color.r, color.g, color.b);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    return geometry;
  }, [points]);

  return (
    <lineSegments ref={lineRef}>
      <primitive object={geometry} />
      <lineBasicMaterial
        attach="material"
        vertexColors
        transparent
        opacity={0.1}
        depthWrite={false}
      />
    </lineSegments>
  );
};

const HexagonalSphere = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate icosahedron vertices for base structure
  const { points, edges } = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(5, 1);
    const positions = ico.attributes.position;
    const vertices = [];

    // Extract vertices
    for (let i = 0; i < positions.count; i++) {
      vertices.push(
        new THREE.Vector3(
          positions.getX(i),
          positions.getY(i),
          positions.getZ(i)
        )
      );
    }

    // Create edges between adjacent vertices
    const edgesList = [];
    const indices = ico.index;

    if (indices) {
      for (let i = 0; i < indices.count; i += 3) {
        const idx1 = indices.getX(i);
        const idx2 = indices.getX(i + 1);
        const idx3 = indices.getX(i + 2);

        edgesList.push([vertices[idx1], vertices[idx2]]);
        edgesList.push([vertices[idx2], vertices[idx3]]);
        edgesList.push([vertices[idx3], vertices[idx1]]);
      }
    }

    return { points: vertices, edges: edgesList };
  }, []);

  // Animate the sphere
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <group ref={groupRef}>
      {/* Render all connection lines */}
      <ConnectionLines points={points} />

      {/* Render primary structure edges with glow */}
      {edges.map((edge, index) => (
        <mesh key={`edge-${index}`}>
          <tubeGeometry
            args={[
              new THREE.CatmullRomCurve3([edge[0], edge[1]]),
              20,
              0.02,
              8,
              false
            ]}
          />
          <meshPhongMaterial
            color="#4080ff"
            opacity={0.3}
            transparent
            emissive="#4080ff"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Render vertices as technology nodes */}
      {points.map((point, index) => (
        <group key={`point-${index}`}>
          <mesh
            position={point}
            scale={0.25}
            onPointerOver={() => setHovered(index)}
            onPointerOut={() => setHovered(null)}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshPhongMaterial
              color={technologies[index % technologies.length].color}
              emissive={technologies[index % technologies.length].color}
              emissiveIntensity={hovered === index ? 1 : 0.5}
            />
          </mesh>

          <Text
            position={point.clone().multiplyScalar(1.3)}
            fontSize={0.3}
            color={technologies[index % technologies.length].color}
            anchorX="center"
            anchorY="middle"
            scale={hovered === index ? 1.2 : 1}
          >
            {technologies[index % technologies.length].name}
          </Text>
        </group>
      ))}
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <color attach="background" args={["#050505"]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <HexagonalSphere />
    </>
  );
};

const TechGrid3D = () => {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 2]}>
        <Scene />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          minDistance={10}
          maxDistance={20}
        />
      </Canvas>
    </div>
  );
};

export default TechGrid3D;
