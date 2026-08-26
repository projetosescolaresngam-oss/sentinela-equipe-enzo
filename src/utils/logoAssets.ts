// Módulo de Fornecimento das Logos Oficiais Exatas (E.E.M.T.I. Alfredo Machado e Conselho Tutelar)
// Para inserção fiel em documentos Word (.docx) e renderização na interface web

// 1. Brasão Oficial E.E.M.T.I. ALFREDO MACHADO (Madalena - Ceará)
export const SVG_ALFREDO_MACHADO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <!-- Trajetórias para os textos em arco -->
    <path id="arc-upper" d="M 72,250 A 178,178 0 1,1 428,250" fill="none" />
    <path id="arc-lower" d="M 428,250 A 178,178 0 0,1 72,250" fill="none" />

    <radialGradient id="sunRays" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFDE7" />
      <stop offset="60%" stop-color="#FDE047" />
      <stop offset="100%" stop-color="#F59E0B" />
    </radialGradient>
    <linearGradient id="seaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="100%" stop-color="#0284C7" />
    </linearGradient>
  </defs>

  <!-- Fundo Transparente / Container -->
  <!-- Anel Externo Laranja Oficial -->
  <circle cx="250" cy="250" r="242" fill="#F26522" stroke="#E65100" stroke-width="2" />
  
  <!-- Filete Branco Delimitador -->
  <circle cx="250" cy="250" r="234" fill="#0A5C2A" stroke="#FFFFFF" stroke-width="2.5" />
  
  <!-- Círculo Verde Escuro Principal -->
  <circle cx="250" cy="250" r="232" fill="#095526" />

  <!-- Linha Circular Branca Interna -->
  <circle cx="250" cy="250" r="162" fill="#095526" stroke="#FFFFFF" stroke-width="3" />
  <circle cx="250" cy="250" r="158" fill="#FFFFFF" />

  <!-- Texto Superior: E.E.M.T.I ALFREDO MACHADO -->
  <text fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="31.5" letter-spacing="3.2">
    <textPath href="#arc-upper" startOffset="50%" text-anchor="middle">
      E.E.M.T.I ALFREDO MACHADO
    </textPath>
  </text>

  <!-- Texto Inferior: - MADALENA - CEARÁ - -->
  <text fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="31.5" letter-spacing="4.5">
    <textPath href="#arc-lower" startOffset="50%" text-anchor="middle">
      - MADALENA - CEARÁ -
    </textPath>
  </text>

  <!-- ESCUDO CENTRAL HERÁLDICO -->
  <g transform="translate(130, 96) scale(0.96)">
    
    <!-- Coroa Mural / Castelo Dourado no Topo -->
    <g transform="translate(60, 24)">
      <!-- Base e Torres da Coroa -->
      <path d="M 12,28 L 22,7 L 37,7 L 44,18 L 57,7 L 72,7 L 79,18 L 92,7 L 107,7 L 117,28 Z" 
            fill="#E5BA53" stroke="#78350F" stroke-width="2.8" />
      <rect x="25" y="27" width="79" height="15" fill="#D4A237" stroke="#78350F" stroke-width="2.2" />
      <!-- Portas / Aberturas Arqueadas -->
      <path d="M 37,42 L 37,33 Q 43,29 49,33 L 49,42 Z" fill="#291806" stroke="#78350F" stroke-width="1.2" />
      <path d="M 59,42 L 59,32 Q 65,27 71,32 L 71,42 Z" fill="#291806" stroke="#78350F" stroke-width="1.5" />
      <path d="M 81,42 L 81,33 Q 87,29 93,33 L 93,42 Z" fill="#291806" stroke="#78350F" stroke-width="1.2" />
      <!-- Linhas de alvenaria -->
      <line x1="25" y1="35" x2="104" y2="35" stroke="#78350F" stroke-width="1.2" />
    </g>

    <!-- Escudo Verde Esmeralda Principal -->
    <path d="M 25,66 Q 125,50 225,66 Q 235,130 220,182 Q 185,252 125,292 Q 65,252 30,182 Q 15,130 25,66 Z" 
          fill="#0D7337" stroke="#FFFFFF" stroke-width="7.5" />
    <path d="M 25,66 Q 125,50 225,66 Q 235,130 220,182 Q 185,252 125,292 Q 65,252 30,182 Q 15,130 25,66 Z" 
          fill="none" stroke="#1E293B" stroke-width="2.2" />

    <!-- 8 Estrelas Brancas de 5 pontas no escudo -->
    <g fill="#FFFFFF">
      <!-- Lado Esquerdo -->
      <polygon points="45,115 48,124 57,124 50,129 53,137 45,132 38,137 40,129 34,124 43,124" transform="scale(0.85) translate(8, 22)" />
      <polygon points="45,115 48,124 57,124 50,129 53,137 45,132 38,137 40,129 34,124 43,124" transform="scale(0.85) translate(8, 72)" />
      <polygon points="45,115 48,124 57,124 50,129 53,137 45,132 38,137 40,129 34,124 43,124" transform="scale(0.85) translate(25, 122)" />
      <!-- Parte Inferior -->
      <polygon points="45,115 48,124 57,124 50,129 53,137 45,132 38,137 40,129 34,124 43,124" transform="scale(0.85) translate(65, 162)" />
      <polygon points="45,115 48,124 57,124 50,129 53,137 45,132 38,137 40,129 34,124 43,124" transform="scale(0.85) translate(145, 162)" />
      <!-- Lado Direito -->
      <polygon points="45,115 48,124 57,124 50,129 53,137 45,132 38,137 40,129 34,124 43,124" transform="scale(0.85) translate(185, 122)" />
      <polygon points="45,115 48,124 57,124 50,129 53,137 45,132 38,137 40,129 34,124 43,124" transform="scale(0.85) translate(202, 72)" />
      <polygon points="45,115 48,124 57,124 50,129 53,137 45,132 38,137 40,129 34,124 43,124" transform="scale(0.85) translate(202, 22)" />
    </g>

    <!-- Miolo do Brasão Central (Ceará / Madalena) -->
    <g transform="translate(58, 86)">
      <!-- Borda do Miolo -->
      <path d="M 15,30 C 15,5 119,5 119,30 C 119,85 105,135 67,150 C 29,135 15,85 15,30 Z" 
            fill="#BAE6FD" stroke="#D4A237" stroke-width="4.5" />
      <path d="M 15,30 C 15,5 119,5 119,30 C 119,85 105,135 67,150 C 29,135 15,85 15,30 Z" 
            fill="none" stroke="#1E293B" stroke-width="1.8" />
      
      <!-- Quadrante 1 & 2: Céu com Sol Radiante e Farol / Pássaro -->
      <g>
        <!-- Raios do Sol -->
        <path d="M 67,65 L 45,15 L 67,10 L 89,15 Z" fill="#FDE047" />
        <path d="M 67,65 L 20,35 L 35,25 Z" fill="#FACC15" />
        <path d="M 67,65 L 114,35 L 99,25 Z" fill="#FACC15" />
        <circle cx="67" cy="65" r="22" fill="url(#sunRays)" />

        <!-- Farol Branco com cúpula vermelha à esquerda -->
        <rect x="35" y="38" width="13" height="30" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.5" />
        <rect x="37" y="45" width="9" height="4" fill="#0F172A" />
        <rect x="37" y="55" width="9" height="4" fill="#0F172A" />
        <polygon points="33,38 41.5,30 50,38" fill="#DC2626" stroke="#0F172A" stroke-width="1.5" />

        <!-- Montanha Verde e Asa Branca à direita -->
        <path d="M 67,65 Q 95,42 118,55 L 118,75 L 67,75 Z" fill="#15803D" />
        <!-- Pássaro Branco voando -->
        <path d="M 85,36 Q 92,28 98,35 Q 104,28 111,36 Q 98,32 85,36 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.2" />
      </g>

      <!-- Quadrante 3: Mar Azul e Jangada Cearense -->
      <g>
        <path d="M 16,68 Q 45,64 67,75 L 67,145 C 38,133 16,95 16,68 Z" fill="url(#seaGradient)" />
        <!-- Jangada -->
        <path d="M 30,105 Q 45,108 55,105 L 53,109 Q 43,111 28,109 Z" fill="#78350F" />
        <path d="M 43,84 Q 53,94 43,104 Q 37,94 43,84 Z" fill="#FFFFFF" stroke="#0F172A" stroke-width="1.2" />
      </g>

      <!-- Quadrante 4: Duna de Areia e Carnaúba -->
      <g>
        <path d="M 67,75 Q 90,70 118,72 C 118,95 96,133 67,145 Z" fill="#FDE68A" />
        <!-- Tronco da Carnaúba -->
        <path d="M 88,126 Q 90,105 89,94 L 93,94 Q 94,105 92,126 Z" fill="#78350F" />
        <!-- Copa da Palmeira Carnaúba -->
        <circle cx="91" cy="92" r="14" fill="#166534" />
        <circle cx="91" cy="92" r="10" fill="#22C55E" />
        <line x1="91" y1="78" x2="91" y2="106" stroke="#166534" stroke-width="1.5" />
        <line x1="78" y1="92" x2="104" y2="92" stroke="#166534" stroke-width="1.5" />
      </g>

      <!-- Divisórias e Contorno do Miolo -->
      <line x1="67" y1="10" x2="67" y2="148" stroke="#1E293B" stroke-width="1.8" />
      <line x1="16" y1="70" x2="118" y2="70" stroke="#1E293B" stroke-width="1.8" />
      <path d="M 15,30 C 15,5 119,5 119,30 C 119,85 105,135 67,150 C 29,135 15,85 15,30 Z" 
            fill="none" stroke="#1E293B" stroke-width="2.2" />
    </g>

    <!-- Faixa Decorativa Transversal -->
    <path d="M 38,135 Q 125,230 212,135" fill="none" stroke="#15803D" stroke-width="4.5" opacity="0.8" />
  </g>
</svg>`;

// 2. Logo Oficial CONSELHO TUTELAR (Idêntico ao Anexo Oficial)
export const SVG_CONSELHO_TUTELAR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 350" width="600" height="350">
  <rect width="100%" height="100%" fill="#FFFFFF" />
  
  <g transform="translate(180, 16)">
    <!-- MÃO SUPERIOR PROTETORA (Azul Royal) -->
    <!-- Formato em arco de cobertura com polegar curvado à direita -->
    <path d="M 28,68 C 28,42 65,12 120,12 C 175,12 212,42 212,68 C 212,79 198,82 184,70 C 160,50 140,42 120,42 C 100,42 80,50 56,70 C 42,82 28,79 28,68 Z" 
          fill="#1E4D94" />
    <path d="M 75,48 C 92,30 110,24 120,24 C 130,24 148,30 165,48 C 176,58 190,48 180,36 C 160,18 135,10 120,10 C 105,10 80,18 60,36 C 50,48 64,58 75,48 Z" 
          fill="#2756A8" opacity="0.95" />

    <!-- FIGURA 1: CRIANÇA VERMELHA (Esquerda - Braços abertos) -->
    <g fill="#E11D48">
      <circle cx="56" cy="100" r="12" />
      <!-- Corpo dinâmico estendendo o braço direito para segurar o adulto -->
      <path d="M 38,120 C 38,114 48,112 56,112 C 64,112 74,114 74,120 L 84,130 C 88,134 80,138 75,133 L 69,126 L 69,158 C 69,164 62,164 62,158 L 59,140 L 53,140 L 50,158 C 50,164 43,164 43,158 L 43,126 L 38,133 C 33,138 25,134 29,130 Z" />
    </g>

    <!-- FIGURA 2: ADULTO / PROTETOR VERDE (Centro - Acolhendo ambas as crianças) -->
    <g fill="#16A34A">
      <circle cx="120" cy="80" r="15" />
      <!-- Corpo estendendo ambos os braços para acolher -->
      <path d="M 96,105 C 96,96 107,95 120,95 C 133,95 144,96 144,105 L 160,123 C 165,129 157,135 150,129 L 139,117 L 139,182 C 139,188 130,188 130,182 L 126,146 L 114,146 L 110,182 C 110,188 101,188 101,182 L 101,117 L 90,129 C 83,135 75,129 80,123 Z" />
    </g>

    <!-- FIGURA 3: CRIANÇA AMARELA / DOURADA (Direita - Dançando com perna erguida) -->
    <g fill="#F59E0B">
      <circle cx="184" cy="96" r="12" />
      <!-- Perna direita dobrada alegremente e braço esquerdo na mão do protetor -->
      <path d="M 165,117 C 165,110 176,108 184,108 C 192,108 203,110 203,117 L 211,127 C 216,131 209,135 204,130 L 196,124 L 198,160 C 198,165 191,165 191,160 L 187,138 L 181,138 L 175,154 C 173,159 167,157 169,152 L 175,124 L 170,130 C 165,135 158,131 163,127 Z" />
    </g>

    <!-- MÃO INFERIOR PROTETORA (Azul Royal - Base e sustentação) -->
    <path d="M 28,180 C 28,169 42,166 56,176 C 80,196 100,204 120,204 C 140,204 160,196 184,176 C 198,166 212,169 212,180 C 212,201 175,231 120,231 C 65,231 28,201 28,180 Z" 
          fill="#1E4D94" />
    <path d="M 75,198 C 92,216 110,222 120,222 C 130,222 148,216 165,198 C 176,188 190,198 180,210 C 160,228 135,236 120,236 C 105,236 80,228 60,210 C 50,198 64,188 75,198 Z" 
          fill="#2756A8" opacity="0.95" />
  </g>

  <!-- TIPOGRAFIA INSTITUCIONAL OFICIAL: CONSELHO TUTELAR -->
  <text x="300" y="310" 
        text-anchor="middle" 
        fill="#1E3A8A" 
        font-family="Arial, Helvetica, sans-serif" 
        font-weight="900" 
        font-size="44" 
        letter-spacing="5.5">
    CONSELHO TUTELAR
  </text>
</svg>`;

// 3. Marca D'água / Brasão Educacional (Livro Aberto com Louros - Topo Direito)
export const SVG_EDUCATION_WATERMARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 350" width="400" height="350">
  <g fill="none" stroke="#94A3B8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.85">
    <!-- Livro Aberto Central -->
    <path d="M 200,105 C 170,85 110,85 70,105 L 70,225 C 110,205 170,205 200,225 C 230,205 290,205 330,225 L 330,105 C 290,85 230,85 200,105 Z" fill="#F8FAFC" />
    <!-- Lombada Central -->
    <line x1="200" y1="105" x2="200" y2="225" stroke-width="7" stroke="#64748B" />
    
    <!-- Linhas de Páginas Esquerdas -->
    <path d="M 85,125 C 115,110 165,110 188,125" stroke-width="4" stroke="#CBD5E1" />
    <path d="M 85,145 C 115,130 165,130 188,145" stroke-width="4" stroke="#CBD5E1" />
    <path d="M 85,165 C 115,150 165,150 188,165" stroke-width="4" stroke="#CBD5E1" />
    <path d="M 85,185 C 115,170 165,170 188,185" stroke-width="4" stroke="#CBD5E1" />

    <!-- Linhas de Páginas Direitas -->
    <path d="M 212,125 C 235,110 285,110 315,125" stroke-width="4" stroke="#CBD5E1" />
    <path d="M 212,145 C 235,130 285,130 315,145" stroke-width="4" stroke="#CBD5E1" />
    <path d="M 212,165 C 235,150 285,150 315,165" stroke-width="4" stroke="#CBD5E1" />
    <path d="M 212,185 C 235,170 285,170 315,185" stroke-width="4" stroke="#CBD5E1" />

    <!-- Ramos de Louro Esquerdo -->
    <path d="M 175,270 C 100,270 45,210 40,110" stroke-width="5" stroke="#94A3B8" />
    <!-- Folhas do Ramo Esquerdo -->
    <ellipse cx="40" cy="115" rx="14" ry="7" transform="rotate(-30 40 115)" fill="#E2E8F0" />
    <ellipse cx="44" cy="145" rx="14" ry="7" transform="rotate(-20 44 145)" fill="#E2E8F0" />
    <ellipse cx="56" cy="175" rx="14" ry="7" transform="rotate(-10 56 175)" fill="#E2E8F0" />
    <ellipse cx="78" cy="205" rx="14" ry="7" transform="rotate(10 78 205)" fill="#E2E8F0" />
    <ellipse cx="110" cy="235" rx="14" ry="7" transform="rotate(30 110 235)" fill="#E2E8F0" />
    <ellipse cx="150" cy="255" rx="14" ry="7" transform="rotate(45 150 255)" fill="#E2E8F0" />

    <!-- Ramos de Louro Direito -->
    <path d="M 225,270 C 300,270 355,210 360,110" stroke-width="5" stroke="#94A3B8" />
    <!-- Folhas do Ramo Direito -->
    <ellipse cx="360" cy="115" rx="14" ry="7" transform="rotate(30 360 115)" fill="#E2E8F0" />
    <ellipse cx="356" cy="145" rx="14" ry="7" transform="rotate(20 356 145)" fill="#E2E8F0" />
    <ellipse cx="344" cy="175" rx="14" ry="7" transform="rotate(10 344 175)" fill="#E2E8F0" />
    <ellipse cx="322" cy="205" rx="14" ry="7" transform="rotate(-10 322 205)" fill="#E2E8F0" />
    <ellipse cx="290" cy="235" rx="14" ry="7" transform="rotate(-30 290 235)" fill="#E2E8F0" />
    <ellipse cx="250" cy="255" rx="14" ry="7" transform="rotate(-45 250 255)" fill="#E2E8F0" />

    <!-- Fita / Laço na base -->
    <path d="M 160,270 Q 200,290 240,270 Q 200,255 160,270 Z" fill="#CBD5E1" stroke="#94A3B8" stroke-width="4" />
    <path d="M 170,275 L 140,310 L 165,305 L 175,325 L 185,280" fill="#E2E8F0" stroke="#94A3B8" stroke-width="4" />
    <path d="M 230,275 L 260,310 L 235,305 L 225,325 L 215,280" fill="#E2E8F0" stroke="#94A3B8" stroke-width="4" />
  </g>
</svg>`;

// Função utilitária de renderização de SVG para imagem rasterizada em PNG Uint8Array de alta densidade
export async function svgToPngUint8Array(svgString: string, width = 600, height = 600): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    try {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        resolve(new Uint8Array(0));
        return;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Não foi possível obter contexto 2D do Canvas');
      }

      // Fundo transparente ou branco limpo para nitidez no Word (.docx)
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      const img = new Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const objectUrl = window.URL.createObjectURL(svgBlob);

      img.onload = () => {
        try {
          ctx.drawImage(img, 0, 0, width, height);
          window.URL.revokeObjectURL(objectUrl);

          const dataUrl = canvas.toDataURL('image/png', 0.98);
          const base64Data = dataUrl.split(',')[1];
          const binaryString = window.atob(base64Data);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          resolve(bytes);
        } catch (e) {
          reject(e);
        }
      };

      img.onerror = (err) => {
        window.URL.revokeObjectURL(objectUrl);
        reject(err);
      };

      img.src = objectUrl;
    } catch (err) {
      reject(err);
    }
  });
}

let alfredoLogoCache: Uint8Array | null = null;
let conselhoLogoCache: Uint8Array | null = null;
let watermarkCache: Uint8Array | null = null;

export async function getAlfredoLogoBytes(): Promise<Uint8Array> {
  if (alfredoLogoCache && alfredoLogoCache.length > 0) {
    return alfredoLogoCache;
  }
  alfredoLogoCache = await svgToPngUint8Array(SVG_ALFREDO_MACHADO, 500, 500);
  return alfredoLogoCache;
}

export async function getConselhoLogoBytes(): Promise<Uint8Array> {
  if (conselhoLogoCache && conselhoLogoCache.length > 0) {
    return conselhoLogoCache;
  }
  conselhoLogoCache = await svgToPngUint8Array(SVG_CONSELHO_TUTELAR, 600, 350);
  return conselhoLogoCache;
}

export async function getEducationWatermarkBytes(): Promise<Uint8Array> {
  if (watermarkCache && watermarkCache.length > 0) {
    return watermarkCache;
  }
  watermarkCache = await svgToPngUint8Array(SVG_EDUCATION_WATERMARK, 400, 350);
  return watermarkCache;
}
