(function () {
    const STORAGE_KEY = 'purchases_v1';

    // Elementos
    const newPurchaseBtn = document.getElementById('newPurchaseBtn');
    const purchaseModal = document.getElementById('purchaseModal');
    const purchaseForm = document.getElementById('purchaseForm');
    const purchaseSearch = document.getElementById('purchaseSearch');
    const searchPurchaseBtn = document.getElementById('searchPurchaseBtn');
    const tableEl = document.querySelector('.table-container table');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');

    let purchases = [];

    // Inicializar
    function init() {
        loadPurchases();
        renderTable(purchases);
        bindEvents();
    }

    function bindEvents() {
        if (newPurchaseBtn) newPurchaseBtn.addEventListener('click', () => openModal());
        if (purchaseForm) purchaseForm.addEventListener('submit', onSavePurchase);
        if (searchPurchaseBtn) searchPurchaseBtn.addEventListener('click', onSearch);
        if (purchaseSearch) purchaseSearch.addEventListener('input', onSearch);
        // Cerrar modal con botones .close dentro del modal
        purchaseModal.querySelectorAll('.close').forEach(btn => btn.addEventListener('click', closeModal));
        // Cerrar modal con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    // LocalStorage
    function loadPurchases() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            purchases = raw ? JSON.parse(raw) : [];
        } catch (err) {
            purchases = [];
            console.error('Error cargando compras:', err);
        }
    }

    function savePurchases() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(purchases));
    }

    // Modal
    function openModal(purchase = null) {
        // Si se pasa una compra, cargamos para editar
        if (purchase) {
            purchaseForm.purchaseId.value = purchase.id;
            purchaseForm.purchaseProvider.value = purchase.provider;
            purchaseForm.purchaseDate.value = purchase.date;
            purchaseForm.purchaseTotal.value = purchase.total;
            purchaseForm.purchaseStatus.value = purchase.status;
            purchaseModal.setAttribute('aria-hidden', 'false');
        } else {
            purchaseForm.reset();
            purchaseForm.purchaseId.value = '';
            purchaseModal.setAttribute('aria-hidden', 'false');
        }
        purchaseModal.style.display = 'block';
        // foco en primer campo
        const first = purchaseForm.querySelector('input, select, textarea');
        if (first) first.focus();
    }

    function closeModal() {
        purchaseModal.style.display = 'none';
        purchaseModal.setAttribute('aria-hidden', 'true');
    }

    // Guardar compra (crear o actualizar)
    function onSavePurchase(e) {
        e.preventDefault();
        const id = purchaseForm.purchaseId.value;
        const provider = purchaseForm.purchaseProvider.value.trim();
        const date = purchaseForm.purchaseDate.value;
        const total = parseFloat(purchaseForm.purchaseTotal.value) || 0;
        const status = purchaseForm.purchaseStatus.value;

        if (!provider || !date) {
            showNotification('Proveedor y fecha son obligatorios', true);
            return;
        }

        if (id) {
            // editar
            const idx = purchases.findIndex(p => String(p.id) === String(id));
            if (idx !== -1) {
                purchases[idx] = { ...purchases[idx], provider, date, total, status };
                showNotification('Compra actualizada correctamente');
            }
        } else {
            // crear
            const newPurchase = {
                id: Date.now().toString(),
                provider,
                date,
                total,
                status
            };
            purchases.unshift(newPurchase);
            showNotification('Compra guardada correctamente');
        }

        savePurchases();
        renderTable(purchases);
        closeModal();
    }

    // Render tabla
    function renderTable(data) {
        // preparar thead y tbody
        tableEl.innerHTML = '';
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Proveedor</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>`;
        tableEl.appendChild(thead);

        const tbody = document.createElement('tbody');
        if (!data.length) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="6" style="text-align:center; padding:16px">No hay compras</td>`;
            tbody.appendChild(tr);
        } else {
            data.forEach(p => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${p.id}</td>
                    <td>${escapeHtml(p.provider)}</td>
                    <td>${p.date}</td>
                    <td>${Number(p.total).toFixed(2)}</td>
                    <td>${capitalize(p.status)}</td>
                    <td>
                        <button class="btn-edit" data-id="${p.id}" title="Editar">Editar</button>
                        <button class="btn-delete" data-id="${p.id}" title="Eliminar">Eliminar</button>
                    </td>`;
                tbody.appendChild(tr);
            });
        }
        tableEl.appendChild(tbody);

        // Delegación de eventos para botones editar/eliminar
        tableEl.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const item = purchases.find(x => String(x.id) === String(id));
                if (item) openModal(item);
            });
        });
        tableEl.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                onDeletePurchase(id);
            });
        });
    }

    function onDeletePurchase(id) {
        if (!confirm('¿Eliminar esta compra?')) return;
        purchases = purchases.filter(p => String(p.id) !== String(id));
        savePurchases();
        renderTable(purchases);
        showNotification('Compra eliminada');
    }

    // Buscar
    function onSearch() {
        const q = (purchaseSearch.value || '').toLowerCase().trim();
        if (!q) {
            renderTable(purchases);
            return;
        }
        const filtered = purchases.filter(p => {
            return (
                String(p.provider || '').toLowerCase().includes(q) ||
                String(p.date || '').toLowerCase().includes(q) ||
                String(p.status || '').toLowerCase().includes(q) ||
                String(p.total || '').toLowerCase().includes(q) ||
                String(p.id || '').toLowerCase().includes(q)
            );
        });
        renderTable(filtered);
    }

    // Notificación simple
    let notifTimer = null;
    function showNotification(text, isError = false) {
        if (!notification) return;
        notificationText.textContent = text;
        notification.style.display = 'flex';
        notification.style.background = isError ? '#f8d7da' : '#d1e7dd';
        notification.style.color = isError ? '#842029' : '#0f5132';
        if (notifTimer) clearTimeout(notifTimer);
        notifTimer = setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    // Utilidades
    function escapeHtml(str) {
        return String(str || '').replace(/[&<>"']/g, function (m) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
        });
    }

    function capitalize(s) {
        if (!s) return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    // Inicializar al cargar DOM
    document.addEventListener('DOMContentLoaded', init);
})();



(function () {
    const STORAGE_KEY = 'purchases_v1';

    // Elementos
    const newPurchaseBtn = document.getElementById('newPurchaseBtn');
    const purchaseModal = document.getElementById('purchaseModal');
    const purchaseForm = document.getElementById('purchaseForm');
    const purchaseSearch = document.getElementById('purchaseSearch');
    const searchPurchaseBtn = document.getElementById('searchPurchaseBtn');
    const tableEl = document.querySelector('.table-container table');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');

    let purchases = [];

    // Inicializar
    function init() {
        loadPurchases();
        renderTable(purchases);
        bindEvents();
    }

    function bindEvents() {
        if (newPurchaseBtn) newPurchaseBtn.addEventListener('click', () => openModal());
        if (purchaseForm) purchaseForm.addEventListener('submit', onSavePurchase);
        if (searchPurchaseBtn) searchPurchaseBtn.addEventListener('click', onSearch);
        if (purchaseSearch) purchaseSearch.addEventListener('input', onSearch);
        // Cerrar modal con botones .close dentro del modal
        purchaseModal.querySelectorAll('.close').forEach(btn => btn.addEventListener('click', closeModal));
        // Cerrar modal con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    // LocalStorage
    function loadPurchases() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            purchases = raw ? JSON.parse(raw) : [];
        } catch (err) {
            purchases = [];
            console.error('Error cargando compras:', err);
        }
    }

    function savePurchases() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(purchases));
    }

    // Modal
    function openModal(purchase = null) {
        // Si se pasa una compra, cargamos para editar
        if (purchase) {
            purchaseForm.purchaseId.value = purchase.id;
            purchaseForm.purchaseProvider.value = purchase.provider;
            purchaseForm.purchaseDate.value = purchase.date;
            purchaseForm.purchaseTotal.value = purchase.total;
            purchaseForm.purchaseStatus.value = purchase.status;
            purchaseModal.setAttribute('aria-hidden', 'false');
        } else {
            purchaseForm.reset();
            purchaseForm.purchaseId.value = '';
            purchaseModal.setAttribute('aria-hidden', 'false');
        }
        purchaseModal.style.display = 'block';
        // foco en primer campo
        const first = purchaseForm.querySelector('input, select, textarea');
        if (first) first.focus();
    }

    function closeModal() {
        purchaseModal.style.display = 'none';
        purchaseModal.setAttribute('aria-hidden', 'true');
    }

    // Guardar compra (crear o actualizar)
    function onSavePurchase(e) {
        e.preventDefault();
        const id = purchaseForm.purchaseId.value;
        const provider = purchaseForm.purchaseProvider.value.trim();
        const date = purchaseForm.purchaseDate.value;
        const total = parseFloat(purchaseForm.purchaseTotal.value) || 0;
        const status = purchaseForm.purchaseStatus.value;

        if (!provider || !date) {
            showNotification('Proveedor y fecha son obligatorios', true);
            return;
        }

        if (id) {
            // editar
            const idx = purchases.findIndex(p => String(p.id) === String(id));
            if (idx !== -1) {
                purchases[idx] = { ...purchases[idx], provider, date, total, status };
                showNotification('Compra actualizada correctamente');
            }
        } else {
            // crear
            const newPurchase = {
                id: Date.now().toString(),
                provider,
                date,
                total,
                status
            };
            purchases.unshift(newPurchase);
            showNotification('Compra guardada correctamente');
        }

        savePurchases();
        renderTable(purchases);
        closeModal();
    }

    // Render tabla
    function renderTable(data) {
        // preparar thead y tbody
        tableEl.innerHTML = '';
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>ID</th>
                <th>Proveedor</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>`;
        tableEl.appendChild(thead);

        const tbody = document.createElement('tbody');
        if (!data.length) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="6" style="text-align:center; padding:16px">No hay compras</td>`;
            tbody.appendChild(tr);
        } else {
            data.forEach(p => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${p.id}</td>
                    <td>${escapeHtml(p.provider)}</td>
                    <td>${p.date}</td>
                    <td>${Number(p.total).toFixed(2)}</td>
                    <td>${capitalize(p.status)}</td>
                    <td>
                        <button class="btn-edit" data-id="${p.id}" title="Editar">Editar</button>
                        <button class="btn-delete" data-id="${p.id}" title="Eliminar">Eliminar</button>
                    </td>`;
                tbody.appendChild(tr);
            });
        }
        tableEl.appendChild(tbody);

        // Delegación de eventos para botones editar/eliminar
        tableEl.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const item = purchases.find(x => String(x.id) === String(id));
                if (item) openModal(item);
            });
        });
        tableEl.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                onDeletePurchase(id);
            });
        });
    }

    function onDeletePurchase(id) {
        if (!confirm('¿Eliminar esta compra?')) return;
        purchases = purchases.filter(p => String(p.id) !== String(id));
        savePurchases();
        renderTable(purchases);
        showNotification('Compra eliminada');
    }

    // Buscar
    function onSearch() {
        const q = (purchaseSearch.value || '').toLowerCase().trim();
        if (!q) {
            renderTable(purchases);
            return;
        }
        const filtered = purchases.filter(p => {
            return (
                String(p.provider || '').toLowerCase().includes(q) ||
                String(p.date || '').toLowerCase().includes(q) ||
                String(p.status || '').toLowerCase().includes(q) ||
                String(p.total || '').toLowerCase().includes(q) ||
                String(p.id || '').toLowerCase().includes(q)
            );
        });
        renderTable(filtered);
    }

    // Notificación simple
    let notifTimer = null;
    function showNotification(text, isError = false) {
        if (!notification) return;
        notificationText.textContent = text;
        notification.style.display = 'flex';
        notification.style.background = isError ? '#f8d7da' : '#d1e7dd';
        notification.style.color = isError ? '#842029' : '#0f5132';
        if (notifTimer) clearTimeout(notifTimer);
        notifTimer = setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    // Utilidades
    function escapeHtml(str) {
        return String(str || '').replace(/[&<>"']/g, function (m) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
        });
    }

    function capitalize(s) {
        if (!s) return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    // Inicializar al cargar DOM
    document.addEventListener('DOMContentLoaded', init);
})();

