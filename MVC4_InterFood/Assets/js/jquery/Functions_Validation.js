

/*Expresiones regulares y métodos de la librería JqueryValidate*/

/*Solo letras*/
jQuery.validator.addMethod("lettersonly", function (value, element) {
    return this.optional(element) || /^[a-zAZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s]+$/i.test(value);
}, "Solo se permiten letras");

// Validar select
$.validator.addMethod("valueNotEquals", function (value, element, arg) {
    return arg != value;
}, "Debes seleccionar una opción.");

/*Caracteres látinos*/
  jQuery.validator.addMethod('RE_LatinCharacters',function(value,element)
  {
    return this.optional(element) ||  /^[a-zAZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s]+$/i.test(value);
  }, "Caracteres no válidos.");

/*Email*/
  jQuery.validator.addMethod('RE_Email',function(value,element)
  {
    return this.optional(element) ||  /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/i.test(value);
  }, "Email no válido, escribe en el formato alguien@example.com.");

/*Números enteros*/
  jQuery.validator.addMethod('RE_Numbers',function(value,element)
  {
    return this.optional(element) ||  /^[0-9]+$/i.test(value);
  }, 'Solo puedes ingresar números.');

/*Número enteros y decimales (incluye punto '.' y coma ',')*/
jQuery.validator.addMethod('RE_NumbersIntDecimal',function(value,element)
{
  return this.optional(element) || /[-+]?([0-9]*\.[0-9]+|[0-9]+)/i.test(value);
},'Solo puedes ingresar números enteros o decimales.');

/*Para contenre al menos número y letras en el usuario o contraseña*/
jQuery.validator.addMethod('RE_Passwords',function(value,element)
{
  return this.optional(element) ||  /^([a-z]+[0-9]+)|([0-9]+[a-z]+)/i.test(value);
},'La contraseña debe contener al menos números y letras.');

/*Dominio de una url (.com,.es, etc)*/
jQuery.validator.addMethod('RE_URL',function(value,element)
{
  return this.optional(element) || /^(ht|f)tps?:\/\/\w+([\.\-\w]+)?\.([a-z]{2,6})?([\.\-\w\/_]+)$/i.test(value);
},'URL no válida, ingrese una correcta.');

/*Usuario cantidad máxima y cantidad mínima de caracteres*/
jQuery.validator.addMethod('RE_Username',function(value,element)
{
  return this.optional(element) ||  /^[a-z0-9_-]{6,20}$/i.test(value);
},'El usuario debe contener mínimo 6 y máximo 20 caracteres.');

/*Contraseña cantidad máxima y cantidad mínima de caracteres*/
jQuery.validator.addMethod('RE_Passwords2',function(value,element)
{
  return this.optional(element) ||  /^[a-z0-9_-]{6,20}$/i.test(value);
},'La contraseña debe contener mínimo 6 y máximo 20 caracteres.');

/*Fechas con formato DD/MM/YYYY*/
jQuery.validator.addMethod('RE_Date',function(value,element)
{
  return this.optional(element) || /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d$/i.test(value);
},'Ingrese una fecha válida, escribe en el formato DD/MM/YYYY.');

/*Formato correcto para las imagenes */
jQuery.validator.addMethod('RE_Image',function(value,element)
{
  return this.optional(element) || /([^\s]+(?=\.(jpg|jpeg|png))\.\2)/gm.test(value);
  //return this.optional(element) ||    /<img.+?src=\"(.*?)\".+?>/ig.test(value);
},'El formato de imagen es incorrecto.');

/*Formato correcto para los documentos */
jQuery.validator.addMethod('RE_Doc',function(value,element)
{
  return this.optional(element) || /([^\s]+(?=\.(doc|pdf|docx))\.\2)/gm.test(value);
  //return this.optional(element) ||    /<img.+?src=\"(.*?)\".+?>/ig.test(value);
},'El formato del documento es incorrecto.');

/*Dominio de una url (.com,.es, etc) */
jQuery.validator.addMethod('RE_WWW',function(value,element)
{
  return this.optional(element) ||    /[^w{3}\.]([a-zA-Z0-9]([a-zA-Z0-9\-]{0,65}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}/igm.test(value);
},'El formato de la URL es incorrecto.');

/*Formato de 24horas, además agregando el am/pm */
jQuery.validator.addMethod('RE_hours',function(value,element)
{
  return this.optional(element) || /^([0-1]?[0-9]|[2][0-3]):([0-5][0-9])(:[0-5][0-9])?$/i.test(value);
},'El formato de la hora no es válido.');

/*Escoger un item válido del select*/
jQuery.validator.addMethod("RE_Select", function(value, element, arg){
 return arg != value;
}, 'Por favor seleccione un item.');

/*Al evento de maxLength se le agrega una función que permite calcular
la cantidad de caracteres máximos NO TOCAR*/
$.fn.maxLength = function(limit, options){
var defaults = {
showNumber: "",
revert: true
}
var options = $.extend(defaults, options);
element = this;

function event(e){
element.on(e, function(){
chars = $(this).val().length;
if (defaults.showNumber != "")
{
 defaults.revert == true ? $(defaults.showNumber).text(limit-chars) : $(defaults.showNumber).text(chars);
}

if (chars >= limit)
{
 $(this).val($(this).val().substr(0, limit-1));
}
});
}
event("keypress");
event("keydown");
event("keyup");
event("focus");
};
