var formElement=null;
var xmlDoc=null;

var question;
var questions=0;

var numOpt=0;
var opcionesArray=[];//Contendra todas las opciones del xml
var intI=0;//Guarda el valor de la "i"
var selPos=0;//Marca la posicion del "select"
var boxPos=0;//Marca la posicion del "checkbox"

var nota = 0.0; //La nota final del formulario

var contQues=0;//Contador de las preguntas
var answerXml=null;//Respuesta del xml
var answerUser=null;//Respuesta del usuario

var xPath="";//Guarda la ruta de la busqueda, dentro del xml
var nodo=null;
var conTenedor=null;//Guarda el contenido del nodo
var contY=0;//Contador

//Al cargar la pagina{
window.onload = function(){
	//El formulario{
	formElement = document.getElementById ("myform");
	formElement.onsubmit = function (){
		if(coprobarPreguntas()){
			corregirTipoText();
			corregirTiposSelect();
			corregirTiposRadio();
			corregirTiposCheckbox();
			corregirTiposSelMultiple();
			mostrarNota();
		}
		return false;
	}
	//El formulario}
	
	//Leer el fichero xml{
	var xhttp = new XMLHttpRequest ();
	xhttp.onreadystatechange = function (){
		if (this.readyState == 4 && this.status == 200){
			gestionarXml(this);
		}
	};
	xhttp.open ("GET", "https://rawgit.com/LBarry97/ProyectoHistoria/master/xml/historia.xml", true);
	xhttp.send ();
	//Leer el fichero xml}
	
	document.getElementById("refres").onclick = function () {//Al hacer click en Repertir
		formElement.reset();
		location.reload();
		document.getElementById("refres").style.display = "none";
		document.getElementById("sub").style.display = "block";
	}
}
//Al cargar la pagina}

function gestionarXml (dadesXml){
	xmlDoc = dadesXml.responseXML;/*Leer todos los datos del fiche xml
	y ponerlos en la variable "xmlDoc"*/
	
	leerYpintar();//Pinta por completo el "html"
}

function leerYpintar(){
	questions=10;//Hasta que pregunta leeo y pinto
	for(i=0;i<questions;i++){
		if(i==0||i==1){//Questions de tipo "text"
			question =xmlDoc.getElementsByTagName ("title")[i].innerHTML;//Leer pregunta del xml(xmlDoc)
			document.getElementsByTagName ("h3")[i].innerHTML = question;//Pintar en el HTML
		}
		if(i==2||i==3){//Questions de tipo "select"
			question =xmlDoc.getElementsByTagName ("title")[i].innerHTML;//Leer pregunta del xml(xmlDoc)
			document.getElementsByTagName ("h3")[i].innerHTML = question;//Pintar en el HTML
			
			if(i==2){
				xPath="/questions/question[@id='jklm_003']/option";//Path de la primera pregunta
			}else{
				xPath="/questions/question[@id='jklm_004']/option";//Path de la segunda pregunta
			}
			nodo=xmlDoc.evaluate(xPath,xmlDoc,null,XPathResult.ANY_TYPE,null);//Gurda el elemento en "nodo"
			var select=document.getElementsByTagName ("select")[selPos];//Cojer el "select" del html
			contY=0;//Contador
			while(conTenedor=nodo.iterateNext()){
				var option=document.createElement("option");
				option.text=conTenedor.innerHTML;
				option.value=contY+1;
				contY++;
				select.options.add(option);
			}
			selPos++;
		}
		if(i==4||i==5){//Questions de tipo "radio"
			question =xmlDoc.getElementsByTagName ("title")[i].innerHTML;//Leer pregunta del xml(xmlDoc)
			document.getElementsByTagName ("h3")[i].innerHTML = question;//Pintar en el HTML
			
			if(i==4){
				xPath="/questions/question[@id='jklm_005']/option";//Path de la primera pregunta
			}else{
				xPath="/questions/question[@id='jklm_006']/option";//Path de la segunda pregunta
			}
			nodo=xmlDoc.evaluate(xPath,xmlDoc,null,XPathResult.ANY_TYPE,null);//Gurda el elemento en "nodo"
			
			var div=document.getElementsByTagName("div")[boxPos]
			
			contY=0;//Contador
			
			while(conTenedor=nodo.iterateNext()){
				var input=document.createElement("input");
				var label=document.createElement("label");
				var espacio1=document.createElement("br");
				var espacio2=document.createElement("br");
				input.type="radio";
				if(i==4){
					input.name="radio1";//Para la primera pregunta
					input.id="radio1_"+contY;
					label.setAttribute("for","radio1_"+contY);
				}else{
					input.name="radio2";//Para la segunda pregunta
					input.id="radio2_"+contY;
					label.setAttribute("for","radio2_"+contY);
				}
				input.value=contY+1;
				label.innerHTML=conTenedor.innerHTML;//Escribir la "opcion" del xml en el "label"
				div.appendChild(input);//Añadir "input"
				div.appendChild(label);//Añadir "label"
				div.appendChild(espacio1);//Añadir "espacio"
				div.appendChild(espacio2);//Añadir "espacio"
				contY++;//Sumar el contador
			}
			boxPos++;
		}
		if(i==6||i==7){//Questions de tipo "checkbox"
			question =xmlDoc.getElementsByTagName ("title")[i].innerHTML;//Leer pregunta del xml(xmlDoc)
			document.getElementsByTagName ("h3")[i].innerHTML = question;//Pintar en el HTML
			if(i==6){
				xPath="/questions/question[@id='jklm_007']/option";//Path de la primera pregunta
			}else{
				xPath="/questions/question[@id='jklm_008']/option";//Path de la segunda pregunta
			}
			nodo=xmlDoc.evaluate(xPath,xmlDoc,null,XPathResult.ANY_TYPE,null);//Gurda el elemento en "nodo"
			var div=document.getElementsByTagName("div")[boxPos]
			contY=0;//Contador
			while(conTenedor=nodo.iterateNext()){
				var linea=document.createElement("label");//Crear la etiqueta "label"
				var input=document.createElement("input");//Crear la etiqueta "input"
				var separador1=document.createElement("br");//Separador
				var separador2=document.createElement("br");//Separador
				linea.innerHTML=conTenedor.innerHTML;
				input.type="checkbox";
				if(i==6){
					input.name="check1";//Para la primera pregunta
					input.id="check1_"+contY;
					linea.setAttribute("for","check1_"+contY);
				}else{
					input.name="check2";//Para la segunda pregunta
					input.id="check2_"+contY;
					linea.setAttribute("for","check2_"+contY);
				}
				input.value=contY+1;
				div.appendChild(input);
				div.appendChild(linea);
				div.appendChild(separador1);
				div.appendChild(separador2);
				contY++;//Sumar el contador
			}
			boxPos++;
		}
		if(i==8||i==9){//Questions de tipo "multiple"
			question =xmlDoc.getElementsByTagName ("title")[i].innerHTML;//Leer pregunta del xml(xmlDoc)
			document.getElementsByTagName ("h3")[i].innerHTML = question;//Pintar en el HTML
			if(i==8){
				xPath="/questions/question[@id='jklm_009']/option";//Path de la primera pregunta
			}else{
				xPath="/questions/question[@id='jklm_010']/option";//Path de la segunda pregunta
			}
			nodo=xmlDoc.evaluate(xPath,xmlDoc,null,XPathResult.ANY_TYPE,null);//Gurda el elemento en "nodo"
			var select=document.getElementsByTagName ("select")[selPos];
			contY=0;//Contador
			while(conTenedor=nodo.iterateNext()){
				var option=document.createElement("option");
				option.text=conTenedor.innerHTML;
				option.value=contY+1;
				select.options.add(option);
				contY++;//Sumar el contador
			}
			selPos++;
		}
	}

}

function corregirTipoText(){
	while(contQues<2){
		answerXml=xmlDoc.getElementsByTagName("question")[contQues].getElementsByTagName("answer")[0].innerHTML;//Cojer respuesta del xml
		
		answerUser=formElement.elements[contQues].value;//Cojer respuesta del usuario
		
		answerUser=answerUser.toLowerCase();//Pasar lo a minusculas
		
		miNota();//Poner nota
		
		contQues++;//Pasar a la siguiente pregunta
	}
}

function corregirTiposSelect(){
	while(contQues<4){
		answerXml=xmlDoc.getElementsByTagName("question")[contQues].getElementsByTagName("answer")[0].innerHTML;//Cojer respuesta del xml
		
		answerUser=formElement.elements[contQues].selectedIndex;//Cojer respuesta del usuario
		
		answerUser=answerUser-1;//Restar una porque tengo la pordefecto
		
		miNota();//Poner nota
		
		contQues++;//Pasar a la siguiente pregunta
	}
}

function corregirTiposRadio(){
	while(contQues<6){
		answerXml=xmlDoc.getElementsByTagName("question")[contQues].getElementsByTagName("answer")[0].innerHTML;//Cojer respuesta del xml
		
		answerXml=parseInt(answerXml);//Pasarlo a entero
		if(contQues==4){
			answerUser=-1;//Inicializar la variable
			for(i = 0; i < formElement.radio1.length; i++){//Recore los "input" de name igual "radio1"
				if(formElement.radio1[i].checked){//Si este input fue seleccionado
					answerUser=i;//Cojer la posicion que se selecciono
					i=formElement.radio1.length;//Provocar el fin del boocle
				}
			}
		}else{
			answerUser=-1;//Inicializar la variable
			for(i = 0; i < formElement.radio2.length; i++){//Recore los "input" de name igual "radio1"
				if(formElement.radio2[i].checked){//Si este input fue seleccionado
					answerUser=i;//Cojer la posicion que se selecciono
					i=formElement.radio2.length;//Provocar el fin del boocle
				}
			}
		}
		
		miNota();//Poner nota
		
		contQues++;//Pasar a la siguiente pregunta
	}
}

function corregirTiposCheckbox(){
	while(contQues<8){
		answerXml=xmlDoc.getElementsByTagName("question")[contQues].getElementsByTagName("answer")[0].innerHTML;//Cojer respuesta del xml
		
		answerXml=parseInt(answerXml);//Pasarlo a entero
		
		var check=0;//Contador de numero de selecciones
		
		if(contQues==6){
			answerUser=-1;//Inicializar la variable
			
			for(i = 0; i < formElement.check1.length; i++){//Recore los "input" de name igual "check1"
				if(formElement.check1[i].checked){//Si este input fue seleccionado
					check++;//Suma al contador 1
				}
			}
			
			if(check==1){//Si solo se selecciono una respuesta
				for(i = 0; i < formElement.check1.length; i++){//Recore los "input" de name igual "check1"
					if(formElement.check1[i].checked){//Si este input fue seleccionado
						answerUser=i;//Cojer la posicion que se selecciono
						i=formElement.check1.length;//Provocar el fin del boocle
					}
				}
			}
			
		}else{
			answerUser=-1;//Inicializar la variable
			
			for(i = 0; i < formElement.check2.length; i++){//Recore los "input" de name igual "check2"
				if(formElement.check2[i].checked){//Si este input fue seleccionado
					check++;//Suma al contador 1
				}
			}
			
			if(check==1){//Si solo se selecciono una respuesta
				for(i = 0; i < formElement.check2.length; i++){//Recore los "input" de name igual "check2"
					if(formElement.check2[i].checked){//Si este input fue seleccionado
						answerUser=i;//Cojer la posicion que se selecciono
						i=formElement.check2.length;//Provocar el fin del boocle
					}
				}
			}
		}
		
		miNota();//Poner nota
		
		contQues++;//Pasar a la siguiente pregunta
	}
}

function corregirTiposSelMultiple(){
	selPos=selPos-2;//La posicion del select
	while(contQues<10){
		
		answerXml=xmlDoc.getElementsByTagName("question")[contQues].getElementsByTagName("answer")[0].innerHTML;//Cojer respuesta 1 del xml
		answerXml+=xmlDoc.getElementsByTagName("question")[contQues].getElementsByTagName("answer")[1].innerHTML;//Cojer respuesta 2 del xml
		
		answerUser="";//Inicializar la variable


		if(contQues==8){
			numOpt=document.getElementsByTagName("select")[selPos].getElementsByTagName("option").length;//Contar el numero de options
			
			for(i = 0; i < numOpt; i++){
			
				var sel=document.getElementsByTagName("select")[selPos].getElementsByTagName("option")[i];//Opcion
			
				if(sel.selected){//Si este input fue seleccionado
					answerUser+=i;//Cojer la posicion que se selecciono
				}
			}
				
		}else{
			numOpt=document.getElementsByTagName("select")[selPos].getElementsByTagName("option").length;//Contar el numero de options
			
			for(i = 0; i < numOpt; i++){
			
				var sel=document.getElementsByTagName("select")[selPos].getElementsByTagName("option")[i];//Opcion
			
				if(sel.selected){//Si este input fue seleccionado
					answerUser+=i;//Cojer la posicion que se selecciono
				}
			}
		}

		miNota();//Poner nota
		
		contQues++;//Pasar a la siguiente pregunta
		selPos++;//Pasamos al siguiente select
	}
}

function miNota(){
	if(answerUser==answerXml){
		nota+=1;//Sumar un punto a "nota"
	}else{
		if(nota>=1){
			nota-=0.5;//Restar nota 0.5 puntos
		}else{
			nota=0;//(0.5-0.5)=0
		}
	}
}

function coprobarPreguntas(){

	var f=formElement;
	
	//Preguntas de tipo "radio":
	var radios1=true;//Para comprobar las preguntas de tipo "radio"
	var radios2=true;//Para comprobar las preguntas de tipo "radio"
	for(i=0;i<f.radio1.length;i++){
		if(f.radio1[i].checked){//Si fue seleccionada la opcion
			radios1=false;
			i=f.radio1.length;//Abortar el for
		}
	}
	for(i=0;i<f.radio2.length;i++){
		if(f.radio2[i].checked){//Si fue seleccionada la opcion
			radios2=false;
			i=f.radio2.length;//Abortar el for
		}
	}
	//Preguntas de tipo "checkbox":
	var checkeada1=true;//Para comprobar las preguntas de tipo "checkbox"
	var checkeada2=true;//Para comprobar las preguntas de tipo "checkbox"
	for(i=0;i<f.check1.length;i++){
		if(f.check1[i].checked){//Si fue seleccionada la opcion
			checkeada1=false;
			i=f.check1.length;//Abortar el for
		}
	}
	for(i=0;i<f.check2.length;i++){
		if(f.check2[i].checked){//Si fue seleccionada la opcion
			checkeada2=false;
			i=f.check2.length;//Abortar el for
		}
	}
	//Preguntas de tipo "multiple":
	var multiple1=true;//Para comprobar las preguntas de tipo "multiple"
	var multiple2=true;//Para comprobar las preguntas de tipo "multiple"
	var num=document.getElementsByTagName("select")[2].getElementsByTagName("option").length;//Contar el numero de options
	
	for(i=0;i<num;i++){
		var opt=document.getElementsByTagName("select")[2].getElementsByTagName("option")[i];
		if(opt.selected){//Si fue seleccionada la opcion
			multiple1=false;
			i=num;//Abortar el for
		}
	}
	num=document.getElementsByTagName("select")[3].getElementsByTagName("option").length;//Contar el numero de options
	for(i=0;i<num;i++){
		opt=document.getElementsByTagName("select")[3].getElementsByTagName("option")[i];
		if(opt.selected){//Si fue seleccionada la opcion
			multiple2=false;
			i=num;//Abortar el for
		}
	}
	//Preguntas de tipo "text":
	if(f.elements[0].value==""){//Si el valor es blanco
		f.elements[0].focus();
		alert("Porfavor, Responda todas las preguntas para corregir");
		return false;
	}else if(f.elements[1].value==""){//Si el valor es blanco
		f.elements[1].focus();
		alert("Porfavor, Responda todas las preguntas para corregir");
		return false;
	//Preguntas de tipo "Select"
	}else if(f.elements[2].selectedIndex==0){//Si la seleccion es la 0
		f.elements[2].focus();
		alert("Porfavor, Responda todas las preguntas para corregir");
		return false;
	}else if(f.elements[3].selectedIndex==0){//Si la seleccion es la 0
		f.elements[3].focus();
		alert("Porfavor, Responda todas las preguntas para corregir");
		return false;
	//Preguntas de tipo "radio":
	}else if(radios1){//Si el radio no fue selecionando
		alert("No has respondido la pregunta 5, de tipo radio");
		return false;	
	}else if(radios2){//Si el radio no fue selecionando
		alert("No has respondido la pregunta 6, de tipo radio");
		return false;
	//Preguntas de tipo "checkbox";
	}else if(checkeada1){//Si el checkbox no fue selecionando
		alert("No has respondido la pregunta 7, de tipo checkbox");
		return false;
	}else if(checkeada2){//Si el checkbox no fue selecionando
		alert("No has respondido la pregunta 8, de tipo checkbox");
		return false;
	//Preguntas de tipo "multiple":
	}else if(multiple1){//Si el multiple no fue selecionando
		alert("No has respondido la pregunta 9, de tipo multiple");
		return false;
	}else if(multiple2){//Si el multiple no fue selecionando
		alert("No has respondido la pregunta 10, de tipo multiple");
		return false;
	}else{
		return true;
	}
}

function mostrarNota(){
	if(nota<5){
		document.getElementById("nota").innerHTML="Ha suspendido: "+nota;//Muestra la nota
	}else{
		document.getElementById("nota").innerHTML="Ha aprobado: "+nota;//Muestra la nota
	}
	document.getElementById("sub").style.display = "none";
	document.getElementById("refres").style.display = "block";
}
