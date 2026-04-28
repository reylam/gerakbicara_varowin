import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const GestureViewer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xf8fafc, 10, 30);

    const camera = new THREE.PerspectiveCamera(35, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 1.5, 5);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 7);

    scene.add(ambientLight, directionalLight);

    const handGroup = new THREE.Group();
    const palm = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0x4f46e5, metalness: 0.2, roughness: 0.4 }),
    );
    palm.position.y = 0.2;
    handGroup.add(palm);

    const fingerMaterial = new THREE.MeshStandardMaterial({ color: 0xc7d2fe, metalness: 0.1, roughness: 0.35 });
    const fingerOffsets = [-0.6, -0.25, 0, 0.25, 0.55];

    fingerOffsets.forEach((x, index) => {
      const finger = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 1.8, 14),
        fingerMaterial,
      );
      finger.position.set(x, 1.3, 0);
      finger.rotation.x = Math.PI / 2.5;
      if (index === 0) finger.scale.set(0.9, 0.9, 0.9);
      handGroup.add(finger);
    });

    scene.add(handGroup);

    const grid = new THREE.GridHelper(12, 12, 0x8b5cf6, 0xede9fe);
    grid.position.y = -1.2;
    scene.add(grid);

    let active = false;
    let previousX = 0;
    let previousY = 0;
    let zoom = 5;

    const onPointerDown = (event: PointerEvent) => {
      active = true;
      previousX = event.clientX;
      previousY = event.clientY;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!active) return;
      const deltaX = event.clientX - previousX;
      const deltaY = event.clientY - previousY;
      previousX = event.clientX;
      previousY = event.clientY;
      handGroup.rotation.y += deltaX * 0.01;
      handGroup.rotation.x += deltaY * 0.01;
    };

    const onPointerUp = () => {
      active = false;
    };

    const onWheel = (event: WheelEvent) => {
      zoom = Math.min(10, Math.max(3, zoom + event.deltaY * 0.01));
      camera.position.z = zoom;
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('wheel', onWheel, { passive: true });

    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
    resize();

    window.addEventListener('resize', resize);

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', resize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="rounded-3xl overflow-hidden bg-slate-950/10 border border-slate-200/70 h-full">
      <div className="px-6 py-4 border-b border-slate-200/50 bg-slate-950/5">
        <p className="text-sm font-semibold text-slate-700">3D Gesture Preview</p>
      </div>
      <div className="h-[320px] w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
};
