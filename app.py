import streamlit as st
import json
from fpdf import FPDF

# 1. CONFIGURACIÓN DE PÁGINA
st.set_page_config(
    page_title="Repertorio Eucarístico", 
    page_icon="🎵", 
    layout="centered"
)

# 2. INYECCIÓN DE ESTILOS CSS PERSONALIZADOS (Corregido para legibilidad)
estilos_css = """
<style>
    /* Ocultar elementos nativos de la interfaz de Streamlit */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    
    .block-container {
        padding-top: 2.5rem;
        padding-bottom: 2.5rem;
    }

    /* Diseño del Botón Principal de Descarga (Morado Litúrgico) */
    .stDownloadButton > button {
        background-color: #6A0DAD !important;
        color: white !important;
        border: none !important;
        border-radius: 8px !important;
        padding: 14px 28px !important;
        font-size: 16px !important;
        font-weight: bold !important;
        transition: all 0.3s ease !important;
        width: 100%;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    /* Efecto de interacción (Hover) */
    .stDownloadButton > button:hover {
        background-color: #4B0082 !important;
        color: #FFD700 !important;
        transform: scale(1.01);
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
    }

    /* Fondo claro forzado para los acordeones */
    [data-testid="stExpander"] {
        background-color: #F8F9FA !important;
        border: 1px solid #E0E0E0 !important;
        border-radius: 6px !important;
        margin-bottom: 15px !important;
    }
    
    /* Forzar que TODO el texto dentro del acordeón sea gris oscuro/negro */
    [data-testid="stExpander"] * {
        color: #2C3E50 !important;
    }

    /* Asegurar que los títulos se adapten al tema del usuario */
    h1, h2, h3 {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    
    .stSelectbox label {
        font-weight: 600;
    }
</style>
"""
st.markdown(estilos_css, unsafe_allow_html=True)

# 3. LÓGICA DE ALMACENAMIENTO (Carga optimizada de la base de datos)
@st.cache_data
def cargar_base_datos():
    try:
        with open('cantos.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        st.error("Error: No se encontró el archivo 'cantos.json' en este directorio.")
        return []

cantos_db = cargar_base_datos()

def filtrar_cantos_por_momento(momento_liturgico):
    return [canto["titulo"] for canto in cantos_db if canto["momento"] == momento_liturgico]

# 4. CLASE PERSONALIZADA PARA MAQUETACIÓN DEL PDF
class CantoralPDF(FPDF):
    def header(self):
        # Membrete superior del documento
        self.set_font("Helvetica", "B", 14)
        self.set_text_color(40, 40, 40)
        self.cell(0, 10, self.encode_lat("REPERTORIO PARA LA SANTA EUCARISTÍA"), 0, 1, "C")
        self.set_font("Helvetica", "I", 10)
        self.set_text_color(120, 120, 120)
        self.cell(0, 5, self.encode_lat("Ministerio de Música Parroquial"), 0, 1, "C")
        self.ln(10)
        
    def footer(self):
        # Pie de página con numeración estándar
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(160, 160, 160)
        self.cell(0, 10, f"Página {self.page_no()}", 0, 0, "C")

    def encode_lat(self, texto):
        # Transforma strings UTF-8 para renderizar acentos y eñes correctamente en fuentes nativas
        return texto.encode('latin-1', 'replace').decode('latin-1')

# 5. GENERACIÓN DEL ARCHIVO PDF EN MEMORIA
def compilar_pdf_repertorio(cantos_seleccionados, db):
    pdf = CantoralPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    
    for momento, titulo_seleccionado in cantos_seleccionados.items():
        # Extraer detalles completos del canto desde la base de datos
        info_canto = next((c for c in db if c["titulo"] == titulo_seleccionado), None)
        
        if info_canto:
            # Separador Estético del Momento Misa (Rojo/Vino Litúrgico)
            pdf.set_font("Helvetica", "B", 10)
            pdf.set_text_color(150, 25, 25)
            pdf.cell(0, 8, pdf.encode_lat(f"--- {momento.upper()} ---"), 0, 1, "L")
            
            # Título Oficial y Tonalidad Establecida
            pdf.set_font("Helvetica", "B", 12)
            pdf.set_text_color(20, 20, 20)
            linea_titulo = f"{info_canto['titulo']} [{info_canto['tono']}]"
            pdf.cell(0, 6, pdf.encode_lat(linea_titulo), 0, 1, "L")
            pdf.ln(2)
            
            # Cuerpo de Letras (Respeta saltos de línea de bloque)
            pdf.set_font("Helvetica", "", 10)
            pdf.set_text_color(60, 60, 60)
            pdf.multi_cell(0, 5, pdf.encode_lat(info_canto['letra']))
            pdf.ln(8) # Margen de separación inter-canto
            
    return pdf.output()

# 6. COMPONENTE INTERACTIVO DE SELECCIÓN Y VISTA PREVIA
def crear_selector_con_vista_previa(icono_etiqueta, momento_liturgico):
    """Genera un selectbox y un acordeón dinámico con la letra del canto seleccionado."""
    opciones = ["Seleccionar..."] + filtrar_cantos_por_momento(momento_liturgico)
    seleccionado = st.selectbox(icono_etiqueta, opciones, key=f"select_{momento_liturgico}")
    
    # Si el usuario selecciona una canción real, se despliega el acordeón de vista previa
    if seleccionado != "Seleccionar...":
        info_canto = next((c for c in cantos_db if c["titulo"] == seleccionado), None)
        if info_canto:
            with st.expander(f"👁️ Letra: {seleccionado}", expanded=False):
                st.markdown(f"**Tonalidad sugerida:** `{info_canto['tono']}`")
                st.text(info_canto['letra'])
    return seleccionado

# 7. DISEÑO DE LA INTERFAZ DE USUARIO (UI)
st.title("🎵 Planificador de Cantos Eucarísticos")
st.markdown("Arma el esquema litúrgico dominical y descarga las letras completas en PDF.")

st.divider()

# Estructura del formulario en dos bloques de columnas
col1, col2 = st.columns(2)
cantos_elegidos_usuario = {}

with col1:
    st.subheader("Ritos Iniciales y Palabra")
    cantos_elegidos_usuario["Entrada"] = crear_selector_con_vista_previa("🚶🏽 Entrada", "Entrada")
    cantos_elegidos_usuario["Señor ten piedad"] = crear_selector_con_vista_previa("🙏🏽 Señor ten piedad", "Señor ten piedad")
    cantos_elegidos_usuario["Gloria"] = crear_selector_con_vista_previa("✨ Gloria", "Gloria")

with col2:
    st.subheader("Liturgia Eucarística y Envío")
    cantos_elegidos_usuario["Ofertorio"] = crear_selector_con_vista_previa("🍞 Ofertorio", "Ofertorio")
    cantos_elegidos_usuario["Comunión"] = crear_selector_con_vista_previa("🍷 Comunión", "Comunión")
    cantos_elegidos_usuario["Salida"] = crear_selector_con_vista_previa("🚪 Salida", "Salida")

st.divider()

# Filtrar únicamente los momentos válidos
repertorio_final = {m: t for m, t in cantos_elegidos_usuario.items() if t != "Seleccionar..."}

# 8. PANEL DE CONTROL DE DESCARGAS Y EFECTOS
if repertorio_final:
    st.success("Repertorio estructurado correctamente. El documento de impresión está listo.")
    
    # Animación moderna en la esquina para notificar el estado listo
    st.toast("✨ Repertorio listo para exportar", icon="🎵")
    
    # Procesar archivo en binario
    datos_binarios_pdf = compilar_pdf_repertorio(repertorio_final, cantos_db)
    
    # Botón dinámico nativo de Streamlit con efecto visual al hacer clic
    descargar = st.download_button(
        label="📥 Descargar Hoja de Cantos (PDF)",
        data=bytes(datos_binarios_pdf),
        file_name="hoja_de_cantos_misa.pdf",
        mime="application/pdf",
        use_container_width=True
    )
    
    if descargar:
        st.balloons() # Dispara una celebración de globos al hacer clic en descargar
else:
    st.info("Para habilitar la descarga del PDF de la misa, selecciona los cantos correspondientes utilizando los menús desplegables.")
