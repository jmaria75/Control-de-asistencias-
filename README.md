# 🎓 Sistema de Control de Asistencia - Unidad Educativa Buena Fe

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## 📋 Descripción

Sistema web moderno y profesional para el control de asistencia estudiantil de la Unidad Educativa Buena Fe. Diseñado con tecnologías web estándar (HTML5, CSS3, JavaScript) para ofrecer una experiencia visual atractiva y funcional.

## ✨ Características Principales

### 🎨 Interfaz Visual Atractiva
- **Diseño moderno** con gradientes y animaciones suaves
- **Fondo animado** con partículas flotantes
- **Efectos visuales** en botones y tarjetas
- **Header llamativo** con logo animado en 3D
- **Notificaciones animadas** para feedback del usuario

### 📊 Funcionalidades
- ✅ Registro de asistencia de estudiantes
- ✅ Validación de nombres (solo letras y espacios)
- ✅ Estados de asistencia: Presente, Ausente, Tardanza, Justificado
- ✅ Estadísticas en tiempo real con barras de progreso
- ✅ Búsqueda y filtrado de registros
- ✅ Eliminación de registros con confirmación
- ✅ Exportación de datos a formato CSV
- ✅ Diseño 100% responsive (móviles, tablets, desktop)

### 📱 Responsive Design
- Adaptable a todos los dispositivos
- Optimizado para móviles y tablets
- Interfaz fluida y táctil

## 🚀 Instalación

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- No requiere servidor web ni base de datos

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
```bash
git clone https://github.com/tu-usuario/sistema-asistencia-buenafe.git
cd sistema-asistencia-buenafe
```

2. **Estructura de archivos**
```
📂 sistema-asistencia-buenafe/
  ├── 📄 index.html       # Estructura HTML principal
  ├── 📄 styles.css       # Estilos y diseño visual
  ├── 📄 script.js        # Lógica y funcionalidad
  └── 📄 README.md        # Documentación
```

3. **Abrir el sistema**
   - Simplemente abre el archivo `index.html` en tu navegador web
   - O arrastra el archivo al navegador
   - También puedes usar un servidor local como Live Server

## 📖 Manual de Uso

### 1️⃣ Registrar Asistencia

1. **Completar el formulario:**
   - Nombre completo del estudiante (solo letras)
   - Seleccionar grado o curso
   - Seleccionar estado de asistencia

2. **Hacer clic en "Agregar Asistencia"**
   - El registro aparecerá inmediatamente en la lista
   - Las estadísticas se actualizarán automáticamente

### 2️⃣ Buscar Estudiantes

- Usar la barra de búsqueda para filtrar por nombre o grado
- Los resultados se muestran en tiempo real

### 3️⃣ Eliminar Registros

- Hacer clic en el botón de eliminar (🗑️) junto al registro
- Confirmar la eliminación

### 4️⃣ Exportar Datos

- Hacer clic en el botón "Exportar CSV"
- El archivo se descargará con fecha y hora actual
- Compatible con Excel y Google Sheets

### 5️⃣ Limpiar Formulario

- Usar el botón "Limpiar" para resetear todos los campos

## 🎯 Validaciones Implementadas

- ✅ **Nombre:** Solo acepta letras y espacios (ñ, tildes permitidas)
- ✅ **Campos obligatorios:** Todos los campos deben completarse
- ✅ **Formato de datos:** Validación en tiempo real
- ✅ **Confirmación:** Alerta antes de eliminar registros

## 📊 Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|------------|---------|-----|
| HTML5 | 5 | Estructura semántica |
| CSS3 | 3 | Estilos y animaciones |
| JavaScript | ES6+ | Lógica de negocio |
| SVG | - | Iconos vectoriales |

## 🎨 Paleta de Colores

```css
--primary: #6366f1       /* Azul principal */
--success: #10b981       /* Verde éxito */
--danger: #ef4444        /* Rojo peligro */
--warning: #f59e0b       /* Naranja advertencia */
--info: #06b6d4          /* Cyan información */
```

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Dispositivos
- ✅ Desktop (1920px - 1024px)
- ✅ Tablet (1024px - 768px)
- ✅ Mobile (768px - 320px)

## 🔧 Personalización

### Cambiar Colores
Editar las variables CSS en `styles.css`:
```css
:root {
    --primary: #tu-color;
    --secondary: #tu-color;
}
```

### Modificar Grados
Editar el select en `index.html`:
```html
<option value="Tu Grado">Tu Grado</option>
```

### Ajustar Animaciones
Modificar los `@keyframes` en `styles.css`

## 📝 Funcionalidades Futuras (Roadmap)

- [ ] Integración con base de datos
- [ ] Sistema de autenticación
- [ ] Reportes en PDF
- [ ] Gráficos estadísticos
- [ ] Modo oscuro
- [ ] Multi-idioma
- [ ] Notificaciones push
- [ ] Historial de asistencias

## 🐛 Solución de Problemas

### El sistema no carga
- Verifica que los 3 archivos estén en la misma carpeta
- Asegúrate de que los nombres de archivo sean exactos
- Prueba en otro navegador

### Los estilos no se aplican
- Verifica que `styles.css` esté en la misma carpeta
- Revisa la consola del navegador (F12) para errores

### Las funciones no responden
- Verifica que `script.js` esté en la misma carpeta
- Abre la consola del navegador para ver errores

## 👥 Equipo de Desarrollo

### 🎯 Product Owner
**Julieta Núñez**
- Responsable de la visión del producto
- Gestión de requerimientos
- Priorización de funcionalidades

### 🏃 Scrum Master
**José María**
- Facilitador del proceso Scrum
- Gestión de sprints
- Resolución de impedimentos

### 💻 Desarrolladores
**Midori**
- Desarrollo frontend
- Diseño de interfaz
- Implementación de funcionalidades

**Lisbeth**
- Desarrollo frontend
- Lógica de negocio
- Testing y validaciones

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

**Unidad Educativa Buena Fe**
- 📧 Email: contacto@uebuenafe.edu.bo
- 🌐 Website: www.uebuenafe.edu.bo
- 📱 Teléfono: +591 60854563

## 🙏 Agradecimientos

- A la comunidad de desarrolladores por las mejores prácticas
- A los profesores y estudiantes de la U.E. Buena Fe
- A todos los que contribuyeron con ideas y feedback

---

**Desarrollado con ❤️ por el equipo de la Unidad Educativa Buena Fe**

*Última actualización: Octubre 2025*