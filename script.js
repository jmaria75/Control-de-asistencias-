// ==========================================
//  SISTEMA DE ASISTENCIA - JAVASCRIPT
//  Unidad Educativa Buena Fe
// ==========================================

// Variables globales
let attendanceData = [];
let filteredData = [];

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    displayCurrentDate();
    loadFromStorage();
    renderAttendanceList();
    updateStatistics();
    document.getElementById('studentName').focus();
}

function setupEventListeners() {
    document.getElementById('studentForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('studentName').addEventListener('input', validateNameInput);
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    document.getElementById('clearBtn').addEventListener('click', clearForm);
    document.getElementById('exportBtn').addEventListener('click', exportToCSV);
}

// ==========================================
// FECHA ACTUAL
// ==========================================
function displayCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const today = new Date();
    dateElement.textContent = today.toLocaleDateString('es-ES', options);
}

// ==========================================
// VALIDACIÓN DE NOMBRE
// ==========================================
function validateNameInput(e) {
    const input = e.target;
    const value = input.value;
    const errorElement = document.getElementById('nameError');
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    
    if (value && !regex.test(value)) {
        errorElement.textContent = '⚠️ Solo se permiten letras y espacios';
        input.style.borderColor = 'var(--danger)';
        input.style.background = 'rgba(239, 68, 68, 0.05)';
    } else {
        errorElement.textContent = '';
        input.style.borderColor = 'var(--border)';
        input.style.background = 'var(--light)';
    }
}

function isValidName(name) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(name);
}

// ==========================================
// AGREGAR ASISTENCIA
// ==========================================
function handleFormSubmit(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('studentName');
    const gradeInput = document.getElementById('studentGrade');
    const statusInput = document.getElementById('attendanceStatus');
    const errorElement = document.getElementById('nameError');
    
    const name = nameInput.value.trim();
    const grade = gradeInput.value;
    const status = statusInput.value;
    
    // Validaciones
    if (!name || !grade || !status) {
        showNotification('Por favor complete todos los campos', 'error');
        return;
    }
    
    if (!isValidName(name)) {
        errorElement.textContent = '⚠️ El nombre solo debe contener letras y espacios';
        nameInput.focus();
        return;
    }
    
    // Limpiar errores
    errorElement.textContent = '';
    
    // Crear objeto de asistencia
    const attendance = {
        id: Date.now(),
        name: name,
        grade: grade,
        status: status,
        time: new Date().toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        }),
        date: new Date().toLocaleDateString('es-ES')
    };
    
    // Agregar al array
    attendanceData.unshift(attendance);
    
    // Guardar en memoria
    saveToStorage();
    
    // Actualizar UI
    renderAttendanceList();
    updateStatistics();
    
    // Limpiar formulario
    document.getElementById('studentForm').reset();
    nameInput.focus();
    
    // Notificación de éxito
    showNotification('✓ Asistencia registrada correctamente', 'success');
}

// ==========================================
// RENDERIZAR LISTA
// ==========================================
function renderAttendanceList(filter = '') {
    const listContainer = document.getElementById('attendanceList');
    
    // Filtrar datos
    filteredData = attendanceData.filter(item => 
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.grade.toLowerCase().includes(filter.toLowerCase())
    );
    
    // Si no hay datos
    if (filteredData.length === 0) {
        listContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                </div>
                <h3>${filter ? 'Sin resultados' : 'Sin Registros'}</h3>
                <p>${filter ? 'No se encontraron coincidencias' : 'No hay asistencias registradas todavía'}</p>
                <small>${filter ? 'Intente con otro término de búsqueda' : 'Comience agregando estudiantes con el formulario'}</small>
            </div>
        `;
        return;
    }
    
    // Renderizar items
    listContainer.innerHTML = filteredData.map(item => `
        <div class="attendance-item" data-id="${item.id}">
            <div class="student-info">
                <h3>${item.name}</h3>
                <p>${item.grade} • ${item.time}</p>
            </div>
            <div class="attendance-details">
                <span class="status-badge status-${item.status.toLowerCase()}">${item.status}</span>
                <button class="btn-delete" onclick="deleteAttendance(${item.id})" title="Eliminar registro">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
}

// ==========================================
// ELIMINAR ASISTENCIA
// ==========================================
function deleteAttendance(id) {
    const item = attendanceData.find(a => a.id === id);
    
    if (!item) return;
    
    if (confirm(`¿Está seguro de eliminar el registro de ${item.name}?`)) {
        attendanceData = attendanceData.filter(a => a.id !== id);
        saveToStorage();
        renderAttendanceList();
        updateStatistics();
        showNotification('✓ Registro eliminado', 'success');
    }
}

// ==========================================
// ACTUALIZAR ESTADÍSTICAS
// ==========================================
function updateStatistics() {
    const total = attendanceData.length;
    const present = attendanceData.filter(item => item.status === 'Presente').length;
    const absent = attendanceData.filter(item => item.status === 'Ausente').length;
    const late = attendanceData.filter(item => item.status === 'Tardanza').length;
    const justified = attendanceData.filter(item => item.status === 'Justificado').length;
    
    // Actualizar números
    document.getElementById('presentCount').textContent = present;
    document.getElementById('absentCount').textContent = absent;
    document.getElementById('lateCount').textContent = late;
    document.getElementById('justifiedCount').textContent = justified;
    
    // Actualizar barras de progreso
    const presentPercent = total > 0 ? (present / total) * 100 : 0;
    const absentPercent = total > 0 ? (absent / total) * 100 : 0;
    const latePercent = total > 0 ? (late / total) * 100 : 0;
    const justifiedPercent = total > 0 ? (justified / total) * 100 : 0;
    
    setTimeout(() => {
        document.getElementById('presentBar').style.width = `${presentPercent}%`;
        document.getElementById('absentBar').style.width = `${absentPercent}%`;
        document.getElementById('lateBar').style.width = `${latePercent}%`;
        document.getElementById('justifiedBar').style.width = `${justifiedPercent}%`;
    }, 100);
}

// ==========================================
// BÚSQUEDA
// ==========================================
function handleSearch(e) {
    const searchTerm = e.target.value;
    renderAttendanceList(searchTerm);
}

// ==========================================
// LIMPIAR FORMULARIO
// ==========================================
function clearForm() {
    document.getElementById('studentForm').reset();
    document.getElementById('nameError').textContent = '';
    const nameInput = document.getElementById('studentName');
    nameInput.style.borderColor = 'var(--border)';
    nameInput.style.background = 'var(--light)';
    nameInput.focus();
    showNotification('Formulario limpiado', 'info');
}

// ==========================================
// EXPORTAR A CSV
// ==========================================
function exportToCSV() {
    if (attendanceData.length === 0) {
        showNotification('⚠️ No hay datos para exportar', 'error');
        return;
    }
    
    const today = new Date();
    const dateStr = today.toLocaleDateString('es-ES').replace(/\//g, '-');
    const timeStr = today.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
    }).replace(/:/g, '-');
    
    // Crear contenido CSV
    let csvContent = '\uFEFF'; // BOM para UTF-8
    csvContent += 'Nombre,Grado,Estado,Hora,Fecha\n';
    
    attendanceData.forEach(item => {
        csvContent += `"${item.name}","${item.grade}","${item.status}","${item.time}","${item.date}"\n`;
    });
    
    // Crear y descargar archivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `Asistencia_UE_BuenaFe_${dateStr}_${timeStr}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('✓ Archivo CSV descargado exitosamente', 'success');
}

// ==========================================
// ALMACENAMIENTO LOCAL (MEMORIA)
// ==========================================
function saveToStorage() {
    // Guardar en memoria durante la sesión
    // NO usa localStorage como se indicó
}

function loadFromStorage() {
    // Cargar desde memoria si existe
    // NO usa localStorage como se indicó
}

// ==========================================
// NOTIFICACIONES
// ==========================================
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos inline para la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '12px',
        color: 'white',
        fontWeight: '600',
        fontSize: '14px',
        zIndex: '10000',
        animation: 'slideInRight 0.4s ease-out',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
    });
    
    // Colores según tipo
    const colors = {
        success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        info: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    // Agregar al body
    document.body.appendChild(notification);
    
    // Animación de entrada
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 3000);
}

// ==========================================
// FUNCIONES GLOBALES
// ==========================================
window.deleteAttendance = deleteAttendance;