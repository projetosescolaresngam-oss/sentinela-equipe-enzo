import React from "react";

export interface GuardiaoCosmicoFrameProps {
  size?: number;
  className?: string;
  children?: React.ReactNode;
}

export const GuardiaoCosmicoFrame: React.FC<GuardiaoCosmicoFrameProps> = ({
  size = 420,
  className = "",
  children,
}) => {
  const svgContent = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        overflow: "visible",
        display: "block",
      }}
    >
      <defs>
        {/* ================================================================= */}
        {/* GRADIENTES METÁLICOS DOURADOS DE ALTA DEFINIÇÃO (PADRÃO AAA)      */}
        {/* ================================================================= */}
        <linearGradient id="cosmicGoldPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFEEB" />
          <stop offset="18%" stopColor="#FFDF73" />
          <stop offset="48%" stopColor="#E59E10" />
          <stop offset="78%" stopColor="#9E5F02" />
          <stop offset="100%" stopColor="#5E3400" />
        </linearGradient>

        <linearGradient id="cosmicGoldBevel" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFCE0" />
          <stop offset="30%" stopColor="#FFD34E" />
          <stop offset="68%" stopColor="#B87708" />
          <stop offset="100%" stopColor="#452200" />
        </linearGradient>

        <linearGradient id="cosmicGoldHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFD34E" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFD34E" />
        </linearGradient>

        {/* GRADIENTE ROXO CÓSMICO DA ARMADURA */}
        <linearGradient id="cosmicArmorDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#54128A" />
          <stop offset="35%" stopColor="#2E0552" />
          <stop offset="75%" stopColor="#150226" />
          <stop offset="100%" stopColor="#080012" />
        </linearGradient>

        {/* GRADIENTE DAS ASAS CÓSMICAS (ESQUERDA & DIREITA) */}
        <linearGradient id="wingGradientLeft" x1="100%" y1="50%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#6C18B5" />
          <stop offset="35%" stopColor="#450C77" />
          <stop offset="75%" stopColor="#21033D" />
          <stop offset="100%" stopColor="#0C0017" />
        </linearGradient>

        <linearGradient id="wingGradientRight" x1="0%" y1="50%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6C18B5" />
          <stop offset="35%" stopColor="#450C77" />
          <stop offset="75%" stopColor="#21033D" />
          <stop offset="100%" stopColor="#0C0017" />
        </linearGradient>

        {/* GRADIENTE DO CRISTAL DE AMETISTA */}
        <linearGradient id="amethystCrystal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="20%" stopColor="#F7DEFF" />
          <stop offset="52%" stopColor="#CA65FF" />
          <stop offset="82%" stopColor="#8419DE" />
          <stop offset="100%" stopColor="#3E036E" />
        </linearGradient>

        {/* GRADIENTE DO ESCUDO INFERIOR */}
        <linearGradient id="guardianShieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#480A7D" />
          <stop offset="45%" stopColor="#240340" />
          <stop offset="100%" stopColor="#0A0014" />
        </linearGradient>

        {/* AURAS E GLOW RADIAL */}
        <radialGradient id="cosmicAuraBack">
          <stop offset="0%" stopColor="#CA70FF" stopOpacity="0.65" />
          <stop offset="40%" stopColor="#8721EB" stopOpacity="0.3" />
          <stop offset="70%" stopColor="#3B0568" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="ringCoreGlow">
          <stop offset="0%" stopColor="#A84BFF" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#430B82" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* FILTROS DE ILUMINAÇÃO */}
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="intenseGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="goldGlint" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ========================================================================= */}
      {/* 1. CAMADA DE FUNDO: AURA CÓSMICA E ÓRBITAS PLANETÁRIAS                   */}
      {/* ========================================================================= */}
      <circle
        cx="256"
        cy="256"
        r="220"
        fill="url(#cosmicAuraBack)"
        opacity="0.4"
      />

      <circle
        cx="256"
        cy="256"
        r="170"
        fill="url(#ringCoreGlow)"
      />

      {/* ÓRBITAS ELÍPTICAS CÓSMICAS */}
      <ellipse
        cx="256"
        cy="256"
        rx="205"
        ry="76"
        transform="rotate(-22 256 256)"
        stroke="#CA6CFF"
        strokeWidth="1.3"
        strokeDasharray="12 6 4 6"
        opacity="0.55"
      />

      <ellipse
        cx="256"
        cy="256"
        rx="200"
        ry="72"
        transform="rotate(22 256 256)"
        stroke="#FFD34E"
        strokeWidth="1.1"
        strokeDasharray="16 8 6 8"
        opacity="0.45"
      />

      {/* NÓDULOS PLANETÁRIOS NAS ÓRBITAS */}
      <g filter="url(#intenseGlow)">
        <circle cx="80" cy="204" r="5" fill="#FFE27A" />
        <circle cx="80" cy="204" r="2.5" fill="#FFFFFF" />

        <circle cx="432" cy="308" r="5" fill="#D274FF" />
        <circle cx="432" cy="308" r="2.5" fill="#FFFFFF" />

        <circle cx="426" cy="204" r="4.5" fill="#FFE27A" />
        <circle cx="86" cy="308" r="4.5" fill="#D274FF" />
      </g>

      {/* PARTÍCULAS CÓSMICAS SUAVES */}
      <g filter="url(#softGlow)" opacity="0.8">
        <circle cx="95" cy="140" r="2.5" fill="#FFDF79" />
        <circle cx="70" cy="265" r="2.5" fill="#E8B8FF" />
        <circle cx="105" cy="360" r="3" fill="#FFDF79" />
        <circle cx="417" cy="140" r="2.5" fill="#FFDF79" />
        <circle cx="442" cy="265" r="2.5" fill="#E8B8FF" />
        <circle cx="407" cy="360" r="3" fill="#FFDF79" />
      </g>

      {/* ========================================================================= */}
      {/* 2. ASAS PRINCIPAIS ESTRUTURALMENTE CONECTADAS AO CÍRCULO (SOLDADAS)       */}
      {/* As asas compartilham exatamente o arco r=158 da circunferência principal  */}
      {/* ========================================================================= */}

      {/* ASA ESQUERDA (CORPO DE ENERGIA & PENAS) */}
      <g>
        {/* Pluma/Corpo Principal da Asa Esquerda (nascendo da lateral do círculo) */}
        <path
          d="M145 145
             C110 110 70 80 46 68
             C44 100 68 136 96 162
             C66 162 38 154 24 172
             C24 204 58 226 88 238
             C64 240 40 240 28 258
             C30 286 68 304 100 310
             C80 318 58 326 48 342
             C52 368 94 376 145 367
             A 158 158 0 0 1 145 145 Z"
          fill="url(#wingGradientLeft)"
          stroke="url(#cosmicGoldBevel)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Penas e Nervuras Internas em Ouro e Neon Violeta (Asa Esquerda) */}
        <path
          d="M140 160 C105 130 76 102 54 84"
          fill="none"
          stroke="url(#cosmicGoldPrimary)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M125 195 C95 180 62 172 40 180"
          fill="none"
          stroke="#E5ADFF"
          strokeWidth="2"
          opacity="0.85"
        />
        <path
          d="M115 240 C85 242 56 248 42 262"
          fill="none"
          stroke="url(#cosmicGoldPrimary)"
          strokeWidth="2"
        />
        <path
          d="M122 285 C96 295 72 312 60 330"
          fill="none"
          stroke="#FFDF73"
          strokeWidth="1.8"
          opacity="0.8"
        />
      </g>

      {/* ASA DIREITA (CORPO DE ENERGIA & PENAS - SIMETRIA EXATA) */}
      <g>
        {/* Pluma/Corpo Principal da Asa Direita (nascendo da lateral do círculo) */}
        <path
          d="M367 145
             C402 110 442 80 466 68
             C468 100 444 136 416 162
             C446 162 474 154 488 172
             C488 204 454 226 424 238
             C448 240 472 240 484 258
             C482 286 444 304 412 310
             C432 318 454 326 464 342
             C460 368 418 376 367 367
             A 158 158 0 0 0 367 145 Z"
          fill="url(#wingGradientRight)"
          stroke="url(#cosmicGoldBevel)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Penas e Nervuras Internas em Ouro e Neon Violeta (Asa Direita) */}
        <path
          d="M372 160 C407 130 436 102 458 84"
          fill="none"
          stroke="url(#cosmicGoldPrimary)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M387 195 C417 180 450 172 472 180"
          fill="none"
          stroke="#E5ADFF"
          strokeWidth="2"
          opacity="0.85"
        />
        <path
          d="M397 240 C427 242 456 248 470 262"
          fill="none"
          stroke="url(#cosmicGoldPrimary)"
          strokeWidth="2"
        />
        <path
          d="M390 285 C416 295 440 312 452 330"
          fill="none"
          stroke="#FFDF73"
          strokeWidth="1.8"
          opacity="0.8"
        />
      </g>

      {/* ========================================================================= */}
      {/* 3. ANEL CIRCULAR PRINCIPAL (A espinha dorsal concêntrica da moldura)      */}
      {/* Centro: (256, 256) | Raio externo 158 | Raio interno 134                 */}
      {/* ========================================================================= */}

      {/* Halo de energia cósmica atrás do anel */}
      <circle
        cx="256"
        cy="256"
        r="158"
        stroke="#9B38FF"
        strokeWidth="20"
        opacity="0.2"
        filter="url(#intenseGlow)"
      />

      {/* Aro dourado metálico exterior biselado */}
      <circle
        cx="256"
        cy="256"
        r="158"
        stroke="url(#cosmicGoldBevel)"
        strokeWidth="16"
      />

      {/* Friso intermediário em armadura violeta cósmica */}
      <circle
        cx="256"
        cy="256"
        r="150"
        stroke="url(#cosmicArmorDark)"
        strokeWidth="10"
      />

      {/* Aro interno dourado de precisão */}
      <circle
        cx="256"
        cy="256"
        r="143"
        stroke="url(#cosmicGoldPrimary)"
        strokeWidth="4"
      />

      {/* Filete de luz neon violeta concêntrico */}
      <circle
        cx="256"
        cy="256"
        r="137"
        stroke="#EAB8FF"
        strokeWidth="2.5"
        opacity="0.9"
      />

      {/* Ranhura de profundidade no encaixe do avatar (mantém avatar limpo e central) */}
      <circle
        cx="256"
        cy="256"
        r="134"
        stroke="#3F076E"
        strokeWidth="1.5"
        opacity="0.9"
      />

      {/* REBITES DOURADOS E RUNAS AO LONGO DO ANEL */}
      <g fill="#FFF0A3">
        <circle cx="256" cy="106" r="2.5" />
        <circle cx="362" cy="150" r="2.5" />
        <circle cx="406" cy="256" r="3" />
        <circle cx="362" cy="362" r="2.5" />
        <circle cx="150" cy="362" r="2.5" />
        <circle cx="106" cy="256" r="3" />
        <circle cx="150" cy="150" r="2.5" />
      </g>

      {/* ========================================================================= */}
      {/* 4. BRAÇADEIRAS E ESPINHAS DOURADAS DE SOLDAGEM DAS ASAS AO CÍRCULO        */}
      {/* Estas peças fundem a armadura do anel com a estrutura óssea das asas     */}
      {/* ========================================================================= */}

      {/* ESPINHA DOURADA PRINCIPAL DA ASA ESQUERDA (SAI DO ANEL ATÉ A PONTA) */}
      <g filter="url(#goldGlint)">
        {/* Espigão condutor da asa esquerda */}
        <path
          d="M152 138 
             C120 108 80 80 46 68 
             C56 82 86 112 118 140 
             C106 172 100 214 98 256
             C112 250 126 230 134 200
             C142 174 148 152 152 138 Z"
          fill="url(#cosmicGoldPrimary)"
          stroke="#4A2600"
          strokeWidth="1.5"
        />

        {/* Braçadeira / Garra de articulação esquerda (9h) */}
        <path
          d="M104 218 
             C94 236 94 276 104 294 
             C114 290 124 274 126 256 
             C124 238 114 222 104 218 Z"
          fill="url(#cosmicGoldBevel)"
          stroke="#472600"
          strokeWidth="1.5"
        />
        <circle cx="112" cy="256" r="4" fill="#E8B0FF" stroke="#472600" strokeWidth="1" />
        <circle cx="112" cy="234" r="2" fill="#FFF2A3" />
        <circle cx="112" cy="278" r="2" fill="#FFF2A3" />

        {/* Braço de reforço inferior esquerdo */}
        <path
          d="M148 370 
             C120 376 96 360 76 344 
             C92 342 114 346 132 352 Z"
          fill="url(#cosmicGoldPrimary)"
          stroke="#472600"
          strokeWidth="1.5"
        />
      </g>

      {/* ESPINHA DOURADA PRINCIPAL DA ASA DIREITA (SAI DO ANEL ATÉ A PONTA) */}
      <g filter="url(#goldGlint)">
        {/* Espigão condutor da asa direita */}
        <path
          d="M360 138 
             C392 108 432 80 466 68 
             C456 82 426 112 394 140 
             C406 172 412 214 414 256
             C400 250 386 230 378 200
             C370 174 364 152 360 138 Z"
          fill="url(#cosmicGoldPrimary)"
          stroke="#4A2600"
          strokeWidth="1.5"
        />

        {/* Braçadeira / Garra de articulação direita (3h) */}
        <path
          d="M408 218 
             C418 236 418 276 408 294 
             C398 290 388 274 386 256 
             C388 238 398 222 408 218 Z"
          fill="url(#cosmicGoldBevel)"
          stroke="#472600"
          strokeWidth="1.5"
        />
        <circle cx="400" cy="256" r="4" fill="#E8B0FF" stroke="#472600" strokeWidth="1" />
        <circle cx="400" cy="234" r="2" fill="#FFF2A3" />
        <circle cx="400" cy="278" r="2" fill="#FFF2A3" />

        {/* Braço de reforço inferior direito */}
        <path
          d="M364 370 
             C392 376 416 360 436 344 
             C420 342 398 346 380 352 Z"
          fill="url(#cosmicGoldPrimary)"
          stroke="#472600"
          strokeWidth="1.5"
        />
      </g>

      {/* ========================================================================= */}
      {/* 5. CRISTAL SUPERIOR DE AMETISTA + ENGASTE DE COROA SOLDADO AO TOPO        */}
      {/* O cristal repousa no engaste dourado no topo do anel (sem invadir avatar) */}
      {/* ========================================================================= */}

      {/* Engaste de Coroa Dourada que abraça o anel superior */}
      <g filter="url(#goldGlint)">
        <path
          d="M198 122 
             C218 96 236 86 256 86 
             C276 86 294 96 314 122 
             L300 132 
             C284 116 270 110 256 110 
             C242 110 228 116 212 132 Z"
          fill="url(#cosmicGoldPrimary)"
          stroke="#522C00"
          strokeWidth="2"
        />

        {/* Pontas da coroa que sustentam o cristal */}
        <path
          d="M226 92 L216 48 L236 68 L256 30 L276 68 L296 48 L286 92"
          stroke="url(#cosmicGoldPrimary)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="216" cy="48" r="3" fill="#FFEFA3" />
        <circle cx="256" cy="30" r="3.5" fill="#FFEFA3" />
        <circle cx="296" cy="48" r="3" fill="#FFEFA3" />
      </g>

      {/* O Cristal de Ametista Multifacetado (Perfeitamente posicionado) */}
      <g filter="url(#intenseGlow)">
        {/* Corpo principal do cristal */}
        <path
          d="M256 44 L284 80 L274 116 L256 128 L238 116 L228 80 Z"
          fill="url(#amethystCrystal)"
          stroke="url(#cosmicGoldPrimary)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Facetas de reflexo cristalino */}
        <path d="M256 44 L228 80 L256 98 Z" fill="#FFFFFF" opacity="0.45" />
        <path d="M256 44 L284 80 L256 98 Z" fill="#FFF0FF" opacity="0.25" />
        <path d="M228 80 L238 116 L256 128 L256 98 Z" fill="#3B036B" opacity="0.4" />
        <path d="M284 80 L274 116 L256 128 L256 98 Z" fill="#6B0BAE" opacity="0.45" />
        <path d="M256 44 L256 128" stroke="#FFFFFF" strokeWidth="1.8" opacity="0.85" />

        {/* Centelha de luz central do cristal */}
        <circle cx="256" cy="88" r="6" fill="#FFFFFF" opacity="0.9" />
      </g>

      {/* ========================================================================= */}
      {/* 6. EMBLEMA / ESCUDO INFERIOR DO GUARDIÃO (INTEGRADO À BASE DO CÍRCULO)     */}
      {/* ========================================================================= */}

      {/* Suporte alado dourado da base (conecta o escudo ao arco inferior do anel) */}
      <g filter="url(#goldGlint)">
        <path
          d="M184 382 
             C206 376 230 372 256 372 
             C282 372 306 376 328 382 
             L318 404 
             C298 398 278 396 256 396 
             C234 396 214 398 194 404 Z"
          fill="url(#cosmicGoldPrimary)"
          stroke="#4D2800"
          strokeWidth="1.5"
        />
      </g>

      {/* Escudo do Guardião Cósmico */}
      <g filter="url(#intenseGlow)">
        {/* Corpo principal do escudo */}
        <path
          d="M256 366 L298 386 L292 432 L256 462 L220 432 L214 386 Z"
          fill="url(#guardianShieldGrad)"
          stroke="url(#cosmicGoldPrimary)"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Friso interno luminoso do escudo */}
        <path
          d="M256 376 L286 392 L281 426 L256 448 L231 426 L226 392 Z"
          stroke="#E6B0FF"
          strokeWidth="2"
          fill="none"
          opacity="0.85"
        />

        {/* Joia estelar e brasão do Guardião */}
        <circle cx="256" cy="404" r="7" fill="#FFF2A8" />
        <circle cx="240" cy="412" r="4.5" fill="#FFD34E" />
        <circle cx="272" cy="412" r="4.5" fill="#FFD34E" />

        <path
          d="M240 422 C240 432 256 440 256 440 C256 440 272 432 272 422"
          stroke="#FFF2A8"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        <path
          d="M256 392 L256 380"
          stroke="#FFF2A8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* ========================================================================= */}
      {/* 7. BRILHOS ESTELARES E REFLEXOS FINAIS                                    */}
      {/* ========================================================================= */}
      <g fill="#FFFFFF" filter="url(#softGlow)">
        {/* Estrela no topo esquerdo */}
        <path d="M185 92 Q185 98 179 98 Q185 98 185 104 Q185 98 191 98 Q185 98 185 92 Z" />
        {/* Estrela no topo direito */}
        <path d="M327 92 Q327 98 321 98 Q327 98 327 104 Q327 98 333 98 Q327 98 327 92 Z" />
        {/* Estrela na ponta da asa esquerda */}
        <path d="M52 74 Q52 80 46 80 Q52 80 52 86 Q52 80 58 80 Q52 80 52 74 Z" />
        {/* Estrela na ponta da asa direita */}
        <path d="M460 74 Q460 80 454 80 Q460 80 460 86 Q460 80 466 80 Q460 80 460 74 Z" />
      </g>
    </svg>
  );

  if (children) {
    const holeSize = Math.round(size * (268 / 512));

    return (
      <div 
        className={`relative inline-flex items-center justify-center select-none ${className}`}
        style={{ width: size, height: size }}
      >
        {svgContent}
        <div 
          className="absolute rounded-full overflow-hidden flex items-center justify-center pointer-events-auto"
          style={{
            width: holeSize,
            height: holeSize,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  return svgContent;
};
