📖 Manual de Usuario: Planificador Eucarístico GVC
Ministerio Musical: Guitarras y Voces para Cristo
Este documento explica cómo utilizar la plataforma web del ministerio para planificar los cantos de la Santa Eucaristía y cómo agregar nuevas canciones al repertorio en el futuro.
1. ¿Qué es el Planificador Eucarístico?
Es una herramienta web diseñada exclusivamente para el Ministerio GVC. Permite al coordinador de la misa armar el esquema de cantos rápidamente, registrar las lecturas del día y generar un documento PDF estructurado y listo para compartir o imprimir para los músicos y cantantes.
Enlace de acceso a la plataforma: (Aquí pegas el enlace final de tu GitHub Pages, ej. https://bgalo.github.io/GVC/ )
2. Guía de Uso Paso a Paso
Paso 1: Configuración General
Al ingresar a la página, lo primero que verás es la barra de configuración superior.
•	Fecha de la Misa: Selecciona el día exacto de la celebración.
•	Responsable: Escribe el nombre de la persona que coordina el ministerio ese día.
•	Tiempo Litúrgico: Selecciona el tiempo correspondiente (Ordinario, Adviento, Cuaresma, Pascua, etc.). Nota: Al cambiar esta opción, los colores de toda la página se adaptarán automáticamente al color litúrgico oficial (verde, morado, blanco/dorado o rojo).
Paso 2: Selección del Repertorio
La página está dividida en los momentos exactos de la Eucaristía (Ritos Iniciales, liturgia de la palabra, Liturgia Eucarística, Rito de Comunión y Conclusión).
•	Despliega el menú en cada tarjeta para elegir el canto adecuado.
•	Vista Previa: Una vez que selecciones un canto, aparecerá su tonalidad sugerida y un botón que dice "▼ Letra". Haz clic ahí para leer la estrofa y confirmar que es la versión correcta que el ministerio suele tocar.
•	Barra de Progreso: En la parte superior verás una barra que te indicará cuántos cantos has seleccionado (ej. 8 / 15).
Paso 3: Lecturas y Observaciones
•	Lecturas del Día: En la sección "liturgia de la palabra", encontrarás cuadros de texto para anotar las citas bíblicas correspondientes a la Primera Lectura, Salmo, Segunda Lectura y Evangelio.
•	Observaciones: Al final de la página, hay un espacio para anotar indicaciones especiales (ej. "Misa de aniversario", "Hoy solo tocan guitarras", intenciones, etc.).

Paso 4: Generar y Descargar el PDF
•	Una vez completado el esquema, ve al final de la página y haz clic en el botón grande "📄 Generar Hoja de Cantos (PDF)".
•	Importante: Si no has seleccionado ningún canto, el sistema mostrará una alerta de seguridad y no generará el documento.
•	El PDF se descargará automáticamente en tu dispositivo, incluyendo las letras completas, tonalidades y el color del tiempo litúrgico seleccionado.
3. Guía de Mantenimiento: ¿Cómo agregar nuevos cantos?
La plataforma está diseñada para que el repertorio crezca con el tiempo. Todas las letras y canciones viven en un único archivo llamado cantos.js. Para agregar, editar o corregir un canto, el coordinador debe seguir estos pasos:
Instrucciones de Actualización:
1.	Ingresa al repositorio del código en GitHub con la cuenta administradora: (Tu enlace de GitHub aquí).
2.	Haz clic en el archivo llamado cantos.js.
3.	Haz clic en el ícono del Lápiz ✏️ (arriba a la derecha del código) para habilitar la edición.
4.	Busca la sección (ej. "Entrada": [) donde quieres agregar la canción.
5.	Copia y pega la estructura de un canto existente y reemplaza los datos. La estructura estricta debe verse exactamente así:
JavaScript
    { titulo: "Nombre del Nuevo Canto", tono: "DoM",
      letra: `Escribe aquí la primera estrofa.
Recuerda respetar los saltos de línea.

Aquí va el coro.
Y así sucesivamente.` },

6.	Regla de oro: Cada canto debe estar separado por una coma , excepto el último de la lista. Las letras siempre deben estar encerradas entre los acentos graves (`) para que los saltos de línea funcionen.
7.	Una vez hecho el cambio, ve al final de la página de GitHub y presiona el botón verde "Commit changes" (Guardar cambios).
8.	¡Listo! Espera un minuto, entra a la plataforma web, recarga la página y el nuevo canto ya aparecerá en los menús desplegables.
