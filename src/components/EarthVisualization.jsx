import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, Environment, Html, Stars } from "@react-three/drei";
import { Vector3, TextureLoader } from "three";

// Preload texture globally with a Promise
const textureLoader = new TextureLoader();
const preloadedTexturePromise = new Promise((resolve, reject) => {
  textureLoader.load(
    "/assets/planet-earth-1.jpg", // Ensure this path is correct
    (texture) => {
      console.log("Texture preloaded successfully");
      resolve(texture);
    },
    undefined,
    (err) => {
      console.error("Failed to preload texture:", err);
      reject(err);
    }
  );
});

// Custom hook for detecting mobile devices
function useMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

// Landslide hotspot data
const HOTSPOTS = [
  { position: [0.8, 0.2, 0.5], name: "Himalayan Region", risk: "High" },
  { position: [-0.5, 0.3, 0.8], name: "Pacific Northwest", risk: "Moderate" },
  { position: [0.1, -0.8, 0.5], name: "Andes Mountains", risk: "High" },
  { position: [0.7, 0.6, -0.3], name: "Alps", risk: "Moderate" },
];

// Earth component
function Earth({ onTextureLoaded }) {
  const earthRef = useRef();
  const [hoveredHotspot, setHoveredHotspot] = useState(null);
  const [texture, setTexture] = useState(null);

  // Load texture using useEffect to tie it to React's lifecycle
  useEffect(() => {
    preloadedTexturePromise
      .then((loadedTexture) => {
        setTexture(loadedTexture);
        if (onTextureLoaded) onTextureLoaded();
      })
      .catch((err) => {
        console.error("Texture loading failed:", err);
      });
  }, [onTextureLoaded]);

  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  if (!texture) {
    return (
      <Html center>
        <div className="text-stone-300">Loading Earth...</div>
      </Html>
    );
  }

  return (
    <>
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial map={texture} metalness={0.1} roughness={0.7} />
        {HOTSPOTS.map((hotspot, index) => {
          const positionVector = new Vector3(...hotspot.position)
            .normalize()
            .multiplyScalar(2.05);

          return (
            <mesh
              key={index}
              position={[positionVector.x, positionVector.y, positionVector.z]}
              onPointerOver={() =>
                setHoveredHotspot({
                  ...hotspot,
                  position: positionVector,
                })
              }
              onPointerOut={() => setHoveredHotspot(null)}
            >
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshBasicMaterial color={hotspot.risk === "High" ? "#ef4444" : "#f59e0b"} />
            </mesh>
          );
        })}
      </mesh>

      {hoveredHotspot && (
        <Html
          position={[hoveredHotspot.position.x, hoveredHotspot.position.y, hoveredHotspot.position.z]}
          distanceFactor={1.5}
          occlude
        >
          <div className="bg-stone-900/90 backdrop-blur-sm text-white p-2 rounded-md border border-amber-500/50 shadow-lg min-w-[150px]">
            <h3 className="font-bold text-amber-400">{hoveredHotspot.name}</h3>
            <p className="text-sm">
              Risk Level:{" "}
              <span className={hoveredHotspot.risk === "High" ? "text-red-400" : "text-amber-400"}>
                {hoveredHotspot.risk}
              </span>
            </p>
          </div>
        </Html>
      )}
    </>
  );
}

export default function EarthVisualization({ onLoaded }) {
  const isMobile = useMobile();
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleContextLost = (event) => {
      event.preventDefault();
      console.warn("WebGL context lost. Attempting to recover...");
    };

    const handleContextRestored = () => {
      console.log("WebGL context restored.");
    };

    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
    };
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ preserveDrawingBuffer: false, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.domElement.style.width = "100%";
          gl.domElement.style.height = "100%";
        }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[5, 3, 5]} intensity={1} />

        <Earth onTextureLoaded={onLoaded} />

        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="night" />

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          rotateSpeed={0.5}
          zoomSpeed={0.5}
          autoRotate={!isMobile}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}