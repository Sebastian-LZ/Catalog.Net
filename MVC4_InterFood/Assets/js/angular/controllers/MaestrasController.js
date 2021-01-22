/// <reference path="MaestrasController.js" />
'use strict';
(function () {
    app.controller('MaestrasController', function ($scope, $http) {

        // Objeto que almacena la informaciòn de las tablas 
        $scope.tablas = [
             {
                 nombreTabla: "talla",
                 esModificar: false,
                 tieneEstado: true,
                 desactivarRegistro: false,
                 primaryKey: "idTalla",
                 infoColumnas: [],
                 valuesInpus: {},
             },
            {
                nombreTabla: "tipoProducto",
                esModificar: false,
                tieneEstado: true,
                desactivarRegistro: false,
                primaryKey: "idTipoProducto",
                infoColumnas: [],
                valuesInpus: {},
            },
            {
                nombreTabla: "subTipoProducto",
                esModificar: false,
                tieneEstado: true,
                desactivarRegistro: false,
                primaryKey: "idSubTipo",
                infoColumnas: [],
                valuesInpus: {},
            },
            {
                nombreTabla: "clasificacionProducto",
                esModificar: false,
                tieneEstado: true,
                desactivarRegistro: false,
                primaryKey: "idClasificacionProducto",
                infoColumnas: [],
                valuesInpus: {},
            },
            {
                nombreTabla: "tipoUsuario",
                esModificar: false,
                tieneEstado: true,
                desactivarRegistro: false,
                primaryKey: "idTipoUsuario",
                infoColumnas: [],
                valuesInpus: {},
            },
            {
                nombreTabla: "pregunta",
                esModificar: false,
                tieneEstado: true,
                desactivarRegistro: false,
                primaryKey: "idPregunta",
                infoColumnas: [],
                valuesInpus: {},
            },
            {
                nombreTabla: "motivoCambio",
                esModificar: false,
                tieneEstado: true,
                desactivarRegistro: false,
                primaryKey: "idMotivoCambio",
                infoColumnas: [],
                valuesInpus: {},
            },
            {
                nombreTabla: "motivoAgenda",
                esModificar: false,
                tieneEstado: true,
                desactivarRegistro: false,
                primaryKey: "idMotivoAgenda",
                infoColumnas: [],
                valuesInpus: {},
            },
            {
                nombreTabla: "diseno",
                esModificar: false,
                tieneEstado: true,
                desactivarRegistro: false,
                primaryKey: "idDiseno",
                infoColumnas: [],
                valuesInpus: {},
            }
        ];


        // Lista de datos de cualquier tabla
        $scope.listaTabla = [];

        // Objeto consultado
        $scope.objConsulta;

        // Información de la tabla seleccionada en el tab
        $scope.tablaActual = {};


        /**
         * Consultar estructura de columnas de una tabla
         */
        $scope.ConsulatarColumnas = function () {

            var url = '/Configuracion/ConsulatarColumnas/';

            angular.forEach($scope.tablas, function (value, key) {

                $http.post(url, { "tablaNombre": value.nombreTabla })
                .success(function (res) {
                    value.infoColumnas = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error al consultar ifo columnas: ' + tablaNombre + ' ' + status,
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
            });
        }


        /**
         * Listar 
         */
        $scope.Listar = function (nombreTabla) {
            $http.post('/Configuracion/Listar/', { "nombreTabla": nombreTabla })
                .success(function (res) {
                    $scope.listaTabla = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error al listar: ' + nombreTabla + ' ' + status,
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });

        }


        /**
        * Crea los ng-model para el formulario que se genera dinamicamente
        */
        $scope.GenerarNgModelsForm = function (nombreTabla) {
            $scope.tablaActual.esModificar = false;

            angular.forEach($scope.tablas, function (value, key) {
                if (value.nombreTabla === nombreTabla) {

                    var valusInpus = '{';
                    var coma = '';

                    angular.forEach(value.infoColumnas, function (value1, key1) {
                        coma = (key1 === value.infoColumnas.length - 1) ? '' : ',';

                        if (value1.tipo !== 'varchar') {
                            valusInpus += ' "' + value1.nombreColumna + '": 0' + coma + ' ';
                        } else {
                            valusInpus += ' "' + value1.nombreColumna + '": ""' + coma + ' ';
                        }
                    });
                    valusInpus += '}';
                    $scope.tablaActual.valuesInpus = JSON.parse(valusInpus);
                }
            });
        }



        /**
         * Cambiar de tab 
         */
        $scope.cambiarTab = function (nombreTabla, textBtnModal) {
            $scope.Listar(nombreTabla);
            $scope.textBtnModal = textBtnModal;
            var indice;

            angular.forEach($scope.tablas, function (value, key) {
                if (value.nombreTabla === nombreTabla) {
                    indice = key;
                }
            });

            $scope.tablaActual = $scope.tablas[indice];
            $scope.GenerarNgModelsForm(nombreTabla);
        }

        /* Consultar  */
        $scope.Consultar = function (tablaNombre, id) {
            $scope.tablaActual.esModificar = true;

            var elemento;
            angular.forEach($scope.listaTabla, function (value, key) {
                if (value[$scope.tablaActual.primaryKey] == id) {
                    elemento = value;
                }
            });

            $scope.tablaActual.valuesInpus = elemento;
        }




        /**
         * Registrar o Modificar 
         */
        $scope.GestionarTabla = function (form) {

            var url = "";
            var msmExito = "";

            if (!$scope.tablaActual.esModificar) {
                url = "/Configuracion/Registrar/";
                msmExito = "Registro realizado correctamente.";
                $scope.tablaActual.esModificar = false;
            } else {
                url = "/Configuracion/Modificar/";
                msmExito = "Registro modificado correctamente.";
                $scope.tablaActual.esModificar = true;
            }

            if (form.validate()) {

                $http.post(url, {
                    "nombreTabla": $scope.tablaActual.nombreTabla,
                    "datos": JSON.stringify($scope.tablaActual.valuesInpus)
                })
                 .success(function (res) {

                     var tipo = (res == 'Operacion exitosa') ? "success" : "error";
                     var titulo = (res == 'Operacion exitosa') ? "Operación exitosa." : "Error";
                     var msm = (res == 'Operacion exitosa') ? msmExito : res.msm;

                     new PNotify({
                         title: titulo,
                         text: msm,
                         type: tipo
                     });

                     $scope.Listar($scope.tablaActual.nombreTabla);
                     $scope.GenerarNgModelsForm($scope.tablaActual.nombreTabla);
                 })
                 .error(function (res, status) {
                     new PNotify({
                         title: 'Error: ' + status + ' $scope.GestionarTabla',
                         text: res.msm,
                         type: 'error',
                         hide: false
                     });
                 });

            }

        }


        /**
         * Inhabilitar o Habilitar
         */
        $scope.CambiarEstado = function (nombreTabla, id, estado) {
            var url;

            if (estado == 'Activo') {
                url = '/Configuracion/Inhabilitar/';
            } else {
                url = '/Configuracion/Habilitar/';
            }

            $http.post(url, {
                "nombreTabla": $scope.tablaActual.nombreTabla,
                "id": parseInt(id)
            })
                .success(function (res) {
                    var msm = (estado == 'Activo') ? "Registro inhabilitado." : "Registro habilitado."
                    var tipo = (res == 'Operacion exitosa') ? "success" : "error";
                    var msmExito = (res == 'Operacion exitosa') ? msm : res.msm;

                    new PNotify({
                        title: res,
                        text: msmExito,
                        type: tipo
                    });

                    $scope.Listar(nombreTabla);
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.CambiarEstado',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });

        }


        /**
         * Paginador de las tablas
         */
        $scope.currentPage = 1;
        $scope.pageSize = 6;



        /**
         * Se ejecuta cuando carga la página 
         */
        $scope.init = function () {
            // Carga los datos de las columnas de cada tabla en el array $scope.tablas
            $scope.ConsulatarColumnas();
            $scope.cambiarTab('talla', 'Nueva Talla');
            //$scope.tablaActual = $scope.tablas[1];
        }


        // Validación para el formulario de maestras
        $scope.V_FormMaestras = {
            rules: {
                talla: {
                    lettersonly: true,
                    required: true,
                    maxlength: 45
                },
                descripcionTipoProducto: {
                    lettersonly: true,
                    required: true,
                    maxlength: 45
                },
                descripcionTipoUsuario: {
                    lettersonly: true,
                    required: true,
                    maxlength: 45
                },
                descripcionTipoEnser: {
                    lettersonly: true,
                    required: true,
                    maxlength: 45
                },
                descripcionConfiguracion: {
                    required: true,
                    maxlength: 45
                },
                valor: {
                    RE_NumbersIntDecimal: true,
                    required: true
                }
            }
        }
    }); // Fin controlador
})();