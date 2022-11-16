(() => {

	document.querySelector('.form__input').addEventListener('input', (e) => {

		const ci = e.target.value;

		// Indica visualmente si la cédula ingresada es valida.
		e.target.style.background = 
		validateCI(ci) && ci.length == 10 ? '#31dc7355': 
		ci.length >= 10 ? '#fc5e5e55': '#e1e1e1';
	});


	// Valida el numero de cédula con el dígito verificador.
	function validateCI(number) {

		if (number.length != 10) {return false}

		let sum = 0, res;
		for (let i = 0; i < 9; i++) {
			if (i % 2) { sum += parseInt(number[i]) } else {
				res = parseInt(number[i]) * 2;
				res > 9 ? sum += res - 9 : sum += res;
			}
		}

		decenaSuperior = (parseInt(sum.toString()[0]) + 1) * 10;
		res = decenaSuperior - sum;
		res == 10 ? res = 0 : null;

		return res == number[9] ? true: false;
	}
})(); 