 document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener tipo de usuario
            const userType = document.getElementById('userType').value;
            
            // Mostrar mensaje de éxito
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.add('show');
            
            // Redireccionar después de 3 segundos o al hacer clic en continuar
            const redirect = () => {
                if (userType === 'admin') {
                    window.location.href = 'index.html';
                } else if (userType === 'tech') {
                    window.location.href = 'index2.html';
                } else if (userType === 'client') {
                    window.location.href = 'index3.html';
                }
            };
            
            document.getElementById('continueBtn').addEventListener('click', redirect);
            
            setTimeout(redirect, 3000);
        });