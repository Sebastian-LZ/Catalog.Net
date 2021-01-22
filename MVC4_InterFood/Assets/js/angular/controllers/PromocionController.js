'use strict';
(function () {
    app.controller('PromocionController', function ($scope, $http, Fabrica) {

        // Lista de productos
        $scope.listaPromociones = [];

        // Lista de productos
        $scope.productos = [];

        // ng-model para formulario de producto
        $scope.DatosFormRegPromocion = {
            idPromocion: 0,
            nombrePromocion: "",
            descripcion: "",
            porcentaje: 0,
            efectivo: 0,
            vigencia: "",
            estado: ""
        }

        // ng-model para consultar de producto
        $scope.DatosFormConsultarPromocion = {
            idPromocion: 0,
            nombrePromocion: "",
            descripcion: "",
            porcentaje: 0,
            efectivo: 0,
            vigencia: "",
            estado: ""
        }

        $scope.DatosFormConsultarProd = {
            IdProducto: 0,
            referencia: 0,
            descripcionProducto: "",
            inventario: 0,
            stockMinimo: 0,
            estadoProducto: "",
            precioVenta: 0,
            edicionLimitada: "",
            precio: 0
        }

        // ng-model para select subtipos de productos
        $scope.selectTalla = {
            options: [],
            // Opción por default
            selectedOption: {
                idTalla: 1
            }
        };

        // ng-model para select referencias
        $scope.selectReferencia = {
            options: [],
            // Opción por default
            selectedOption: {
                idReferencia: 1
            }
        };

        // ng-model para select tipos de productos
        $scope.selectClasificaciones = {
            options: [],
            // Opción por default
            selectedOption: {
                idClasificacionProducto: 1
            } 
        };

        // ng-model para select subtipos de productos
        $scope.selectPromociones = {
            options: [],
            // Opción por default
            selectedOption: {
                idPromocion: 1
            }
        };


        /* Listar todos los PRODUCTOS */
        $scope.ListarProd = function () {
            $http.post('/Movimiento/ListarProductos/')
                .success(function (res) {
                    $scope.productos = res;
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

        /* Consulatar producto */
        $scope.ConsultarProducto = function () {

            var cod = document.getElementById("talla").value;
            $scope.ListarProd();

            alert("insiencio " + cod);

            if (cod == '?') {
                $scope.precioVenta = "";
                $scope.descripcionProducto = "";
                $scope.inventario = "";
                $scope.descuentoPromo = "";
                $scope.precioFinal = "";
                return;
            }

            var producto;
            angular.forEach($scope.productos, function (value, key) {
                if (value.IdProducto == cod) {
                    producto = value;
                }
            });
                     
            var efectivo = $('#efectivo1').val();
            var porcentaje = $('#porcentaje1').val();

            var descuento = 0, valorTotal = 0;
            if (efectivo > 0) {
                descuento =  efectivo;
                valorTotal = producto.precio - descuento;
            } else {
                descuento = producto.precio * porcentaje / 100;
                valorTotal = producto.precio - descuento;
            }

            $scope.precioVenta = producto.precio;
            $scope.descripcionProducto = producto.descripcionProducto;
            $scope.inventario = producto.inventario;
            $scope.descuentoPromo = descuento;
            $scope.precioFinal = valorTotal;
        }


        $scope.ConsultarPromocionSeleccionada = function () {

            var id = document.getElementById("idPromocion").value;

            var promocion;
            angular.forEach($scope.listaPromociones, function (value, key) {
                if (value.idPromocion == id) {
                    promocion = value;
                }
            });

            var form = $scope.DatosFormConsultarPromocion;

            form.idPromocion = promocion.idPromocion;
            form.nombrePromocion = promocion.nombrePromocion;
            form.descripcion = promocion.descripcion;
            form.porcentaje = promocion.porcentaje;
            form.efectivo = promocion.efectivo;
            form.vigencia = promocion.vigencia;
            form.estado = promocion.estado;

            $scope.precioVenta = "";
            $scope.descripcionProducto = "";
            $scope.inventario = "";
            $scope.descuentoPromo = "";
            $scope.precioFinal = "";
        }


        /* Asignar promocion al producto */
        $scope.asignarPromocion = function () {

            /* Para obtener el valor del combo */
            var cod = document.getElementById("referencia").value;
            var talla = document.getElementById("talla").value;
            var promocion = document.getElementById("idPromocion").value;

            alert("cod " + cod);
            alert("talla " + talla);
            alert("promo " + promocion);

            $http.post('/Producto/AsignarPromocion/', {
                'Id_producto': cod,
                'Id_promocion': promocion,
                'Id_talla': talla
            })
                .success(function (res) {
                    new PNotify({
                        title: 'Error: ' + status + ' Producto agregado a la promoción.',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' joderrr $scope.obtenerTallas',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }

        /* Listar tallas */
        $scope.obtenerTallas = function () {

            /* Para obtener el valor del combo */
            var cod = document.getElementById("referencia").value;

            $http.post('/Movimiento/obtenerTallas/', {
                'referencia': cod
            })
                .success(function (res) {
                    $scope.selectTalla.options = res;
                    $scope.precioVenta = "";
                    $scope.descripcionProducto = "";
                    $scope.inventario = "";
                    $scope.descuentoPromo = "";
                    $scope.precioFinal = "";
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.obtenerTallas',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }

        /* Listar promociones */
        $scope.ListadoPromociones = function () {
            $http.post('/Producto/ListarPromociones/', {
                //idZona: $scope.locacionMesa
            })
                .success(function (res) {
                    $scope.selectPromociones.options = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarPromociones',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }

        // Controla si se edita o modifica
        $scope.esModificar = false;

        /* Listar referencias */
        $scope.ListarReferencias = function () {
            $http.post('/Movimiento/ListarReferencia/', {
            })
                .success(function (res) {
                    $scope.selectReferencia.options = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarReferencia',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }
        

        /* Listar todas las PROMOCIONES */
        $scope.ListarPromociones = function () {            
            $http.post('/Promocion/ListarPromociones/')
                .success(function (res) {
                    $scope.listaPromociones = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarPromociones',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }


        /* Consulatar producto */
        $scope.ConsultarPromocion = function (id) {
            $scope.esModificar = true;

            //$scope.ListarClasificaciones();
            //$scope.ListarTallas();
            //$scope.ListarPromociones();

            var promocion;
            angular.forEach($scope.listaPromociones, function (value, key) {
                if (value.idPromocion == id ) {
                    promocion = value;
                }
            });

            var form = $scope.DatosFormRegPromocion;
            form.idPromocion = promocion.idPromocion;
            form.nombrePromocion = promocion.nombrePromocion;
            form.descripcion = promocion.descripcion;
            form.porcentaje = promocion.porcentaje;

            if (promocion.efectivo > 0) {
                $('#tipoPromo option[value=0]').prop('selected', 'selected').change();
            } else {
                $('#tipoPromo option[value=1]').prop('selected', 'selected').change();
            }

            form.efectivo = promocion.efectivo;
            form.vigencia = promocion.vigencia;
            form.estado = promocion.estado;
        }

         /* Dejar el formulario igual que como inicia la web */
        $scope.ResetForm = function () {
            var promocion = $scope.DatosFormRegPromocion;
            promocion.idPromocion = 0;
            promocion.nombrePromocion = "";
            promocion.descripcion = "";
            promocion.porcentaje = 0;
            promocion.efectivo = 0;
            promocion.vigencia = "";
            promocion.estado = "";
           $scope.esModificar = false;
        }


        /* Registrar o Modificar promocion */
        $scope.GestionarPromocion = function (form, data) {
            var url = "";
            var msmExito = "";
            //data.bdPromocion_IdPromocion = $scope.selectPromociones.selectedOption.idPromocion;
            //data.bdClasificacionProducto_IdClasificacionProducto = $scope.selectClasificaciones.selectedOption.idClasificacionProducto;
            //data.bdTalla_IdTalla = $scope.selectTallas.selectedOption.idTalla;
            
            if (!$scope.esModificar) {
                url = "/Promocion/RegistrarPromocion/";
                msmExito = "Promocion registrado correctamente.";
                $scope.esModificar = false;
            } else {
                url = "/Promocion/ModificarPromocion";
                msmExito = "Promocion modificado correctamente.";
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

                        $scope.ListarPromociones();
                        $scope.ResetForm();

                    })
                    .error(function (res, status) {
                        new PNotify({
                            title: 'Error: ' + status + ' $scope.GestionarPromocion',
                            text: res.msm,
                            type: 'error',
                            hide: false
                        });
                    });

            }
            
        }



        /* Listar clasificaciones */
        $scope.ListarClasificaciones = function () {

            $http.post('/Producto/ListarClasificaciones/', {
                //idZona: $scope.locacionMesa
            })
                .success(function (res) {
                    $scope.selectClasificaciones.options = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarClasificaciones',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }

        /* Listar tallas */
        //$scope.ListarTallas = function () {
        //    $http.post('/Producto/ListarTallas/', {
        //        //idZona: $scope.locacionMesa
        //    })
        //        .success(function (res) {
        //            $scope.selectTallas.options = res;
        //        })
        //        .error(function (res, status) {
        //            new PNotify({
        //                title: 'Error: ' + status + ' $scope.ListarTallas',
        //                text: res.msm,
        //                type: 'error',
        //                hide: false
        //            });
        //        });
        //}


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
        $scope.V_FormRegPromocion = {
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