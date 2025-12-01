# Mini-Proyecto de Evaluación – Estadística y Probabilidad

Este proyecto es una aplicación web desarrollada en **Angular** diseñada para realizar análisis estadísticos descriptivos e inferenciales sobre bases de datos reales. La herramienta permite cargar datasets (CSV), clasificar variables, visualizar distribuciones y aplicar transformaciones estadísticas.

---

## 📋 Tabla de Contenidos
1. [Descripción General](#descripción-general)
2. [Cumplimiento de Requerimientos (PDF)](#-cumplimiento-de-requerimientos)
3. [Datasets Incluidos](#-datasets-utilizados)
4. [Funcionalidades Principales](#-funcionalidades-del-sistema)
5. [Tecnologías Utilizadas](#-tecnologías)
6. [Ejecución y Despliegue](#-ejecución-y-despliegue)

---

## Descripción General
El objetivo de este software es demostrar la comprensión de conceptos estadísticos clave: diferencias entre variables discretas y continuas, comportamiento normal (Campana de Gauss), tipificación Z y normalización de datos mediante transformaciones matemáticas.

---

## ✅ Cumplimiento de Requerimientos

Este proyecto cubre la totalidad de los puntos solicitados en la guía de evaluación:

| Punto PDF | Requerimiento | Implementación en el Proyecto |
|-----------|---------------|-------------------------------|
| **1. Obj** | Comprensión de conceptos | Se implementaron módulos separados para análisis discreto, continuo, Z y transformaciones. |
| **2. Datos** | Base de datos real (>500 reg) | Integración con **Kaggle** y **Datos Abiertos Colombia**. Soporte para carga de archivos CSV propios. |
| **3. Vars** | Selección de variables | Interfaz para seleccionar dinámicamente 1 variable Continua y 1 Discreta desde los encabezados del CSV. |
| **4. Discreta** | Tabla y Gráfico de Barras | Generación automática de tabla de frecuencias y diagrama de barras ordenado lógicamente (Eje X). |
| **5. Continua** | Estadísticos e Histograma | Cálculo de Media, Mediana, Moda, Desv. Estándar. Histograma con **intervalos dinámicos** y detección de normalidad. |
| **6. Z** | Tipificación (Z-Score) | Calculadora interactiva que permite ingresar valores ($x$) e interpreta qué tan lejos están de la media ($\mu$). |
| **7. Transf** | Si NO es normal: Transformar | Módulo de transformaciones (Logaritmo y Raíz Cuadrada) con comparación visual "Antes vs. Después". |

---

## 📂 Datasets Utilizados

El sistema incluye 3 bases de datos precargadas para probar diferentes escenarios estadísticos:

1.  **Estaturas Reales (Kaggle):**
    *   *Uso:* Demostración de **Distribución Normal perfecta**.
    *   *Variable Continua:* `Estatura_cm` (Campana de Gauss natural).
    *   *Variable Discreta:* `Grupo_Sanguineo`.

2.  **Finca Raíz Colombia (Kaggle):**
    *   *Uso:* Demostración de **Sesgo Positivo** y necesidad de **Transformaciones**.
    *   *Variable Continua:* `Precio_Millones` (Requiere Logaritmo para normalizarse).
    *   *Variable Discreta:* `Estrato` o `Habitaciones`.

3.  **Baloto Colombia:**
    *   *Uso:* Análisis de variables Discretas y Distribución Uniforme.
    *   *Variable Discreta:* `SuperBalota`.

---

## 🚀 Funcionalidades del Sistema

### 1. Carga y Procesamiento de Datos
*   Lectura de archivos CSV mediante `PapaParse`.
*   Detección automática de encabezados.
*   Capacidad de cambiar entre datasets con un solo clic.

### 2. Análisis Variable Discreta
*   **Tabla de Frecuencias:** Muestra categoría y conteo absoluto.
*   **Gráfico de Barras:** Implementado con `Chart.js`.
*   **Ordenamiento Inteligente:** El gráfico ordena el eje X numéricamente (1, 2, 3...) o alfabéticamente (A, B, C...) para facilitar la lectura.

### 3. Análisis Variable Continua (Avanzado)
*   **KPIs Estadísticos:** Cálculo automático de Tendencia Central y Dispersión.
*   **Conclusión Automática:** El sistema compara Media vs. Mediana y sugiere si la distribución es simétrica o sesgada.
*   **Histograma Interactivo:**
    *   Permite modificar el **número de intervalos (bins)** en tiempo real.
    *   **Limpieza de Datos (IQR):** Incluye un filtro avanzado para eliminar valores atípicos (Outliers) basado en el Rango Intercuartílico, permitiendo ver la distribución central limpia.

### 4. Tipificación Z
*   Calculadora que aplica la fórmula: $Z = \frac{x - \mu}{\sigma}$
*   Interpretación textual automática (ej: "El valor es un Outlier extremo").

### 5. Transformaciones de Datos
*   Aplicación de **Logaritmo Natural ($ln$)** y **Raíz Cuadrada ($\sqrt{x}$)**.
*   Visualización simultánea de la distribución Original vs. Transformada para validar la normalización.

---

## 🛠 Tecnologías

*   **Framework:** Angular 18 (Standalone Components, Signals).
*   **UI/UX:** Angular Material (Diseño limpio, Modo Claro, Responsive).
*   **Gráficos:** Chart.js / ng2-charts.
*   **Procesamiento CSV:** PapaParse.
*   **Matemáticas:** Servicios propios en TypeScript.

---

## 💻 Ejecución y Despliegue

### 🌐 Versión Online (GitHub Pages)
El proyecto se encuentra desplegado y listo para utilizar sin necesidad de instalación. Puedes acceder a través del siguiente enlace:

👉 **[Ver Aplicación en Vivo](https://crisgo0510.github.io/distribucion-discreta-continua/upload)**

### 🏠 Ejecución Local (Opcional)
Si se desea ejecutar el código fuente en un entorno local:

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```
2.  **Iniciar servidor de desarrollo:**
    ```bash
    ng serve
    ```
3.  **Abrir navegador:**
    Ir a `http://localhost:4200/`
