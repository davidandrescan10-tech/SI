// Datos iniciales ejemplos
let clients = [
    { id: 1, name: 'Juan Pérez', phone: '3124567890', email: 'juan@example.com', address: 'Calle 123 #45-67' },
    { id: 2, name: 'María García', phone: '3159876543', email: 'maria@example.com', address: 'Carrera 89 #12-34' },
    { id: 3, name: 'Carlos Rodríguez', phone: '3201234567', email: 'carlos@example.com', address: 'Avenida 45 #67-89' }
];

let purchases = [
    { id: 1, provider: 'TechSupply', date: '2025-08-01', total: 1500000, status: 'completed' },
    { id: 2, provider: 'ElectroParts', date: '2025-08-05', total: 850000, status: 'pending' },
    { id: 3, provider: 'Componentes SA', date: '2025-08-10', total: 2200000, status: 'completed' }
];

let products = [
    { id: 1, name: 'Pantalla LCD', category: 'repuesto', price: 150000, stock: 15, minStock: 5 },
    { id: 2, name: 'Batería', category: 'repuesto', price: 80000, stock: 25, minStock: 10 },
    { id: 3, name: 'Cargador', category: 'accesorio', price: 35000, stock: 30, minStock: 15 },
    { id: 4, name: 'Tapa Trasera', category: 'repuesto', price: 25000, stock: 8, minStock: 5 },
    { id: 5, name: 'Destornillador', category: 'herramienta', price: 15000, stock: 12, minStock: 3 }
];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Navegación por pestañas
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
        });
    });
   
    // Modales
    setupModals();
   
    // Botones principales
    setupMainButtons();
   
    // Inicializar la tabla de clientes (porque es la pestaña activa)
    renderClientsTable();
});

// Funciones de navegación
function showTab(tabId) {
    // Ocultar todas las pestañas
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
   
    // Desactivar todas las pestañas de navegación
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
   
    // Mostrar la pestaña seleccionada
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`.nav-tab[data-tab="${tabId}"]`).classList.add('active');
   
    // Actualizar datos según la pestaña
    switch(tabId) {
        case 'clients':
            renderClientsTable();
            break;
        case 'purchases':
            renderPurchasesTable();
            break;
        case 'inventory':
            renderInventoryTable();
            break;
        // Para 'backup' no hay tabla que renderizar
    }
}

// Funciones de módulos
function renderClientsTable() {
    const tbody = document.getElementById('clientsTable');
    tbody.innerHTML = '';
   
    clients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.id}</td>
            <td>${client.name}</td>
            <td>${client.phone}</td>
            <td>${client.email}</td>
            <td>${client.address}</td>
            <td>
                <button class="btn btn-primary btn-sm edit-client" data-id="${client.id}">Editar</button>
                <button class="btn btn-danger btn-sm delete-client" data-id="${client.id}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
   
    // Agregar eventos a los botones de editar y eliminar
    document.querySelectorAll('.edit-client').forEach(button => {
        button.addEventListener('click', function() {
            const clientId = parseInt(this.getAttribute('data-id'));
            editClient(clientId);
        });
    });
   
    document.querySelectorAll('.delete-client').forEach(button => {
        button.addEventListener('click', function() {
            const clientId = parseInt(this.getAttribute('data-id'));
            deleteClient(clientId);
        });
    });
}

function renderPurchasesTable() {
    const tbody = document.getElementById('purchasesTable');
    tbody.innerHTML = '';
   
    purchases.forEach(purchase => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${purchase.id}</td>
            <td>${purchase.provider}</td>
            <td>${purchase.date}</td>
            <td>${purchase.total}</td>
            <td>${purchase.status === 'completed' ? 'Completada' : purchase.status === 'pending' ? 'Pendiente' : 'Cancelada'}</td>
            <td>
                <button class="btn btn-primary btn-sm edit-purchase" data-id="${purchase.id}">Editar</button>
                <button class="btn btn-danger btn-sm delete-purchase" data-id="${purchase.id}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
   
    // Agregar eventos a los botones de editar y eliminar
    document.querySelectorAll('.edit-purchase').forEach(button => {
        button.addEventListener('click', function() {
            const purchaseId = parseInt(this.getAttribute('data-id'));
            editPurchase(purchaseId);
        });
    });
   
    document.querySelectorAll('.delete-purchase').forEach(button => {
        button.addEventListener('click', function() {
            const purchaseId = parseInt(this.getAttribute('data-id'));
            deletePurchase(purchaseId);
        });
    });
}

function renderInventoryTable() {
    const tbody = document.getElementById('inventoryTable');
    tbody.innerHTML = '';
   
    products.forEach(product => {
        const row = document.createElement('tr');
        const stockStatus = product.stock <= product.minStock ? 'Bajo' : 'Normal';
        const statusClass = product.stock <= product.minStock ? 'warning' : 'success';
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td><span class="badge ${statusClass}">${stockStatus}</span></td>
            <td>
                <button class="btn btn-primary btn-sm edit-product" data-id="${product.id}">Editar</button>
                <button class="btn btn-danger btn-sm delete-product" data-id="${product.id}">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
   
    // Agregar eventos a los botones de editar y eliminar
    document.querySelectorAll('.edit-product').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            editProduct(productId);
        });
    });
   
    document.querySelectorAll('.delete-product').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            deleteProduct(productId);
        });
    });
}

// Funciones para modales
function setupModals() {
    // Modal de clientes
    const clientModal = document.getElementById('clientModal');
    const clientCloseBtn = clientModal.querySelector('.close');
    
    clientCloseBtn.addEventListener('click', function() {
        clientModal.style.display = 'none';
    });
    
    // Modal de compras
    const purchaseModal = document.getElementById('purchaseModal');
    const purchaseCloseBtn = purchaseModal.querySelector('.close');
    
    purchaseCloseBtn.addEventListener('click', function() {
        purchaseModal.style.display = 'none';
    });
    
    // Modal de productos
    const productModal = document.getElementById('productModal');
    const productCloseBtn = productModal.querySelector('.close');
    
    productCloseBtn.addEventListener('click', function() {
        productModal.style.display = 'none';
    });
    
    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === clientModal) {
            clientModal.style.display = 'none';
        }
        if (event.target === purchaseModal) {
            purchaseModal.style.display = 'none';
        }
        if (event.target === productModal) {
            productModal.style.display = 'none';
        }
    });
}

// Funciones para botones principales
function setupMainButtons() {
    // Botón nuevo cliente
    document.getElementById('newClientBtn').addEventListener('click', function() {
        document.getElementById('clientModalTitle').textContent = 'Nuevo Cliente';
        document.getElementById('clientForm').reset();
        document.getElementById('clientId').value = '';
        document.getElementById('clientModal').style.display = 'flex';
    });
    
    // Botón nueva compra
    document.getElementById('newPurchaseBtn').addEventListener('click', function() {
        document.getElementById('purchaseModalTitle').textContent = 'Nueva Compra';
        document.getElementById('purchaseForm').reset();
        document.getElementById('purchaseId').value = '';
        document.getElementById('purchaseModal').style.display = 'flex';
    });
    
    // Botón nuevo producto
    document.getElementById('newProductBtn').addEventListener('click', function() {
        document.getElementById('productModalTitle').textContent = 'Nuevo Producto';
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
        document.getElementById('productModal').style.display = 'flex';
    });
    
    // Botón stock bajo
    document.getElementById('lowStockBtn').addEventListener('click', function() {
        showNotification('Productos con stock bajo: ' + products.filter(p => p.stock <= p.minStock).length, 'warning');
    });
    
    // Botones de respaldo
    document.getElementById('backupNowBtn').addEventListener('click', function() {
        showNotification('Respaldo iniciado...', 'info');
        // Simular respaldo
        setTimeout(() => {
            showNotification('Respaldo completado con éxito', 'success');
        }, 2000);
    });
    
    document.getElementById('scheduleBackupBtn').addEventListener('click', function() {
        showNotification('Programación de respaldo no implementada', 'info');
    });
    
    document.getElementById('saveBackupConfig').addEventListener('click', function() {
        showNotification('Configuración guardada', 'success');
    });
    
    // Formularios
    document.getElementById('clientForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveClient();
    });
    
    document.getElementById('purchaseForm').addEventListener('submit', function(e) {
        e.preventDefault();
        savePurchase();
    });
    
    document.getElementById('productForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveProduct();
    });
}

// Funciones para guardar datos
function saveClient() {
    const clientId = document.getElementById('clientId').value;
    const clientData = {
        name: document.getElementById('clientName').value,
        phone: document.getElementById('clientPhone').value,
        email: document.getElementById('clientEmail').value,
        address: document.getElementById('clientAddress').value
    };
    
    if (clientId) {
        // Editar cliente existente
        const index = clients.findIndex(c => c.id == clientId);
        if (index !== -1) {
            clients[index] = { ...clients[index], ...clientData };
            showNotification('Cliente actualizado con éxito', 'success');
        }
    } else {
        // Nuevo cliente
        const newClient = {
            id: clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1,
            ...clientData
        };
        clients.push(newClient);
        showNotification('Cliente creado con éxito', 'success');
    }
    
    document.getElementById('clientModal').style.display = 'none';
    renderClientsTable();
}

function savePurchase() {
    const purchaseId = document.getElementById('purchaseId').value;
    const purchaseData = {
        provider: document.getElementById('purchaseProvider').value,
        date: document.getElementById('purchaseDate').value,
        total: parseFloat(document.getElementById('purchaseTotal').value),
        status: document.getElementById('purchaseStatus').value
    };
    
    if (purchaseId) {
        // Editar compra existente
        const index = purchases.findIndex(p => p.id == purchaseId);
        if (index !== -1) {
            purchases[index] = { ...purchases[index], ...purchaseData };
            showNotification('Compra actualizada con éxito', 'success');
        }
    } else {
        // Nueva compra
        const newPurchase = {
            id: purchases.length > 0 ? Math.max(...purchases.map(p => p.id)) + 1 : 1,
            ...purchaseData
        };
        purchases.push(newPurchase);
        showNotification('Compra creada con éxito', 'success');
    }
    
    document.getElementById('purchaseModal').style.display = 'none';
    renderPurchasesTable();
}

function saveProduct() {
    const productId = document.getElementById('productId').value;
    const productData = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value),
        minStock: parseInt(document.getElementById('productMinStock').value) || 0
    };
    
    if (productId) {
        // Editar producto existente
        const index = products.findIndex(p => p.id == productId);
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
            showNotification('Producto actualizado con éxito', 'success');
        }
    } else {
        // Nuevo producto
        const newProduct = {
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
            ...productData
        };
        products.push(newProduct);
        showNotification('Producto creado con éxito', 'success');
    }
    
    document.getElementById('productModal').style.display = 'none';
    renderInventoryTable();
}

// Funciones para editar
function editClient(clientId) {
    const client = clients.find(c => c.id === clientId);
    if (client) {
        document.getElementById('clientModalTitle').textContent = 'Editar Cliente';
        document.getElementById('clientId').value = client.id;
        document.getElementById('clientName').value = client.name;
        document.getElementById('clientPhone').value = client.phone;
        document.getElementById('clientEmail').value = client.email;
        document.getElementById('clientAddress').value = client.address;
        document.getElementById('clientModal').style.display = 'flex';
    }
}

function editPurchase(purchaseId) {
    const purchase = purchases.find(p => p.id === purchaseId);
    if (purchase) {
        document.getElementById('purchaseModalTitle').textContent = 'Editar Compra';
        document.getElementById('purchaseId').value = purchase.id;
        document.getElementById('purchaseProvider').value = purchase.provider;
        document.getElementById('purchaseDate').value = purchase.date;
        document.getElementById('purchaseTotal').value = purchase.total;
        document.getElementById('purchaseStatus').value = purchase.status;
        document.getElementById('purchaseModal').style.display = 'flex';
    }
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('productModalTitle').textContent = 'Editar Producto';
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productMinStock').value = product.minStock;
        document.getElementById('productModal').style.display = 'flex';
    }
}

// Funciones para eliminar
function deleteClient(clientId) {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
        clients = clients.filter(c => c.id !== clientId);
        showNotification('Cliente eliminado con éxito', 'success');
        renderClientsTable();
    }
}

function deletePurchase(purchaseId) {
    if (confirm('¿Está seguro de eliminar esta compra?')) {
        purchases = purchases.filter(p => p.id !== purchaseId);
        showNotification('Compra eliminada con éxito', 'success');
        renderPurchasesTable();
    }
}

function deleteProduct(productId) {
    if (confirm('¿Está seguro de eliminar este producto?')) {
        products = products.filter(p => p.id !== productId);
        showNotification('Producto eliminado con éxito', 'success');
        renderInventoryTable();
    }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    // Limpiar clases previas
    notification.className = 'notification';
    notification.classList.add(type);
    
    notificationText.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}