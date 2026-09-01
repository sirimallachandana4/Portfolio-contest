import * as THREE from 'three';

// Generates a high-resolution spherical UV texture (1024x512) for a skill sphere
export function createSkillSphereTexture(name: string, category: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // 1. Off-white smooth base background with subtle sheen gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 512);
  bgGrad.addColorStop(0, '#fbfbfe');
  bgGrad.addColorStop(0.5, '#f4f4fa');
  bgGrad.addColorStop(1, '#ececf5');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 512);

  // Subtle studio grid / rim accents on equator
  ctx.strokeStyle = 'rgba(168, 85, 247, 0.08)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(512, 256, 180, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(512, 256, 210, 0, Math.PI * 2);
  ctx.stroke();

  // Draw front emblem (Center: x=512, y=256)
  drawSkillLogo(ctx, name, 512, 210);

  // Draw back duplicate emblem for when sphere rotates (Center: x=0 and x=1024, y=256)
  drawSkillLogo(ctx, name, 0, 210);
  drawSkillLogo(ctx, name, 1024, 210);

  // Typography - Name on front
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  ctx.fillStyle = '#0f0e17';
  ctx.font = 'bold 38px "Space Grotesk", system-ui, -apple-system, sans-serif';
  ctx.fillText(name, 512, 340);
  ctx.fillText(name, 0, 340);
  ctx.fillText(name, 1024, 340);

  // Category Pill / Tag
  ctx.fillStyle = '#7e22ce';
  ctx.font = '600 18px "JetBrains Mono", monospace';
  const tag = category.toUpperCase();
  ctx.fillText(tag, 512, 385);
  ctx.fillText(tag, 0, 385);
  ctx.fillText(tag, 1024, 385);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return texture;
}

function drawSkillLogo(ctx: CanvasRenderingContext2D, name: string, cx: number, cy: number) {
  ctx.save();
  ctx.translate(cx, cy);

  switch (name) {
    case 'React.js': {
      // Cyan React Atom
      ctx.strokeStyle = '#087ea4';
      ctx.lineWidth = 7;
      
      // Central nucleus
      ctx.fillStyle = '#087ea4';
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fill();

      // 3 Elliptical orbits
      for (let i = 0; i < 3; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3);
        ctx.beginPath();
        ctx.ellipse(0, 0, 70, 26, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      break;
    }

    case 'JavaScript': {
      // Modern JS Emblem
      ctx.fillStyle = '#f7df1e';
      ctx.beginPath();
      ctx.roundRect(-50, -50, 100, 100, 16);
      ctx.fill();

      ctx.fillStyle = '#000000';
      ctx.font = 'bold 58px sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.fillText('JS', 40, 42);
      break;
    }

    case 'Node.js': {
      // Green Node Hexagon
      ctx.fillStyle = '#339933';
      ctx.beginPath();
      const r = 55;
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const x = r * Math.cos(a);
        const y = r * Math.sin(a);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('NODE', 0, 2);
      break;
    }

    case 'Express.js': {
      // Express Monogram
      ctx.strokeStyle = '#222222';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(0, 0, 52, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#111111';
      ctx.font = 'bold 50px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('EX', 0, 2);
      break;
    }

    case 'MongoDB': {
      // MongoDB Green Leaf
      ctx.fillStyle = '#13aa52';
      ctx.beginPath();
      ctx.moveTo(0, -60);
      ctx.bezierCurveTo(35, -30, 45, 20, 0, 60);
      ctx.bezierCurveTo(-45, 20, -35, -30, 0, -60);
      ctx.fill();

      // Inner divider line
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(0, -50);
      ctx.lineTo(0, 50);
      ctx.stroke();
      break;
    }

    case 'HTML5': {
      // HTML5 Shield
      ctx.fillStyle = '#e34f26';
      ctx.beginPath();
      ctx.moveTo(-45, -50);
      ctx.lineTo(45, -50);
      ctx.lineTo(36, 40);
      ctx.lineTo(0, 55);
      ctx.lineTo(-36, 40);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 50px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('5', 0, 2);
      break;
    }

    case 'CSS3': {
      // CSS3 Shield
      ctx.fillStyle = '#1572b6';
      ctx.beginPath();
      ctx.moveTo(-45, -50);
      ctx.lineTo(45, -50);
      ctx.lineTo(36, 40);
      ctx.lineTo(0, 55);
      ctx.lineTo(-36, 40);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 50px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('3', 0, 2);
      break;
    }

    case 'Git': {
      // Git Orange Emblem
      ctx.fillStyle = '#f05032';
      ctx.beginPath();
      ctx.roundRect(-46, -46, 92, 92, 14);
      ctx.fill();

      // Git branching nodes
      ctx.strokeStyle = '#ffffff';
      ctx.fillStyle = '#ffffff';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-15, -20);
      ctx.lineTo(-15, 20);
      ctx.lineTo(15, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-15, -20, 8, 0, Math.PI * 2);
      ctx.arc(-15, 20, 8, 0, Math.PI * 2);
      ctx.arc(15, 0, 8, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'GitHub': {
      // GitHub Octocat silhouette
      ctx.fillStyle = '#181717';
      ctx.beginPath();
      ctx.arc(0, 0, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GH', 0, 2);
      break;
    }

    case 'Postman': {
      // Postman Orange Runner
      ctx.fillStyle = '#ff6c37';
      ctx.beginPath();
      ctx.arc(0, 0, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 46px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('PM', 0, 2);
      break;
    }

    case 'Mongoose': {
      // Mongoose Red Badge
      ctx.fillStyle = '#880000';
      ctx.beginPath();
      ctx.roundRect(-50, -35, 100, 70, 16);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ODM', 0, 2);
      break;
    }

    case 'Axios': {
      // Axios Purple Emblem
      ctx.fillStyle = '#5a29e4';
      ctx.beginPath();
      ctx.arc(0, 0, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-25, 0);
      ctx.lineTo(25, 0);
      ctx.lineTo(12, -14);
      ctx.moveTo(25, 0);
      ctx.lineTo(12, 14);
      ctx.stroke();
      break;
    }

    case 'React Router': {
      // React Router Red Emblem
      ctx.fillStyle = '#ca4245';
      ctx.beginPath();
      ctx.roundRect(-48, -48, 96, 96, 16);
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, 0, 26, 0, Math.PI * 1.5);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, -26, 7, 0, Math.PI * 2);
      ctx.arc(26, 0, 7, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'Tailwind CSS': {
      // Tailwind Cyan Double Wave
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(0, 0, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('TW', 0, 2);
      break;
    }

    case 'Bootstrap': {
      // Bootstrap Purple B
      ctx.fillStyle = '#7952b3';
      ctx.beginPath();
      ctx.roundRect(-46, -46, 92, 92, 16);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 64px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('B', 0, 4);
      break;
    }

    default: {
      ctx.fillStyle = '#9333ea';
      ctx.beginPath();
      ctx.arc(0, 0, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(name.slice(0, 3).toUpperCase(), 0, 2);
      break;
    }
  }

  ctx.restore();
}
