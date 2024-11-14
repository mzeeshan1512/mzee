"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Line } from "@react-three/drei";
import { Group, Vector3 } from "three";

const GLOBE_RADIUS = 2;
const LATITUDE_LINES = 20;
const LONGITUDE_LINES = 30;
const GRID_COLOR = "#2196f3";
const SPHERE_COLOR = "#000000";
const POINT_COLOR = "#4fc3f7";

interface Point {
  position: Vector3;
  connections: Vector3[];
}

const TechGlobe = () => {
  const groupRef = useRef<Group>(null);
  const pointsRef = useRef<Point[]>([]);

  useEffect(() => {
    // Generate random points on the sphere surface
    const points: Point[] = [];
    for (let i = 0; i < 50; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos(2 * Math.random() - 1);
      const x = GLOBE_RADIUS * Math.sin(theta) * Math.cos(phi);
      const y = GLOBE_RADIUS * Math.sin(theta) * Math.sin(phi);
      const z = GLOBE_RADIUS * Math.cos(theta);

      points.push({
        position: new Vector3(x, y, z),
        connections: []
      });
    }

    // Create connections between nearby points
    points.forEach((point, i) => {
      points.forEach((otherPoint, j) => {
        if (i !== j && point.position.distanceTo(otherPoint.position) < 1.5) {
          point.connections.push(otherPoint.position);
        }
      });
    });

    pointsRef.current = points;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      const time = state.clock.getElapsedTime();
      pointsRef.current.forEach((point, i) => {
        const offset = Math.sin(time + i * 0.5) * 0.05;
        point.position.normalize().multiplyScalar(GLOBE_RADIUS + offset);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base sphere */}
      <Sphere args={[GLOBE_RADIUS, 64, 64]}>
        <meshBasicMaterial
          color={SPHERE_COLOR}
          transparent
          opacity={0.1}
          wireframe
        />
      </Sphere>

      {/* Latitude lines */}
      {Array.from({ length: LATITUDE_LINES }).map((_, i) => {
        const phi = (Math.PI * i) / LATITUDE_LINES;
        const points = [];
        for (let j = 0; j <= 64; j++) {
          const theta = (2 * Math.PI * j) / 64;
          const x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
          const y = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
          const z = GLOBE_RADIUS * Math.cos(phi);
          points.push(new Vector3(x, y, z));
        }
        return (
          <Line
            key={`lat-${i}`}
            points={points}
            color={GRID_COLOR}
            transparent
            opacity={0.3}
            lineWidth={0.5}
          />
        );
      })}

      {/* Longitude lines */}
      {Array.from({ length: LONGITUDE_LINES }).map((_, i) => {
        const theta = (2 * Math.PI * i) / LONGITUDE_LINES;
        const points = [];
        for (let j = 0; j <= 64; j++) {
          const phi = (Math.PI * j) / 64;
          const x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
          const y = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
          const z = GLOBE_RADIUS * Math.cos(phi);
          points.push(new Vector3(x, y, z));
        }
        return (
          <Line
            key={`lon-${i}`}
            points={points}
            color={GRID_COLOR}
            transparent
            opacity={0.3}
            lineWidth={0.5}
          />
        );
      })}

      {/* Data points and connections */}
      {pointsRef.current.map((point, i) => (
        <group key={`point-${i}`}>
          <mesh position={point.position}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial color={POINT_COLOR} />
          </mesh>
          {point.connections.map((connection, j) => (
            <Line
              key={`connection-${i}-${j}`}
              points={[point.position, connection]}
              color={POINT_COLOR}
              transparent
              opacity={0.2}
              lineWidth={1}
            />
          ))}
        </group>
      ))}
    </group>
  );
};

export default TechGlobe;
