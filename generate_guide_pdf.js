const fs = require('fs');
const path = require('path');
const jspdf = require('./jspdf.js');

const doc = new jspdf.jsPDF({
  unit: 'mm',
  format: 'a4',
  orientation: 'portrait'
});

const PW = 210;
const PH = 297;
const ML = 16;
const MR = 16;
const CW = PW - ML - MR; // 178mm
let y = 0;

// Colores del tema (Pascual / Ámbar dorado litúrgico)
const C_PRIMARY = [146, 64, 14];    // #92400e
const C_ACCENT  = [217, 119, 6];    // #d97706
const C_DARK    = [30, 41, 59];      // #1e293b
const C_MUTED   = [100, 116, 139];   // #64748b
const C_BG_CARD = [248, 250, 252];   // #f8fafc
const C_BORDER  = [226, 232, 240];   // #e2e8f0

function nl(n = 5) { y += n; }

function checkBreak(neededHeight) {
  if (y + neededHeight > PH - 18) {
    doc.addPage();
    // Header minimal en páginas secundarias
    doc.setFillColor(C_PRIMARY[0], C_PRIMARY[1], C_PRIMARY[2]);
    doc.rect(0, 0, PW, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.text('Planificador Eucarístico — Guía Maestra y Manual de Presentación', PW / 2, 4.8, { align: 'center' });
    y = 16;
  }
}

// -------------------------------------------------------------
// 1. BANNER PRINCIPAL (PORTADA)
// -------------------------------------------------------------
doc.setFillColor(C_PRIMARY[0], C_PRIMARY[1], C_PRIMARY[2]);
doc.roundedRect(ML, 14, CW, 38, 3, 3, 'F');

// Badge superior
doc.setFillColor(255, 255, 255);
doc.setTextColor(C_PRIMARY[0], C_PRIMARY[1], C_PRIMARY[2]);
doc.setFont('helvetica', 'bold');
doc.setFontSize(7);
doc.roundedRect(ML + 6, 19, 66, 4.5, 1, 1, 'F');
doc.text('GUÍA MAESTRA & MANUAL DE PRESENTACIÓN', ML + 9, 22.2);

// Título Principal
doc.setTextColor(255, 255, 255);
doc.setFont('helvetica', 'bold');
doc.setFontSize(18);
doc.text('Planificador Eucarístico', ML + 6, 32);

// Subtítulo
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.text('Plataforma Abierta de Coordinación Litúrgica, Repertorio Digital y Generación de Hojas de Canto', ML + 6, 38);
doc.setFont('helvetica', 'italic');
doc.setFontSize(7.5);
doc.text('Diseñado para Coros, Ministerios Musicales y Parroquias · Código Abierto (Licencia MIT)', ML + 6, 45);

y = 58;

// -------------------------------------------------------------
// 2. SECCIÓN 1: VISIÓN GENERAL Y PROPÓSITO PASTORAL
// -------------------------------------------------------------
function drawSectionHeader(num, title) {
  checkBreak(15);
  doc.setFillColor(C_PRIMARY[0], C_PRIMARY[1], C_PRIMARY[2]);
  doc.roundedRect(ML, y, CW, 6.5, 1.2, 1.2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(`${num}. ${title.toUpperCase()}`, ML + 3, y + 4.5);
  nl(10);
}

drawSectionHeader(1, 'Visión General y Propósito Pastoral');

doc.setTextColor(C_DARK[0], C_DARK[1], C_DARK[2]);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
const p1 = 'La animación musical de la Santa Misa exige fidelidad litúrgica, comunión y preparación técnica. Este proyecto resuelve la falta de uniformidad en tonalidades, el tiempo excesivo formateando hojas en procesadores de texto tradicionales y los costos de software privado, entregando una herramienta 100% gratuita y perpetua.';
const p1Lines = doc.splitTextToSize(p1, CW);
doc.text(p1Lines, ML, y);
nl(4.5 * p1Lines.length + 3);

// Comparativa en 2 tarjetas
checkBreak(24);
const colW = (CW - 4) / 2;
// Tarjeta 1: Desafíos
doc.setFillColor(254, 242, 242); // #fef2f2
doc.setDrawColor(254, 202, 202); // #fecaca
doc.roundedRect(ML, y, colW, 22, 2, 2, 'FD');
doc.setTextColor(185, 28, 28);
doc.setFont('helvetica', 'bold'); doc.setFontSize(7.8);
doc.text('DESAFÍOS HABITUALES', ML + 3, y + 4.5);
doc.setTextColor(75, 85, 99); doc.setFont('helvetica', 'normal'); doc.setFontSize(7);
doc.text('• Versiones y tonos desordenados entre músicos.', ML + 3, y + 9);
doc.text('• Horas invertidas armando hojas en Word a mano.', ML + 3, y + 13.5);
doc.text('• Costos de servidores y aplicaciones de pago.', ML + 3, y + 18);

// Tarjeta 2: Solución
doc.setFillColor(240, 253, 244); // #f0fdf4
doc.setDrawColor(187, 247, 208); // #bbf7d0
doc.roundedRect(ML + colW + 4, y, colW, 22, 2, 2, 'FD');
doc.setTextColor(21, 128, 61);
doc.setFont('helvetica', 'bold'); doc.setFontSize(7.8);
doc.text('SOLUCIÓN DEL PLANIFICADOR', ML + colW + 7, y + 4.5);
doc.setTextColor(75, 85, 99); doc.setFont('helvetica', 'normal'); doc.setFontSize(7);
doc.text('• Repertorio oficial centralizado con acordes y tonos.', ML + colW + 7, y + 9);
doc.text('• Generación de PDF A4 en 1 clic listo para imprimir.', ML + colW + 7, y + 13.5);
doc.text('• Cero costo de por vida alojado en GitHub Pages.', ML + colW + 7, y + 18);

nl(27);

// -------------------------------------------------------------
// 3. SECCIÓN 2: PILARES TÉCNICOS Y VENTAJAS CLAVE
// -------------------------------------------------------------
drawSectionHeader(2, 'Pilares Técnicos y Ventajas de la Plataforma');

const pilares = [
  { t: 'Cero Costo Perpetuo', d: 'Alojado en GitHub Pages. Sin servidores de pago, bases de datos complejas ni costos de renovación.' },
  { t: 'Autonomía y Privacidad', d: 'Cada coro posee su propio repositorio independiente. Control total de su repertorio sin compartir datos.' },
  { t: 'Generación Instantánea de PDF', d: 'Documentos A4 de alta legibilidad con datos de misa, lecturas y enlaces interactivos a YouTube.' },
  { t: 'Integración Directa con WhatsApp', d: 'Genera resúmenes estructurados con emojis y formato de negritas para compartir al grupo al instante.' },
  { t: 'Adaptabilidad Litúrgica Automática', d: 'Interfaz y documentos adaptados al color litúrgico oficial (Verde, Morado, Blanco/Dorado o Rojo).' },
  { t: 'Asistente y Validador de Cantos', d: 'Herramienta visual para agregar canciones sin riesgo de romper el código JavaScript.' }
];

for (const p of pilares) {
  checkBreak(9);
  doc.setFillColor(C_ACCENT[0], C_ACCENT[1], C_ACCENT[2]);
  doc.circle(ML + 2, y + 1.5, 1.2, 'F');
  doc.setTextColor(C_PRIMARY[0], C_PRIMARY[1], C_PRIMARY[2]);
  doc.setFont('helvetica', 'bold'); doc.setFontSize(7.8);
  doc.text(p.t + ':', ML + 6, y + 2.3);
  const wTitle = doc.getTextWidth(p.t + ': ');
  doc.setTextColor(C_DARK[0], C_DARK[1], C_DARK[2]);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5);
  const descLines = doc.splitTextToSize(p.d, CW - 8 - wTitle);
  doc.text(descLines[0], ML + 6 + wTitle, y + 2.3);
  nl(5);
  if (descLines.length > 1) {
    for (let i = 1; i < descLines.length; i++) {
      doc.text(descLines[i], ML + 6, y + 2);
      nl(4.5);
    }
  }
}

nl(5);

// -------------------------------------------------------------
// 4. SECCIÓN 3: PUESTA EN MARCHA (DESPLIEGUE EN 3 MINUTOS)
// -------------------------------------------------------------
drawSectionHeader(3, 'Puesta en Marcha para un Nuevo Coro (En 3 Minutos)');

doc.setTextColor(C_DARK[0], C_DARK[1], C_DARK[2]);
doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
doc.text('Cualquier comunidad parroquial o ministerio musical puede crear su propia instancia en 3 sencillos pasos:', ML, y);
nl(6);

const pasosDespliegue = [
  { num: '1', tit: 'Crear la copia en GitHub', desc: 'Ingresa a https://github.com/Bgalo/GVC y pulsa el botón verde "Use this template" (o "Fork"). Elige el nombre de tu repositorio (ej. Planificador-CoroSanJose) y pulsa "Create repository".' },
  { num: '2', tit: 'Personalizar identidad en config.js y subir logo.png', desc: 'Abre config.js y edita nombreMinisterio, siglas, parroquia y githubRepo. Reemplaza el archivo logo.png en la raíz con el logotipo de tu coro (PNG transparente recomendado).' },
  { num: '3', tit: 'Activar GitHub Pages (Página Web Gratuita)', desc: 'En Settings > Pages de tu nuevo repositorio, selecciona la rama main (o master) con carpeta /(root) y pulsa Save. En 1 minuto tendrás tu enlace oficial en línea disponible para todos.' }
];

for (const p of pasosDespliegue) {
  checkBreak(18);
  doc.setFillColor(C_BG_CARD[0], C_BG_CARD[1], C_BG_CARD[2]);
  doc.setDrawColor(C_BORDER[0], C_BORDER[1], C_BORDER[2]);
  doc.roundedRect(ML, y, CW, 14.5, 1.5, 1.5, 'FD');
  
  doc.setFillColor(C_ACCENT[0], C_ACCENT[1], C_ACCENT[2]);
  doc.circle(ML + 5, y + 7.2, 3.2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5);
  doc.text(p.num, ML + 5, y + 8.2, { align: 'center' });

  doc.setTextColor(C_DARK[0], C_DARK[1], C_DARK[2]);
  doc.setFont('helvetica', 'bold'); doc.setFontSize(7.8);
  doc.text(p.tit, ML + 11, y + 4.8);

  doc.setFont('helvetica', 'normal'); doc.setFontSize(6.8);
  doc.setTextColor(C_MUTED[0], C_MUTED[1], C_MUTED[2]);
  const pLines = doc.splitTextToSize(p.desc, CW - 14);
  doc.text(pLines, ML + 11, y + 9);
  nl(17);
}

// -------------------------------------------------------------
// 5. SECCIÓN 4: FLUJO DE TRABAJO DEL COORDINADOR DE MISA
// -------------------------------------------------------------
drawSectionHeader(4, 'Flujo de Trabajo Dominical para el Coordinador');

const pasosMisa = [
  { letra: 'A', tit: 'Configuración de la Misa', desc: 'Seleccionar fecha, escribir nombre del responsable y elegir el Tiempo Litúrgico (los colores visuales y del PDF se sincronizan de inmediato).' },
  { letra: 'B', tit: 'Selección de Repertorio y Consulta de Letras', desc: 'Explorar cada tarjeta de la misa (Entrada, Piedad, Gloria, Ofertorio, Santo, Comunión, etc.), filtrar por nombre o ID y revisar la vista previa de acordes/letra.' },
  { letra: 'C', tit: 'Registro de Lecturas y Observaciones', desc: 'Anotar citas bíblicas (Primera Lectura, Salmo con antífona, Segunda Lectura, Evangelio) e indicaciones técnicas (cejilla, instrumentos, intenciones).' },
  { letra: 'D', tit: 'Generación de PDF y Resumen para WhatsApp', desc: 'Presionar "Vista previa y descargar PDF" para el documento formal o "Copiar para WhatsApp" para compartir el esquema al grupo en segundos.' }
];

for (const p of pasosMisa) {
  checkBreak(15);
  doc.setFillColor(255, 251, 235); // #fffbeb
  doc.setDrawColor(254, 215, 170); // #fed7aa
  doc.roundedRect(ML, y, CW, 13, 1.5, 1.5, 'FD');

  doc.setFillColor(C_PRIMARY[0], C_PRIMARY[1], C_PRIMARY[2]);
  doc.roundedRect(ML + 2.5, y + 2.5, 6, 8, 1, 1, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5);
  doc.text(p.letra, ML + 5.5, y + 7.5, { align: 'center' });

  doc.setTextColor(C_PRIMARY[0], C_PRIMARY[1], C_PRIMARY[2]);
  doc.setFont('helvetica', 'bold'); doc.setFontSize(7.8);
  doc.text(p.tit, ML + 11, y + 5);

  doc.setFont('helvetica', 'normal'); doc.setFontSize(6.8);
  doc.setTextColor(C_DARK[0], C_DARK[1], C_DARK[2]);
  const pLines = doc.splitTextToSize(p.desc, CW - 14);
  doc.text(pLines, ML + 11, y + 9.2);
  nl(15.5);
}

// -------------------------------------------------------------
// 6. SECCIÓN 5: GESTIÓN DE REPERTORIO Y COLABORACIÓN
// -------------------------------------------------------------
drawSectionHeader(5, 'Gestión de Repertorio: Asistente y Validador');

doc.setTextColor(C_DARK[0], C_DARK[1], C_DARK[2]);
doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
const repIntro = 'Los cantos residen en archivos modulares (cantos/entrada.js, cantos/comunion.js, etc.). Para agregar canciones sin tocar código:';
doc.text(repIntro, ML, y);
nl(5);

const pasosAsistente = [
  '1. Haz clic en "Asistente para Agregar Cantos" al final de la página web.',
  '2. Selecciona el momento litúrgico (el sistema calcula el próximo ID y selecciona el archivo).',
  '3. Escribe título, tono, enlace de YouTube (opcional) y pega la letra completa.',
  '4. Pulsa "Copiar Código" y luego "Abrir en GitHub" para ir directo al editor del archivo.',
  '5. Pega el código antes de la última línea ]; y presiona "Commit changes".',
  '6. Pestaña "Validador de Sintaxis": Permite pegar código y confirmar que no tenga comas faltantes antes de guardarlo.'
];

for (const pa of pasosAsistente) {
  checkBreak(5.5);
  doc.setTextColor(C_DARK[0], C_DARK[1], C_DARK[2]);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(7.3);
  doc.text(pa, ML + 3, y);
  nl(4.8);
}

nl(3);

// -------------------------------------------------------------
// 7. SECCIÓN 6: PREGUNTAS FRECUENTES Y TALLERES
// -------------------------------------------------------------
drawSectionHeader(6, 'Preguntas Frecuentes (FAQ para Talleres)');

const faqs = [
  { q: '¿Qué pasa si no hay internet en la iglesia?', a: 'El PDF se descarga al teléfono o laptop antes de la misa y funciona 100% offline o impreso en papel.' },
  { q: '¿Tiene límite en el número de canciones?', a: 'No. El catálogo soporta cientos de canciones por momento litúrgico manteniendo máxima velocidad.' },
  { q: '¿Funciona en celulares y tablets?', a: 'Sí. El diseño es 100% responsivo y cómodo para colocar en atriles de guitarras, teclados o coristas.' },
  { q: '¿Tiene costo o caducidad?', a: 'No. El software cuenta con Licencia Libre MIT y alojamiento gratuito perpetuo en GitHub Pages.' }
];

for (const f of faqs) {
  checkBreak(11);
  doc.setTextColor(C_PRIMARY[0], C_PRIMARY[1], C_PRIMARY[2]);
  doc.setFont('helvetica', 'bold'); doc.setFontSize(7.5);
  doc.text('P: ' + f.q, ML + 2, y);
  nl(4);
  doc.setTextColor(C_DARK[0], C_DARK[1], C_DARK[2]);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(7.2);
  const aLines = doc.splitTextToSize('R: ' + f.a, CW - 4);
  doc.text(aLines, ML + 2, y);
  nl(4.2 * aLines.length + 2);
}

// -------------------------------------------------------------
// NUMERACIÓN DE PÁGINAS Y PIE
// -------------------------------------------------------------
const totalPages = doc.getNumberOfPages();
for (let i = 1; i <= totalPages; i++) {
  doc.setPage(i);
  doc.setFillColor(C_PRIMARY[0], C_PRIMARY[1], C_PRIMARY[2]);
  doc.rect(0, PH - 8, PW, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.8);
  doc.text('Planificador Eucarístico — Manual Litúrgico de Código Abierto (Licencia MIT)', ML, PH - 3);
  doc.text(`Página ${i} de ${totalPages}`, PW - MR, PH - 3, { align: 'right' });
}

// Guardar archivo
const outputPath = path.join(__dirname, 'Guia_Maestra_Planificador_Eucaristico.pdf');
const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
fs.writeFileSync(outputPath, pdfBuffer);
console.log('PDF generado exitosamente en:', outputPath, 'Tamaño:', pdfBuffer.length, 'bytes');
