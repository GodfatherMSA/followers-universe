import * as THREE from 'three'
import { useState, useMemo, useEffect, useRef, Suspense } from 'react' // Suspense eklendi
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Text, Billboard, useTexture, Stars, Html, useGLTF, Clone, useAnimations, CameraControls, Cloud, Ring } from '@react-three/drei'

import genesisFollowers from './data/genesisFollowers.json'
import iceFollowers from './data/iceFollowers.json'
import lavaFollowers from './data/lavaFollowers.json'

const waterLevel = -6.6;

// OUTER SPACE AND THE SOLAR SYSTEM
function SunSystem({ focusedTarget, setFocusedTarget, controlsRef }) {
  const sunTexture = useTexture('/sun.jpg')
  useEffect(() => { if (focusedTarget === 'sun' && controlsRef.current) { controlsRef.current.setLookAt(0, 90, 140, 0, 0, 0, true) } }, [focusedTarget, controlsRef])

  return (
    <group onClick={(e) => { e.stopPropagation(); setFocusedTarget('sun'); }} onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = 'auto'; }}>
      <mesh><sphereGeometry args={[25, 64, 64]} /><meshBasicMaterial map={sunTexture} color="#ffffff" /></mesh>
      <mesh scale={[1.1, 1.1, 1.1]}><sphereGeometry args={[25, 64, 64]} /><meshBasicMaterial color="#ffdd00" transparent opacity={0.3} depthWrite={false} /></mesh>
      <mesh scale={[1.25, 1.25, 1.25]}><sphereGeometry args={[25, 64, 64]} /><meshBasicMaterial color="#ffaa00" transparent opacity={0.15} side={THREE.BackSide} depthWrite={false} /></mesh>
      <pointLight intensity={400} distance={1000} decay={1.5} color="#ffaa00" />

      {/* === GÜNEŞİN TEPESİNDEKİ YARATICI - YENİ GOD.GLB MODELİ === */}
      <Astronaut
        position={[0, 12.5, 0]} // Eğer model yamuk/aşağıda durursa bu sayılarla oyna (Örn: y eksenini 12.5 yap)
        name="THE CREATOR"
        scale={2.5} // God modeli çok küçük veya büyük gelirse burayı değiştir
        nameColor="#731810fe"
        glow="#ffffff"
        controlsRef={controlsRef}
        nameY={1.9} // Yazı kafasının içine girerse bunu büyüt
        textSize={0.5}
        modelPath='/tanri.glb' // İŞTE YENİ TANRI MODELİMİZ!
      />
    </group>
  )
}

function CennetGezegen({ onEnter, planetRef, setFocusedTarget }) {
  const texture = useTexture('/paradiseplanet.jpg'); const [showPanel, setShowPanel] = useState(false);
  const textRef = useRef();
  useFrame((state) => { if (textRef.current) textRef.current.lookAt(state.camera.position) });

  return (
    <group ref={planetRef}>
      <mesh onClick={(e) => { e.stopPropagation(); setFocusedTarget('genesis'); setShowPanel(true); }} onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = 'auto'; }}>
        <sphereGeometry args={[10, 64, 64]} /> <meshStandardMaterial map={texture} roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh scale={[1.1, 1.1, 1.1]}><sphereGeometry args={[10, 64, 64]} /><meshBasicMaterial color="#33ff66" transparent opacity={0.25} depthWrite={false} side={THREE.BackSide} /></mesh>

      <group rotation={[Math.PI / 3, 0, 0]}>
        <Ring args={[3.5, 5, 64]} ><meshBasicMaterial color="#ffd700" transparent opacity={0.3} side={THREE.DoubleSide} /></Ring>
      </group>
      <Text ref={textRef} position={[0, 15, 0]} fontSize={4} color="#ffd700" anchorX="center" anchorY="middle" outlineWidth={0.1} outlineColor="#000000">
        TOP 1000 FOLLOWERS
      </Text>

      {showPanel && (
        <Html position={[3.5, 0, 0]} center>
          <div style={{ background: 'rgba(0, 20, 5, 0.85)', border: '1px solid #ffd700', boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)', padding: '20px', borderRadius: '4px', color: '#ffd700', fontFamily: '"Courier New", Courier, monospace', width: '240px', backdropFilter: 'blur(4px)', pointerEvents: 'auto', userSelect: 'none', textTransform: 'uppercase' }}>
            <div onClick={(e) => { e.stopPropagation(); setShowPanel(false); }} style={{ position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>×</div>
            <h3 style={{ margin: '0 0 15px 0', borderBottom: '2px solid #ffd700', paddingBottom: '10px', letterSpacing: '3px', fontSize: '18px' }}>/// SYS_GENESIS</h3>
            <div style={{ fontSize: '13px', lineHeight: '1.8', color: '#aaffaa' }}><p style={{ margin: '0' }}>Elysium Prime</p><p style={{ margin: '0' }}>TYPE: <span style={{ fontWeight: 'bold', color: '#ffd700' }}>Paradise / Founders</span></p><p style={{ margin: '15px 0 0 0', borderTop: '1px dotted #ffd700', paddingTop: '10px' }}>VIP FOUNDERS: <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#ffd700' }}>{genesisFollowers.length}/1000</span></p></div>
            <button onClick={(e) => { e.stopPropagation(); setShowPanel(false); onEnter('genesis'); }} style={{ marginTop: '20px', width: '100%', padding: '10px', background: 'rgba(255, 215, 0, 0.1)', border: '1px solid #ffd700', color: '#ffd700', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Courier New", Courier, monospace', animation: 'pulseGold 1.5s infinite' }}>[ ENTER PARADISE ]</button>
          </div>
        </Html>
      )}
    </group>
  )
}

function BuzulGezegen({ onEnter, planetRef, setFocusedTarget }) {
  const texture = useTexture('/frozen.jpg'); const [showPanel, setShowPanel] = useState(false);
  return (
    <group ref={planetRef}>
      <mesh onClick={(e) => { e.stopPropagation(); setFocusedTarget('ice'); setShowPanel(true); }} onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = 'auto'; }}>
        <sphereGeometry args={[10, 64, 64]} /> <meshStandardMaterial map={texture} roughness={0.6} />
      </mesh>
      <mesh scale={[1.1, 1.1, 1.1]}><sphereGeometry args={[10, 64, 64]} /><meshBasicMaterial color="#0066ff" transparent opacity={0.25} depthWrite={false} side={THREE.BackSide} /></mesh>
      {showPanel && (
        <Html position={[3.5, 0, 0]} center>
          <div style={{ background: 'rgba(0, 10, 20, 0.85)', border: '1px solid #00ffff', boxShadow: '0 0 20px rgba(0, 255, 255, 0.6)', padding: '20px', borderRadius: '4px', color: '#00ffff', fontFamily: '"Courier New", Courier, monospace', width: '240px', backdropFilter: 'blur(4px)', pointerEvents: 'auto', userSelect: 'none', textTransform: 'uppercase' }}>
            <div onClick={(e) => { e.stopPropagation(); setShowPanel(false); }} style={{ position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>×</div>
            <h3 style={{ margin: '0 0 15px 0', borderBottom: '2px solid #00ffff', paddingBottom: '10px', letterSpacing: '3px', fontSize: '18px' }}>/// SYS_FROZEN</h3>
            <div style={{ fontSize: '13px', lineHeight: '1.8' }}><p style={{ margin: '0' }}>Frozen</p><p style={{ margin: '0' }}>TYPE: <span style={{ fontWeight: 'bold' }}>Cryo-Giant</span></p><p style={{ margin: '15px 0 0 0', borderTop: '1px dotted #00ffff', paddingTop: '10px' }}>LIFEFORMS: <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{iceFollowers.length}</span></p></div>
            <button onClick={(e) => { e.stopPropagation(); setShowPanel(false); onEnter('ice'); }} style={{ marginTop: '20px', width: '100%', padding: '10px', background: 'rgba(0, 255, 255, 0.1)', border: '1px solid #00ffff', color: '#00ffff', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Courier New", Courier, monospace' }}>[ INITIATE LANDING ]</button>
          </div>
        </Html>
      )}
    </group>
  )
}

function VolkanikGezegen({ onEnter, planetRef, setFocusedTarget }) {
  const texture = useTexture('/lavaplanet.jpg'); const [showPanel, setShowPanel] = useState(false);
  return (
    <group ref={planetRef}>
      <mesh onClick={(e) => { e.stopPropagation(); setFocusedTarget('lava'); setShowPanel(true); }} onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = 'auto'; }}>
        <sphereGeometry args={[10, 64, 64]} /> <meshStandardMaterial map={texture} roughness={0.8} emissive="#330000" emissiveIntensity={0.5} />
      </mesh>
      <mesh scale={[1.1, 1.1, 1.1]}><sphereGeometry args={[10, 64, 64]} /><meshBasicMaterial color="#ff3300" transparent opacity={0.25} depthWrite={false} side={THREE.BackSide} /></mesh>
      {showPanel && (
        <Html position={[4, 0, 0]} center>
          <div style={{ background: 'rgba(20, 0, 0, 0.85)', border: '1px solid #ff3300', boxShadow: '0 0 20px rgba(255, 51, 0, 0.6)', padding: '20px', borderRadius: '4px', color: '#ff3300', fontFamily: '"Courier New", Courier, monospace', width: '240px', backdropFilter: 'blur(4px)', pointerEvents: 'auto', userSelect: 'none', textTransform: 'uppercase' }}>
            <div onClick={(e) => { e.stopPropagation(); setShowPanel(false); }} style={{ position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', color: '#ff3300' }}>×</div>
            <h3 style={{ margin: '0 0 15px 0', borderBottom: '2px solid #ff3300', paddingBottom: '10px', letterSpacing: '3px', fontSize: '18px', color: '#ffaa00' }}>/// SYS_MAGMA</h3>
            <div style={{ fontSize: '13px', lineHeight: '1.8', color: '#ffaa00' }}><p style={{ margin: '0' }}>Ignis Prime</p><p style={{ margin: '0' }}>TYPE: <span style={{ fontWeight: 'bold', color: '#ff3300' }}>Volcanic Class-X</span></p><p style={{ margin: '15px 0 0 0', borderTop: '1px dotted #ff3300', paddingTop: '10px' }}>LIFEFORMS: <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#ff3300' }}>{lavaFollowers.length}</span></p></div>
            <button onClick={(e) => { e.stopPropagation(); setShowPanel(false); onEnter('lava'); }} style={{ marginTop: '20px', width: '100%', padding: '10px', background: 'rgba(255, 51, 0, 0.1)', border: '1px solid #ff3300', color: '#ffaa00', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', fontFamily: '"Courier New", Courier, monospace' }}>[ INITIATE LANDING ]</button>
          </div>
        </Html>
      )}
    </group>
  )
}

function SolarSystemOrbits({ onEnter, focusedTarget, setFocusedTarget, controlsRef }) {
  const orbitRefGenesis = useRef(); const planetRefGenesis = useRef();
  const orbitRefIce = useRef(); const planetRefIce = useRef();
  const orbitRefLava = useRef(); const planetRefLava = useRef();

  useEffect(() => {
    let targetPlanetRef = null;
    if (focusedTarget === 'genesis') targetPlanetRef = planetRefGenesis.current;
    if (focusedTarget === 'ice') targetPlanetRef = planetRefIce.current;
    if (focusedTarget === 'lava') targetPlanetRef = planetRefLava.current;
    if (targetPlanetRef && controlsRef.current) {
      const targetPos = new THREE.Vector3(); targetPlanetRef.getWorldPosition(targetPos);
      controlsRef.current.setLookAt(targetPos.x + 12, targetPos.y + 6, targetPos.z + 18, targetPos.x, targetPos.y, targetPos.z, true)
    }
  }, [focusedTarget, controlsRef])

  useFrame((state, delta) => {
    if (focusedTarget === 'sun') {
      if (orbitRefGenesis.current) orbitRefGenesis.current.rotation.y += delta * 0.08
      if (orbitRefIce.current) orbitRefIce.current.rotation.y += delta * 0.05
      if (orbitRefLava.current) orbitRefLava.current.rotation.y += delta * 0.03
    }
    if (planetRefGenesis.current) planetRefGenesis.current.rotation.y += delta * 0.12
    if (planetRefIce.current) planetRefIce.current.rotation.y += delta * 0.15
    if (planetRefLava.current) planetRefLava.current.rotation.y += delta * 0.10
  })

  return (
    <>
      <group ref={orbitRefGenesis} rotation={[0, Math.PI / 4, 0]}><group position={[80, 0, 0]}><CennetGezegen onEnter={onEnter} planetRef={planetRefGenesis} setFocusedTarget={setFocusedTarget} /></group></group>
      <group ref={orbitRefLava} rotation={[0, Math.PI, 0]}><group position={[55, 0, 0]}><VolkanikGezegen onEnter={onEnter} planetRef={planetRefLava} setFocusedTarget={setFocusedTarget} /></group></group>
      <group ref={orbitRefIce} rotation={[0, -Math.PI / 2, 0]}><group position={[115, 0, 0]}><BuzulGezegen onEnter={onEnter} planetRef={planetRefIce} setFocusedTarget={setFocusedTarget} /></group></group>
    </>
  )
}

// ==========================================
// 2. BÖLÜM: YERYÜZÜ SİSTEMLERİ VE KÜRSÜ 
// ==========================================

function getElevation(worldX, worldZ) {
  const planeX = worldX; const planeY = -worldZ;
  const largeMountains = Math.sin(planeX * 0.03) * Math.cos(planeY * 0.03) * 6;
  const smallDetails = Math.sin(planeX * 0.1) * Math.cos(planeY * 0.08) * 1.5;
  const randomNoise = Math.sin(planeX * 0.07 + planeY * 0.05) * 2;
  let height = largeMountains + smallDetails + randomNoise - 5;
  const dist = Math.sqrt(worldX * worldX + worldZ * worldZ);
  const plateauHeight = 3; const plateauRadius = 35;
  if (dist < plateauRadius) { height = plateauHeight; }
  else if (dist < plateauRadius + 15) { const t = (dist - plateauRadius) / 15; const smooth = t * t * (3 - 2 * t); height = plateauHeight * (1 - smooth) + height * smooth; }
  return height;
}

function ParadiseTerrain() {
  const grassTexture = useTexture('/grass.jpg')
  grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping; grassTexture.repeat.set(24, 24);
  const terrainGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(500, 500, 256, 256); const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) pos.setZ(i, getElevation(pos.getX(i), -pos.getY(i)) + 5)
    geo.computeVertexNormals(); return geo;
  }, [])
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} geometry={terrainGeo}>
      <meshStandardMaterial map={grassTexture} color="#ffffff" roughness={0.9} />
    </mesh>
  )
}

function ParadiseWater() {
  const waterTexture = useTexture('/water.jpg'); waterTexture.wrapS = waterTexture.wrapT = THREE.RepeatWrapping; waterTexture.repeat.set(12, 12);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, waterLevel, 0]}>
      <planeGeometry args={[500, 500]} />
      <meshStandardMaterial map={waterTexture} color="#00aaff" transparent opacity={0.6} roughness={0.1} metalness={0.8} />
    </mesh>
  )
}

function Fireflies() {
  const count = 500; const pointsRef = useRef();
  const positions = useMemo(() => { const pos = new Float32Array(count * 3); for (let i = 0; i < count; i++) { pos[i * 3] = (Math.random() - 0.5) * 400; pos[i * 3 + 1] = Math.random() * 50; pos[i * 3 + 2] = (Math.random() - 0.5) * 400; } return pos; }, [])
  const glowTexture = useMemo(() => {
    const canvas = document.createElement('canvas'); canvas.width = 32; canvas.height = 32; const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)'); grad.addColorStop(0.2, 'rgba(255, 215, 0, 0.8)'); grad.addColorStop(1, 'rgba(255, 215, 0, 0)');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 32, 32); return new THREE.CanvasTexture(canvas);
  }, [])
  useFrame((_, delta) => {
    if (!pointsRef.current) return; const posArray = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) { posArray[i * 3 + 1] += delta * 1.5; posArray[i * 3] += Math.sin(posArray[i * 3 + 1] * 0.1) * delta * 2; if (posArray[i * 3 + 1] > 40) { posArray[i * 3 + 1] = -5; posArray[i * 3] = (Math.random() - 0.5) * 400; posArray[i * 3 + 2] = (Math.random() - 0.5) * 400; } }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  })
  return (<points ref={pointsRef}><bufferGeometry><bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} /></bufferGeometry><pointsMaterial size={2.5} map={glowTexture} transparent={true} opacity={0.8} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} /></points>)
}

function GlowingTrees() {
  const { scene } = useGLTF('/tree.glb')
  const treePositions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < 40; i++) {
      let x, y, z;
      do {
        x = (Math.random() - 0.5) * 400; z = (Math.random() - 0.5) * 400;
        if (Math.abs(x) < 40 && Math.abs(z) < 40) continue;
        y = getElevation(x, z);
      } while (y < waterLevel + 0.5);
      pos.push({ x, y, z, scale: 0.026 + Math.random() * 0.018, rotation: Math.random() * Math.PI });
    }
    return pos;
  }, []);

  return (
    <group>
      {treePositions.map((data, i) => (
        <group key={i} position={[data.x, data.y, data.z]} rotation={[0, data.rotation, 0]} scale={data.scale}>
          <Clone object={scene} inject={<meshStandardMaterial color="#aaffaa" emissive="#22aa22" emissiveIntensity={0.5} />} />
        </group>
      ))}
    </group>
  )
}

function FloatingIsland() {
  const grassTexture = useTexture('/grass.jpg')
  grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping; grassTexture.repeat.set(4, 4);

  const islandX = -60; const islandY = 40; const islandZ = -60;

  const count = 1000;
  const pointsRef = useRef();
  const dropPositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.5;
      pos[i * 3] = (islandX + 12) + Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.random() * islandY;
      pos[i * 3 + 2] = islandZ + Math.sin(angle) * radius;
    }
    return pos;
  }, [islandX, islandY, islandZ])

  const waterTexture = useMemo(() => {
    const canvas = document.createElement('canvas'); canvas.width = 16; canvas.height = 16; const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)'); grad.addColorStop(0.3, 'rgba(100, 200, 255, 0.8)'); grad.addColorStop(1, 'rgba(100, 200, 255, 0)');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 16, 16); return new THREE.CanvasTexture(canvas);
  }, [])

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] -= delta * (25 + Math.random() * 10);
      if (posArray[i * 3 + 1] < waterLevel) {
        posArray[i * 3 + 1] = islandY;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  })

  const islandGroup = useRef();
  useFrame(({ clock }) => {
    if (islandGroup.current) islandGroup.current.position.y = islandY + Math.sin(clock.getElapsedTime() * 0.5) * 1.5;
  })

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry><bufferAttribute attach="attributes-position" count={count} array={dropPositions} itemSize={3} /></bufferGeometry>
        <pointsMaterial size={2} map={waterTexture} transparent={true} opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      <group ref={islandGroup} position={[islandX, islandY, islandZ]}>
        <mesh position={[0, 1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[15, 32]} />
          <meshStandardMaterial map={grassTexture} color="#aaffaa" roughness={0.8} />
        </mesh>
        <mesh position={[0, -4, 0]}>
          <cylinderGeometry args={[15, 0, 10, 32]} />
          <meshStandardMaterial map={grassTexture} color="#88aa66" emissive="#112211" roughness={1} />
        </mesh>
      </group>
    </group>
  )
}

function IceTerrain() {
  const iceTexture = useTexture('/ice.jpg'); iceTexture.wrapS = iceTexture.wrapT = THREE.RepeatWrapping; iceTexture.repeat.set(16, 16); const terrainGeo = useMemo(() => { const geo = new THREE.PlaneGeometry(500, 500, 256, 256); const pos = geo.attributes.position; for (let i = 0; i < pos.count; i++) pos.setZ(i, getElevation(pos.getX(i), -pos.getY(i)) + 5); geo.computeVertexNormals(); return geo; }, []); return <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} geometry={terrainGeo}><meshStandardMaterial map={iceTexture} color="#aaddff" roughness={0.7} metalness={0.2} /></mesh>
}
function LavaTerrain() {
  const lavaTexture = useTexture('/lava.jpg'); lavaTexture.wrapS = lavaTexture.wrapT = THREE.RepeatWrapping; lavaTexture.repeat.set(16, 16); const terrainGeo = useMemo(() => { const geo = new THREE.PlaneGeometry(500, 500, 256, 256); const pos = geo.attributes.position; for (let i = 0; i < pos.count; i++) pos.setZ(i, getElevation(pos.getX(i), -pos.getY(i)) + 5); geo.computeVertexNormals(); return geo; }, []); return <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} geometry={terrainGeo}><meshStandardMaterial map={lavaTexture} roughness={0.9} emissive="#441100" emissiveIntensity={0.6} /></mesh>
}
function SnowStorm() {
  const count = 5000; const pointsRef = useRef(); const positions = useMemo(() => { const pos = new Float32Array(count * 3); for (let i = 0; i < count; i++) { pos[i * 3] = (Math.random() - 0.5) * 400; pos[i * 3 + 1] = Math.random() * 100; pos[i * 3 + 2] = (Math.random() - 0.5) * 400; } return pos; }, []); useFrame((_, delta) => { if (!pointsRef.current) return; const posArray = pointsRef.current.geometry.attributes.position.array; for (let i = 0; i < count; i++) { posArray[i * 3 + 1] -= delta * 15; if (posArray[i * 3 + 1] < -5) { posArray[i * 3 + 1] = 100; posArray[i * 3] = (Math.random() - 0.5) * 400; posArray[i * 3 + 2] = (Math.random() - 0.5) * 400; } } pointsRef.current.geometry.attributes.position.needsUpdate = true; }); return (<points ref={pointsRef}><bufferGeometry><bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} /></bufferGeometry><pointsMaterial size={0.6} color="#ffffff" transparent opacity={0.6} sizeAttenuation /></points>)
}
function AshStorm() {
  const count = 3000; const pointsRef = useRef(); const positions = useMemo(() => { const pos = new Float32Array(count * 3); for (let i = 0; i < count; i++) { pos[i * 3] = (Math.random() - 0.5) * 400; pos[i * 3 + 1] = Math.random() * 100; pos[i * 3 + 2] = (Math.random() - 0.5) * 400; } return pos; }, []); useFrame((_, delta) => { if (!pointsRef.current) return; const posArray = pointsRef.current.geometry.attributes.position.array; for (let i = 0; i < count; i++) { posArray[i * 3 + 1] -= delta * 8; posArray[i * 3] += delta * 5; if (posArray[i * 3 + 1] < -5) { posArray[i * 3 + 1] = 100; posArray[i * 3] = (Math.random() - 0.5) * 400; posArray[i * 3 + 2] = (Math.random() - 0.5) * 400; } } pointsRef.current.geometry.attributes.position.needsUpdate = true; }); return (<points ref={pointsRef}><bufferGeometry><bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} /></bufferGeometry><pointsMaterial size={0.8} color="#ff6600" transparent opacity={0.7} sizeAttenuation /></points>)
}

// ==========================================
// ASTRONOT BİLEŞENİ (Kılıç Sabitlendi & Karakter Koyulaştırıldı)
// ==========================================
// Not: Artık "import { useControls } from 'leva'" yazısına ihtiyacımız kalmadı, onu kodun en üstünden silebilirsin.

function Astronaut({ position, name, controlsRef, nameColor = '#ffffff', scale = 1, glow = null, modelPath = '/little_astronaut.glb', nameY, textSize, modelOffset = [0, 0, 0] }) {

  const group = useRef()
  const { scene, animations } = useGLTF(modelPath)
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    if (names.length > 0) {
      actions[names[0]]?.reset().fadeIn(0.5).play()
    }
  }, [actions, names])

  const finalNameY = nameY !== undefined ? nameY : 2.5 * scale;
  const finalTextSize = textSize !== undefined ? textSize : 0.8 * scale;

  return (
    <group position={position} onClick={(e) => {
      e.stopPropagation();
      if (controlsRef.current) {
        controlsRef.current.setLookAt(
          position[0] + modelOffset[0], position[1] + (finalNameY * 1), position[2] + modelOffset[2] + 4.5,
          position[0] + modelOffset[0], position[1] + (finalNameY / 1.1), position[2] + modelOffset[2],
          true
        )
      }
    }}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      <group position={modelOffset} scale={[scale, scale, scale]}>
        <group ref={group}>
          <Clone object={scene} />
        </group>
      </group>

      <Billboard position={[0, finalNameY, 0]}>
        <Text fontSize={finalTextSize} color={nameColor} anchorX="center" anchorY="middle" outlineWidth={0.03} outlineColor="#000000">{name}</Text>
      </Billboard>
      {glow && <pointLight distance={30} intensity={15} color={glow} position={[0, 4, 3]} />}
    </group>
  )
}
function MemoryCoreHologram({ list, setFocusedTarget }) {
  const group = useRef()
  const cylinderRef = useRef()

  const { scene, animations } = useGLTF('/memory_core.glb')
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    if (names.length > 0) actions[names[0]]?.reset().play()
    scene.traverse((obj) => {
      if (obj.name === 'Hologram_screen') obj.visible = false
    })
  }, [actions, names, scene])

  // [DÜZELTME]: Liste her değiştiğinde texture'ı tamamen yeniliyoruz
  const canvasTexture = useMemo(() => {
    const canvas = document.createElement('canvas')

    // Yüksekliği yine senin listene göre ayarlıyoruz
    const calculatedHeight = Math.max(2048, (list.length * 60) + 200);

    // [ADIM 1]: Genişliği 1024'ten 512'ye düşürerek tuvali daraltıyoruz
    canvas.width = 512
    canvas.height = calculatedHeight
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // [ADIM 2]: Yazıların enine yayılmasını önlemek için font ayarı
    ctx.font = 'Bold 30px Courier New' // Fontu biraz küçültmek daraltmaya yardımcı olur
    ctx.fillStyle = '#107c29'
    ctx.textAlign = 'center'

    list.forEach((name, i) => {
      // Artık isimler yerine sistem/matris havası katan rastgele sayılar üretiyoruz
      const randNum1 = Math.floor(1000 + Math.random() * 9000);
      const randNum2 = Math.floor(1000 + Math.random() * 9000);
      const randNum3 = Math.floor(1000 + Math.random() * 9000);
      const fakeCode = `${randNum1}-${randNum2}-${randNum3}`;

      // Yeni genişliğin yarısı (256) merkez noktamız oldu
      ctx.fillText(fakeCode, 256, 100 + i * 60)
    })

    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping

    // [ADIM 3]: Dokunun silindir üzerinde kaç kez tekrarlanacağını ayarla
    // Yatayda (x) daha fazla tekrar yaparsan yazılar daha dar görünür. 
    tex.repeat.set(6, 0.2);

    tex.needsUpdate = true
    return tex
  }, [list])

  useFrame((state, delta) => {
    // 4. Kayma efektini her karede uyguluyoruz
    if (canvasTexture) {
      canvasTexture.offset.y -= delta * 0.15;
    }
    if (cylinderRef.current) {
      cylinderRef.current.rotation.y += delta * 0;
      cylinderRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.02;
    }
  });

  return (
    <group position={[80, 20, 20]} scale={2}>
      <Billboard position={[0, 5, 0]} follow={true}>
        <group>
          {/* Arkadaki yeşil neon yansıma */}
          <Text position={[0, 0, -0.1]} fontSize={1.1} color="#00ff44" anchorX="center" outlineWidth={0.08} outlineColor="#005511" fillOpacity={0.8}>
            | BIG BANG |
          </Text>
          {/* Öndeki yoğun kırmızı ana yazı */}
          <Text fontSize={1} color="#ff0000" anchorX="center" outlineWidth={0.04} outlineColor="#550000">
            | BIG BANG |
          </Text>
          {/* Alttaki yeşil vurgulu Nüfus Bilgisi */}
          <Text position={[0, -1.3, 0]} fontSize={0.6} color="#00ff44" anchorX="center" outlineWidth={0.03} outlineColor="#000000">
            POPULATION: {list.length} / 1.000.000
          </Text>
        </group>
      </Billboard>

      <group ref={group}>
        <primitive object={scene} />
        {/* BIG BANG ÇEKİRDEĞİNİ BURAYA KOYDUK */}
        <BigBangModel position={[0, 0.5, 0]} scale={1.0} />
      </group>

      <mesh
        ref={cylinderRef}
        onClick={(e) => { e.stopPropagation(); setFocusedTarget('memory_core'); }}
      >
        <cylinderGeometry args={[4.2, 4.2, 5, 64, 1, true]} />
        <meshBasicMaterial
          map={canvasTexture}
          transparent={true}
          opacity={10.9}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
function Casper({ position, name, scale = 1, modelOffset = [0, 0, 0], nameY, textSize, controlsRef, nameColor = '#ffcc00', glow = null }) {
  const group = useRef();
  const { scene } = useGLTF('/casper.glb');

  const finalNameY = nameY !== undefined ? nameY : 2.5 * scale;
  const finalTextSize = textSize !== undefined ? textSize : 0.8 * scale;

  const randomOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();

    group.current.position.y = Math.sin(t + randomOffset) * 0.5;
    group.current.rotation.z = Math.sin(t * 0.5 + randomOffset) * 0.1;
    const s = 1 + Math.sin(t * 1.5 + randomOffset) * 0.05;
    group.current.scale.set(s, s, s);
  });

  return (
    <group position={position} onClick={(e) => {
      e.stopPropagation();
      if (controlsRef && controlsRef.current) {
        controlsRef.current.setLookAt(
          position[0] + modelOffset[0], position[1] + finalNameY, position[2] + modelOffset[2] + 4.5,
          position[0] + modelOffset[0], position[1] + (finalNameY / 1.1), position[2] + modelOffset[2],
          true
        )
      }
    }}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      <group position={modelOffset} scale={[scale, scale, scale]}>
        <group ref={group}>
          <Clone object={scene} />
        </group>
      </group>

      <Billboard position={[0, finalNameY, 0]}>
        <Text fontSize={finalTextSize} color={nameColor} outlineWidth={0.03} outlineColor="#000000">{name}</Text>
      </Billboard>
      {glow && <pointLight distance={30} intensity={15} color={glow} position={[0, 4, 3]} />}
    </group>
  );
}
function GenesisHierarchy({ controlsRef, list, searchQuery }) {
  const baseY = 3;
  const columns = useMemo(() => {
    const cols = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2; const x = Math.cos(angle) * 13.5; const z = Math.sin(angle) * 13.5;
      cols.push(<mesh key={`col-${i}`} position={[x, baseY + 4, z]}><cylinderGeometry args={[0.8, 1, 8, 16]} /><meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} /></mesh>);
    }
    return cols;
  }, [baseY]);

  // Animasyonların kaybolmaması için (useGLTF clone componentlerinin yeniden mount olmaması için)
  // useMemo yerine başlangıçta referans olarak kaydedilen veya id bazlı statik veriler tutmalıyız:
  const characterDataRef = useRef(null);

  if (!characterDataRef.current || characterDataRef.current.length !== list.length) {
    characterDataRef.current = list.map((name, index) => {
      let x, y, z, scale = 1, nameColor = '#ffffff', glow = null, modelPath = '/casper.glb', nameY = 3.0, textSize = undefined;
      let mOffset = [0, 0, 0];

      if (index === 0) {
        x = 0; z = 0; y = baseY + 6; scale = 4.2; nameColor = '#ff007b'; glow = '#ffaa00'; modelPath = '/king.glb'; nameY = 9.4; textSize = 2.2;
      } else if (index === 1) {
        x = -8; z = 0; y = baseY + 4; scale = 0.025; nameColor = '#ffffff'; nameY = 6.0; modelPath = '/swwmya.glb'; textSize = 1.5;
      } else if (index === 2) {
        x = 8; z = 0; y = baseY + 3; scale = 0.20; nameColor = '#b46530'; nameY = 6.0; modelPath = '/elifertenx.glb'; textSize = 1.5;
        mOffset = [0, 0, 0];
      } else {
        if (index >= 3 && index < 24) {
          nameColor = '#ffcc00';
          modelPath = `/vip_${index + 1}.glb`;

          if (index === 3) { scale = 85.5; nameY = 8.0; textSize = 1; mOffset = [11, 4.0, 0]; }
          else if (index === 4) { scale = 2.4; nameY = 7.8; textSize = 1; }
          else if (index === 5) { scale = 5.2; nameY = 4.7; textSize = 1; }
          else if (index === 6) { scale = 2.3; nameY = 7.5; textSize = 1; }
          else if (index === 7) { scale = 2.5; nameY = 7.0; textSize = 1; }
          else if (index === 8) { scale = 2.3; nameY = 6.5; textSize = 1; }
          else if (index === 9) { scale = 0.42; nameY = 7.6; textSize = 1; mOffset = [0, 0.5, 0]; }
          else if (index === 10) { scale = 2.2; nameY = 8.3; textSize = 1; mOffset = [0, 0, -4]; }
          else if (index === 11) { scale = 3.7; nameY = 8.8; textSize = 1; glow = '#1b0707'; mOffset = [0, 0, 0]; }
          else if (index === 12) { scale = 2.2; nameY = 6.1; textSize = 1; }
          else if (index === 13) { scale = 4.2; nameY = 8.8; textSize = 1; }
          else if (index === 14) { scale = 4.1; nameY = 7.8; textSize = 1; }
          else if (index === 15) { scale = 2.2; nameY = 7.3; textSize = 1; }
          else if (index === 16) { scale = 5.7; nameY = 7.2; textSize = 1; }
          else if (index === 17) { scale = 4.2; nameY = 8.4; textSize = 1; }
          else if (index === 18) { scale = 0.7; nameY = 8.2; textSize = 1; }
          else if (index === 19) { scale = 2.7; nameY = 7.2; textSize = 1; }
          else if (index === 20) { scale = 2.7; nameY = 8.4; textSize = 1; }
          else if (index === 21) { scale = 2.7; nameY = 8.4; textSize = 1; }
          else if (index === 22) { scale = 2.7; nameY = 8.4; textSize = 1; }
          else if (index === 23) { scale = 0.6; nameY = 11.0; textSize = 1; }
        } else {
          nameColor = '#ffcc00'; scale = 0.9; nameY = 27.8; textSize = 1; mOffset = [0, 20.5, 0]; modelPath = '/casper.glb';
        }

        Math.seedrandom ? Math.seedrandom(name) : ''; // avoid random repositioning on hot reload if possible

        // Rastgele dağılım
        do {
          x = (Math.random() - 0.5) * 500;
          z = (Math.random() - 0.5) * 500;
          if (Math.abs(x) < 20 && Math.abs(z) < 35) { x += (x > 0 ? 40 : -40); z += (z > 0 ? 40 : -40); }
          y = getElevation(x, z);
        } while (y < waterLevel + 0.5);
      }

      return { name, index, x, y, z, scale, nameColor, glow, modelPath, nameY, textSize, mOffset };
    });
  }

  const characterData = characterDataRef.current;

  // Render edilmiş komponentleri (React Element) useMemo içinde tutarsak
  // App ana bileşeni re-render atsa bile bu componentler tamamen aynı referansla döner
  // ve animasyonlar sıfırlanmaz.
  const characterElements = useMemo(() => {
    return characterData.map((data) => {
      if (data.modelPath === '/casper.glb') {
        return <Casper key={data.index} position={[data.x, data.y, data.z]} name={data.name} controlsRef={controlsRef} nameColor={data.nameColor} scale={data.scale} glow={data.glow} nameY={data.nameY} textSize={data.textSize} modelOffset={data.mOffset} />
      } else {
        return <Astronaut key={data.index} position={[data.x, data.y, data.z]} name={data.name} controlsRef={controlsRef} nameColor={data.nameColor} scale={data.scale} glow={data.glow} modelPath={data.modelPath} nameY={data.nameY} textSize={data.textSize} modelOffset={data.mOffset} />
      }
    });
  }, [characterData, controlsRef]);

  useEffect(() => {
    if (searchQuery && controlsRef.current && characterData) {
      const target = characterData.find(c => c.name.toLowerCase() === searchQuery.toLowerCase() || c.name.toLowerCase().includes(searchQuery.toLowerCase()));
      if (target) {
        const { x, y, z, mOffset, nameY, scale } = target;
        const finalNameY = nameY !== undefined ? nameY : 2.5 * scale;
        controlsRef.current.setLookAt(
          x + mOffset[0], y + (finalNameY * 1), z + mOffset[2] + 4.5,
          x + mOffset[0], y + (finalNameY / 1.1), z + mOffset[2],
          true
        );
      }
    }
  }, [searchQuery, characterData, controlsRef]);

  // this is comment section,  i gotta make new videos about keyboard and monitor while im adding new followers to universe, idk if this is gonna be a good project but actually after this day i dont believe much, i only have 24 followes 10 of them are friend and 3-4 of them are from some bot comments, i have only 10 real followers. i hope i will grove fast otherwise im gonna give up cuz im tired.
  return (
    <group>
      <spotLight position={[0, baseY + 30, 0]} intensity={250} distance={100} angle={Math.PI / 6} penumbra={0.5} color="#ffffff" castShadow />
      <mesh position={[0, baseY + 0.5, 0]}><cylinderGeometry args={[16, 18, 0.4, 64]} /><meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.2} /></mesh>
      <mesh position={[0, baseY + 1.01, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[15.5, 16.5, 64]} /><meshBasicMaterial color="#ffd700" side={THREE.DoubleSide} /></mesh>
      {columns}
      <mesh position={[0, baseY + 3.5, 0]}><cylinderGeometry args={[2.5, 3.5, 5, 32]} /><meshStandardMaterial color="#ffcc00" metalness={1} roughness={0.2} emissive="#aa8800" emissiveIntensity={0.4} /></mesh>
      <mesh position={[-8, baseY + 2.5, 0]}><cylinderGeometry args={[2, 3, 3, 32]} /><meshStandardMaterial color="#cccccc" metalness={1} roughness={0.2} emissive="#666666" emissiveIntensity={0.3} /></mesh>
      <mesh position={[8, baseY + 2.0, 0]}><cylinderGeometry args={[2, 3, 2, 32]} /><meshStandardMaterial color="#cd7f32" metalness={1} roughness={0.3} emissive="#663300" emissiveIntensity={0.3} /></mesh>

      {characterElements}
    </group>
  )
}

function FollowerAvatars({ controlsRef, list, defaultColor }) {
  const avatarPositions = useMemo(() => list.map((name) => { const x = (Math.random() - 0.5) * 200; const z = (Math.random() - 0.5) * 200; return { name, x, y: getElevation(x, z), z }; }), [list]);

  // DİĞER GEZEGENLER DE CASPER ANIMASYONLARINI KULLANACAK ŞEKİLDE GÜNCELLENDİ
  return <group>{avatarPositions.map((avatar, index) => <Casper key={index} position={[avatar.x, avatar.y, avatar.z]} name={avatar.name} controlsRef={controlsRef} nameColor={defaultColor} scale={0.9} nameY={27.8} textSize={1} modelOffset={[0, 20.5, 0]} />)}</group>
}

try {
  useGLTF.preload('/tree.glb');
  useGLTF.preload('/little_astronaut.glb');
  useGLTF.preload('/king.glb');
  useGLTF.preload('/founder.glb');
  useGLTF.preload('/tanri.glb');
  useGLTF.preload('/swwmya.glb');
  useGLTF.preload('/elifertenx.glb');

  // 4'ten 11'e kadar olan VIP'leri ve Standart Vatandaşı buraya işliyoruz
  useGLTF.preload('/vip_4.glb');
  useGLTF.preload('/vip_5.glb');
  useGLTF.preload('/vip_6.glb');
  useGLTF.preload('/vip_7.glb');
  useGLTF.preload('/vip_8.glb');
  useGLTF.preload('/vip_9.glb');
  useGLTF.preload('/vip_10.glb');
  useGLTF.preload('/vip_11.glb');
  useGLTF.preload('/vip_12.glb');
  useGLTF.preload('/vip_13.glb');
  useGLTF.preload('/vip_14.glb');
  useGLTF.preload('/vip_15.glb');
  useGLTF.preload('/vip_16.glb');
  useGLTF.preload('/vip_17.glb');
  useGLTF.preload('/vip_18.glb');
  useGLTF.preload('/vip_19.glb');
  useGLTF.preload('/vip_20.glb');
  useGLTF.preload('/vip_21.glb');
  useGLTF.preload('/vip_22.glb');
  useGLTF.preload('/vip_23.glb');
  useGLTF.preload('/vip_24.glb');
  useGLTF.preload('/casper.glb');
  useGLTF.preload('/space_station');
  useGLTF.preload('/memory_core.glb');
  useGLTF.preload('/animation_object.glb');
  useGLTF.preload('/repaired_moon.glb');
  useGLTF.preload('/bigbang.glb');
} catch (e) { }
// ==========================================
// 3. BÖLÜM: KAMERA VE ANA UYGULAMA
// ==========================================

function HologramDatabase({ list, position, setFocusedTarget, isFocused }) {
  const [listTexture, setListTexture] = useState(null)
  const [frameTexture, setFrameTexture] = useState(null)
  const offsetRef = useRef(0);

  useEffect(() => {
    // ===============================================
    // 1. KATMAN: STATİK ÇERÇEVE VE BAŞLIK (MASKELEYİCİ)
    // ===============================================
    const frameCanvas = document.createElement('canvas')
    const fCtx = frameCanvas.getContext('2d')
    frameCanvas.width = 2048
    frameCanvas.height = 3072 // 80x120 uçağına 1:1.5 ölçüsünde mükemmel oran cözünürlük

    fCtx.clearRect(0, 0, 2048, 3072)

    // Üst ve Alt Kısımlara Siyah Zemin (Arkasında kayan texti maskelemek için %100 opak)
    fCtx.fillStyle = 'rgba(0, 4, 2, 1.0)'
    fCtx.fillRect(0, 0, 2048, 450)     // Üst başlık bölgesi
    fCtx.fillRect(0, 2900, 2048, 172)  // Alt ince kenar bölgesi

    // Sağ-Sol kenarlara ufak taşmaları maskelemek için zemin
    fCtx.fillRect(0, 0, 40, 3072)
    fCtx.fillRect(2008, 0, 40, 3072)

    // Hologramın tam arkaplanına "çok hafif şeffaf neon yeşili" tint
    // Daha çok orta kısmı dolduracak şekilde boyuyoruz
    fCtx.fillStyle = 'rgba(0, 255, 68, 0.14)'
    fCtx.fillRect(40, 450, 1968, 2450)

    // Neon Yeşil Çerçeve (Köpürebilir gölgeli)
    fCtx.lineWidth = 15
    fCtx.strokeStyle = '#00ff44'
    fCtx.shadowColor = '#00ff44'
    fCtx.shadowBlur = 10
    fCtx.strokeRect(20, 20, 2008, 3032)

    // Başlık ve Veri Yazıları (Sadece üst/statik bölgedeler)
    fCtx.font = 'Bold 90px "Courier New", Courier, monospace'
    fCtx.fillStyle = '#0a7a2e'
    fCtx.textAlign = 'left'
    fCtx.shadowBlur = 4

    fCtx.fillText('=== UNIVERSAL DATABASE ===', 80, 160)
    fCtx.fillText(`TOTAL ENTITIES: ${list.length}`, 80, 300)

    // Başlıkla içerik arasına ayrım çizgisi
    fCtx.lineWidth = 10
    fCtx.beginPath();
    fCtx.moveTo(20, 450);
    fCtx.lineTo(2028, 450);
    fCtx.stroke();

    const fTex = new THREE.CanvasTexture(frameCanvas)
    fTex.anisotropy = 16;
    fTex.minFilter = THREE.LinearFilter;
    fTex.magFilter = THREE.LinearFilter;
    setFrameTexture(fTex);

    // ===============================================
    // 2. KATMAN: KAYAN İSİM LİSTESİ (SONSUZ DÖNGÜ)
    // ===============================================
    const listCanvas = document.createElement('canvas')
    const lCtx = listCanvas.getContext('2d')

    const columnCount = 2
    const rowCount = Math.ceil(list.length / columnCount)
    // Satır başına 100px; panel en az 3072 kadar uzun olmalı, listeye göre büyüyecek
    const listHeight = Math.max(3072, rowCount * 120 + 300)

    listCanvas.width = 2048
    listCanvas.height = listHeight

    // ListCanvas için sadece opak metin kalacak (Background temiz olmalı)
    lCtx.clearRect(0, 0, listCanvas.width, listCanvas.height)

    // İsim Fontları
    lCtx.font = 'Bold 65px "Courier New", Courier, monospace'
    lCtx.fillStyle = '#0a7a2e'
    lCtx.shadowColor = '#00ff44'
    lCtx.shadowBlur = 2

    list.forEach((name, i) => {
      const col = i % columnCount
      const row = Math.floor(i / columnCount)
      const x = 120 + col * (listCanvas.width / columnCount)
      const y = 200 + row * 120
      lCtx.fillText(`> ${name}`, x, y)
    })

    const lTex = new THREE.CanvasTexture(listCanvas)
    lTex.anisotropy = 16;
    lTex.minFilter = THREE.LinearFilter;
    lTex.magFilter = THREE.LinearFilter;
    // Sonsuz döngü ayarı:
    lTex.wrapS = THREE.RepeatWrapping
    lTex.wrapT = THREE.RepeatWrapping

    const displayRatio = 3072 / listCanvas.height;
    lTex.repeat.set(1, displayRatio);
    setListTexture(lTex)

  }, [list])

  useFrame((state, delta) => {
    if (listTexture) {
      // Sürekli kendi kendine akan animasyon. Negatif arttıkça yukarı akar.
      offsetRef.current -= delta * 0.015;
      listTexture.offset.y = offsetRef.current;
    }
  })

  useEffect(() => {
    const handleScroll = (e) => {
      if (isFocused) {
        // e.deltaY pozitif ise aşağı kaydırıyoruz (dokudaki offset eksiye artmalı)
        offsetRef.current -= Math.sign(e.deltaY) * 0.05;
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [isFocused]);

  return (
    <Billboard
      follow={true}
      position={position}
      onClick={(e) => { e.stopPropagation(); setFocusedTarget('database_hologram'); }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      {/* 2. Katman: Sonsuz Kayan İsim Listesi (Hemen arkada: z:-0.5) */}
      <mesh position={[0, 0, -0.5]}>
        <planeGeometry args={[80, 120]} />
        {listTexture && (
          <meshBasicMaterial
            map={listTexture}
            transparent={true}
            opacity={0.8}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        )}
      </mesh>

      {/* 1. Katman: Statik Çerçeve ve Başlık Maskesi (Önde: z:0) */}
      {/* Normal blending kullanarak opak bölgelerinin arkadaki isimleri örtmesini (maskelemesini) sağlıyoruz */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[80, 120]} />
        {frameTexture && (
          <meshBasicMaterial
            map={frameTexture}
            transparent={true}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        )}
      </mesh>

      <pointLight color="#00ff44" intensity={200} distance={150} position={[0, 0, 10]} />
    </Billboard>
  )
}

function PlayerController({ controlsRef, view, stepRef }) {
  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false })
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.code === 'KeyW') setMovement(m => ({ ...m, forward: true })); if (e.code === 'KeyS') setMovement(m => ({ ...m, backward: true })); if (e.code === 'KeyA') setMovement(m => ({ ...m, left: true })); if (e.code === 'KeyD') setMovement(m => ({ ...m, right: true })); }
    const handleKeyUp = (e) => { if (e.code === 'KeyW') setMovement(m => ({ ...m, forward: false })); if (e.code === 'KeyS') setMovement(m => ({ ...m, backward: false })); if (e.code === 'KeyA') setMovement(m => ({ ...m, left: false })); if (e.code === 'KeyD') setMovement(m => ({ ...m, right: false })); }
    window.addEventListener('keydown', handleKeyDown); window.addEventListener('keyup', handleKeyUp);
    return () => { window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('keyup', handleKeyUp); }
  }, [])

  useEffect(() => {
    const isMoving = movement.forward || movement.backward || movement.left || movement.right;
    if (view.startsWith('surface') && isMoving) { if (stepRef.current?.paused) stepRef.current.play(); }
    else { if (!stepRef.current?.paused) stepRef.current.pause(); }
  }, [movement, view, stepRef])

  useFrame((state, delta) => {
    if (!view.startsWith('surface') || !controlsRef.current) return;
    const speed = 25 * delta; const forward = new THREE.Vector3(); state.camera.getWorldDirection(forward); forward.y = 0; forward.normalize();
    const right = new THREE.Vector3().crossVectors(forward, state.camera.up).normalize(); const moveVector = new THREE.Vector3();
    if (movement.forward) moveVector.add(forward); if (movement.backward) moveVector.sub(forward); if (movement.left) moveVector.sub(right); if (movement.right) moveVector.add(right);
    if (moveVector.lengthSq() > 0) {
      moveVector.normalize().multiplyScalar(speed);
      let newX = Math.max(-200, Math.min(200, state.camera.position.x + moveVector.x));
      let newZ = Math.max(-200, Math.min(200, state.camera.position.z + moveVector.z));
      const newY = getElevation(newX, newZ) + 3;
      controlsRef.current.setLookAt(newX, newY, newZ, newX + forward.x, newY + forward.y, newZ + forward.z, false);
    }
  })
  return null
}

function SceneController({ view, controlsRef }) {
  const { scene } = useThree()
  useEffect(() => {
    if (!controlsRef.current) return;
    if (view === 'galaxy') {
      scene.fog = null; scene.background = new THREE.Color('#000000');
    } else if (view === 'surface_genesis') {
      scene.fog = new THREE.Fog('#87CEEB', 50, 300); scene.background = new THREE.Color('#87CEEB');
      controlsRef.current.setPosition(0, 300, 100, false); controlsRef.current.setLookAt(0, 10, 40, 0, 5, 0, true);
    } else if (view === 'surface_ice') {
      scene.fog = new THREE.Fog('#0a2e3f', 30, 200); scene.background = new THREE.Color('#0a2e3f');
      controlsRef.current.setPosition(0, 300, 100, false); controlsRef.current.setLookAt(0, 5, 30, 0, 5, 0, true);
    } else if (view === 'surface_lava') {
      scene.fog = new THREE.Fog('#2a0505', 20, 150); scene.background = new THREE.Color('#1a0000');
      controlsRef.current.setPosition(0, 300, 100, false); controlsRef.current.setLookAt(0, 5, 30, 0, 5, 0, true);
    }
  }, [view, scene, controlsRef])
  return null
}
function SpaceStationModel({ position, scale, setFocusedTarget }) {
  const { scene } = useGLTF('/space_station.glb')

  return (
    <group position={position}>
      {/* GÜNEŞ YANSIMASI: Işığı Güneş'in olduğu yöne (merkeze doğru) konumlandırıyoruz */}
      <pointLight
        intensity={10000} // Parlaklık şiddeti
        distance={200}   // Işığın ulaşacağı mesafe
        color="#ffcc00"  // Güneş'in altın sarısı rengi
        position={[-90, -20, -35]} // İstasyon [90, 20, 35] olduğu için tam tersi yön Güneş'i gösterir
      />

      <primitive
        object={scene}
        scale={scale}
        onClick={(e) => { e.stopPropagation(); setFocusedTarget('space_station'); }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      />
    </group>
  )
}
function AnimatedStructure({ position, scale, setFocusedTarget, focusedTarget, onEnterBlackHole }) {
  const group = useRef()
  const { scene, animations } = useGLTF('/animation_object.glb')
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    if (names.length > 0) actions[names[0]]?.reset().play()
  }, [actions, names])

  return (
    <group
      ref={group}
      position={position}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        // Eğer zaten bu yapıya odaklıysak girişi başlat, değilsek odaklan
        if (focusedTarget === 'animated_structure') {
          onEnterBlackHole();
        } else {
          setFocusedTarget('animated_structure');
        }
      }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      <primitive object={scene} />

      {/* Sadece odaklandığımızda görünen ve girişi belirten yazı */}
      {focusedTarget === 'animated_structure' && (
        <Billboard position={[0, 45, 0]}>
          <Text
            fontSize={8}
            color="#ff0000"
            font="/Orbitron-Bold.ttf"
            outlineWidth={0.5}
            outlineColor="#000000"
          >
            /// [ CLICK AGAIN TO ENTER EVENT HORIZON ] ///
          </Text>
        </Billboard>
      )}
    </group>
  )
}

export function RepairedMoon({ setFocusedTarget, focusedTarget, moonPositionRef }) {
  const { scene } = useGLTF('/repaired_moon.glb')
  const moonRef = useRef()
  const customTimeRef = useRef(0)

  useFrame((state, delta) => {
    // Sadece Güneş odaklıyken zamanı ilerlet, yoksa dondur
    if (focusedTarget !== 'sun' && focusedTarget !== null) return;

    customTimeRef.current += delta;
    const t = customTimeRef.current;

    const distance = 82;
    const speed = -0.08;

    const x = Math.cos(t * speed) * distance
    const z = Math.sin(t * speed) * distance

    if (moonRef.current) {
      moonRef.current.position.set(x, 5, z)
      moonRef.current.rotation.y += 0.003

      // KRİTİK DÜZELTME: Anlık pozisyonu App.js'teki Ref'e yazıyoruz
      if (moonPositionRef && moonPositionRef.current) {
        moonPositionRef.current.set(x, 5, z);
      }
    }
  })

  // Altın parçaların parlama ayarı
  scene.traverse((child) => {
    if (child.isMesh && (child.name.includes("repair") || child.name.includes("metal"))) {
      child.material.emissive = new THREE.Color("#ffaa00");
      child.material.emissiveIntensity = 30;
    }
  });

  return (
    <primitive
      ref={moonRef}
      object={scene}
      scale={5}
      onClick={(e) => {
        e.stopPropagation();
        setFocusedTarget('repaired_moon');
      }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    />
  )
}
function BigBangModel({ position = [0, 0, 0], scale = 1 }) {
  const group = useRef()
  const { scene, animations } = useGLTF('/bigbang.glb')
  const { actions, names } = useAnimations(animations, group)
  const materialsRef = useRef([])

  useEffect(() => {
    // Tüm animasyon kanallarını aynı anda oynatıyoruz
    if (names && names.length > 0) {
      names.forEach(name => actions[name]?.reset().play());
    }

    materialsRef.current = []
    let index = 0;
    scene.traverse((child) => {
      if (child.isMesh || child.isPoints) {
        // Renkleri korurken maksimum parlamanın önüne geçelim
        const colors = ["#00ffff", "#ff00ff", "#aa00ff", "#ff0044"];
        const color = new THREE.Color(colors[index % colors.length]);

        const mat = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.0000005,
          blending: THREE.NormalBlending,
          depthWrite: false,
          depthTest: true,
          side: THREE.DoubleSide
        });

        child.material = mat;
        materialsRef.current.push(mat)
        index++;
      }
    });
  }, [actions, names, scene])

  // Sabit ve temiz bir nefes alma animasyonu
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (group.current) {
      // Çekirdeğin çok çok hafif şişip inmesi
      const pulseScale = scale + (Math.sin(t * 2) * (0.05 * scale));
      group.current.scale.set(pulseScale, pulseScale, pulseScale);

      // En güvenli döndürme yöntemi, eksenleri bozmaz
      group.current.rotation.y += 0.005;
      group.current.rotation.z += 0.002;
    }

    // Daha katı ve görünür olması için opacity değerleri belirgin şekilde artırıldı
    materialsRef.current.forEach((mat, i) => {
      const flicker = Math.abs(Math.sin(t * 1.5 + i)) * 0.05;
      mat.opacity = 0.2 + flicker;
    });
  })

  return (
    <group position={position} scale={scale}>
      <group ref={group}>
        <pointLight intensity={300} distance={100} color="#ff00ff" position={[0, 0, 0]} />
        <primitive object={scene} />
      </group>
    </group>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [view, setView] = useState('galaxy')
  const [focusedTarget, setFocusedTarget] = useState('sun')
  const [transitionVideo, setTransitionVideo] = useState('/transition.mp4')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const cameraControlsRef = useRef()
  const videoRef = useRef(null)

  const moonPositionRef = useRef(new THREE.Vector3(82, 5, 0));

  const windRef = useRef(null);
  const fireRef = useRef(null);
  const stepRef = useRef(null);
  const birdsRef = useRef(null);

  // KAMERA ODAKLANMA SİSTEMİ
  useEffect(() => {
    if (!cameraControlsRef.current) return;

    // Tekerlek olayını tamamen kapatmak yerine, doğrudan Dolly (Zoom) hızını sıfıra indiriyoruz.
    // Böylece tekerlek kaydırıldığında başka React Three Fiber bileşenleri "mouse.wheel=0" hatasına düşmüyor.
    if (focusedTarget === 'database_hologram') {
      cameraControlsRef.current.dollySpeed = 0; // Zoom kilidi - Kapalı
    } else {
      cameraControlsRef.current.dollySpeed = 1; // Kamera Zoom Yeteneği - Açık
    }

    if (focusedTarget === 'sun') {
      cameraControlsRef.current.setLookAt(0, 40, 80, 0, 0, 0, true);
    }
    else if (focusedTarget === 'repaired_moon') {
      const { x, y, z } = moonPositionRef.current;
      cameraControlsRef.current.setLookAt(x + 25, y + 20, z + 25, x, y, z, true);
    }
    else if (focusedTarget === 'memory_core') {
      cameraControlsRef.current.setLookAt(120, 60, 80, 80, 20, 20, true);
    }
    else if (focusedTarget === 'space_station') {
      cameraControlsRef.current.setLookAt(85, 40, 60, 75, 10, 20, true);
    }
    else if (focusedTarget === 'animated_structure') {
      cameraControlsRef.current.setLookAt(-180, 50, -130, -250, 10, -200, true);
    }
    else if (focusedTarget === 'database_hologram') {
      cameraControlsRef.current.setLookAt(180, 20, 30, 180, 20, -50, true);
    }
    else if (focusedTarget === 'genesis') {
      cameraControlsRef.current.setLookAt(110, 40, 110, 82, 5, 82, true);
    }
  }, [focusedTarget]);

  // SES SİSTEMİ
  useEffect(() => {
    if (view === 'surface_genesis') {
      if (fireRef.current) fireRef.current.pause();
      if (windRef.current) windRef.current.pause();
      if (birdsRef.current) { birdsRef.current.volume = 0.5; birdsRef.current.play(); }
      if (stepRef.current) stepRef.current.src = "/grass_step.mp3";
    } else if (view === 'surface_ice') {
      if (fireRef.current) fireRef.current.pause();
      if (birdsRef.current) birdsRef.current.pause();
      if (windRef.current) { windRef.current.volume = 0.4; windRef.current.play(); }
      if (stepRef.current) stepRef.current.src = "/snow_step.mp3";
    } else if (view === 'surface_lava') {
      if (windRef.current) windRef.current.pause();
      if (birdsRef.current) birdsRef.current.pause();
      if (fireRef.current) { fireRef.current.volume = 0.5; fireRef.current.play(); }
      if (stepRef.current) stepRef.current.src = "/stone_step.mp3";
    } else {
      if (windRef.current) windRef.current.pause();
      if (fireRef.current) fireRef.current.pause();
      if (birdsRef.current) birdsRef.current.pause();
      if (stepRef.current) stepRef.current.pause();
    }
  }, [view])

  const handleEnterPlanet = (planetType) => {
    let vidSrc = '/transition.mp4';
    if (planetType === 'lava') vidSrc = '/lavatransition.mp4';
    if (planetType === 'genesis') vidSrc = '/paradisetransition1.mp4';
    setTransitionVideo(vidSrc);
    setTimeout(() => { if (videoRef.current) { videoRef.current.style.opacity = '1'; videoRef.current.currentTime = 0; videoRef.current.play(); } }, 50);
    setTimeout(() => { setView(`surface_${planetType}`) }, 2500)
    setTimeout(() => { if (videoRef.current) { videoRef.current.style.opacity = '0'; setTimeout(() => videoRef.current.pause(), 500); } }, 3000)
  }

  const menuItemStyle = (target, color) => ({
    padding: '10px 15px', margin: '5px 0', cursor: 'pointer',
    background: focusedTarget === target ? `${color}44` : 'rgba(0, 5, 10, 0.8)',
    borderLeft: focusedTarget === target ? `4px solid ${color}` : '4px solid transparent',
    color: focusedTarget === target ? color : '#aaaaaa', transition: 'all 0.3s', fontFamily: '"Courier New", Courier, monospace', fontSize: '14px'
  });

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#000' }}>

      {/* 🏠 EVRENE DÖNÜŞ BUTONU - Sadece gezegen yüzeyindeyken çıkar */}
      {view !== 'galaxy' && (
        <div
          onClick={() => setView('galaxy')}
          style={{
            position: 'absolute', top: '25px', left: '25px', zIndex: 110,
            cursor: 'pointer', background: 'rgba(255, 255, 255, 0.1)',
            padding: '7px 10px', borderRadius: '5px', border: '1px solid rgba(255, 255, 255, 0.4)',
            color: '#fff', fontFamily: '"Courier New", Courier, monospace',
            backdropFilter: 'blur(10px)', transition: 'all 0.3s',
            textTransform: 'uppercase', letterSpacing: '2px', fontSize: '12px'
          }}
        >
          [ Return to Galaxy ]
        </div>
      )}

      {view === 'surface_genesis' && (
        <div style={{
          position: 'absolute', top: '25px', right: '25px', zIndex: 110,
          background: 'rgba(0, 20, 5, 0.85)', padding: '15px', borderRadius: '8px',
          border: '1px solid #ffd700', boxShadow: '0 0 15px rgba(255, 215, 0, 0.3)',
          display: 'flex', flexDirection: 'column', gap: '10px',
          fontFamily: '"Courier New", Courier, monospace', backdropFilter: 'blur(4px)'
        }}>
          <div style={{ color: '#ffd700', fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px' }}>/// FIND FOLLOWER</div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <input
              type="text"
              placeholder="Enter name..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') setSearchQuery(searchInput) }}
              style={{
                background: 'rgba(0,0,0,0.5)', border: '1px solid #ffd700',
                color: '#fff', padding: '5px 10px', borderRadius: '4px', outline: 'none',
                fontFamily: '"Courier New", Courier, monospace', width: '150px'
              }}
            />
            <button
              onClick={() => setSearchQuery(searchInput)}
              style={{
                background: 'rgba(255, 215, 0, 0.2)', color: '#ffd700', border: '1px solid #ffd700',
                padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold',
                fontFamily: '"Courier New", Courier, monospace', transition: '0.3s'
              }}
              onPointerOver={(e) => e.target.style.background = 'rgba(255, 215, 0, 0.4)'}
              onPointerOut={(e) => e.target.style.background = 'rgba(255, 215, 0, 0.2)'}
            >[ SEARCH ]</button>
          </div>
        </div>
      )}

      {view === 'galaxy' && (
        <>
          <div onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ position: 'absolute', top: '25px', left: '25px', zIndex: 100, cursor: 'pointer', background: 'rgba(0, 5, 10, 0.9)', padding: '12px', borderRadius: '5px', border: '1px solid #555', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{ width: '25px', height: '3px', background: '#fff' }}></div>
            <div style={{ width: '25px', height: '3px', background: '#fff' }}></div>
            <div style={{ width: '25px', height: '3px', background: '#fff' }}></div>
          </div>

          <div style={{ position: 'absolute', top: '20px', left: isMenuOpen ? '20px' : '-300px', zIndex: 10, background: 'rgba(0, 5, 10, 0.9)', border: '1px solid #555', padding: '20px', borderRadius: '8px', backdropFilter: 'blur(10px)', width: '250px', transition: 'all 0.5s ease-in-out', opacity: isMenuOpen ? 1 : 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #555', paddingBottom: '10px' }}>
              <h2 style={{ color: '#ffffff', margin: 0, fontSize: '16px' }}>/// NAVIGATOR</h2>
              <span onClick={() => setIsMenuOpen(false)} style={{ color: '#fff', cursor: 'pointer', fontSize: '22px' }}>×</span>
            </div>
            <div style={menuItemStyle('sun', '#ffaa00')} onClick={() => { setFocusedTarget('sun'); setIsMenuOpen(false); }}>[0] Central Sun</div>
            <div style={menuItemStyle('genesis', '#ffd700')} onClick={() => { setFocusedTarget('genesis'); setIsMenuOpen(false); }}>[1] Elysium Prime</div>
            <div style={menuItemStyle('lava', '#ff3300')} onClick={() => { setFocusedTarget('lava'); setIsMenuOpen(false); }}>[2] Ignis Prime</div>
            <div style={menuItemStyle('ice', '#00ffff')} onClick={() => { setFocusedTarget('ice'); setIsMenuOpen(false); }}>[3] Frozen</div>
            <div style={menuItemStyle('memory_core', '#13630c')} onClick={() => { setFocusedTarget('memory_core'); setIsMenuOpen(false); }}>[4] Memory Core</div>
            <div style={menuItemStyle('database_hologram', '#0a7a2e')} onClick={() => { setFocusedTarget('database_hologram'); setIsMenuOpen(false); }}>[5] Univ. Database</div>
            <div style={menuItemStyle('space_station', '#888888')} onClick={() => { setFocusedTarget('space_station'); setIsMenuOpen(false); }}>[6] Space Station</div>
            <div style={menuItemStyle('bigbang', '#ff00ff')} onClick={() => { setFocusedTarget('bigbang'); setIsMenuOpen(false); }}>[7] The Big Bang</div>
            <div style={menuItemStyle('repaired_moon', '#ffffff')} onClick={() => { setFocusedTarget('repaired_moon'); setIsMenuOpen(false); }}>[8] Repaired Moon</div>
          </div>
        </>
      )}

      <audio ref={windRef} src="/wind.mp3" loop /> <audio ref={fireRef} src="/fire.mp3" loop />
      <audio ref={birdsRef} src="/birds.mp3" loop /> <audio ref={stepRef} src="/grass_step.mp3" loop />
      <video ref={videoRef} src={transitionVideo} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 100, opacity: 0, pointerEvents: 'none', transition: 'opacity 0.5s ease-out' }} />

      <Canvas>
        <Suspense fallback={null}>
          <CameraControls ref={cameraControlsRef} maxPolarAngle={Math.PI / 2 - 0.05} minDistance={2} maxDistance={500} />
          <SceneController view={view} controlsRef={cameraControlsRef} />
          <PlayerController controlsRef={cameraControlsRef} view={view} stepRef={stepRef} />

          {view === 'galaxy' && (
            <>
              <ambientLight intensity={1.4} color="#ffffff" />
              <SunSystem focusedTarget={focusedTarget} setFocusedTarget={setFocusedTarget} controlsRef={cameraControlsRef} />
              <SolarSystemOrbits onEnter={handleEnterPlanet} focusedTarget={focusedTarget} setFocusedTarget={setFocusedTarget} controlsRef={cameraControlsRef} />
              <MemoryCoreHologram list={genesisFollowers} setFocusedTarget={setFocusedTarget} cameraControlsRef={cameraControlsRef} />
              <SpaceStationModel position={[90, 20, 35]} scale={0.2} setFocusedTarget={setFocusedTarget} />
              <RepairedMoon focusedTarget={focusedTarget} setFocusedTarget={setFocusedTarget} moonPositionRef={moonPositionRef} />

              {/* === DEV HOLOGRAM DATABASE === */}
              {/* Gezegenlerin biraz daha sağında ve arkasında durması için x: 180, z: -50 verdik */}
              <HologramDatabase list={genesisFollowers} position={[180, 20, -50]} setFocusedTarget={setFocusedTarget} isFocused={focusedTarget === 'database_hologram'} />

              <AnimatedStructure position={[-250, 10, -200]} scale={0.07} setFocusedTarget={setFocusedTarget} />
              <Stars radius={250} depth={100} count={7000} factor={6} fade speed={1} />
            </>
          )}

          {view === 'surface_genesis' && (
            <>
              <ambientLight intensity={0.8} color="#ffffff" />
              <directionalLight position={[-50, 80, -20]} intensity={1.5} color="#ffffee" />
              <ParadiseTerrain /> <ParadiseWater /> <Fireflies />
              <Cloud position={[0, 100, 0]} opacity={0.5} speed={0.4} width={200} depth={200} segments={40} color="#ffffff" />
              <GenesisHierarchy controlsRef={cameraControlsRef} list={genesisFollowers} searchQuery={searchQuery} />
              <GlowingTrees /> <FloatingIsland />
            </>
          )}

          {view === 'surface_ice' && (
            <>
              <ambientLight intensity={0.5} color="#ffffff" />
              <IceTerrain /> <SnowStorm />
            </>
          )}

          {view === 'surface_lava' && (
            <>
              <ambientLight intensity={0.4} color="#ff3300" />
              <LavaTerrain /> <AshStorm />
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App