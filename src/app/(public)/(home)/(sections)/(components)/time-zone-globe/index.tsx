/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { TextureLoader, Mesh, Vector3 } from "three";
import { Suspense, useRef, useMemo } from "react";
import BG from "@/assets/7605.jpg";
import { OrbitControls, Line } from "@react-three/drei";
import ShowIf from "@/shared/components/show-if";

const SpinningGlobe = () => {
  const texture = new TextureLoader().load(BG?.src);
  const meshRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <Suspense fallback={null}>
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[45, 84, 84]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      {/* Glow Effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[46, 84, 84]} />
        <meshBasicMaterial
          color={"#87CEFA"}
          transparent
          opacity={0.2}
          depthWrite={false}
        />
      </mesh>
    </Suspense>
  );
};

const generateRandomPoint = () => {
  const radius = 35;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);

  return new Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi)
  );
};

const createArcPoints = (
  start: Vector3,
  end: Vector3,
  height: number,
  segments: number
) => {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const p = new Vector3().lerpVectors(start, end, i / segments);
    const arc =
      Math.sin((Math.PI * i) / segments) *
      height *
      (1 + 0.3 * Math.sin(i * 0.2));
    const normal = new Vector3().copy(p).normalize();
    p.add(normal.multiplyScalar(arc));
    points.push(p);
  }
  return points;
};

const TravelingArc = ({
  start,
  end,
  color,
  height = 10,
  delay = 0,
  speed = 1
}: {
  start: Vector3;
  end: Vector3;
  color: string;
  height?: number;
  delay?: number;
  speed?: number;
}) => {
  const segments = 50;
  const points = useMemo(
    () => createArcPoints(start, end, height, segments),
    [start, end, height]
  );
  const lineRef = useRef<any>(null);

  useFrame(({ clock }) => {
    const elapsedTime = (clock.getElapsedTime() - delay) * speed;
    if (elapsedTime < 0) return;

    const animationDuration = 3;
    const currentTime = elapsedTime % animationDuration;
    const progress = currentTime / animationDuration;

    if (lineRef.current?.material) {
      const dashSize = segments * (0.1 + 0.05 * Math.sin(elapsedTime * 2));
      lineRef.current.material.dashSize = dashSize;
      lineRef.current.material.gapSize =
        segments * (1.5 + Math.sin(elapsedTime));
      lineRef.current.material.dashOffset = -progress * segments * 4;

      lineRef.current.material.opacity =
        progress > 0.7 ? 1 - (progress - 0.7) * 3.3 : Math.min(progress * 3, 1);
    }
  });

  return (
    <Line
      ref={lineRef}
      points={points}
      color={color}
      lineWidth={2.5}
      transparent
      dashed
      dashScale={1}
    />
  );
};

const Arc = ({ arcColors }: { arcColors?: string[] }) => {
  const generateArcs = () => {
    const colors =
      arcColors && arcColors?.length! > 0
        ? arcColors
        : ["#4169e1", "#ff4444", "#50C878", "white", "#ffd700", "#ff69b4"];
    const arcs = [];

    for (let i = 0; i < 10; i++) {
      arcs.push({
        start: generateRandomPoint(),
        end: generateRandomPoint(),
        color: colors?.[Math.floor(Math.random() * colors?.length)],
        height: 15 + Math.random() * 5,
        delay: i * 0.01,
        speed: 0.5 + Math.random() * 0.05
      });
    }
    return arcs;
  };

  const arcs = useMemo(() => generateArcs(), []);
  return (
    <>
      {arcs.map((arc, index) => (
        <TravelingArc
          key={index}
          start={arc.start}
          end={arc.end}
          color={arc?.color}
          height={arc.height}
          delay={arc.delay}
          speed={arc.speed}
        />
      ))}
    </>
  );
};

const Globe = ({
  showArcs,
  arcColors,
  canvasClass,
  containerProps
}: {
  showArcs?: boolean;
  arcColors?: string[];
  canvasClass?: string;
  containerProps?: React.ComponentProps<"div">;
}) => {
  return (
    <div
      {...containerProps}
      className={"relative h-[90%] " + (containerProps?.className || "")}
    >
      <Canvas
        camera={{ position: [0, 0, 120], fov: 45 }}
        className={"absolute inset-0 block drop-shadow " + (canvasClass || "")}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} castShadow />
        <SpinningGlobe />
        <ShowIf conditionalRenderKey={showArcs}>
          <Arc arcColors={arcColors} />
        </ShowIf>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotateSpeed={0.5}
          autoRotate={true}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>
      <h3
        className="absolute top-0 inset-x-0 text-gradient text-center mt-2 pt-2"
        style={{
          fontSize: "clamp(1rem, 3vw, 2rem)",
          fontWeight: "bold"
        }}
      >
        flexible with timezone
      </h3>
    </div>
  );
};

export { Globe };
