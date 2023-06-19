(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$(".toggle-password").click(function() {

	  $(this).toggleClass("fa-eye fa-eye-slash");
	  var input = $($(this).attr("toggle"));
	  if (input.attr("type") == "password") {
	    input.attr("type", "text");
	  } else {
	    input.attr("type", "password");
	  }
	});

})(jQuery);

// Obtener elementos del formulario
const form = document.querySelector('.signin-form');
const usernameInput = form.querySelector('input[type="text"]');
const passwordInput = form.querySelector('input[type="password"]');

// Eventlistener de envío del formulario
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar que el formulario se envíe

  // Obtener los valores ingresados por el usuario
  const username = usernameInput.value;
  const password = passwordInput.value;

  // Verificar las credenciales
  if (username === 'admin@admin.com' && password === 'admin') {
    // Redirigir a la pagina de control
    window.location.href = 'paginaPrincipal.html';
  } else {
    // Mostrar un mensaje de error si las credenciales son incorrectas
    alert('Usuario o contraseña incorrectos');
  }
});
