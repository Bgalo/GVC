# 📖 Manual de Operación y Mantenimiento: Planificador Eucarístico GVC
### Ministerio Musical: *Guitarras y Voces para Cristo (GVC)*

Bienvenido al manual integral de la plataforma de coordinación litúrgica de **GVC**. Este documento está diseñado para que coordinadores y colaboradores mantengan, actualicen y aprovechen la plataforma a largo plazo de forma autónoma y segura.

---

## 🔗 Enlaces Importantes
* **Acceso a la Plataforma Web:** [https://bgalo.github.io/GVC/](https://bgalo.github.io/GVC/)
* **Repositorio en GitHub:** [https://github.com/Bgalo/GVC](https://github.com/Bgalo/GVC)

---

## 1. ¿Qué es el Planificador Eucarístico?
Es una aplicación web ligera y autónoma creada para facilitar la labor litúrgica de los coordinadores de misa del ministerio. Permite:
1. Armar el esquema musical completo respetando los momentos litúrgicos de la Santa Eucaristía.
2. Registrar las lecturas bíblicas del día y observaciones especiales para los músicos.
3. Generar y descargar un documento **PDF estructurado, imprimible y con enlaces a YouTube**.
4. Copiar un resumen formateado directamente para grupos de **WhatsApp**.

---

## 2. Guía de Uso Rápido para el Coordinador de Misa

### Paso 1: Configurar la Celebración
* **Fecha de la Misa:** Selecciona la fecha en el selector superior.
* **Responsable:** Escribe tu nombre o el de la persona a cargo.
* **Tiempo Litúrgico:** Elige el tiempo correspondiente (*Tiempo Ordinario, Adviento, Cuaresma, Pascua, Navidad o Fiesta Especial*). Los colores y estilo de toda la plataforma y del PDF se adaptarán automáticamente al color litúrgico oficial.

### Paso 2: Seleccionar los Cantos
* Explora cada tarjeta correspondiente al momento litúrgico (*Entrada, Piedad, Gloria, Ofertorio, Comunión, etc.*).
* Puedes buscar canciones escribiendo en el buscador de cada menú o filtrando por número de ID.
* Haz clic en el botón **"▼ Letra"** para desplegar la estrofa y confirmar que sea la versión tocada por el ministerio.
* Si el canto tiene enlace a video, puedes hacer clic en **"Ver en YouTube"** para escuchar la referencia musical.

### Paso 3: Registrar Lecturas y Notas
* En la sección **Liturgia de la Palabra**, anota las citas bíblicas de la Primera Lectura, Salmo, Segunda Lectura y Evangelio.
* Al final de la página, utiliza la casilla de **Observaciones** para notas especiales (ej. *Misa de aniversario, guitarras con cejilla en 2do traste, intenciones*, etc.).

### Paso 4: Generar PDF y Compartir
* Haz clic en **"Vista previa y descargar PDF"** al final de la página.
* Podrás revisar la vista previa digital, descargar el archivo PDF oficial o usar el botón **"Copiar para WhatsApp"** para enviar el esquema al grupo del ministerio.

---

## 3. ¿Cómo Agregar o Modificar Cantos? (Para Colaboradores)

Todos los cantos están organizados modularmente dentro de la carpeta `cantos/`:
* `cantos/entrada.js` — Cantos de Entrada
* `cantos/piedad.js` — Cantos de Piedad / Señor Ten Piedad
* `cantos/gloria.js` — Cantos de Gloria
* `cantos/aleluya.js` — Cantos de Aleluya
* `cantos/ofertorio.js` — Cantos de Ofertorio (1 y 2)
* `cantos/santo.js` — Cantos de Santo
* `cantos/aclamacion.js` — Aclamación Conmemorativa
* `cantos/amen.js` — Gran Amén
* `cantos/tuyo.js` — Tuyo es el Reino
* `cantos/paz.js` — Rito de la Paz
* `cantos/cordero.js` — Cordero de Dios
* `cantos/comunion.js` — Cantos de Comunión
* `cantos/salida.js` — Cantos de Salida
* `cantos/marianos.js` — Cantos Marianos y Devocionales

---

### 🌟 Método Recomendado: Usar el Asistente Integrado en la Web (Sin Errores)

Para evitar errores de sintaxis (comas o comillas faltantes), la web cuenta con un **Asistente de Cantos**:

1. Entra a la web: [https://bgalo.github.io/GVC/](https://bgalo.github.io/GVC/)
2. En la parte inferior, presiona el botón **✨ Asistente para Agregar Cantos**.
3. Selecciona el **Momento de la Misa** (el sistema calculará automáticamente el ID correspondiente y te indicará el archivo exacto).
4. Escribe el **Título**, elige la **Tonalidad**, pega el enlace de YouTube (opcional) y la **Letra completa**.
5. Presiona el botón verde **📋 Copiar Código**.
6. Haz clic en **🔗 Abrir en GitHub** (se abrirá directamente el editor web de GitHub).
7. En GitHub, baja hasta el final del archivo, pega el código copiado **antes de la última línea `];`** y presiona el botón verde **"Commit changes"**.
8. ¡Listo! Espera 1 minuto a que GitHub Pages actualice y el nuevo canto aparecerá en la web.

---

### Método Manual (Estructura de Código Estricta)

Si decides editar el archivo directamente en GitHub sin el asistente, debes respetar rigurosamente la siguiente estructura:

```javascript
    {
      id: "E-15",
      titulo: "Nombre del Canto", tono: "DoM",
      yt: "https://www.youtube.com/watch?v=ejemplo",
      letra: `PRIMERA ESTROFA
Aquí va el texto de la estrofa respetando saltos de línea.

CORO
Aquí va el coro en mayúsculas.

SEGUNDA ESTROFA
Continuación del canto.` },
```

> [!IMPORTANT]
> **Reglas de Oro:**
> 1. **La Letra siempre va entre acentos graves (\`)**, NO entre comillas simples (') ni dobles (").
> 2. Cada bloque de canto debe terminar con una coma después de la llave: `},`.
> 3. El archivo debe finalizar siempre con el cierre del arreglo: `];`.

---

## 4. Resolución de Problemas Frecuentes (Troubleshooting)

### ❓ Problema 1: "Entro a la web y una sección de cantos (ej. Comunión) aparece completamente vacía"
* **Causa:** El último cambio que alguien subió a `cantos/comunion.js` tiene un error de sintaxis en JavaScript (falta una coma `,`, se borró un acento grave `` ` ``, o se eliminó la llave `}`).
* **Solución Rápida:**
  1. Entra a la web y abre el **Asistente para Agregar Cantos** > Pestaña **"Validador de Sintaxis"**.
  2. Pega el contenido del archivo `comunion.js` y presiona **"Comprobar Sintaxis"**; el validador te dirá exactamente qué línea o símbolo está fallando.
  3. Corrige el símbolo en GitHub y guarda el cambio.

### ❓ Problema 2: "¿Cómo deshacer (revertir) un cambio que rompió la página?"
Si alguien subió un cambio y no sabes cómo arreglarlo, puedes restaurar la versión anterior en GitHub en 3 pasos:
1. En GitHub, entra al archivo que se modificó (ej. `cantos/comunion.js`).
2. Haz clic en el botón **"History"** (arriba a la derecha del código).
3. Busca la versión anterior que funcionaba bien, haz clic en el commit y presiona los tres puntos `...` > **"Revert this commit"** (o copia el código anterior y pégalo de nuevo).

---

## 5. Gobernanza y Administración en GitHub

Cuando cambie la administración o se incorporen nuevos coordinadores:

### Cómo Invitar Nuevos Colaboradores a GitHub
1. Ingresa a [https://github.com/Bgalo/GVC](https://github.com/Bgalo/GVC) con la cuenta administradora.
2. Ve a la pestaña **Settings** (Configuración) > **Collaborators** (Colaboradores).
3. Haz clic en el botón verde **"Add people"** y escribe el usuario o correo del colaborador.
4. El colaborador recibirá una invitación por correo que debe aceptar para poder editar los archivos de cantos.

### Protección de la Rama Principal (`main`)
Para evitar que se borre accidentalmente el archivo principal `index.html`:
* En **Settings** > **Branches**, se puede activar una regla de protección sobre `main` para evitar eliminaciones forzadas (*Force Push* o *Delete Branch*).

---
*Documento mantenido con dedicación para la gloria de Dios y el servicio litúrgico del Ministerio Musical GVC.*
