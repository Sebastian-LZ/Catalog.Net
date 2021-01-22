'use strict';
(function () {
    app.controller('RegistrarseController', function ($scope, $http, Fabrica) {

        // ng-model para formulario de producto
        $scope.DatosFormRegUsuario = {
            identificacion: "",
            nombres: "",
            apellidos: "",
            email: "",
            password: "",
            pregunta_IdPregunta: 1,
            respuesta: ""
        }

        // ng-model para select subtipos de productos
        $scope.selectPreguntas = {
            options: [],
            // Opción por default
            selectedOption: {
                idPregunta: 1
            }
        };

        /* Dejar el formulario igual que como inicia la web */
        $scope.ResetForm = function () {
            var usuario = $scope.DatosFormRegUsuario;
            usuario.identificacion = "";
            usuario.nombres = "";
            usuario.apellidos = "";
            usuario.email = "";
            usuario.password = "";
            $scope.selectPreguntas.selectedOption.idPregunta = 1;
            usuario.respuesta = "";
        }


        $scope.validarEmail = function () {
            //Creamos un objeto 
            var valueForm = document.getElementById("email").value;
            // Patron para el correo
            var patron = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

            if (valueForm.search(patron) == 0) {
                //Mail correcto
                //object.style.color = "#000";
                return;
            }
            //Mail incorrecto
            new PNotify({
                title: "Error.",
                text: "Email no valido, verifiquelo e intente nuevamente.",
                type: "error"
            });
            return;
        }


        /* Registrar usuario */
        $scope.RegistrarUsuario = function (form, data) {

            var identificacion = document.getElementById("identificacion").value;
            if (identificacion == null || identificacion == 0) {
                new PNotify({
                    title: "Error.",
                    text: "Debe ingresar un numero de identificación",
                    type: "error"
                });
                return;
            }

            if (identificacion.length < 8) {
                new PNotify({
                    title: "Error.",
                    text: "Debe ingresar un numero de identificación valido.",
                    type: "error"
                });
                return;
            }

            var email = document.getElementById("email").value;
            if (email == null || email == "") {
                new PNotify({
                    title: "Error.",
                    text: "Debe ingresar un email.",
                    type: "error"
                });
                return;
            }

            if (email.length < 13) {
                new PNotify({
                    title: "Error.",
                    text: "Ingrese un email valido.",
                    type: "error"
                });
                return;
            }

            if (email.length > 45) {
                new PNotify({
                    title: "Error.",
                    text: "Email muy largo, ingrese un email valido.",
                    type: "error"
                });
                return;
            }

            $scope.validarEmail();


            //Validamos el campo nombres
            var nombre = document.getElementById("nombres").value;
            if (nombre == null || nombre == "") {
                new PNotify({
                    title: "Error.",
                    text: "Debe ingresar un nombre.",
                    type: "error"
                });
                return;
            }

            if (nombre.length <= 2) {
                new PNotify({
                    title: "Error.",
                    text: "Debe ingresar un nombre valido.",
                    type: "error"
                });
                return;
            }

            if (nombre.length > 27) {
                new PNotify({
                    title: "Error.",
                    text: "El nombre es muy largo.",
                    type: "error"
                });
                return;
            }
            //Finalizamos de validar nombres

            //Validamos el campo apellidos
            var apellido = document.getElementById("apellidos").value;
            if (apellido == null || apellido == "") {
                new PNotify({
                    title: "Error.",
                    text: "Debe ingresar un apellido.",
                    type: "error"
                });
                return;
            }

            if (apellido.length <= 2) {
                new PNotify({
                    title: "Error.",
                    text: "Debe ingresar un apellido valido.",
                    type: "error"
                });
                return;
            }

            if (apellido.length > 27) {
                new PNotify({
                    title: "Error.",
                    text: "El apellido es muy largo.",
                    type: "error"
                });
                return;
            }
            //Finalizamos de validar apellidos

            //Validamos el campo de contraseñas
            var pass = document.getElementById("password").value;
            var repeat = document.getElementById("verificarPassword").value;

            if (pass == null || pass == "") {
                new PNotify({
                    title: "Error.",
                    text: "Debe ingresar una contraseña.",
                    type: "error"
                });
                return;
            }
            if (repeat == null || repeat == "") {
                new PNotify({
                    title: "Error.",
                    text: "Ingrese la contraseña nuevamente.",
                    type: "error"
                });
                return;
            }

            if (pass.length < 8) {
                new PNotify({
                    title: "Error.",
                    text: "La contraseña es muy corta.",
                    type: "error"
                });
                return;
            }
            if (repeat.length < 8) {
                new PNotify({
                    title: "Error.",
                    text: "La verificación de contraseña es muy corta.",
                    type: "error"
                });
                return;
            }
            if (pass.length > 20) {
                new PNotify({
                    title: "Error.",
                    text: "La contraseña es muy larga.",
                    type: "error"
                });
                return;
            }
            if (repeat.length > 20) {
                new PNotify({
                    title: "Error.",
                    text: "La verificación de contraseña es muy larga.",
                    type: "error"
                });
                return;
            }

            if (pass != repeat) {
                new PNotify({
                    title: "Error.",
                    text: "Las contraseñas no coinciden.",
                    type: "error"
                });
                return;
            }
            //Finalizamos de validar contraseñas

            //Validamos el campo de la pregunta
            // Obtenemos el nombre del select para validar
            var combo = document.getElementById("idPregunta");
            var nombre = combo.options[combo.selectedIndex].text;

            if (nombre == null || nombre == "") {
                new PNotify({
                    title: "Error.",
                    text: "Debe ingresar una pregunta de seguridad.",
                    type: "error"
                });
                return;
            }
            //Finalizamos de validar la pregunta

            //Validamos el campo de la respuesta
            var respuesta = document.getElementById("respuesta").value;
            if (respuesta == null || respuesta == "") {
                new PNotify({
                    title: "Error.",
                    text: "Debe ingresar una respuesta.",
                    type: "error"
                });
                return;
            }
            if (respuesta.length <= 2) {
                new PNotify({
                    title: "Error.",
                    text: "Debe ingresar una respuesta valida.",
                    type: "error"
                });
                return;
            }
            //Finalizamos de validar la respuesta


            var url = "";
            var msmExito = "";

            data.pregunta_IdPregunta = $scope.selectPreguntas.selectedOption.idPregunta;

            url = "/Registrarse/RegistrarUsuario/";
            msmExito = "Usuario registrado correctamente.";

            //if (form.validate()) {

            $http.post(url, data)
                .success(function (res) {

                    var tipo = (res.msm == 'Operacion exitosa') ? "success" : "error";
                    new PNotify({
                        title: res.msm,
                        text: msmExito,
                        type: tipo
                    });
                    $scope.ResetForm();
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.RegistrarUsuario',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
            //}            
        }


        /* Listar preguntas */
        $scope.ListarPreguntas = function () {
            $http.post('/Registrarse/ListarPreguntas/', {
            })
                .success(function (res) {
                    $scope.selectPreguntas.options = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarPreguntas',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }

        // Para saber si una variable se ha definido 
        function isDefined(variable) {
            return (typeof (window[variable]) == "undefined") ? false : true;
        }

        // Validación para el formulario Registrar Pedido
        $scope.V_FormRegUsuario = {
            rules: {
                identificacion: {
                    RE_Numbers: true
                },
                nombres: {
                    required: true
                },
                apellidos: {
                    required: true
                }
            }
        }
    });
})();