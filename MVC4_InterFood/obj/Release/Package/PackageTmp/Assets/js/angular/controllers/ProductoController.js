'use strict';

(function () {


    app.controller('ProductoController', function ($scope, $http, Fabrica) {

        // Lista de productos
        $scope.listaProductos = [];


        // ng-model para formulario de producto
        $scope.DatosFormRegProducto = {
            idProducto : 0,
            descripcionProducto: "",
            marca: "",
            cantidadProducto: 0,
            precio: 0,
            idTipoProducto: 0
        }

        // ng-model para select tipos de productos
        $scope.selectTipoProducto = {
            options: [],
            // Opción por default
            selectedOption: {
                idTipoProducto: 1
            } 
        };

        // Controla si se edita o modifica
        $scope.esModificar = false;




        /**
         * Listar todos los PRODUCTOS
         */
        $scope.ListarProductos = function () {

            $http.post('/Producto/ListarProductos/')
                .success(function (res) {
                    $scope.listaProductos = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarProductos',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });

        }


        /**
         * Consulatar producto 
         */
        $scope.ConsultarProducto = function (id) {
            $scope.esModificar = true;
            $scope.ListarTiposProducto();

            var producto;
            angular.forEach($scope.listaProductos, function (value, key) {
                if (value.idProducto == id ) {
                    producto = value;
                }
            });
           

            var form = $scope.DatosFormRegProducto;
            
            form.idProducto = producto.idProducto;
            form.descripcionProducto = producto.descripcionProducto;
            form.marca = producto.marca;
            form.cantidadProducto = producto.cantidadProducto;
            form.precio = producto.precio;
            $scope.selectTipoProducto.selectedOption.idTipoProducto = producto.idTipoProducto;
        }


         /**
         * Dejar el formulario igual que como inicia la web
         */
        $scope.ResetForm = function () {
            var producto = $scope.DatosFormRegProducto;
            producto.descripcionProducto = "";
            producto.marca = "";
            producto.cantidadProducto = 0;
            producto.precio = 0;
            $scope.selectTipoProducto.selectedOption.idTipoProducto = 1;
            $scope.esModificar = false;
        }


        /**
         * Registrar o Modificar producto
         */
        $scope.GestionarProducto = function (form, data) {
            var url = "";
            var msmExito = "";
            data.idTipoProducto = $scope.selectTipoProducto.selectedOption.idTipoProducto;

            if (!$scope.esModificar) {
                url = "/Producto/RegistrarProducto/";
                msmExito = "Producto registrado correctamente.";
                $scope.esModificar = false;
            } else {
                url = "/Producto/ModificarProducto";
                msmExito = "Producto modificado correctamente.";
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

                        $scope.ListarProductos();
                        $scope.ResetForm();

                    })
                    .error(function (res, status) {
                        new PNotify({
                            title: 'Error: ' + status + ' $scope.GestionarProducto',
                            text: res.msm,
                            type: 'error',
                            hide: false
                        });
                    });

            }
            
        }


        /**
         * Eliminar producto
         */
        $scope.EliminarProducto= function (idProducto) {
            $http.post('/Producto/EliminarProducto/', {
                'idProducto': idProducto
            })
                .success(function (res) {
                    var tipo = (res.msm == 'Operacion exitosa') ? "success" : "error";
                    var msmExito = (res.msm == 'Operacion exitosa') ? "Producto eliminado." : "Error al eliminar el producto.";

                    new PNotify({
                        title: res.msm,
                        text: msmExito,
                        type: tipo
                    });

                    $scope.ListarProductos();
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarTiposProducto',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });

        }


        
        /**
         * Listar tipos de producto
         */
        $scope.ListarTiposProducto = function () {

            $http.post('/Producto/ListarTiposProducto/', {
                idZona: $scope.locacionMesa
            })
                .success(function (res) {
                    $scope.selectTipoProducto.options = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarTiposProducto',
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
        $scope.V_FormRegPoducto = {
            rules: {
                cantidadProducto: {
                    RE_Numbers: true
                },
                idTipoProducto: {
                    required: true
                }

            }
        }

     


    });


})();