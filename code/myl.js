// Objeto Libreria.
const myl  = {};




//<--------------------------------------------------------------------------------------------------------------------------------->






// Genera un numero aleatorio entre un numero a otro numero.
myl.randint = function ( start = 0, end = 100 ) {

	let num = -1;

	if ( start < end ) {
		while ( num < start ) {
			num = Math.round( Math.random() * end );
		}
	}

	return num;
}






//<--------------------------------------------------------------------------------------------------------------------------------->






// Genera una coordenada aleatoria entre un numero y otro numero.
myl.randcoor = function ( n1, n2 ) {

	return {
		x:myl.randint( n1, n2 ),
		y:myl.randint( n1, n2 )
	};
}






//<--------------------------------------------------------------------------------------------------------------------------------->





// Genera un id configurable de foma aleatoria.
myl.randid = function ( setting ) {

	// Variables.
	const chars = "abcdefghijklmnopqrstuvwxyz";
	const nums = "0123456789";
	let id = "";
	

	// Propiedades de configuracion - configuracion por defecto.
	const idproperties = {
		letters : true,
		uppercase : true,
		lowercase : true,
		numbers : true,
		numcharacters : [6,6,6,6],
		separation : true,
		charseparation : "-"
	}


	// configura las opciones del parametro setting.
	if ( setting ) {

		idproperties.letters = setting[0];
		idproperties.uppercase = setting[2];
		idproperties.lowercase = setting[3];
		idproperties.numbers = setting[1];
		idproperties.numcharacters = setting[4];
		idproperties.separation = setting[5];
		idproperties.charseparation = setting[6];
	}


	// Agregar un numero al id.
	const addnumber = () => {
		id = id.concat(nums[myl.randint(0,nums.length-1)]);
	}


	// Agrega una letra minuscula al id.
	const addletterLowercase = () => {
		id = id.concat(chars[myl.randint(0,chars.length-1)]);
	}


	// Agrega una letra mayuscula al id.
	const addletterUppercase = () => {
		id = id.concat(chars[myl.randint(0,chars.length-1)].toUpperCase());
	}


	// Agrega una letra al id.
	const addletter = () => {
			
		if ( myl.randint(0,1) ) {
			if ( idproperties.uppercase ) { addletterUppercase(); }
			else { addletterLowercase(); }
		}
		else {
			if ( idproperties.lowercase ) { addletterLowercase(); }
			else { addletterUppercase(); } 
		}
	}


	// Crea el id.
	idproperties.numcharacters.forEach( ( num, index ) => {

		// Logica para crear el id.
		for ( let i = 0; i < num; i++ ) {

			if ( myl.randint(0,1) ) {
				if ( idproperties.letters ) { addletter(); }
				else { addnumber(); }
			}
			else {
				if ( idproperties.numbers ) { addnumber(); }
				else { addletter(); }
			}
		}


		// Agrega la separacion si esta activada la opcion.
		if ( idproperties.separation && index < idproperties.numcharacters.length-1 ) {
			id = id.concat( idproperties.charseparation );
		}
	});

	return id;
}






//<--------------------------------------------------------------------------------------------------------------------------------->






// Devuelve la fecha actual en momento de ejecucion.
myl.date = function ( getdata ) {

	const DATE = new Date();
	let date = "";
	let day = DATE.getDate();
	let month = DATE.getMonth() + 1;
	let year = DATE.getFullYear();
	
	if ( getdata == undefined ) {
		
		date += ("0" + day).slice(-2) + "/";
		date += ("0" + month).slice(-2) + "/";
		date += year;
		return date;
	}

	else if ( getdata == "day" ) { return day; }
	else if ( getdata == "month" ) { return month; }
	else if ( getdata == "year" ) { return year; }
}






//<--------------------------------------------------------------------------------------------------------------------------------->






// Devuelve la hora actual en momento de ejecucion.
myl.time = function ( getdata ) {

	const TIME = new Date();
	let time = "";
	let hour = TIME.getHours();
	let minutes = TIME.getMinutes();
	let seconds = TIME.getSeconds();

	if ( getdata == "hour" ) { return hour; } else
	if ( getdata == "minute" ) { return minutes; } else
	if ( getdata == "second" ) { return seconds; } else
	
	if ( getdata == undefined || getdata ) {

		time += ("0" + hour).slice(-2) + ":";
		time += ("0" + minutes).slice(-2) + ":";
		time += ("0" + seconds).slice(-2);

		return time;
	}
}






//<--------------------------------------------------------------------------------------------------------------------------------->






// Arreglar!
myl.moveobject = function ( element, disp = 10 ) {

	// Objeto move.
	const move = { focus: 0, pos: [] };


	// Recorre el array o node list del parametro element.
	element.forEach( ( obj, i ) => {

		obj.style.position = "relative";

		// Si hay mas de un elemento agrega un borde al primero.
		if ( element.length > 1 ) {

			element[0].style.border = "1px solid #000"; 
			element[0].style.zIndex = "1000000";

			// Agrega evento click a los elementos.
			obj.addEventListener('click', () => {

				element[move.focus].style.zIndex = "0";
				element[move.focus].style.border = "none";
				move.focus = i;
				element[move.focus].style.border = "1px solid #000";
				element[move.focus].style.zIndex = "1000000";
			});
		}
		
		// Agrega un objeto con la posiciones 0 para el elemento.
		move.pos.push( {x:0,y:0} );
	});

	
	// Movimiento de los elementos.
	window.addEventListener('keydown', (e) => {

		if ( e.keyCode == 65 || e.keyCode == 37 ) { move.pos[move.focus].x -= disp; } else
		if ( e.keyCode == 68 || e.keyCode == 39 ) { move.pos[move.focus].x += disp; } else
		if ( e.keyCode == 87 || e.keyCode == 38 ) { move.pos[move.focus].y -= disp; } else
		if ( e.keyCode == 83 || e.keyCode == 40 ) { move.pos[move.focus].y += disp; }

		element[move.focus].style.transform = `translate(
			${move.pos[move.focus].x}px,
			${move.pos[move.focus].y}px
		)`;

		element[move.focus].style.transition = "transform .1s linear";
	});
}






//<--------------------------------------------------------------------------------------------------------------------------------->






// Genera un codigo de color hexadecimal de forma aleatoria.
myl.randcolor = function () {

	const hex = "0123456789ABCDEF";
	let color = "#";

	for ( let i = 0; i < 6; i++ ) {
		color = color.concat( hex[ myl.randint(0, hex.length-1) ] );
	}
	return color;
}






//<--------------------------------------------------------------------------------------------------------------------------------->
//<--------------------------------------------------------------------------------------------------------------------------------->
//<--------------------------------------------------------------------------------------------------------------------------------->
//<--------------------------------------------------------------------------------------------------------------------------------->
//<--------------------------------------------------------------------------------------------------------------------------------->
//<--------------------------------------------------------------------------------------------------------------------------------->
//<--------------------------------------------------------------------------------------------------------------------------------->
//<--------------------------------------------------------------------------------------------------------------------------------->
//<--------------------------------------------------------------------------------------------------------------------------------->
//<--------------------------------------------------------------------------------------------------------------------------------->
//<--------------------------------------------------------------------------------------------------------------------------------->
//<--------------------------------------------------------------------------------------------------------------------------------->
//<--------------------------------------------------------------------------------------------------------------------------------->
//<--------------------------------------------------------------------------------------------------------------------------------->