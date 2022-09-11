// Evento de teclado al input.
document.querySelector('.input').addEventListener('keyup', (e) => {

	const ci = e.target.value; // Obtiene el dato del input.

	// Incrementa o decrementa el contador de digitos.
	const counter = document.querySelector('.counter');
	counter.innerHTML = `${ci.length} - 10`;

	// Verifica si se ha ingresado mas de 10 digitos.
	counter.style.color = 
	ci.length > 10 ? 'red':
	ci.length == 10 ? '#05bb05': '#555';

	// Indica si la cedula ingresada es valida.
	e.target.style.background = 
	validarCI(ci) && ci.length == 10 ? '#2DAF5E55': 
	ci.length >= 10 ? '#C9474755': 'transparent';
});


// Valida el numero de cedula con el digito verificador.
function validarCI(number) {

	if (number.length != 10) {return false}

	let suma = 0;
	for (let i = 0; i < 9; i++) {
		if (i%2) { suma += parseInt(number[i]) } else {
			res = parseInt( number[i] ) * 2;
			res > 9 ? suma += res - 9: suma += res;
		}
	}

	decenaSuperior = ( parseInt( suma.toString()[0] ) + 1 ) * 10;
	res = decenaSuperior - suma;
	res == 10 ? res = 0 : null

	return res == number[9] ? true: false;
}