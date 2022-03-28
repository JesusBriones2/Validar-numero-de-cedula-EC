// Elementos del formulario.
const input = document.getElementById('in');
let contador = document.getElementById('contador');



// Evento de teclado al input.
input.addEventListener('keyup', () => {

	// obtiene la respuesta de la validacion.
	let res = validarCI(input.value);


	// Funcion del contador.
	funContador(input);


	// Si la respuesta de la validacion es valida.
	if ( res && input.value.length < 11 ) {
		input.style.borderColor = '#2DAF5E'; // Input color verde.
	}
	else if ( res == false && input.value.length == 10 ) {
		input.style.borderColor = '#C94747'; // Input color rojo.
	}
	else { 
		input.style.borderColor = '#000'; // Imput color negro. 
	}
});








// Funcionamiento del contador.
function funContador ( input ) {

	// Actualiza el contador en pantalla.
	contador.innerHTML = `${input.value.length} - 10`;

	// Verifica si has ingresado mas de 10 digitos.
	if ( input.value.length > 10 ) {
		contador.style.color = `#B41212`; // Cambia el color del contador.
		contador.innerHTML = `${input.value.length} - 10 !`;

	}
	else if ( input.value.length == 10 ) {
		contador.style.color = `#1DAD42`;
	}
	else{ contador.style.color = `#333`; }
}











// Funcion de validacion del numero de cedula EC.
function validarCI (ci) {

	// Verifica si en un numero valido para ci.
	if ( verificarSecuencia(ci) ) { return false }


	let res = 0; // Variable de resultado.

	// Bucle que hace el proceso del algoritmo 'modulo 10'.
	for (let i = 0; i < ci.length; i++) {

		// Obtiene cada digito en string y lo convierte en integer/int.
		let digito = parseInt( ci[i] );

		// Multiplica el coeficiente 2 a sus respectivos digitos.
		if ( i % 2 == 0 && i < 9) { digito *= 2; } 
		// Resta 9 al digito si el resultado de la multiplicaion fue mayor a 9 si no solo pasa.
		if ( digito > 9 && i < 9) { digito -= 9; }
		// Suma en la variable res el  resultado del proceso anterior.
		if ( i < 9 ) { res += digito; } 
	}

	// Guarda en res ( la decena superior del resultado de la suma - resultado de la suma ).
	res = res - res - (res % 10) + 10;

	// si res es 10, lo cambia a 0.
	if ( res == 10 ) { res = 0; }
	

	// Comprueba si res es igual al digito verificador ( ultimo numero de cedula ).
	// retorna true si es valido o falso si no es valido.
	if ( res == ci[9] ) { return true; }
	else { return false; }
}



// Verifica cuantas veces se repte un numero para que no haya un error en la validacion. 
function verificarSecuencia( ci ) {

	let cont = [0,0,0,0,0,0,0,0,0,0];

	for (let i = 0; i < ci.length; i++) { cont[ci[i]]++; }

	for (let n of cont) { 
		if (n > 4) {return true}
	}
}