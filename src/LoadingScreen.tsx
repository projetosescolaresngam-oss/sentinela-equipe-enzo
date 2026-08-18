import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Heart, Sparkles, ShieldCheck, ArrowRight, RotateCcw, Play, Pause, FastForward } from 'lucide-react';

interface LoadingScreenProps {
  onComplete?: () => void;
  autoDismiss?: boolean;
}

// ============================================================================
// MATHEMATICAL EASING, SQUASH & STRETCH, AND ANIME KINEMATICS ENGINE
// ============================================================================

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

function easeInCubic(x: number): number {
  return x * x * x;
}

function easeOutBack(x: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function easeOutElastic(x: number): number {
  const c4 = (2 * Math.PI) / 3;
  return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

// Particle & Cartoon FX Model
interface FXParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  maxLife: number;
  life: number;
  type: 'heart' | 'star' | 'dust' | 'note' | 'petal';
  rotation: number;
  vRot: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  autoDismiss = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Timeline state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  // Total duration of the choreographed anime story: 14.5 seconds
  const DURATION = 14.5;

  const animStateRef = useRef({
    time: 0,
    isPlaying: true,
    speed: 1,
    lastStamp: 0,
    particles: [] as FXParticle[],
    // Organic blinking
    blinkLia: 0,
    blinkTom: 0,
    nextBlinkLia: 1.0,
    nextBlinkTom: 1.6,
    // Hair spring physics
    liaHairAngle: 0,
    liaHairVel: 0,
    tomHairAngle: 0,
    tomHairVel: 0,
  });

  const handleFinish = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 600);
  }, [onComplete]);

  // Main 60 FPS 2D Anime Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animFrameId: number;

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      const width = Math.min(rect.width, 880);
      const height = Math.min(rect.height * 0.74, 530);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Warm, saturated 2D Anime Palette
    const ANIME_PALETTE = {
      skyTop: '#fcf8ff',
      skyMid: '#f4e8fd',
      skyBot: '#e9d6fb',
      sunAura: 'rgba(254, 215, 226, 0.45)',
      
      hillFar: '#e5d1f8',
      hillNear: '#d8bcf5',
      pathGround: '#c7a7ed',
      pathBorder: '#af86e2',
      
      // Lia (Purple Theme - Chibi Anime Girl)
      liaSkin: '#fff0e5',
      liaSkinShadow: '#fad1be',
      liaBlush: 'rgba(244, 63, 94, 0.65)',
      liaHair: '#4c1d95',
      liaHairShine: '#a78bfa',
      liaHairBand: '#f43f5e',
      liaShirt: '#7c3aed',
      liaShirtShine: '#c4b5fd',
      liaShirtStripe: '#ede9fe',
      liaPants: '#4338ca',
      liaPantsShadow: '#312e81',
      liaShoes: '#581c87',
      liaShoeSole: '#ffffff',
      liaEye: '#4c1d95',

      // Tom (Orange & Dungarees Theme - Chibi Anime Boy)
      tomSkin: '#fff2e8',
      tomSkinShadow: '#fcd3b6',
      tomBlush: 'rgba(249, 115, 22, 0.65)',
      tomHair: '#b45309',
      tomHairShine: '#fde047',
      tomShirt: '#ea580c',
      tomOveralls: '#0284c7',
      tomOverallsShadow: '#0369a1',
      tomOverallsBuckle: '#fde047',
      tomShoes: '#075985',
      tomShoeSole: '#ffffff',
      tomEye: '#78350f',

      // Sparkles & FX
      heartPink: '#f43f5e',
      heartRose: '#ec4899',
      heartPurple: '#a855f7',
      gold: '#fbbf24',
      sparkleWhite: '#ffffff',
    };

    // Helper: Draw 4-point Anime Sparkle Star
    const drawSparkle = (cx: number, cy: number, size: number, color: string, alpha = 1) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(cx, cy - size);
      ctx.quadraticCurveTo(cx, cy, cx + size, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy + size);
      ctx.quadraticCurveTo(cx, cy, cx - size, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy - size);
      ctx.fill();
      ctx.restore();
    };

    // Helper: Draw Cartoon Puffy Dust Cloud
    const drawDustCloud = (cx: number, cy: number, size: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cx - size * 0.4, cy, size * 0.45, 0, Math.PI * 2);
      ctx.arc(cx, cy - size * 0.35, size * 0.6, 0, Math.PI * 2);
      ctx.arc(cx + size * 0.4, cy, size * 0.45, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Helper: Draw Master Animated Heart
    const drawHeart = (
      cx: number,
      cy: number,
      size: number,
      color: string,
      alpha: number = 1
    ) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, size * 0.38);
      ctx.bezierCurveTo(-size * 0.6, -size * 0.25, -size * 0.65, -size * 0.75, 0, -size * 0.42);
      ctx.bezierCurveTo(size * 0.65, -size * 0.75, size * 0.6, -size * 0.25, 0, size * 0.38);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Helper: Draw Rounded Cartoon Limb with Volume & Highlight
    const drawCartoonLimb = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      width: number,
      fillColor: string,
      hasHighlight = true
    ) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.strokeStyle = fillColor;
      ctx.stroke();

      if (hasHighlight && width > 4) {
        ctx.beginPath();
        const dx = (y2 - y1) * 0.12;
        const dy = -(x2 - x1) * 0.12;
        ctx.moveTo(x1 + dx, y1 + dy);
        ctx.lineTo(x2 + dx, y2 + dy);
        ctx.lineWidth = width * 0.28;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.42)';
        ctx.stroke();
      }
    };

    // Helper: Draw Super Expressive Anime Head
    const drawAnimeHead = (
      x: number,
      y: number,
      rot: number,
      scaleX: number,
      scaleY: number,
      isLia: boolean,
      blinkVal: number,
      mouthType: 'happy_open' | 'smile' | 'gasp_o' | 'joy_cat' | 'reassured' | 'wink',
      gazeX: number,
      gazeY: number,
      hairSway: number,
      hasSweatDrop = false,
      hasEyeStars = false,
      hasPopMark = false
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.scale(scaleX, scaleY);

      const skin = isLia ? ANIME_PALETTE.liaSkin : ANIME_PALETTE.tomSkin;
      const shadow = isLia ? ANIME_PALETTE.liaSkinShadow : ANIME_PALETTE.tomSkinShadow;
      const blush = isLia ? ANIME_PALETTE.liaBlush : ANIME_PALETTE.tomBlush;
      const hair = isLia ? ANIME_PALETTE.liaHair : ANIME_PALETTE.tomHair;
      const hairShine = isLia ? ANIME_PALETTE.liaHairShine : ANIME_PALETTE.tomHairShine;
      const eyeColor = isLia ? ANIME_PALETTE.liaEye : ANIME_PALETTE.tomEye;

      // 1. Chibi Round Anime Face
      ctx.fillStyle = skin;
      ctx.beginPath();
      ctx.arc(0, 0, 20.5, 0, Math.PI * 2);
      ctx.fill();

      // Soft volumetric chin shadow
      ctx.fillStyle = shadow;
      ctx.beginPath();
      ctx.arc(0, 8, 12.5, 0.1, Math.PI - 0.1);
      ctx.fill();

      // 2. Rosy Anime Blush & Hatch Marks (///)
      ctx.fillStyle = blush;
      ctx.beginPath();
      ctx.ellipse(-11, 4.5, 5.5, 3.5, 0.1, 0, Math.PI * 2);
      ctx.ellipse(11, 4.5, 5.5, 3.5, -0.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-13, 3); ctx.lineTo(-11, 6);
      ctx.moveTo(-10, 3); ctx.lineTo(-8, 6);
      ctx.moveTo(9, 3); ctx.lineTo(11, 6);
      ctx.moveTo(12, 3); ctx.lineTo(14, 6);
      ctx.stroke();

      // 3. Hair with Glossy Sheen and Secondary Sway
      ctx.save();
      if (isLia) {
        ctx.fillStyle = hair;
        // Main hair dome
        ctx.beginPath();
        ctx.arc(0, -6, 21.5, Math.PI * 0.9, Math.PI * 2.1);
        ctx.lineTo(21, 12);
        ctx.quadraticCurveTo(11, -8, 0, -8);
        ctx.quadraticCurveTo(-11, -8, -21, 12);
        ctx.closePath();
        ctx.fill();

        // Glossy halo ring across bangs
        ctx.strokeStyle = hairShine;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(0, -11, 18, Math.PI * 1.15, Math.PI * 1.85);
        ctx.stroke();

        // Left swinging side-lock
        ctx.save();
        ctx.translate(-17, 0);
        ctx.rotate(hairSway * 0.85);
        ctx.beginPath();
        ctx.ellipse(0, 11, 6, 15, 0.18, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Right swinging side-lock
        ctx.save();
        ctx.translate(17, 0);
        ctx.rotate(hairSway * 0.85);
        ctx.beginPath();
        ctx.ellipse(0, 11, 6, 15, -0.18, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Cute ponytail with hair ribbon
        ctx.beginPath();
        ctx.arc(-16, -16, 7.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = ANIME_PALETTE.liaHairBand;
        ctx.beginPath();
        ctx.arc(-15, -14, 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = hair;
        ctx.beginPath();
        ctx.arc(0, -6, 21.5, Math.PI * 0.85, Math.PI * 2.15);
        ctx.fill();

        ctx.strokeStyle = hairShine;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(0, -11, 18, Math.PI * 1.15, Math.PI * 1.85);
        ctx.stroke();

        // Fluffy bouncing locks
        ctx.save();
        ctx.translate(0, -19);
        ctx.rotate(hairSway * 0.7);
        ctx.beginPath();
        ctx.arc(-12, 0, 8, 0, Math.PI * 2);
        ctx.arc(0, -4, 9, 0, Math.PI * 2);
        ctx.arc(12, 0, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();

      // 4. Large Sparkling Anime Eyes
      const eyeL_X = -8.5;
      const eyeR_X = 8.5;
      const eyeY = -2;
      const pupilOffX = gazeX * 2.5;
      const pupilOffY = gazeY * 2.2;

      const isLiaWinking = isLia && mouthType === 'wink';
      const isHappyClosed = blinkVal > 0.3 || mouthType === 'joy_cat';

      // Left Eye
      if (isHappyClosed) {
        ctx.strokeStyle = eyeColor;
        ctx.lineWidth = 2.8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(eyeL_X, eyeY + 1, 4.5, Math.PI * 1.12, Math.PI * 1.88);
        ctx.stroke();
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.ellipse(eyeL_X, eyeY, 5.2, 6.2, 0, 0, Math.PI * 2);
        ctx.fill();

        const irisGrad = ctx.createLinearGradient(eyeL_X, eyeY - 5, eyeL_X, eyeY + 5);
        irisGrad.addColorStop(0, eyeColor);
        irisGrad.addColorStop(1, isLia ? '#9333ea' : '#d97706');
        ctx.fillStyle = irisGrad;
        ctx.beginPath();
        ctx.arc(eyeL_X + pupilOffX, eyeY + pupilOffY, 3.8, 0, Math.PI * 2);
        ctx.fill();

        if (hasEyeStars) {
          drawSparkle(eyeL_X + pupilOffX, eyeY + pupilOffY, 3.5, '#fde047', 1);
        } else {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(eyeL_X + pupilOffX + 1.2, eyeY + pupilOffY - 1.5, 1.8, 0, Math.PI * 2);
          ctx.arc(eyeL_X + pupilOffX - 1.2, eyeY + pupilOffY + 1.5, 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Right Eye
      if (isLiaWinking || isHappyClosed) {
        ctx.strokeStyle = eyeColor;
        ctx.lineWidth = 2.8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(eyeR_X, eyeY + 1, 4.5, Math.PI * 1.12, Math.PI * 1.88);
        ctx.stroke();
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.ellipse(eyeR_X, eyeY, 5.2, 6.2, 0, 0, Math.PI * 2);
        ctx.fill();

        const irisGrad = ctx.createLinearGradient(eyeR_X, eyeY - 5, eyeR_X, eyeY + 5);
        irisGrad.addColorStop(0, eyeColor);
        irisGrad.addColorStop(1, isLia ? '#9333ea' : '#d97706');
        ctx.fillStyle = irisGrad;
        ctx.beginPath();
        ctx.arc(eyeR_X + pupilOffX, eyeY + pupilOffY, 3.8, 0, Math.PI * 2);
        ctx.fill();

        if (hasEyeStars) {
          drawSparkle(eyeR_X + pupilOffX, eyeY + pupilOffY, 3.5, '#fde047', 1);
        } else {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(eyeR_X + pupilOffX + 1.2, eyeY + pupilOffY - 1.5, 1.8, 0, Math.PI * 2);
          ctx.arc(eyeR_X + pupilOffX - 1.2, eyeY + pupilOffY + 1.5, 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 5. Expressive Eyebrows
      ctx.strokeStyle = hair;
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      if (mouthType === 'gasp_o') {
        ctx.beginPath();
        ctx.arc(eyeL_X, eyeY - 9, 5, Math.PI * 1.2, Math.PI * 1.8);
        ctx.arc(eyeR_X, eyeY - 9, 5, Math.PI * 1.2, Math.PI * 1.8);
        ctx.stroke();
      } else if (mouthType === 'reassured') {
        ctx.beginPath();
        ctx.moveTo(eyeL_X - 4.5, eyeY - 9); ctx.lineTo(eyeL_X + 4.5, eyeY - 7);
        ctx.moveTo(eyeR_X - 4.5, eyeY - 7); ctx.lineTo(eyeR_X + 4.5, eyeY - 9);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(eyeL_X - 4.5, eyeY - 7.5); ctx.lineTo(eyeL_X + 4.5, eyeY - 6.5);
        ctx.moveTo(eyeR_X - 4.5, eyeY - 6.5); ctx.lineTo(eyeR_X + 4.5, eyeY - 7.5);
        ctx.stroke();
      }

      // 6. Expressive Mouths
      ctx.strokeStyle = eyeColor;
      ctx.fillStyle = '#e11d48';
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';

      if (mouthType === 'happy_open' || mouthType === 'wink') {
        ctx.beginPath();
        ctx.arc(0, 8, 7.5, 0.1, Math.PI - 0.1);
        ctx.closePath();
        ctx.fillStyle = '#be123c';
        ctx.fill();
        ctx.stroke();
        // Little tongue
        ctx.fillStyle = '#fda4af';
        ctx.beginPath();
        ctx.arc(0, 11.5, 4.2, Math.PI, Math.PI * 2);
        ctx.fill();
      } else if (mouthType === 'gasp_o') {
        ctx.beginPath();
        ctx.ellipse(0, 10, 3.8, 5, 0, 0, Math.PI * 2);
        ctx.stroke();
      } else if (mouthType === 'joy_cat') {
        ctx.beginPath();
        ctx.arc(-2.5, 7.5, 3.2, 0.1, Math.PI - 0.1);
        ctx.arc(2.5, 7.5, 3.2, 0.1, Math.PI - 0.1);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(0, 7.5, 6, 0.2, Math.PI - 0.2);
        ctx.stroke();
      }

      // 7. Comic Emote: Pop "!?" Mark
      if (hasPopMark) {
        ctx.fillStyle = '#f43f5e';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('!?', 18, -20);
      }

      // 8. Anime Sweatdrop
      if (hasSweatDrop) {
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(17, -12);
        ctx.quadraticCurveTo(14, -6, 17, -3);
        ctx.arc(17, -3, 3, 0, Math.PI);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    };

    // =========================================================================
    // MASTER 60 FPS ANIME CHOREOGRAPHY
    // =========================================================================
    const render = (timestamp: number) => {
      if (!animStateRef.current.lastStamp) {
        animStateRef.current.lastStamp = timestamp;
      }
      const dt = Math.min((timestamp - animStateRef.current.lastStamp) / 1000, 0.1);
      animStateRef.current.lastStamp = timestamp;

      if (animStateRef.current.isPlaying) {
        animStateRef.current.time += dt * animStateRef.current.speed;
        if (animStateRef.current.time >= DURATION) {
          if (autoDismiss) {
            animStateRef.current.time = DURATION;
            handleFinish();
          } else {
            animStateRef.current.time = 0;
            animStateRef.current.particles = [];
          }
        }
      }

      const t = animStateRef.current.time;
      setCurrentTime(t);

      // Organic blinking
      if (t > animStateRef.current.nextBlinkLia) {
        animStateRef.current.blinkLia = 1;
        animStateRef.current.nextBlinkLia = t + 2.2 + Math.random() * 2.0;
      }
      if (animStateRef.current.blinkLia > 0) {
        animStateRef.current.blinkLia = Math.max(0, animStateRef.current.blinkLia - dt * 7.5);
      }

      if (t > animStateRef.current.nextBlinkTom) {
        animStateRef.current.blinkTom = 1;
        animStateRef.current.nextBlinkTom = t + 2.4 + Math.random() * 2.2;
      }
      if (animStateRef.current.blinkTom > 0) {
        animStateRef.current.blinkTom = Math.max(0, animStateRef.current.blinkTom - dt * 7.5);
      }

      // Hair secondary physics
      animStateRef.current.liaHairAngle = Math.sin(t * 7.5) * 0.14;
      animStateRef.current.tomHairAngle = Math.cos(t * 7.5) * 0.14;

      // Coordinate setup
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);

      // 1. Sky & Cloud Parallax
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, ANIME_PALETTE.skyTop);
      skyGrad.addColorStop(0.65, ANIME_PALETTE.skyMid);
      skyGrad.addColorStop(1, ANIME_PALETTE.skyBot);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Soft Anime Clouds
      const cloudTime = t * 0.18;
      const drawFluffyCloud = (cx: number, cy: number, scale: number, alpha: number) => {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx, cy, 24 * scale, 0, Math.PI * 2);
        ctx.arc(cx + 20 * scale, cy - 10 * scale, 30 * scale, 0, Math.PI * 2);
        ctx.arc(cx + 46 * scale, cy, 24 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };

      drawFluffyCloud(((w * 0.15 + cloudTime * 45) % (w + 140)) - 70, h * 0.2, 1.1, 0.55);
      drawFluffyCloud(((w * 0.68 + cloudTime * 30) % (w + 140)) - 70, h * 0.15, 1.3, 0.45);

      // Sun Halo
      const sunGrad = ctx.createRadialGradient(w * 0.5, h * 0.35, 15, w * 0.5, h * 0.35, w * 0.52);
      sunGrad.addColorStop(0, ANIME_PALETTE.sunAura);
      sunGrad.addColorStop(0.5, 'rgba(254, 215, 226, 0.18)');
      sunGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = sunGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Rolling Stage Hills & Path
      const groundY = h * 0.76;

      // Distant hill
      ctx.beginPath();
      ctx.moveTo(0, groundY + 18);
      ctx.quadraticCurveTo(w * 0.5, groundY - 34, w, groundY + 24);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = ANIME_PALETTE.hillFar;
      ctx.fill();

      // Near green-lilac hill path
      const pathGrad = ctx.createLinearGradient(0, groundY - 12, 0, h);
      pathGrad.addColorStop(0, '#ebdcf9');
      pathGrad.addColorStop(0.35, ANIME_PALETTE.pathGround);
      pathGrad.addColorStop(1, '#be9ee8');
      ctx.beginPath();
      ctx.moveTo(0, groundY + 10);
      ctx.quadraticCurveTo(w * 0.5, groundY - 14, w, groundY + 10);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = pathGrad;
      ctx.fill();

      // Cobblestone path
      ctx.beginPath();
      ctx.moveTo(w * 0.06, groundY + 16);
      ctx.quadraticCurveTo(w * 0.5, groundY - 5, w * 0.94, groundY + 16);
      ctx.strokeStyle = ANIME_PALETTE.pathBorder;
      ctx.lineWidth = 2.8;
      ctx.setLineDash([8, 10]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Little wildflowers
      const drawAnimeFlower = (fx: number, fy: number, petalColor: string) => {
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(fx, fy + 7);
        ctx.lineTo(fx, fy);
        ctx.stroke();

        ctx.fillStyle = petalColor;
        ctx.beginPath();
        ctx.arc(fx - 2.8, fy - 2.8, 3.2, 0, Math.PI * 2);
        ctx.arc(fx + 2.8, fy - 2.8, 3.2, 0, Math.PI * 2);
        ctx.arc(fx, fy + 2.8, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(fx, fy, 2.2, 0, Math.PI * 2);
        ctx.fill();
      };

      drawAnimeFlower(w * 0.12, groundY + 20, '#f472b6');
      drawAnimeFlower(w * 0.18, groundY + 34, '#c084fc');
      drawAnimeFlower(w * 0.82, groundY + 22, '#38bdf8');
      drawAnimeFlower(w * 0.89, groundY + 32, '#fb7185');

      // =========================================================================
      // DYNAMIC RIGGING & CHARACTER POSING
      // =========================================================================
      const centerX = w * 0.5;
      const stageGround = groundY + 8;

      let liaX = 0;
      let liaY = stageGround;
      let liaScaleX = 1;
      let liaScaleY = 1;
      let liaTorsoRot = 0;
      let liaHeadRot = 0;
      let liaMouth: 'happy_open' | 'smile' | 'gasp_o' | 'joy_cat' | 'reassured' | 'wink' = 'happy_open';
      let liaGazeX = 0;
      let liaGazeY = 0;
      let liaSweat = false;
      let liaStarEyes = false;
      let liaPopMark = false;

      let liaLegL_Hip = 0;
      let liaLegL_Knee = 0;
      let liaLegR_Hip = 0;
      let liaLegR_Knee = 0;
      let liaArmL_Shoulder = 0;
      let liaArmL_Elbow = 0;
      let liaArmR_Shoulder = 0;
      let liaArmR_Elbow = 0;

      let tomX = 0;
      let tomY = stageGround;
      let tomScaleX = 1;
      let tomScaleY = 1;
      let tomTorsoRot = 0;
      let tomHeadRot = 0;
      let tomMouth: 'happy_open' | 'smile' | 'gasp_o' | 'joy_cat' | 'reassured' | 'wink' = 'happy_open';
      let tomGazeX = 0;
      let tomGazeY = 0;
      let tomSweat = false;

      let tomLegL_Hip = 0;
      let tomLegL_Knee = 0;
      let tomLegR_Hip = 0;
      let tomLegR_Knee = 0;
      let tomArmL_Shoulder = 0;
      let tomArmL_Elbow = 0;
      let tomArmR_Shoulder = 0;
      let tomArmR_Elbow = 0;

      let heartGlowAlpha = 0;
      let heartScale = 0;

      // -------------------------------------------------------------------------
      // SCENE 1: CHEERFUL BOUNCY ANIME WALK & WAVING (0.0s -> 3.2s)
      // -------------------------------------------------------------------------
      if (t < 3.2) {
        const p = t / 3.2;
        const walkFreq = 8.5;
        const walkSin = Math.sin(t * walkFreq);
        const walkCos = Math.cos(t * walkFreq);
        const hop = Math.abs(Math.sin(t * walkFreq));

        // Squash & stretch on each step
        liaScaleX = 1 - hop * 0.08;
        liaScaleY = 1 + hop * 0.08;
        tomScaleX = 1 - hop * 0.08;
        tomScaleY = 1 + hop * 0.08;

        liaX = lerp(w * 0.12, centerX - 60, p);
        liaY = stageGround - hop * 7;
        liaTorsoRot = 0.06 * walkSin;
        liaHeadRot = -0.05 * walkSin;
        liaMouth = 'happy_open';
        liaGazeX = 0.7; // Looking cheerfully at Tom
        liaGazeY = 0;

        liaLegL_Hip = 0.55 * walkSin;
        liaLegL_Knee = Math.max(0, -0.5 * walkCos);
        liaLegR_Hip = -0.55 * walkSin;
        liaLegR_Knee = Math.max(0, 0.5 * walkCos);

        // Cute waving hand motion while walking
        const wave = Math.sin(t * 12) * 0.35;
        liaArmL_Shoulder = -1.2 + wave;
        liaArmL_Elbow = 0.6;
        liaArmR_Shoulder = 0.6 * walkSin;
        liaArmR_Elbow = 0.4;

        tomX = lerp(w * 0.26, centerX + 50, p);
        tomY = stageGround - hop * 7;
        tomTorsoRot = 0.06 * walkSin;
        tomHeadRot = 0.04 * walkSin;
        tomMouth = 'happy_open';
        tomGazeX = -0.7; // Looking cheerfully at Lia
        tomGazeY = 0;

        tomLegL_Hip = 0.55 * walkSin;
        tomLegL_Knee = Math.max(0, -0.5 * walkCos);
        tomLegR_Hip = -0.55 * walkSin;
        tomLegR_Knee = Math.max(0, 0.5 * walkCos);

        tomArmL_Shoulder = -0.6 * walkSin;
        tomArmL_Elbow = 0.3;
        tomArmR_Shoulder = 0.6 * walkSin;
        tomArmR_Elbow = 0.3;
      }

      // -------------------------------------------------------------------------
      // SCENE 2: ANIME STUMBLE, SWEATDROP & CUSHION SIT (3.2s -> 5.8s)
      // -------------------------------------------------------------------------
      else if (t >= 3.2 && t < 5.8) {
        const p = (t - 3.2) / (5.8 - 3.2);

        if (p < 0.35) {
          // Anticipation stumble forward with "!?" pop
          const subP = p / 0.35;
          const easeLurch = easeInCubic(subP);

          liaX = lerp(centerX - 60, centerX - 48, easeLurch);
          liaY = lerp(stageGround, stageGround + 4, easeLurch);
          liaTorsoRot = lerp(0.06, -0.42, easeLurch);
          liaHeadRot = lerp(0, -0.28, easeLurch);
          liaMouth = 'gasp_o';
          liaSweat = true;
          liaPopMark = true;
          liaGazeX = 0.3;
          liaGazeY = 0.9;

          // Arms fling out in funny cartoon panic
          liaArmL_Shoulder = lerp(-0.3, -1.0, easeLurch);
          liaArmL_Elbow = lerp(0.3, 0.8, easeLurch);
          liaArmR_Shoulder = lerp(0.3, -0.9, easeLurch);
          liaArmR_Elbow = lerp(0.3, 0.7, easeLurch);

          liaLegL_Hip = lerp(0.3, -0.9, easeLurch);
          liaLegL_Knee = 0.6;
          liaLegR_Hip = lerp(-0.3, 0.5, easeLurch);
          liaLegR_Knee = 0.3;
        } else {
          // Soft bouncy sit-down with squash on grass
          const subP = (p - 0.35) / 0.65;
          const easeSit = easeOutCubic(subP);

          liaX = lerp(centerX - 48, centerX - 68, easeSit);
          liaY = lerp(stageGround + 4, stageGround + 24, easeSit);
          liaTorsoRot = lerp(-0.42, -0.12, easeSit);
          liaHeadRot = lerp(-0.28, 0.05, easeSit);
          liaMouth = 'gasp_o';
          liaGazeX = 0.4;
          liaGazeY = subP < 0.5 ? 0.7 : -0.3;

          // Seated legs
          liaLegL_Hip = lerp(-0.9, -1.35, easeSit);
          liaLegL_Knee = 0.4;
          liaLegR_Hip = lerp(0.5, -1.15, easeSit);
          liaLegR_Knee = 0.55;

          // Arms brace on grass
          liaArmL_Shoulder = lerp(-1.0, 0.75, easeSit);
          liaArmL_Elbow = 0.45;
          liaArmR_Shoulder = lerp(-0.9, 0.8, easeSit);
          liaArmR_Elbow = 0.4;

          // Squash when landing
          liaScaleX = 1 + Math.sin(subP * Math.PI) * 0.12;
          liaScaleY = 1 - Math.sin(subP * Math.PI) * 0.12;

          // Little puff of dust
          if (subP < 0.35) {
            drawDustCloud(liaX - 10, stageGround + 20, 16, (0.35 - subP) * 2.5);
          }
        }

        // Tom skids to halt, turns around in startled anime gasp with hands to cheeks
        const tomReactP = clamp((p - 0.12) / 0.88, 0, 1);
        const easeTomTurn = easeOutBack(tomReactP);

        tomX = lerp(centerX + 50, centerX + 56, clamp(tomReactP * 1.3, 0, 1));
        tomY = stageGround;
        tomTorsoRot = lerp(0, 0.22, easeTomTurn);
        tomHeadRot = lerp(0, -0.36, easeTomTurn);
        tomMouth = 'gasp_o';
        tomSweat = true;
        tomGazeX = -0.95;
        tomGazeY = 0.8;

        tomLegL_Hip = lerp(0.2, 0.08, easeTomTurn);
        tomLegL_Knee = 0;
        tomLegR_Hip = lerp(-0.2, -0.08, easeTomTurn);
        tomLegR_Knee = 0;

        tomArmL_Shoulder = lerp(-0.3, -0.55, easeTomTurn);
        tomArmL_Elbow = lerp(0.3, 0.75, easeTomTurn);
        tomArmR_Shoulder = lerp(0.3, 0.4, easeTomTurn);
        tomArmR_Elbow = lerp(0.3, 0.5, easeTomTurn);
      }

      // -------------------------------------------------------------------------
      // SCENE 3: EMPATHY, DASH & EXTENDED HERO HAND (5.8s -> 8.6s)
      // -------------------------------------------------------------------------
      else if (t >= 5.8 && t < 8.6) {
        const p = (t - 5.8) / (8.6 - 5.8);
        const easeApproach = easeInOutCubic(p);

        // Lia looks up, star eyes appear (✨), smile blossoms
        liaX = centerX - 68;
        liaY = stageGround + 24;
        liaTorsoRot = lerp(-0.12, -0.05, easeApproach);
        liaHeadRot = lerp(0.05, 0.32, easeApproach);
        liaMouth = p > 0.35 ? 'happy_open' : 'smile';
        liaStarEyes = p > 0.45;
        liaGazeX = 0.9;
        liaGazeY = -0.85;

        liaLegL_Hip = -1.35;
        liaLegL_Knee = 0.4;
        liaLegR_Hip = -1.15;
        liaLegR_Knee = 0.55;

        liaArmL_Shoulder = 0.75;
        liaArmL_Elbow = 0.45;
        // Right arm reaches up towards Tom
        liaArmR_Shoulder = lerp(0.8, -0.92, easeApproach);
        liaArmR_Elbow = lerp(0.4, 0.18, easeApproach);

        // Tom dashes in, drops into supportive crouch, extends glowing hand
        tomX = lerp(centerX + 56, centerX + 26, easeApproach);
        tomY = lerp(stageGround, stageGround + 8, easeApproach);
        tomTorsoRot = lerp(0.22, -0.36, easeApproach);
        tomHeadRot = lerp(-0.36, -0.18, easeApproach);
        tomMouth = 'reassured';
        tomGazeX = -0.9;
        tomGazeY = 0.85;

        tomLegL_Hip = lerp(0.08, 0.35, easeApproach);
        tomLegL_Knee = lerp(0, 0.45, easeApproach);
        tomLegR_Hip = lerp(-0.08, -0.38, easeApproach);
        tomLegR_Knee = lerp(0, 0.28, easeApproach);

        // Extended left hand
        tomArmL_Shoulder = lerp(-0.55, -1.38, easeApproach);
        tomArmL_Elbow = lerp(0.75, 0.18, easeApproach);
        tomArmR_Shoulder = lerp(0.4, 0.62, easeApproach);
        tomArmR_Elbow = lerp(0.5, 0.35, easeApproach);

        // Hand contact glow ripple
        if (p > 0.75) {
          const contactP = (p - 0.75) / 0.25;
          heartGlowAlpha = contactP * 0.45;
          heartScale = contactP * 0.55;
        }
      }

      // -------------------------------------------------------------------------
      // SCENE 4: HERO LIFT & JOYFUL VICTORY HOP (8.6s -> 11.2s)
      // -------------------------------------------------------------------------
      else if (t >= 8.6 && t < 11.2) {
        const p = (t - 8.6) / (11.2 - 8.6);
        const easeRise = easeInOutCubic(p);

        // Victory hop at end of rise (p > 0.8)
        const hopP = p > 0.8 ? Math.sin((p - 0.8) / 0.2 * Math.PI) : 0;
        const hopY = hopP * 12;

        liaX = lerp(centerX - 68, centerX - 30, easeRise);
        liaY = lerp(stageGround + 24, stageGround, easeRise) - hopY;
        liaScaleX = 1 + hopP * 0.1;
        liaScaleY = 1 - hopP * 0.08;
        liaTorsoRot = lerp(-0.05, 0.05, easeRise);
        liaHeadRot = lerp(0.32, 0.06, easeRise);
        liaMouth = 'joy_cat';
        liaGazeX = 0.5;
        liaGazeY = 0;

        liaLegL_Hip = lerp(-1.35, 0, easeRise);
        liaLegL_Knee = lerp(0.4, 0, easeRise);
        liaLegR_Hip = lerp(-1.15, 0.03, easeRise);
        liaLegR_Knee = lerp(0.55, 0, easeRise);

        liaArmL_Shoulder = lerp(0.75, -0.35, easeRise);
        liaArmL_Elbow = 0.3;
        liaArmR_Shoulder = lerp(-0.92, -0.28, easeRise);
        liaArmR_Elbow = 0.45;

        tomX = lerp(centerX + 26, centerX + 30, easeRise);
        tomY = lerp(stageGround + 8, stageGround, easeRise) - hopY;
        tomScaleX = 1 + hopP * 0.1;
        tomScaleY = 1 - hopP * 0.08;
        tomTorsoRot = lerp(-0.36, -0.05, easeRise);
        tomHeadRot = lerp(-0.18, 0.05, easeRise);
        tomMouth = 'joy_cat';
        tomGazeX = -0.5;
        tomGazeY = 0;

        tomLegL_Hip = lerp(0.35, 0, easeRise);
        tomLegL_Knee = lerp(0.45, 0, easeRise);
        tomLegR_Hip = lerp(-0.38, 0, easeRise);
        tomLegR_Knee = lerp(0.28, 0, easeRise);

        tomArmL_Shoulder = lerp(-1.38, -0.28, easeRise);
        tomArmL_Elbow = 0.45;
        tomArmR_Shoulder = lerp(0.62, -0.35, easeRise);
        tomArmR_Elbow = 0.3;

        heartGlowAlpha = 0.38;
      }

      // -------------------------------------------------------------------------
      // SCENE 5: GRAND HEART POSE & KAWAII WINK CLIMAX (11.2s -> 14.5s)
      // -------------------------------------------------------------------------
      else {
        const p = clamp((t - 11.2) / 2.0, 0, 1);
        const easeHeart = easeInOutCubic(p);

        // Continuous synchronized idle giggle bounce
        const breath = Math.sin((t - 11.2) * 3.2) * 2.0;

        liaX = centerX - 30;
        liaY = stageGround - breath;
        liaTorsoRot = 0.05;
        liaHeadRot = -0.08;
        liaMouth = 'wink'; // Lia winks kawaii style!
        liaGazeX = 0.1;
        liaGazeY = -0.7;

        liaLegL_Hip = 0;
        liaLegL_Knee = 0;
        liaLegR_Hip = 0.02;
        liaLegR_Knee = 0;

        // Inner arm hugs waist
        liaArmR_Shoulder = lerp(-0.28, -0.45, easeHeart);
        liaArmR_Elbow = lerp(0.45, 0.95, easeHeart);

        // Outer arm forms left heart curve
        liaArmL_Shoulder = lerp(-0.35, -2.6, easeHeart);
        liaArmL_Elbow = lerp(0.3, 0.95, easeHeart);

        tomX = centerX + 30;
        tomY = stageGround - breath;
        tomTorsoRot = -0.05;
        tomHeadRot = 0.08;
        tomMouth = 'happy_open';
        tomGazeX = -0.1;
        tomGazeY = -0.7;

        tomLegL_Hip = 0;
        tomLegL_Knee = 0;
        tomLegR_Hip = -0.02;
        tomLegR_Knee = 0;

        // Inner arm hugs waist
        tomArmL_Shoulder = lerp(-0.28, -0.45, easeHeart);
        tomArmL_Elbow = lerp(0.45, 0.95, easeHeart);

        // Outer arm forms right heart curve
        tomArmR_Shoulder = lerp(-0.35, -2.6, easeHeart);
        tomArmR_Elbow = lerp(0.3, 0.95, easeHeart);

        heartGlowAlpha = easeHeart;
        heartScale = easeHeart * (1 + Math.sin((t - 11.2) * 3.5) * 0.07);

        // Spawn colorful anime star and heart sparkles
        if (Math.random() < 0.45 && animStateRef.current.particles.length < 65) {
          const colors = [ANIME_PALETTE.heartPink, ANIME_PALETTE.heartRose, ANIME_PALETTE.heartPurple, ANIME_PALETTE.gold, '#38bdf8', '#f472b6'];
          animStateRef.current.particles.push({
            x: centerX + (Math.random() - 0.5) * 130,
            y: (stageGround - 118) + (Math.random() - 0.5) * 90,
            vx: (Math.random() - 0.5) * 55,
            vy: -25 - Math.random() * 45,
            size: 5 + Math.random() * 9,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            maxLife: 1.4 + Math.random() * 0.8,
            life: 0,
            type: Math.random() > 0.4 ? 'heart' : 'star',
            rotation: Math.random() * Math.PI,
            vRot: (Math.random() - 0.5) * 4,
          });
        }
      }

      // =========================================================================
      // DRAW SHADOWS
      // =========================================================================
      const drawAnimeShadow = (sx: number, sy: number, rx: number, ry: number) => {
        ctx.fillStyle = 'rgba(76, 29, 149, 0.2)';
        ctx.beginPath();
        ctx.ellipse(sx, sy, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
      };

      drawAnimeShadow(liaX, stageGround + 2, 25 * liaScaleX, 7);
      drawAnimeShadow(tomX, stageGround + 2, 25 * tomScaleX, 7);

      // =========================================================================
      // DRAW LIA (CHIBI ANIME GIRL)
      // =========================================================================
      ctx.save();
      ctx.translate(liaX, liaY);
      ctx.scale(liaScaleX, liaScaleY);

      // 1. Back/Left Leg
      const liaHipLX = -7.5;
      const liaHipLY = -22;
      const liaKneeLX = liaHipLX + Math.sin(liaLegL_Hip) * 16;
      const liaKneeLY = liaHipLY + Math.cos(liaLegL_Hip) * 16;
      const liaFootLX = liaKneeLX + Math.sin(liaLegL_Hip + liaLegL_Knee) * 16;
      const liaFootLY = liaKneeLY + Math.cos(liaLegL_Hip + liaLegL_Knee) * 16;
      drawCartoonLimb(liaHipLX, liaHipLY, liaKneeLX, liaKneeLY, 8, ANIME_PALETTE.liaPantsShadow);
      drawCartoonLimb(liaKneeLX, liaKneeLY, liaFootLX, liaFootLY, 7, ANIME_PALETTE.liaPantsShadow);
      ctx.fillStyle = ANIME_PALETTE.liaShoes;
      ctx.beginPath();
      ctx.ellipse(liaFootLX + 2, liaFootLY, 6.5, 4.2, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = ANIME_PALETTE.liaShoeSole;
      ctx.fillRect(liaFootLX - 3, liaFootLY + 2.5, 9, 2);

      // 2. Front/Right Leg
      const liaHipRX = 7.5;
      const liaHipRY = -22;
      const liaKneeRX = liaHipRX + Math.sin(liaLegR_Hip) * 16;
      const liaKneeRY = liaHipRY + Math.cos(liaLegR_Hip) * 16;
      const liaFootRX = liaKneeRX + Math.sin(liaLegR_Hip + liaLegR_Knee) * 16;
      const liaFootRY = liaKneeRY + Math.cos(liaLegR_Hip + liaLegR_Knee) * 16;
      drawCartoonLimb(liaHipRX, liaHipRY, liaKneeRX, liaKneeRY, 8, ANIME_PALETTE.liaPants);
      drawCartoonLimb(liaKneeRX, liaKneeRY, liaFootRX, liaFootRY, 7, ANIME_PALETTE.liaPants);
      ctx.fillStyle = ANIME_PALETTE.liaShoes;
      ctx.beginPath();
      ctx.ellipse(liaFootRX + 2, liaFootRY, 6.5, 4.2, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = ANIME_PALETTE.liaShoeSole;
      ctx.fillRect(liaFootRX - 3, liaFootRY + 2.5, 9, 2);

      // 3. Torso & Cute Sweater
      ctx.save();
      ctx.translate(0, -32);
      ctx.rotate(liaTorsoRot);

      // Sweater body
      ctx.fillStyle = ANIME_PALETTE.liaShirt;
      ctx.beginPath();
      ctx.roundRect(-13.5, -16, 27, 30, 9);
      ctx.fill();

      // Stripes
      ctx.fillStyle = ANIME_PALETTE.liaShirtStripe;
      ctx.beginPath();
      ctx.roundRect(-11.5, -8, 23, 3.5, 2);
      ctx.roundRect(-11.5, 0, 23, 3.5, 2);
      ctx.fill();

      // Collar
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      ctx.moveTo(-6, -16); ctx.lineTo(0, -12); ctx.lineTo(6, -16);
      ctx.stroke();

      // Neck
      ctx.fillStyle = ANIME_PALETTE.liaSkin;
      ctx.fillRect(-4.5, -21, 9, 6);

      // Left Arm (Outer)
      const liaShoulderLX = -12.5;
      const liaShoulderLY = -12;
      const liaElbowLX = liaShoulderLX + Math.sin(liaArmL_Shoulder) * 16;
      const liaElbowLY = liaShoulderLY + Math.cos(liaArmL_Shoulder) * 16;
      const liaHandLX = liaElbowLX + Math.sin(liaArmL_Shoulder + liaArmL_Elbow) * 16;
      const liaHandLY = liaElbowLY + Math.cos(liaArmL_Shoulder + liaArmL_Elbow) * 16;

      drawCartoonLimb(liaShoulderLX, liaShoulderLY, liaElbowLX, liaElbowLY, 7, ANIME_PALETTE.liaShirt);
      drawCartoonLimb(liaElbowLX, liaElbowLY, liaHandLX, liaHandLY, 6.5, ANIME_PALETTE.liaSkin);
      // Cute round hand
      ctx.fillStyle = ANIME_PALETTE.liaSkin;
      ctx.beginPath();
      ctx.arc(liaHandLX, liaHandLY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Right Arm (Inner)
      const liaShoulderRX = 12.5;
      const liaShoulderRY = -12;
      const liaElbowRX = liaShoulderRX + Math.sin(liaArmR_Shoulder) * 16;
      const liaElbowRY = liaShoulderRY + Math.cos(liaArmR_Shoulder) * 16;
      const liaHandRX = liaElbowRX + Math.sin(liaArmR_Shoulder + liaArmR_Elbow) * 16;
      const liaHandRY = liaElbowRY + Math.cos(liaArmR_Shoulder + liaArmR_Elbow) * 16;

      drawCartoonLimb(liaShoulderRX, liaShoulderRY, liaElbowRX, liaElbowRY, 7, ANIME_PALETTE.liaShirt);
      drawCartoonLimb(liaElbowRX, liaElbowRY, liaHandRX, liaHandRY, 6.5, ANIME_PALETTE.liaSkin);
      ctx.fillStyle = ANIME_PALETTE.liaSkin;
      ctx.beginPath();
      ctx.arc(liaHandRX, liaHandRY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Head
      drawAnimeHead(
        0,
        -29,
        liaHeadRot,
        1,
        1,
        true,
        animStateRef.current.blinkLia,
        liaMouth,
        liaGazeX,
        liaGazeY,
        animStateRef.current.liaHairAngle,
        liaSweat,
        liaStarEyes,
        liaPopMark
      );

      ctx.restore(); // end Torso
      ctx.restore(); // end Lia

      // =========================================================================
      // DRAW TOM (CHIBI ANIME BOY)
      // =========================================================================
      ctx.save();
      ctx.translate(tomX, tomY);
      ctx.scale(tomScaleX, tomScaleY);

      // 1. Left Leg
      const tomHipLX = -7.5;
      const tomHipLY = -22;
      const tomKneeLX = tomHipLX + Math.sin(tomLegL_Hip) * 16;
      const tomKneeLY = tomHipLY + Math.cos(tomLegL_Hip) * 16;
      const tomFootLX = tomKneeLX + Math.sin(tomLegL_Hip + tomLegL_Knee) * 16;
      const tomFootLY = tomKneeLY + Math.cos(tomLegL_Hip + tomLegL_Knee) * 16;
      drawCartoonLimb(tomHipLX, tomHipLY, tomKneeLX, tomKneeLY, 8, ANIME_PALETTE.tomOveralls);
      drawCartoonLimb(tomKneeLX, tomKneeLY, tomFootLX, tomFootLY, 7, ANIME_PALETTE.tomOveralls);
      ctx.fillStyle = ANIME_PALETTE.tomShoes;
      ctx.beginPath();
      ctx.ellipse(tomFootLX + 2, tomFootLY, 6.5, 4.2, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = ANIME_PALETTE.tomShoeSole;
      ctx.fillRect(tomFootLX - 3, tomFootLY + 2.5, 9, 2);

      // 2. Right Leg
      const tomHipRX = 7.5;
      const tomHipRY = -22;
      const tomKneeRX = tomHipRX + Math.sin(tomLegR_Hip) * 16;
      const tomKneeRY = tomHipRY + Math.cos(tomLegR_Hip) * 16;
      const tomFootRX = tomKneeRX + Math.sin(tomLegR_Hip + tomLegR_Knee) * 16;
      const tomFootRY = tomKneeRY + Math.cos(tomLegR_Hip + tomLegR_Knee) * 16;
      drawCartoonLimb(tomHipRX, tomHipRY, tomKneeRX, tomKneeRY, 8, ANIME_PALETTE.tomOveralls);
      drawCartoonLimb(tomKneeRX, tomKneeRY, tomFootRX, tomFootRY, 7, ANIME_PALETTE.tomOveralls);
      ctx.fillStyle = ANIME_PALETTE.tomShoes;
      ctx.beginPath();
      ctx.ellipse(tomFootRX + 2, tomFootLY, 6.5, 4.2, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = ANIME_PALETTE.tomShoeSole;
      ctx.fillRect(tomFootRX - 3, tomFootLY + 2.5, 9, 2);

      // 3. Torso & Dungarees Overalls
      ctx.save();
      ctx.translate(0, -32);
      ctx.rotate(tomTorsoRot);

      // Shirt
      ctx.fillStyle = ANIME_PALETTE.tomShirt;
      ctx.beginPath();
      ctx.roundRect(-13.5, -16, 27, 30, 9);
      ctx.fill();

      // Dungarees Overalls
      ctx.fillStyle = ANIME_PALETTE.tomOveralls;
      ctx.beginPath();
      ctx.roundRect(-13.5, -4, 27, 18, 6);
      ctx.fill();

      // Suspenders with brass buckles
      ctx.strokeStyle = ANIME_PALETTE.tomOveralls;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-9.5, -15); ctx.lineTo(-9.5, -4);
      ctx.moveTo(9.5, -15); ctx.lineTo(9.5, -4);
      ctx.stroke();

      ctx.fillStyle = ANIME_PALETTE.tomOverallsBuckle;
      ctx.fillRect(-11.5, -6, 4, 4);
      ctx.fillRect(7.5, -6, 4, 4);

      // Front Pocket
      ctx.fillStyle = ANIME_PALETTE.tomOverallsShadow;
      ctx.beginPath();
      ctx.roundRect(-5.5, 0, 11, 8.5, 2.5);
      ctx.fill();

      // Neck
      ctx.fillStyle = ANIME_PALETTE.tomSkin;
      ctx.fillRect(-4.5, -21, 9, 6);

      // Left Arm (Inner)
      const tomShoulderLX = -12.5;
      const tomShoulderLY = -12;
      const tomElbowLX = tomShoulderLX + Math.sin(tomArmL_Shoulder) * 16;
      const tomElbowLY = tomShoulderLY + Math.cos(tomArmL_Shoulder) * 16;
      const tomHandLX = tomElbowLX + Math.sin(tomArmL_Shoulder + tomArmL_Elbow) * 16;
      const tomHandLY = tomElbowLY + Math.cos(tomArmL_Shoulder + tomArmL_Elbow) * 16;

      drawCartoonLimb(tomShoulderLX, tomShoulderLY, tomElbowLX, tomElbowLY, 7, ANIME_PALETTE.tomShirt);
      drawCartoonLimb(tomElbowLX, tomElbowLY, tomHandLX, tomHandLY, 6.5, ANIME_PALETTE.tomSkin);
      ctx.fillStyle = ANIME_PALETTE.tomSkin;
      ctx.beginPath();
      ctx.arc(tomHandLX, tomHandLY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Right Arm (Outer)
      const tomShoulderRX = 12.5;
      const tomShoulderRY = -12;
      const tomElbowRX = tomShoulderRX + Math.sin(tomArmR_Shoulder) * 16;
      const tomElbowRY = tomShoulderRY + Math.cos(tomArmR_Shoulder) * 16;
      const tomHandRX = tomElbowRX + Math.sin(tomArmR_Shoulder + tomArmR_Elbow) * 16;
      const tomHandRY = tomElbowRY + Math.cos(tomArmR_Shoulder + tomArmR_Elbow) * 16;

      drawCartoonLimb(tomShoulderRX, tomShoulderRY, tomElbowRX, tomElbowRY, 7, ANIME_PALETTE.tomShirt);
      drawCartoonLimb(tomElbowRX, tomElbowRY, tomHandRX, tomHandRY, 6.5, ANIME_PALETTE.tomSkin);
      ctx.fillStyle = ANIME_PALETTE.tomSkin;
      ctx.beginPath();
      ctx.arc(tomHandRX, tomHandRY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Head
      drawAnimeHead(
        0,
        -29,
        tomHeadRot,
        1,
        1,
        false,
        animStateRef.current.blinkTom,
        tomMouth,
        tomGazeX,
        tomGazeY,
        animStateRef.current.tomHairAngle,
        tomSweat
      );

      ctx.restore(); // end Torso
      ctx.restore(); // end Tom

      // =========================================================================
      // DRAW RADIANT GLOWING HEART & ANIME SPARKLES OVERHEAD
      // =========================================================================
      if (heartGlowAlpha > 0.01) {
        const heartCenterX = centerX;
        const heartCenterY = stageGround - 105;

        // Big outer radial pulse glow
        const glowGrad = ctx.createRadialGradient(
          heartCenterX,
          heartCenterY,
          10,
          heartCenterX,
          heartCenterY,
          90 * heartScale
        );
        glowGrad.addColorStop(0, `rgba(244, 63, 94, ${0.55 * heartGlowAlpha})`);
        glowGrad.addColorStop(0.5, `rgba(236, 72, 153, ${0.3 * heartGlowAlpha})`);
        glowGrad.addColorStop(1, 'rgba(236, 72, 153, 0)');

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(heartCenterX, heartCenterY, 90 * heartScale, 0, Math.PI * 2);
        ctx.fill();

        // Main Vibrant Heart
        drawHeart(
          heartCenterX,
          heartCenterY,
          50 * heartScale,
          ANIME_PALETTE.heartPink,
          heartGlowAlpha
        );

        // Inner Heart Specular Highlight
        drawHeart(
          heartCenterX - 4.5 * heartScale,
          heartCenterY - 4.5 * heartScale,
          30 * heartScale,
          '#fda4af',
          heartGlowAlpha * 0.85
        );

        // Core White Specular Starburst
        drawSparkle(heartCenterX - 5 * heartScale, heartCenterY - 6 * heartScale, 5.5 * heartScale, '#ffffff', heartGlowAlpha);
      }

      // Update and Draw Floating Anime Sparkle & Heart Particles
      const particles = animStateRef.current.particles;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rotation += p.vRot * dt;
        const pAlpha = (1 - p.life / p.maxLife) * p.alpha;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = pAlpha;

        if (p.type === 'heart') {
          drawHeart(0, 0, p.size, p.color, pAlpha);
        } else if (p.type === 'star') {
          drawSparkle(0, 0, p.size, p.color, pAlpha);
        } else if (p.type === 'dust') {
          drawDustCloud(0, 0, p.size, pAlpha);
        }

        ctx.restore();
      }

      ctx.restore(); // Restore master scale
      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [autoDismiss, handleFinish]);

  // Handle Play / Pause Toggle
  const togglePlay = () => {
    animStateRef.current.isPlaying = !animStateRef.current.isPlaying;
    setIsPlaying(animStateRef.current.isPlaying);
  };

  // Handle Replay from Start
  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    animStateRef.current.time = 0;
    animStateRef.current.particles = [];
    animStateRef.current.isPlaying = true;
    setIsPlaying(true);
  };

  // Handle Scrubber Change
  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    animStateRef.current.time = val;
    setCurrentTime(val);
  };

  // Handle Speed Change
  const cycleSpeed = () => {
    const speeds = [1, 1.5, 0.5];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    animStateRef.current.speed = nextSpeed;
  };

  // Narrative message based on continuous current time
  const getStoryMessage = () => {
    if (currentTime < 3.2) {
      return {
        step: 1,
        title: "Caminhando Lado a Lado",
        desc: "No convívio escolar diário, cada amizade faz a diferença.",
        accent: "bg-purple-100 text-purple-900 border-purple-200",
      };
    } else if (currentTime < 5.8) {
      return {
        step: 2,
        title: "Um Tropeço Inesperado...",
        desc: "Momentos difíceis acontecem. O importante é nunca estar sozinho.",
        accent: "bg-amber-100 text-amber-900 border-amber-200",
      };
    } else if (currentTime < 8.6) {
      return {
        step: 3,
        title: "Uma Mão Amiga Estendida",
        desc: "Perceber o colega e oferecer apoio imediato transforma realidades.",
        accent: "bg-sky-100 text-sky-900 border-sky-200",
      };
    } else if (currentTime < 11.2) {
      return {
        step: 4,
        title: "Levantando com Apoio e Força",
        desc: "Juntos encontramos a segurança e a coragem para seguir em frente.",
        accent: "bg-indigo-100 text-indigo-900 border-indigo-200",
      };
    } else {
      return {
        step: 5,
        title: "Unidos pelo Acolhimento e Empatia ❤️",
        desc: "Sentinela Escolar • Proteção mútua, respeito e solidariedade ativa.",
        accent: "bg-rose-100 text-rose-900 border-rose-200",
      };
    }
  };

  const currentMsg = getStoryMessage();
  const progressPercent = Math.min(100, (currentTime / DURATION) * 100);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-[#fdfbfd] via-[#f7f0fc] to-[#eee4f8] text-slate-800 transition-opacity duration-700 select-none overflow-hidden ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ width: '100vw', height: '100vh', maxWidth: '100%', maxHeight: '100%' }}
    >
      {/* Top Header Badge */}
      <div className="w-full max-w-2xl flex items-center justify-between pt-1">
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/95 border border-purple-200 shadow-2xs backdrop-blur-xs">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-black text-slate-900 tracking-tight">Sentinela Escolar</span>
          <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-200">
            Animação 2D Anime Chibi
          </span>
        </div>

        <button
          onClick={handleFinish}
          className="text-xs font-black text-purple-950 hover:text-white hover:bg-purple-700 bg-white border border-purple-300 px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>Entrar no Site</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Continuous Canvas Stage */}
      <div
        ref={containerRef}
        className="flex-1 w-full max-w-3xl flex flex-col items-center justify-center relative my-auto py-1"
      >
        {/* Luminous Canvas Card */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-purple-200/90 bg-white/80 backdrop-blur-sm">
          <canvas
            ref={canvasRef}
            className="block w-full h-auto cursor-pointer"
            onClick={togglePlay}
            title="Clique para pausar ou continuar o movimento"
          />

          {/* Pause overlay watermark if paused */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
              <div className="bg-white/90 text-purple-900 font-extrabold px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 shadow-md">
                <Pause className="w-3.5 h-3.5" />
                <span>Pausado</span>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Story Subtitles Box */}
        <div className="text-center mt-3 max-w-lg px-3 transition-all duration-300">
          <div
            className={`inline-flex items-center justify-center gap-1.5 px-3 py-0.5 rounded-full border text-xs font-bold mb-1 shadow-2xs transition-colors duration-500 ${currentMsg.accent}`}
          >
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
            <span>Fase {currentMsg.step} de 5</span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
            {currentMsg.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed font-medium">
            {currentMsg.desc}
          </p>
        </div>
      </div>

      {/* Bottom Timeline Controls & Scrubbing Bar */}
      <div className="w-full max-w-lg flex flex-col items-center gap-2 pb-2">
        {/* Timeline Slider with 60fps Interpolation */}
        <div className="w-full px-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-600" />
              <span>Animação 2D fluida • Estilo Anime Chibi</span>
            </span>
            <span className="font-mono text-purple-900 font-extrabold">
              {currentTime.toFixed(1)}s / {DURATION.toFixed(1)}s ({Math.round(progressPercent)}%)
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={DURATION}
            step={0.05}
            value={currentTime}
            onChange={handleScrub}
            className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            title="Arraste para navegar suavemente por qualquer quadro da animação"
          />
        </div>

        {/* Interactive Playback Control Bar */}
        <div className="flex items-center justify-between w-full text-xs text-slate-600 px-1 pt-0.5">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-lg bg-white border border-purple-200 text-purple-900 hover:bg-purple-50 transition-colors shadow-2xs flex items-center gap-1 font-bold text-xs cursor-pointer"
              title={isPlaying ? 'Pausar' : 'Reproduzir'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pausar' : 'Play'}</span>
            </button>

            <button
              onClick={handleReplay}
              className="p-1.5 rounded-lg bg-white border border-purple-200 text-purple-900 hover:bg-purple-50 transition-colors shadow-2xs flex items-center gap-1 font-bold text-xs cursor-pointer"
              title="Reiniciar animação"
            >
              <RotateCcw className="w-3.5 h-3.5 text-purple-700" />
              <span>Reiniciar</span>
            </button>

            <button
              onClick={cycleSpeed}
              className="p-1.5 rounded-lg bg-white border border-purple-200 text-purple-900 hover:bg-purple-50 transition-colors shadow-2xs flex items-center gap-1 font-bold text-[11px] cursor-pointer"
              title="Alterar velocidade"
            >
              <FastForward className="w-3 h-3 text-purple-700" />
              <span>{playbackSpeed}x</span>
            </button>
          </div>

          <span className="text-[10px] text-slate-500 font-semibold hidden sm:inline">
            60 FPS • Emoções Vivas & Movimento Fluido
          </span>
        </div>
      </div>
    </div>
  );
};
