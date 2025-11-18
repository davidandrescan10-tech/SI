 document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener tipo de usuario
            const userType = document.getElementById('userType').value;
            
            // Redireccionar según el tipo de usuario
            if (userType === 'admin') {
                window.location.href = 'index.html';
            } else if (userType === 'tech') {
                window.location.href = 'index2.html';
            } else if (userType === 'client') {
                window.location.href = 'index3.html';
            }
        });