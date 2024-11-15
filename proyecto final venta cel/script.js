// Objeto para almacenar el teléfono seleccionado
let selectedPhone = null;

// Función para seleccionar un teléfono y redirigir a la página de pago
function selectPhone(name, price) {
    selectedPhone = { name, price };
    localStorage.setItem('selectedPhone', JSON.stringify(selectedPhone));
    window.location.href = 'pago.html'; // Asegúrate de que esta ruta sea correcta
}

// Evento para los botones de compra en la página principal
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.phone button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const phoneDiv = this.closest('.phone');
            const name = phoneDiv.querySelector('h3').textContent;
            const price = parseFloat(phoneDiv.querySelector('p').textContent.replace('Precio: $', ''));
            selectPhone(name, price);
        });
    });
});

// Código para la página de pago
document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        const cartSummary = document.getElementById('cart-summary');
        const savedPhone = localStorage.getItem('selectedPhone');
        if (savedPhone) {
            const phone = JSON.parse(savedPhone);
            cartSummary.innerHTML = `
                <p>${phone.name}: $${phone.price}</p>
                <p><strong>Total: $${phone.price}</strong></p>
            `;
        } else {
            // Manejo de error si no se encuentra el teléfono
            cartSummary.innerHTML = '<p>No se encontró información del teléfono.</p>';
        }

        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aquí podrías agregar una llamada a una API de pago si fuese necesario.
            alert('Pago procesado con éxito. ¡Gracias por su compra!');
            localStorage.removeItem('selectedPhone');
            window.location.href = 'index.html'; // Redirige a la página de los teléfonos
        });
    }
});
