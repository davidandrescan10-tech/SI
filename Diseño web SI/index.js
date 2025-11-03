
        let users = [
            { id: 1, username: 'admin', name: 'Administrador', role: 'admin', status: 'active' },
            { id: 2, username: 'tecnico1', name: 'Técnico 1', role: 'technician', status: 'active' },
            { id: 3, username: 'tecnico2', name: 'Técnico 2', role: 'technician', status: 'inactive' }
        ];

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

        let invoices = [
            { id: 'F001', clientId: 1, clientName: 'Juan Pérez', date: '2025-08-01', items: [
                { productId: 1, name: 'Pantalla LCD', quantity: 1, price: 150000 },
                { productId: 2, name: 'Batería', quantity: 1, price: 80000 }
            ], total: 230000, status: 'paid' },
            { id: 'F002', clientId: 2, clientName: 'María García', date: '2025-08-05', items: [
                { productId: 3, name: 'Cargador', quantity: 2, price: 35000 }
            ], total: 70000, status: 'pending' },
            { id: 'F003', clientId: 3, clientName: 'Carlos Rodríguez', date: '2025-08-10', items: [
                { productId: 4, name: 'Tapa Trasera', quantity: 1, price: 25000 },
                { productId: 5, name: 'Destornillador', quantity: 2, price: 15000 }
            ], total: 55000, status: 'paid' }
        ];

        let activityLog = [
            { date: '2025-08-12', user: 'Admin', action: 'Inició sesión', module: 'Autenticación' },
            { date: '2025-08-11', user: 'Técnico 1', action: 'Registró nueva compra', module: 'Compras' },
            { date: '2025-08-10', user: 'Admin', action: 'Creó nueva factura', module: 'Facturación' },
            { date: '2025-08-09', user: 'Técnico 2', action: 'Actualizó inventario', module: 'Inventario' }
        ];

        // Variables globales
        let invoiceItems = [];

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
            
            // Inicializar dashboard
            updateDashboard();
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
                case 'users':
                    renderUsersTable();
                    break;
                case 'clients':
                    renderClientsTable();
                    break;
                case 'purchases':
                    renderPurchasesTable();
                    break;
                case 'inventory':
                    renderInventoryTable();
                    break;
                case 'billing':
                    renderBillingTable();
                    break;
            }
        }

        // Funciones del Dashboard
        function updateDashboard() {
            // Actualizar tarjetas
            document.getElementById('clientsCount').textContent = clients.length;
            document.getElementById('productsCount').textContent = products.length;
            document.getElementById('purchasesCount').textContent = purchases.length;
            document.getElementById('invoicesCount').textContent = invoices.length;
            
            // Actualizar actividad reciente
            renderActivityLog();
        }

        function renderActivityLog() {
            const tbody = document.getElementById('recentActivity');
            tbody.innerHTML = '';
            
            // Tomar las últimas 5 actividades
            const recentActivities = activityLog.slice(0, 5);
            
            recentActivities.forEach(activity => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${activity.date}</td>
                    <td>${activity.user}</td>
                    <td>${activity.action}</td>
                    <td>${activity.module}</td>
                `;
                tbody.appendChild(row);
            });
        }

        // Funciones de módulos
        function renderUsersTable() {
            const tbody = document.getElementById('usersTable');
            tbody.innerHTML = '';
            
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.name}</td>
                    <td>${user.role === 'admin' ? 'Administrador' : 'Técnico'}</td>
                    <td>${user.status === 'active' ? 'Activo' : 'Inactivo'}</td>
                    <td>
                        <button class="btn btn-primary btn-sm edit-user" data-id="${user.id}">Editar</button>
                        <button class="btn btn-danger btn-sm delete-user" data-id="${user.id}">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
            
            // Agregar event listeners
            document.querySelectorAll('.edit-user').forEach(btn => {
                btn.addEventListener('click', function() {
                    const userId = parseInt(this.getAttribute('data-id'));
                    editUser(userId);
                });
            });
            
            document.querySelectorAll('.delete-user').forEach(btn => {
                btn.addEventListener('click', function() {
                    const userId = parseInt(this.getAttribute('data-id'));
                    deleteUser(userId);
                });
            });
        }

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
            
            // Agregar event listeners
            document.querySelectorAll('.edit-client').forEach(btn => {
                btn.addEventListener('click', function() {
                    const clientId = parseInt(this.getAttribute('data-id'));
                    editClient(clientId);
                });
            });
            
            document.querySelectorAll('.delete-client').forEach(btn => {
                btn.addEventListener('click', function() {
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
                    <td>$${purchase.total.toLocaleString()}</td>
                    <td>${getStatusText(purchase.status)}</td>
                    <td>
                        <button class="btn btn-primary btn-sm edit-purchase" data-id="${purchase.id}">Editar</button>
                        <button class="btn btn-danger btn-sm delete-purchase" data-id="${purchase.id}">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
            
            // Agregar event listeners
            document.querySelectorAll('.edit-purchase').forEach(btn => {
                btn.addEventListener('click', function() {
                    const purchaseId = parseInt(this.getAttribute('data-id'));
                    editPurchase(purchaseId);
                });
            });
            
            document.querySelectorAll('.delete-purchase').forEach(btn => {
                btn.addEventListener('click', function() {
                    const purchaseId = parseInt(this.getAttribute('data-id'));
                    deletePurchase(purchaseId);
                });
            });
        }

        function renderInventoryTable() {
            const tbody = document.getElementById('inventoryTable');
            tbody.innerHTML = '';
            
            products.forEach(product => {
                const stockStatus = product.stock <= product.minStock ? 'warning' : 'success';
                const statusText = product.stock <= product.minStock ? 'Stock Bajo' : 'Disponible';
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${getCategoryText(product.category)}</td>
                    <td>$${product.price.toLocaleString()}</td>
                    <td>${product.stock}</td>
                    <td><span class="badge badge-${stockStatus}">${statusText}</span></td>
                    <td>
                        <button class="btn btn-primary btn-sm edit-product" data-id="${product.id}">Editar</button>
                        <button class="btn btn-danger btn-sm delete-product" data-id="${product.id}">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
            
            // Agregar event listeners
            document.querySelectorAll('.edit-product').forEach(btn => {
                btn.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    editProduct(productId);
                });
            });
            
            document.querySelectorAll('.delete-product').forEach(btn => {
                btn.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    deleteProduct(productId);
                });
            });
        }

        function renderBillingTable() {
            const tbody = document.getElementById('billingTable');
            tbody.innerHTML = '';
            
            invoices.forEach(invoice => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${invoice.id}</td>
                    <td>${invoice.clientName}</td>
                    <td>${invoice.date}</td>
                    <td>$${invoice.total.toLocaleString()}</td>
                    <td>${getStatusText(invoice.status)}</td>
                    <td>
                        <button class="btn btn-primary btn-sm view-invoice" data-id="${invoice.id}">Ver</button>
                        <button class="btn btn-success btn-sm print-invoice" data-id="${invoice.id}">Imprimir</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
            
            // Agregar event listeners
            document.querySelectorAll('.view-invoice').forEach(btn => {
                btn.addEventListener('click', function() {
                    const invoiceId = this.getAttribute('data-id');
                    viewInvoice(invoiceId);
                });
            });
            
            document.querySelectorAll('.print-invoice').forEach(btn => {
                btn.addEventListener('click', function() {
                    const invoiceId = this.getAttribute('data-id');
                    printInvoice(invoiceId);
                });
            });
        }

        // Funciones de modales
        function setupModals() {
            // Configurar botones de cierre
            document.querySelectorAll('.close').forEach(closeBtn => {
                closeBtn.addEventListener('click', function() {
                    this.closest('.modal').style.display = 'none';
                });
            });
            
            // Configurar formularios
            document.getElementById('userForm').addEventListener('submit', saveUser);
            document.getElementById('clientForm').addEventListener('submit', saveClient);
            document.getElementById('purchaseForm').addEventListener('submit', savePurchase);
            document.getElementById('productForm').addEventListener('submit', saveProduct);
            document.getElementById('invoiceForm').addEventListener('submit', saveInvoice);
            
            // Configurar botones de agregar items a factura
            document.getElementById('addItemBtn').addEventListener('click', addInvoiceItem);
        }

        function setupMainButtons() {
            // Botones principales
            document.getElementById('newUserBtn').addEventListener('click', () => {
                document.getElementById('userModalTitle').textContent = 'Nuevo Usuario';
                document.getElementById('userForm').reset();
                document.getElementById('userModal').style.display = 'flex';
            });
            
            document.getElementById('newClientBtn').addEventListener('click', () => {
                document.getElementById('clientModalTitle').textContent = 'Nuevo Cliente';
                document.getElementById('clientForm').reset();
                document.getElementById('clientModal').style.display = 'flex';
            });
            
            document.getElementById('newPurchaseBtn').addEventListener('click', () => {
                document.getElementById('purchaseModalTitle').textContent = 'Nueva Compra';
                document.getElementById('purchaseForm').reset();
                document.getElementById('purchaseDate').value = new Date().toISOString().split('T')[0];
                document.getElementById('purchaseModal').style.display = 'flex';
            });
            
            document.getElementById('newProductBtn').addEventListener('click', () => {
                document.getElementById('productModalTitle').textContent = 'Nuevo Producto';
                document.getElementById('productForm').reset();
                document.getElementById('productModal').style.display = 'flex';
            });
            
            document.getElementById('newInvoiceBtn').addEventListener('click', () => {
                document.getElementById('invoiceModalTitle').textContent = 'Nueva Factura';
                document.getElementById('invoiceForm').reset();
                document.getElementById('invoiceDate').value = new Date().toISOString().split('T')[0];
                
                // Llenar select de clientes
                const clientSelect = document.getElementById('invoiceClient');
                clientSelect.innerHTML = '<option value="">Seleccione un cliente</option>';
                clients.forEach(client => {
                    const option = document.createElement('option');
                    option.value = client.id;
                    option.textContent = client.name;
                    clientSelect.appendChild(option);
                });
                
                // Llenar select de productos
                const productSelect = document.getElementById('addProduct');
                productSelect.innerHTML = '<option value="">Seleccione un producto</option>';
                products.forEach(product => {
                    const option = document.createElement('option');
                    option.value = product.id;
                    option.textContent = `${product.name} - $${product.price.toLocaleString()}`;
                    productSelect.appendChild(option);
                });
                
                // Resetear items de factura
                invoiceItems = [];
                renderInvoiceItems();
                
                document.getElementById('invoiceModal').style.display = 'flex';
            });
            
            // Botones de respaldo
            document.getElementById('backupNowBtn').addEventListener('click', () => {
                showNotification('Respaldo iniciado...', 'info');
                setTimeout(() => {
                    showNotification('Respaldo completado con éxito', 'success');
                    addBackupToHistory();
                }, 2000);
            });
            
            document.getElementById('saveBackupConfig').addEventListener('click', () => {
                showNotification('Configuración guardada correctamente', 'success');
            });
            
            // Botón de refrescar dashboard
            document.getElementById('refreshDashboard').addEventListener('click', updateDashboard);
            
            // Botones de búsqueda
            document.getElementById('searchUserBtn').addEventListener('click', () => {
                const searchTerm = document.getElementById('userSearch').value.toLowerCase();
                filterTable('usersTable', searchTerm);
            });
            
            document.getElementById('searchClientBtn').addEventListener('click', () => {
                const searchTerm = document.getElementById('clientSearch').value.toLowerCase();
                filterTable('clientsTable', searchTerm);
            });
            
            document.getElementById('searchPurchaseBtn').addEventListener('click', () => {
                const searchTerm = document.getElementById('purchaseSearch').value.toLowerCase();
                filterTable('purchasesTable', searchTerm);
            });
            
            document.getElementById('searchProductBtn').addEventListener('click', () => {
                const searchTerm = document.getElementById('productSearch').value.toLowerCase();
                filterTable('inventoryTable', searchTerm);
            });
            
            document.getElementById('searchInvoiceBtn').addEventListener('click', () => {
                const searchTerm = document.getElementById('invoiceSearch').value.toLowerCase();
                filterTable('billingTable', searchTerm);
            });
        }

        // Funciones de CRUD
        function saveUser(e) {
            e.preventDefault();
            
            const userId = document.getElementById('userId').value;
            const userData = {
                username: document.getElementById('userUsername').value,
                name: document.getElementById('userName').value,
                role: document.getElementById('userRole').value,
                status: document.getElementById('userStatus').value
            };
            
            if (userId) {
                // Actualizar usuario existente
                const index = users.findIndex(u => u.id === parseInt(userId));
                if (index !== -1) {
                    users[index] = { ...users[index], ...userData };
                    logActivity('Administrador', 'Actualizó usuario', 'Usuarios');
                }
            } else {
                // Agregar nuevo usuario
                const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
                users.push({ id: newId, ...userData });
                logActivity('Administrador', 'Registró nuevo usuario', 'Usuarios');
            }
            
            // Actualizar tabla y cerrar modal
            renderUsersTable();
            document.getElementById('userModal').style.display = 'none';
            showNotification('Usuario guardado correctamente', 'success');
        }

        function saveClient(e) {
            e.preventDefault();
            
            const clientId = document.getElementById('clientId').value;
            const clientData = {
                name: document.getElementById('clientName').value,
                phone: document.getElementById('clientPhone').value,
                email: document.getElementById('clientEmail').value,
                address: document.getElementById('clientAddress').value
            };
            
            if (clientId) {
                // Actualizar cliente existente
                const index = clients.findIndex(c => c.id === parseInt(clientId));
                if (index !== -1) {
                    clients[index] = { ...clients[index], ...clientData };
                    logActivity('Administrador', 'Actualizó cliente', 'Clientes');
                }
            } else {
                // Agregar nuevo cliente
                const newId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
                clients.push({ id: newId, ...clientData });
                logActivity('Administrador', 'Registró nuevo cliente', 'Clientes');
            }
            
            // Actualizar tabla y cerrar modal
            renderClientsTable();
            document.getElementById('clientModal').style.display = 'none';
            showNotification('Cliente guardado correctamente', 'success');
        }

        function savePurchase(e) {
            e.preventDefault();
            
            const purchaseId = document.getElementById('purchaseId').value;
            const purchaseData = {
                provider: document.getElementById('purchaseProvider').value,
                date: document.getElementById('purchaseDate').value,
                total: parseFloat(document.getElementById('purchaseTotal').value),
                status: document.getElementById('purchaseStatus').value
            };
            
            if (purchaseId) {
                // Actualizar compra existente
                const index = purchases.findIndex(p => p.id === parseInt(purchaseId));
                if (index !== -1) {
                    purchases[index] = { ...purchases[index], ...purchaseData };
                    logActivity('Administrador', 'Actualizó compra', 'Compras');
                }
            } else {
                // Agregar nueva compra
                const newId = purchases.length > 0 ? Math.max(...purchases.map(p => p.id)) + 1 : 1;
                purchases.push({ id: newId, ...purchaseData });
                logActivity('Administrador', 'Registró nueva compra', 'Compras');
            }
            
            // Actualizar tabla y cerrar modal
            renderPurchasesTable();
            document.getElementById('purchaseModal').style.display = 'none';
            showNotification('Compra guardada correctamente', 'success');
        }

        function saveProduct(e) {
            e.preventDefault();
            
            const productId = document.getElementById('productId').value;
            const productData = {
                name: document.getElementById('productName').value,
                category: document.getElementById('productCategory').value,
                price: parseFloat(document.getElementById('productPrice').value),
                stock: parseInt(document.getElementById('productStock').value),
                minStock: parseInt(document.getElementById('productMinStock').value)
            };
            
            if (productId) {
                // Actualizar producto existente
                const index = products.findIndex(p => p.id === parseInt(productId));
                if (index !== -1) {
                    products[index] = { ...products[index], ...productData };
                    logActivity('Administrador', 'Actualizó producto', 'Inventario');
                }
            } else {
                // Agregar nuevo producto
                const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
                products.push({ id: newId, ...productData });
                logActivity('Administrador', 'Registró nuevo producto', 'Inventario');
            }
            
            // Actualizar tabla y cerrar modal
            renderInventoryTable();
            document.getElementById('productModal').style.display = 'none';
            showNotification('Producto guardado correctamente', 'success');
        }

        function saveInvoice(e) {
            e.preventDefault();
            
            const invoiceId = document.getElementById('invoiceId').value;
            const clientId = parseInt(document.getElementById('invoiceClient').value);
            const client = clients.find(c => c.id === clientId);
            
            if (!client) {
                showNotification('Seleccione un cliente válido', 'error');
                return;
            }
            
            if (invoiceItems.length === 0) {
                showNotification('Agregue al menos un producto a la factura', 'error');
                return;
            }
            
            const invoiceData = {
                clientId: clientId,
                clientName: client.name,
                date: document.getElementById('invoiceDate').value,
                items: [...invoiceItems],
                total: invoiceItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                status: document.getElementById('invoiceStatus').value
            };
            
            if (invoiceId) {
                // Actualizar factura existente
                const index = invoices.findIndex(i => i.id === invoiceId);
                if (index !== -1) {
                    invoices[index] = { ...invoices[index], ...invoiceData };
                    logActivity('Administrador', 'Actualizó factura', 'Facturación');
                }
            } else {
                // Generar número de factura
                const lastInvoiceNumber = invoices.length > 0 
                    ? Math.max(...invoices.map(i => parseInt(i.id.substring(1)))) 
                    : 0;
                const newInvoiceNumber = `F${String(lastInvoiceNumber + 1).padStart(3, '0')}`;
                
                // Agregar nueva factura
                invoices.push({ id: newInvoiceNumber, ...invoiceData });
                logActivity('Administrador', 'Creó nueva factura', 'Facturación');
            }
            
            // Actualizar tabla y cerrar modal
            renderBillingTable();
            document.getElementById('invoiceModal').style.display = 'none';
            showNotification('Factura guardada correctamente', 'success');
        }

        // Funciones de edición y eliminación
        function editUser(userId) {
            const user = users.find(u => u.id === userId);
            if (user) {
                document.getElementById('userModalTitle').textContent = 'Editar Usuario';
                document.getElementById('userId').value = user.id;
                document.getElementById('userUsername').value = user.username;
                document.getElementById('userName').value = user.name;
                document.getElementById('userRole').value = user.role;
                document.getElementById('userStatus').value = user.status;
                document.getElementById('userModal').style.display = 'flex';
            }
        }

        function deleteUser(userId) {
            if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
                users = users.filter(u => u.id !== userId);
                renderUsersTable();
                showNotification('Usuario eliminado correctamente', 'success');
                logActivity('Administrador', 'Eliminó usuario', 'Usuarios');
            }
        }

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

        function deleteClient(clientId) {
            if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
                clients = clients.filter(c => c.id !== clientId);
                renderClientsTable();
                showNotification('Cliente eliminado correctamente', 'success');
                logActivity('Administrador', 'Eliminó cliente', 'Clientes');
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

        function deletePurchase(purchaseId) {
            if (confirm('¿Está seguro de que desea eliminar esta compra?')) {
                purchases = purchases.filter(p => p.id !== purchaseId);
                renderPurchasesTable();
                showNotification('Compra eliminada correctamente', 'success');
                logActivity('Administrador', 'Eliminó compra', 'Compras');
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

        function deleteProduct(productId) {
            if (confirm('¿Está seguro de que desea eliminar este producto?')) {
                products = products.filter(p => p.id !== productId);
                renderInventoryTable();
                showNotification('Producto eliminado correctamente', 'success');
                logActivity('Administrador', 'Eliminó producto', 'Inventario');
            }
        }

        function viewInvoice(invoiceId) {
            const invoice = invoices.find(i => i.id === invoiceId);
            if (invoice) {
                // Crear vista de factura
                let invoiceHTML = `
                    <div class="invoice-view">
                        <h2>Factura ${invoice.id}</h2>
                        <div class="invoice-header">
                            <div>
                                <p><strong>Cliente:</strong> ${invoice.clientName}</p>
                                <p><strong>Fecha:</strong> ${invoice.date}</p>
                            </div>
                            <div>
                                <p><strong>Estado:</strong> ${getStatusText(invoice.status)}</p>
                            </div>
                        </div>
                        <table class="invoice-items">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unitario</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                `;
                
                invoice.items.forEach(item => {
                    invoiceHTML += `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.quantity}</td>
                            <td>$${item.price.toLocaleString()}</td>
                            <td>$${(item.price * item.quantity).toLocaleString()}</td>
                        </tr>
                    `;
                });
                
                invoiceHTML += `
                            </tbody>
                        </table>
                        <div class="invoice-footer">
                            <p><strong>Total:</strong> $${invoice.total.toLocaleString()}</p>
                        </div>
                    </div>
                `;
                
                // Mostrar en un modal
                const invoiceViewModal = document.createElement('div');
                invoiceViewModal.className = 'modal';
                invoiceViewModal.innerHTML = `
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        ${invoiceHTML}
                        <button class="btn btn-primary" onclick="window.print()">Imprimir</button>
                    </div>
                `;
                
                document.body.appendChild(invoiceViewModal);
                invoiceViewModal.style.display = 'flex';
                
                // Cerrar modal
                invoiceViewModal.querySelector('.close').addEventListener('click', () => {
                    document.body.removeChild(invoiceViewModal);
                });
            }
        }

        function printInvoice(invoiceId) {
            const invoice = invoices.find(i => i.id === invoiceId);
            if (invoice) {
                // En un entorno real, esto generaría un PDF o abriría una ventana de impresión
                showNotification(`Imprimiendo factura ${invoice.id}`, 'info');
                console.log('Factura a imprimir:', invoice);
            }
        }

        // Funciones de facturación
        function addInvoiceItem() {
            const productId = parseInt(document.getElementById('addProduct').value);
            if (!productId) {
                showNotification('Seleccione un producto', 'error');
                return;
            }
            
            const product = products.find(p => p.id === productId);
            if (!product) {
                showNotification('Producto no encontrado', 'error');
                return;
            }
            
            // Verificar si el producto ya está en la factura
            const existingItem = invoiceItems.find(item => item.productId === productId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                invoiceItems.push({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1
                });
            }
            
            renderInvoiceItems();
            calculateInvoiceTotal();
            
            // Resetear select
            document.getElementById('addProduct').value = '';
        }

        function renderInvoiceItems() {
            const tbody = document.getElementById('invoiceItems');
            tbody.innerHTML = '';
            
            invoiceItems.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>$${item.price.toLocaleString()}</td>
                    <td>
                        <input type="number" min="1" value="${item.quantity}" class="form-control item-quantity" data-index="${index}">
                    </td>
                    <td>$${(item.price * item.quantity).toLocaleString()}</td>
                    <td>
                        <button type="button" class="btn btn-danger btn-sm remove-item" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
            
            // Agregar event listeners
            document.querySelectorAll('.item-quantity').forEach(input => {
                input.addEventListener('change', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    const quantity = parseInt(this.value);
                    if (quantity > 0) {
                        invoiceItems[index].quantity = quantity;
                        renderInvoiceItems();
                        calculateInvoiceTotal();
                    }
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    invoiceItems.splice(index, 1);
                    renderInvoiceItems();
                    calculateInvoiceTotal();
                });
            });
        }

        function calculateInvoiceTotal() {
            const total = invoiceItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            document.getElementById('invoiceTotal').textContent = total.toLocaleString();
        }

        // Funciones de utilidad
        function getStatusText(status) {
            const statusMap = {
                'active': 'Activo',
                'inactive': 'Inactivo',
                'pending': 'Pendiente',
                'completed': 'Completado',
                'cancelled': 'Cancelada',
                'paid': 'Pagada'
            };
            return statusMap[status] || status;
        }

        function getCategoryText(category) {
            const categoryMap = {
                'accesorio': 'Accesorio',
                'repuesto': 'Repuesto',
                'herramienta': 'Herramienta',
                'otro': 'Otro'
            };
            return categoryMap[category] || category;
        }

        function logActivity(user, action, module) {
            const date = new Date().toISOString().split('T')[0];
            activityLog.unshift({ date, user, action, module });
            
            // Mantener solo las últimas 20 actividades
            if (activityLog.length > 20) {
                activityLog = activityLog.slice(0, 20);
            }
            
            // Actualizar actividad reciente si estamos en el dashboard
            if (document.getElementById('dashboard').classList.contains('active')) {
                renderActivityLog();
            }
        }

        function showNotification(message, type = 'success') {
            const notification = document.getElementById('notification');
            const notificationText = document.getElementById('notificationText');
            
            // Configurar icono según el tipo
            let iconClass = 'fas fa-check-circle';
            if (type === 'error') iconClass = 'fas fa-exclamation-circle';
            if (type === 'warning') iconClass = 'fas fa-exclamation-triangle';
            if (type === 'info') iconClass = 'fas fa-info-circle';
            
            // Configurar notificación
            notification.className = `notification ${type}`;
            notification.innerHTML = `<i class="${iconClass}"></i> <span>${message}</span>`;
            
            // Mostrar notificación
            notification.classList.add('show');
            
            // Ocultar después de 3 segundos
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        function filterTable(tableId, searchTerm) {
            const table = document.getElementById(tableId);
            const rows = table.getElementsByTagName('tr');
            
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                const cells = row.getElementsByTagName('td');
                let found = false;
                
                for (let j = 0; j < cells.length; j++) {
                    if (cells[j].textContent.toLowerCase().includes(searchTerm)) {
                        found = true;
                        break;
                    }
                }
                
                row.style.display = found ? '' : 'none';
            }
        }

        function addBackupToHistory() {
            const tbody = document.getElementById('backupTable');
            const now = new Date();
            const date = now.toISOString().split('T')[0];
            const time = now.toTimeString().split(' ')[0];
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${date}</td>
                <td>${time}</td>
                <td>${(Math.random() * 10 + 20).toFixed(1)} MB</td>
                <td>Completado</td>
                <td>
                    <button class="btn btn-success btn-sm">Descargar</button>
                    <button class="btn btn-danger btn-sm">Eliminar</button>
                </td>
            `;
            
            tbody.insertBefore(row, tbody.firstChild);
            
            // Mantener solo los últimos 5 respaldos
            while (tbody.children.length > 5) {
                tbody.removeChild(tbody.lastChild);
            }
        }