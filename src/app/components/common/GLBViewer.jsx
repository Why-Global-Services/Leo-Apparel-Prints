'use client';

import { useEffect, useRef, useState } from 'react';

export default function GLBViewer({
  glbPath,
  autoRotate = true,
  rotationSpeed = 0.003,
  backgroundColor = '#F8FAFC',
  jerseyColor = '#FFFFFF',
  sleeveColor = '#111111',
  collarColor = '#111111',
  playerName = 'PLAYER',
  playerNumber = '10',
  nameColor = '#FFFFFF',
  numberColor = '#F59E0B',
  nameStyleId = 'collegiate',
  nameTextStyle = 'straight',
  nameVertical = 38,
  showText = true,
  clubLogo = null,
  sponsorLogo = null,
  nameEffect = 'none',
  nameEffectColor = '#000000',
  nameOutlineWidth = 1.5,
  numberEffect = 'none',
  numberEffectColor = '#000000',
}) {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const [loadingError, setLoadingError] = useState(null);

  const getFontFamily = (styleId) => {
    const fonts = {
      collegiate: '"Arial Black", sans-serif',
      block: 'Impact, sans-serif',
      varsity: '"Georgia", serif',
      sport: '"Verdana", sans-serif',
      modern: '"Helvetica", sans-serif',
      script: '"Satisfy", cursive',
      stencil: '"Rajdhani", sans-serif',
      condensed: '"Saira Condensed", sans-serif',
      brush: '"Pacifico", cursive',
    };
    return fonts[styleId] || '"Arial Black", sans-serif';
  };

  useEffect(() => {
    console.log('========================================');
    console.log('🔍 GLBViewer Debug Info:');
    console.log('📁 glbPath received:', glbPath);
    console.log('🎨 jerseyColor:', jerseyColor);
    console.log('========================================');

    if (!containerRef.current) return;

    if (!glbPath) {
      console.error('❌ No glbPath provided!');
      setLoadingError('No 3D model URL provided');
      const errorDiv = document.createElement('div');
      errorDiv.className = 'flex items-center justify-center w-full h-full';
      errorDiv.innerHTML = `
        <div class="text-center">
          <div class="text-red-500 text-sm mb-2">⚠️ No 3D model available</div>
          <p class="text-gray-500 text-xs">This product doesn't have a 3D model</p>
        </div>
      `;
      containerRef.current.appendChild(errorDiv);
      return;
    }

    const modelUrl = glbPath.startsWith('http') ? glbPath : `${window.location.origin}${glbPath}`;
    console.log('🌐 Full model URL:', modelUrl);

    fetch(modelUrl, { method: 'HEAD', mode: 'cors' })
      .then(response => {
        console.log('✅ URL is accessible! Status:', response.status);
      })
      .catch(err => {
        console.error('❌ Cannot access GLB URL:', err);
        setLoadingError(`Cannot load model: ${err.message}`);
      });

    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.display = 'block';
    iframeRef.current = iframe;

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: ${backgroundColor};
    }
    canvas { display: block; }
    #loading {
      position: fixed;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 14px;
      background: ${backgroundColor};
      z-index: 100;
      font-family: system-ui;
    }
    .spinner {
      width: 42px; height: 42px;
      border: 3px solid #E2E8F0;
      border-top-color: #0EA5E9;
      border-radius: 50%;
      animation: spin 0.85s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .hint {
      position: fixed;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.5);
      color: #fff;
      padding: 5px 16px;
      border-radius: 20px;
      font-size: 11px;
      font-family: system-ui;
      pointer-events: none;
      white-space: nowrap;
      z-index: 10;
    }
  </style>
</head>
<body>
  <div id="loading">
    <div class="spinner"></div>
    <span style="font-size:13px;font-weight:600;color:#334155;">Loading 3D Model...</span>
  </div>
  <div class="hint">🖱️ Drag to rotate</div>

  <script type="importmap">
  {"imports":{"three":"https://unpkg.com/three@0.128.0/build/three.module.js","three/addons/":"https://unpkg.com/three@0.128.0/examples/jsm/"}}
  </script>

  <script type="module">
    import * as THREE from 'three';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

    let model, controls;
    let nameSprite = null;
    let numberSprite = null;
    
    let userJerseyColor = '${jerseyColor}';
    let userSleeveColor = '${sleeveColor}';
    let userCollarColor = '${collarColor}';
    let userName = '${playerName}';
    let userNumber = '${playerNumber}';
    let userNameColor = '${nameColor}';
    let userNumberColor = '${numberColor}';
    let userFontFamily = '${getFontFamily(nameStyleId)}';
    let userVerticalPos = ${nameVertical};
    let userShowText = ${showText};
    
    let originalBodyColor = null;
    let originalSleeveColor = null;
    let originalCollarColor = null;
    
    let hasUserModified = {
      jersey: false,
      sleeve: false,
      collar: false
    };

    function isBodyMesh(name) {
      return name === 'default001' || name === 'default001_1' || name === 'Body' || name === 'Jersey';
    }
    
    function isSleeveMesh(name) {
      return name === 'default001_3' || name === 'default001_4' || name === 'Sleeve' || name === 'Sleeves';
    }
    
    function isCollarMesh(name) {
      return name === 'default001_2' || name === 'Collar' || name === 'Neck';
    }

    function createNameLabel() {
      if (nameSprite) {
        scene.remove(nameSprite);
        nameSprite = null;
      }
      
      if (!userShowText || !userName) return;
      
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 512;
      canvas.height = 512;
      
      context.fillStyle = 'rgba(0,0,0,0)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      const fontSize = 80;
      context.font = fontSize + 'pt ' + userFontFamily;
      context.fillStyle = userNameColor;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(userName, canvas.width/2, canvas.height/2);
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);
      
      const yPosition = 0.5 + (userVerticalPos - 50) / 100;
      sprite.position.set(0, yPosition, 0.25);
      sprite.scale.set(0.8, 0.8, 1);
      
      nameSprite = sprite;
      scene.add(nameSprite);
    }
    
    function createNumberLabel() {
      if (numberSprite) {
        scene.remove(numberSprite);
        numberSprite = null;
      }
      
      if (!userNumber) return;
      
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 512;
      canvas.height = 512;
      
      context.fillStyle = 'rgba(0,0,0,0)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      const fontSize = 120;
      context.font = fontSize + 'pt ' + userFontFamily;
      context.fillStyle = userNumberColor;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(userNumber, canvas.width/2, canvas.height/2);
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);
      
      sprite.position.set(0, 0.2, -0.25);
      sprite.scale.set(0.9, 0.9, 1);
      
      numberSprite = sprite;
      scene.add(numberSprite);
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('${backgroundColor}');
    
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(2, 3, 2);
    scene.add(mainLight);
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-1, 2, 1);
    scene.add(fillLight);
    const backLight = new THREE.DirectionalLight(0xffffff, 0.4);
    backLight.position.set(0, 1, -2);
    scene.add(backLight);
    
    function applyColors() {
      if (!model) return;
      
      model.traverse((child) => {
        if (!child.isMesh) return;
        
        const name = child.name;
        let colorToUse;
        
        if (isSleeveMesh(name)) {
          if (hasUserModified.sleeve && userSleeveColor) {
            colorToUse = userSleeveColor;
          } else if (originalSleeveColor) {
            colorToUse = originalSleeveColor;
          } else {
            colorToUse = userSleeveColor;
          }
        } else if (isCollarMesh(name)) {
          if (hasUserModified.collar && userCollarColor) {
            colorToUse = userCollarColor;
          } else if (originalCollarColor) {
            colorToUse = originalCollarColor;
          } else {
            colorToUse = userCollarColor;
          }
        } else if (isBodyMesh(name)) {
          if (hasUserModified.jersey && userJerseyColor) {
            colorToUse = userJerseyColor;
          } else if (originalBodyColor) {
            colorToUse = originalBodyColor;
          } else {
            colorToUse = userJerseyColor;
          }
        } else {
          colorToUse = userJerseyColor;
        }
        
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              if (mat && mat.color) mat.color.set(colorToUse);
            });
          } else {
            child.material.color.set(colorToUse);
          }
        }
      });
    }
    
    function storeOriginalColors(modelObj) {
      modelObj.traverse((child) => {
        if (!child.isMesh || !child.material) return;
        
        const name = child.name;
        const colorHex = '#' + child.material.color.getHexString();
        
        if (isBodyMesh(name)) {
          originalBodyColor = colorHex;
        } else if (isSleeveMesh(name)) {
          originalSleeveColor = colorHex;
        } else if (isCollarMesh(name)) {
          originalCollarColor = colorHex;
        }
      });
    }
    
    window.updateColors = (j, s, c) => {
      let needsUpdate = false;
      
      if (j !== undefined && j !== userJerseyColor) {
        userJerseyColor = j;
        hasUserModified.jersey = true;
        needsUpdate = true;
      }
      if (s !== undefined && s !== userSleeveColor) {
        userSleeveColor = s;
        hasUserModified.sleeve = true;
        needsUpdate = true;
      }
      if (c !== undefined && c !== userCollarColor) {
        userCollarColor = c;
        hasUserModified.collar = true;
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        applyColors();
      }
    };
    
    window.updateText = (name, number, nameColor, numberColor, fontFamily, verticalPos, showText) => {
      userName = name;
      userNumber = number;
      userNameColor = nameColor;
      userNumberColor = numberColor;
      userFontFamily = fontFamily;
      userVerticalPos = verticalPos;
      userShowText = showText;
      createNameLabel();
      createNumberLabel();
    };
    
    const loader = new GLTFLoader();
    const modelUrl = '${modelUrl}';
    
    console.log('Loading GLB from:', modelUrl);
    
    loader.load(
      modelUrl,
      (gltf) => {
        model = gltf.scene;
        console.log('Model loaded successfully');
        
        storeOriginalColors(model);
        
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        model.position.x -= center.x;
        model.position.y -= center.y;
        model.position.z -= center.z;
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 1.2 / maxDim;
        model.scale.setScalar(targetScale);
        
        scene.add(model);
        applyColors();
        createNameLabel();
        createNumberLabel();
        
        const newBox = new THREE.Box3().setFromObject(model);
        const newSize = newBox.getSize(new THREE.Vector3());
        const newCenter = newBox.getCenter(new THREE.Vector3());
        
        const cameraDistance = newSize.y * 1.8;
        const targetY = newCenter.y;
        
        camera.position.set(0, targetY, cameraDistance);
        
        // Setup controls with ZOOM DISABLED
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.06;
        controls.autoRotate = ${autoRotate};
        controls.autoRotateSpeed = ${rotationSpeed};
        controls.enableZoom = false;  // ← ZOOM DISABLED
        controls.enablePan = false;   // ← PAN DISABLED (optional)
        controls.target.set(0, targetY, 0);
        controls.update();
        
        const loadingEl = document.getElementById('loading');
        if (loadingEl) loadingEl.style.display = 'none';
      },
      (xhr) => {
        const percent = Math.floor(xhr.loaded / xhr.total * 100);
        const loadingEl = document.getElementById('loading');
        if (loadingEl && percent < 100) {
          loadingEl.innerHTML = '<div class="spinner"></div><span style="font-size:13px;font-weight:600;color:#334155;">Loading ' + percent + '%</span>';
        }
      },
      (error) => {
        console.error('Error loading model:', error);
        const loadingEl = document.getElementById('loading');
        if (loadingEl) {
          loadingEl.innerHTML = '<span style="color:#DC2626;">Failed to load 3D model</span>';
        }
      }
    );
    
    function animate() {
      requestAnimationFrame(animate);
      if (controls) controls.update();
      renderer.render(scene, camera);
    }
    animate();
    
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    iframe.src = blobUrl;
    containerRef.current.appendChild(iframe);

    return () => URL.revokeObjectURL(blobUrl);
  }, [glbPath, autoRotate, rotationSpeed, backgroundColor, nameStyleId]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !glbPath) return;
    const send = () => {
      try { 
        iframe.contentWindow?.updateColors(jerseyColor, sleeveColor, collarColor); 
      } catch (_) {}
    };
    if (iframe.contentDocument?.readyState === 'complete') {
      send();
    } else {
      iframe.addEventListener('load', send, { once: true });
    }
  }, [jerseyColor, sleeveColor, collarColor, glbPath]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !glbPath) return;
    const fontFamily = getFontFamily(nameStyleId);
    const send = () => {
      try { 
        iframe.contentWindow?.updateText(
          playerName, 
          playerNumber, 
          nameColor, 
          numberColor, 
          fontFamily, 
          nameVertical,
          showText
        ); 
      } catch (_) {}
    };
    if (iframe.contentDocument?.readyState === 'complete') {
      send();
    } else {
      iframe.addEventListener('load', send, { once: true });
    }
  }, [playerName, playerNumber, nameColor, numberColor, nameStyleId, nameVertical, showText, glbPath]);

  if (!glbPath) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#003E9B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading 3D model...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: backgroundColor,
        borderRadius: '20px',
      }}
    />
  );
}