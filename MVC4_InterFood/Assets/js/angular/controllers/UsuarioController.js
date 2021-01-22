'use strict';
(function () {
    app.controller('UsuarioController', function ($scope, $http, Fabrica) {

        // Lista de usuarios
        $scope.listaUsuarios = [];

        // ng-model para formulario de producto
        $scope.DatosFormRegUsuario = {
            identificacion : 0,
            nombres: "",
            apellidos: "",
            idDepartamento: 2,
            idCiudad: 1,
            direccionResidencia: "",
            email: "",
            estadoCuenta: "",
            fechaNacimiento: "",
            password: "",
            respuesta: "",
            tipoUsuario_IdTipo: 1,
            pregunta_IdPregunta: 1
        }

        // ng-model para select tipos de productos
        $scope.selectTipoUsuario = {
            options: [],
            // Opción por default
            selectedOption: {
                idTipoUsuario: 1
            } 
        };

        // ng-model para select departamentos
        $scope.selectDepartamento = {
            options: [],
            // Opción por default
            selectedOption: {
                idDepartamento: 2
            } 
        };

        // ng-model para select ciudades
        $scope.selectCiudad = {
            options: [],
            // Opción por default
            selectedOption: {
                idCiudad: 1
            }
        };

        $scope.selectPregunta = {
            options: [],
            // Opción por default
            selectedOption: {
                idPregunta: 1
            }
        };

        // Controla si se edita o modifica
        $scope.esModificar = false;


        /**
         * Listar todos los usuarios
         */
        $scope.ListarUsuarios = function () {

            $http.post('/Usuario/ListarUsuarios/')
                .success(function (res) {
                    $scope.listaUsuarios = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarUsuarios',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }

        /* Consulatar usuario  */
        $scope.ConsultarUsuario = function (id) {

            $scope.esModificar = true;

            $scope.ListarTiposUsuario();
            $scope.ListarDepartamentos();
            $scope.ListarCiudades();
            $scope.ListarPreguntas();

            var usuario;
            angular.forEach($scope.listaUsuarios, function (value, key) {
                if (value.identificacion == id) {
                    usuario = value;
                }
            });
           
            var form = $scope.DatosFormRegUsuario;
            
            form.identificacion = usuario.identificacion;
            form.nombres = usuario.nombres;
            form.apellidos = usuario.apellidos;
            $scope.selectDepartamento.selectedOption.idDepartamento = usuario.idDepartamento;
            $scope.selectCiudad.selectedOption.idCiudad = usuario.idCiudad;
            form.direccionResidencia = usuario.direccionResidencia;
            form.email = usuario.email;
            form.estadoCuenta = usuario.estadoCuenta;
            form.fechaNacimiento = usuario.fechaNacimiento;
            form.password = usuario.password;
            form.respuesta = usuario.respuesta;
            $scope.selectTipoUsuario.selectedOption.idTipoUsuario = usuario.tipoUsuario_IdTipo;
            $scope.selectPregunta.selectedOption.idPregunta = usuario.pregunta_IdPregunta;
        }


         /**
         * Dejar el formulario igual que como inicia la web
         */
        $scope.ResetForm = function () {
            var usuario = $scope.DatosFormRegUsuario;
            usuario.identificacion = 0;
            usuario.nombres = "";
            usuario.apellidos = "";
            $scope.selectDepartamento.selectedOption.idDepartamento = 2;
            $scope.selectCiudad.selectedOption.idCiudad = 1;
            usuario.direccionResidencia = "";
            usuario.email = "";
            usuario.estadoCuenta = "";
            usuario.fechaNacimiento = "";
            usuario.password = "";
            usuario.respuesta = "";
            $scope.selectTipoUsuario.selectedOption.idTipoUsuario = 1;
            $scope.selectPregunta.selectedOption.idPregunta = 1;
            $scope.esModificar = false;
        }


        /**
         * Registrar o Modificar usuario
         */
        $scope.GestionarUsuario = function (form, data) {
            var url = "";
            var msmExito = "";

            data.tipoUsuario_IdTipo = $scope.selectTipoUsuario.selectedOption.idTipoUsuario;
            data.pregunta_IdPregunta = $scope.selectPregunta.selectedOption.idPregunta;
            data.idDepartamento = $scope.selectDepartamento.selectedOption.idDepartamento;
            data.idCiudad = $scope.selectCiudad.selectedOption.idCiudad;
            
            if (!$scope.esModificar) {
                url = "/Usuario/RegistrarUsuario/";
                msmExito = "Usuario registrado correctamente.";
                $scope.esModificar = false;
            } else {
                url = "/Usuario/ModificarUsuario";
                msmExito = "Usuario modificado correctamente.";
                $scope.esModificar = true;
            } 

            if (form.validate()) {

                $http.post(url, data)
                    .success(function (res) {

                        var tipo = (res.msm == 'Operacion exitosa') ? "success" : "error";
                        new PNotify({
                            title: res.msm,
                            text: msmExito,
                            type: tipo
                        });

                        $scope.ListarUsuarios();
                        $scope.ResetForm();

                    })
                    .error(function (res, status) {
                        new PNotify({
                            title: 'Error: ' + status + ' $scope.GestionarUsuario',
                            text: res.msm,
                            type: 'error',
                            hide: false
                        });
                    }); 
            }
        }
       
        /* Listar tipos de usuario */
        $scope.ListarTiposUsuario = function () {
            $http.post('/Usuario/ListarTiposUsuarios/', {
                //idZona: $scope.locacionMesa
            })
                .success(function (res) {
                    $scope.selectTipoUsuario.options = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarTiposUsuarios',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }

        /* Listar tipos de departamentos */
        $scope.ListarDepartamentos = function () {
            $http.post('/Usuario/ListarDepartamentos/', {
                //idZona: $scope.locacionMesa
            })
                .success(function (res) {
                    $scope.selectDepartamento.options = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarDepartamentos',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }

        /* Listar tipos de preguntas */
        $scope.ListarPreguntas = function () {
            $http.post('/Usuario/ListarPreguntas/', {
                //idZona: $scope.locacionMesa
            })
                .success(function (res) {
                    $scope.selectPregunta.options = res;
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


        $scope.ListarCiudades = function () {

            $http.post('/Usuario/ListarCiudades/', {
                //idZona: $scope.locacionMesa
            })
                .success(function (res) {
                    $scope.selectCiudad.options = res;
                })
                .error(function (res, status) {
                    new PNotify({   
                        title: 'Error: ' + status + ' $scope.ListarCiudades',
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

        /**
         * Paginador de productos 
         */
        $scope.currentPage = 1;
        $scope.pageSize = 6;
     

        // Validación para el formulario Registrar Pedido
        $scope.V_FormRegUsuario = {
            rules: {
                idTipoProducto: {
                    required: true
                }
            }
        }
    });
})();