'use strict';
(function () {
    app.controller('MovimientoController', function ($scope, $http, Fabrica, $sessionStorage) {

        // Lista de movimientos
        $scope.listaMovimientos = [];

        // Lista de productos
        $scope.productos = [];

        // ng-model para formulario de movimiento
        $scope.DatosFormRegMovimiento = {
            idMovimiento: 0,
            usuarios_identificacion: "",
            direccion: "",  
            numeroComunicacion: "",
            descripcion: "",
            fecha_movimiento: "",
            descripcioMovimiento: "",
            estado: "",
            subtotal: 0,
            descuento: 0,
            iva: 0,
            total: 0
        }

        $scope.DatosFormRegProd = {
            IdProducto: 0,
            referencia: 0,
            descripcionProducto: "",
            inventario: 0,
            stockMinimo: 0,
            estadoProducto: "",
            precioCompra: 0,
            edicionLimitada: "",
            precio: 0
        }

        // ng-model para select referencias
        $scope.selectReferencia = {
            options: [],
            // Opción por default
            selectedOption: {
                idReferencia: 1
            }
        };

        // ng-model para select tipo de movimiento
        $scope.selectTipoMovimiento = {
            options: [],
            // Opción por default
            selectedOption: {
                idTipoMovimiento: 1
            }
        };

        // ng-model para select usuario
        $scope.selectUsuario = {
            options: [],
            // Opción por default
            selectedOption: {
                idUsuario: 1
            }
        };

        // ng-model para select talla
        $scope.selectTalla = {
            options: [],
            // Opción por default
            selectedOption: {
                idProducto: 1
            }
        };

        
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

        /* Listar tipo de movimiento */
        $scope.ListarTipoMovimiento = function () {
            $http.post('/Movimiento/ListarTipoMovimiento/', {
            })
                .success(function (res) {
                    $scope.selectTipoMovimiento.options = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarTipoMovimiento',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }

        /* Listar usuarios */
        $scope.ListarUsuarios = function () {
            $http.post('/Movimiento/ListarUsuarios/', {
            })
                .success(function (res) {
                    $scope.selectUsuario.options = res;
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

        /* Listar tallas */
        $scope.obtenerTallas = function () {
            document.getElementById("descripcion").value = "";
            document.getElementById("inventario").value = "";
            document.getElementById("precioU").value = "";
            document.getElementById("cant").value = "";
            document.getElementById("descuento").value = "";

            /* Para obtener el valor del combo */
            var cod = document.getElementById("referencia").value;

            $http.post('/Movimiento/obtenerTallas/', {
                'referencia': cod
            })
                .success(function (res) {
                    $scope.selectTalla.options = res;
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

            var producto;
            
            angular.forEach($scope.productos, function (value, key) {
                if (value.IdProducto == cod) {
                    producto = value;
                }
            });

            var form = $scope.DatosFormRegProd;

            form.IdProducto = producto.IdProducto;
            form.referencia = producto.referencia;
            form.descripcionProducto = producto.descripcionProducto;
            form.inventario = producto.inventario;
            form.stockMinimo = producto.stockMinimo;
            form.estadoProducto = producto.estadoProducto;
            form.precioCompra = producto.precioCompra;
            form.edicionLimitada = producto.edicionLimitada;
            form.precio = producto.precio;
        }

        /* Listar movimientos */
        $scope.ListarMovimientos = function () {
            $http.post('/Movimiento/ListarMovimientos/')
                .success(function (res) {
                    $scope.listaMovimientos = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarMovimientos',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }

         /* Dejar el formulario igual que como inicia la web */
        $scope.ResetForm = function () {
            var movimiento = $scope.DatosFormRegMovimiento;
            movimiento.idMovimiento = 0;
            movimiento.usuarios_identificacion = "";
            movimiento.direccion = "";
            movimiento.numeroComunicacion = "";
            movimiento.descripcion = "";
            movimiento.fecha_movimiento = "";
            movimiento.descripcioMovimiento = "";
            movimiento.estado = "";
            movimiento.subtotal = 0;
            movimiento.descuento = 0;
            movimiento.iva = 0;
            movimiento.total = 0;
           //$scope.selectPromociones.selectedOption.idPromocion = 1;
           //$scope.selectClasificaciones.selectedOption.idClasificacionProducto = 1;
           //$scope.selectTallas.selectedOption.idTalla = 1;
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
        $scope.pageSize1 = 6;
     

        // Validación para el formulario Registrar Pedido
        $scope.V_FormRegMovimiento = {
            rules: {
                cantidadProducto: {
                    RE_Numbers: true
                },
                idTipoProducto: {
                    required: true
                }
            }
        }


























        // Lista de productos
        $scope.listaProductos1 = $sessionStorage.SS_listaProductos1 || [];

        // Lista de cantidad de unidades por producto
        $scope.listaProductoCantidad1 = $sessionStorage.SS_llistaProductoCantidad1 || [];

        // Controla si se edita o modifica
        $scope.esModificar1 = false;

        // Lista de productos para la compra
        $scope.listaProductosPedido1 = $sessionStorage.SS_listaProductosPedido1 || [];


        // Vigila si hay un servicio activo
        $scope.HayPedidoActivo1 = $sessionStorage.SS_HayPedidoActivo1 || false;

        // Datos para la grafica
        $scope.pagoTotal1 = 0;
        $scope.pagoNeto1 = 0;
        $scope.iva1 = 0;
        $scope.propina1 = 0;
        $scope.cantidadProductos1 = 0;

        /* Listar todos los PRODUCTOS */
        $scope.ListarProductos1 = function () {

            $http.post('/Mesero/ListarProductos/')
                .success(function (res) {
                    $scope.listaProductos1 = res;

                    angular.forEach(res, function (value, key) {
                        var obj = {
                            id: value.idTipoProducto,
                            cantidad: value.cantidadProducto
                        }
                        $scope.listaProductoCantidad1.push(obj);
                    });

                    // Respaldar datos en SessionStorage
                    $scope.RespaldarDatos1(true);

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
         * Respaldar los datos temporales con SessionStorage
         */
        $scope.RespaldarDatos1 = function (esReseet) {


            // Reseter todo y volver a consultar via ajax los productos
            if (!esReseet) {
                $scope.HayPedidoActivo1 = false;
                $scope.listaProductoCantidad1 = [];
                $scope.listaProductosPedido1 = [];
                $scope.ListarProductos1();
            }

            $sessionStorage.SS_HayPedidoActivo1 = $scope.HayPedidoActivo1;
            $sessionStorage.SS_listaProductos1 = $scope.listaProductos1;
            $sessionStorage.SS_listaProductosPedido1 = $scope.listaProductosPedido1;
            $sessionStorage.SS_llistaProductoCantidad1 = $scope.listaProductoCantidad1;
        }


        /* Agregar producto al pedido del cliente */
        $scope.AgregarProductoPedido1 = function (nombre, precio, cantidad, descuento) {

            var producto = document.getElementById("talla").value;

            if (descuento == null) {
                descuento = 0;
            }

            var obj;

            // Objeto temporar para luego agregarlo a la lista del pedido
            function CrearObjTemp1() {
                obj = {
                    id: producto,
                    nombre: nombre,
                    cantidad: cantidad,
                    precio: precio,
                    subtotal: (cantidad * precio),
                    descuento: descuento
                }
            }

            // Agregar objeto creado al arreglo
            function AgregarObj1() {
                // Agregar producto al arreglo temporal listaProductosPedido
                $scope.listaProductosPedido1.push(obj);

                //// Disminuir la cantidad del unidades del producto en la vista
                producto.inventario -= cantidad;
            }

            // Validar si es el primer producto que se va agregar
            if ($scope.listaProductosPedido1.length === 0) {

                $scope.HayPedidoActivo1 = true;

                CrearObjTemp1();
                AgregarObj1();
            } else {
                var productoFueEncontrado1 = false;

                // Consulatar si el pruducto ya fué agregado
                angular.forEach($scope.listaProductosPedido1, function (value, key) {
                    if (producto === value.id) {

                        // Actualizar la cnatidad del producto
                        value.cantidad += cantidad;

                        // Actualizo el subtotal
                        value.subtotal += (cantidad * precio);

                        // Actualizo el descuento
                        value.descuento += descuento;

                        //// Disminuir la cantidad del unidades del producto en la vista
                        //producto.inventario -= cantidad;

                        productoFueEncontrado1 = true;
                    } else {
                        productoFueEncontrado1 = false;
                    }
                });

                // Si el producto no esta en el arreglo entonces
                if (!productoFueEncontrado1) {
                    CrearObjTemp1();
                    AgregarObj1();
                }
            }

            // Respaldar datos en SessionStorage
            $scope.RespaldarDatos1(true);

        }






        /**
         * Eliminar producto del arreglo de pedidos
         */
        $scope.EliminarProductoPedido = function (producto, cantidad) {

            angular.forEach($scope.listaProductosPedido1, function (value, key) {

                // Si encuentra el producto
                if (producto.IdProducto === value.id) {

                    // Si se intenta eliminar mas productos de los que se tienen
                    if (cantidad > value.cantidad) {

                        new PNotify({
                            title: 'Error en la operación ',
                            text: 'En el pedido no tienes tantos productos.',
                            type: 'error'
                        });

                    } else {

                        if (cantidad > 0) {
                            // Actualizar la cantidad del producto
                            value.cantidad -= cantidad;

                            // Actualizo el subtotal
                            value.subTotal -= (cantidad * producto.precio);

                            // Aumentar la cantidad del unidades del producto en la vista
                            producto.inventario += cantidad;

                            // Si la cantidad del producto es 0 entonces lo elimino del arreglo
                            if (value.cantidad === 0) {
                                $scope.listaProductosPedido1.splice(key, 1);
                            }

                        } else {
                            new PNotify({
                                title: 'Error en la operación ',
                                text: 'Debes especificar al menos un 1 producto para eleminar.',
                                type: 'error'
                            });
                        }
                    }
                }
            });

            // Validar si no hay productos en el pedido
            if ($scope.listaProductosPedido1.length == 0) {
                $scope.HayPedidoActivo1 = false;
            }

            // Respaldar datos en SessionStorage
            $scope.RespaldarDatos1(true);

        }


        /**
         * Cancelar el pedido
         */
        $scope.CancelarPedido1 = function () {
            $scope.RespaldarDatos1(false);
        }

        /**
         * Se ejecuta cuando inicia la pagina 
         */
        $scope.Init = function (vista) {

            // Si no hay datos en SessionStorage no se ejecuta 
            if (!$scope.HayPedidoActivo1 && vista === 'Movimiento') {
                $scope.ListarProductos1();
            }

            if (vista === 'detallesPedido') {
                $scope.MostrarGrafica1();
            }
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
        $scope.pageSize1 = 6;


        // Grafica 
        $scope.MostrarGrafica = function () {

            angular.forEach($scope.listaProductosPedido1, function (value, key) {
                $scope.pagoTotal += value.subTotal;
                $scope.cantidadProductos += value.cantidad;
            });


            $scope.iva = $scope.pagoTotal * 0.16;
            $scope.propina = $scope.pagoTotal * 0.02;

            $scope.pagoNeto = $scope.pagoTotal;

            //$scope.pagoTotal += $scope.iva + $scope.propina;

            Morris.Donut({
                element: 'graph_donut',
                data: [{
                    label: 'Pago Total',
                    value: $scope.pagoTotal
                }, {
                    label: 'Pago Neto',
                    value: $scope.pagoNeto
                }],
                colors: ['#E74A4A', '#34495E', '#ACADAC', '#3498DB'],
                formatter: function (y) {
                    return "$ " + y;
                }
            });
        }

        // Notificación de datos insuficientes para generar detalle de pedido
        angular.element(document).ready(function () {
            if (!$scope.HayPedidoActivo1) {
                $('.noHayPedido').modal('show');
            }
        });

        // Validación para el formulario Registrar Pedido
        $scope.V_FormRegPedido = {
            rules: {
                cedulaCliente: {
                    RE_Numbers: true,
                    required: true
                }
            }
        }

        /**
         * Registrar pedido en la DB
         */
        $scope.RegistrarMovimiento = function (form, dataFormulario) {

            if (form.validate()) {

                var idProductos1 = [];
                var cantidadesProductos1 = [];
                var precio1 = [];
                var descuentos1 = [];

                angular.forEach($scope.listaProductosPedido1, function (value, key) {
                    idProductos1.push(value.id);
                    cantidadesProductos1.push(value.cantidad);
                    precio1.push(value.precio);
                    descuentos1.push(value.descuento);
                });

                /* Para obtener el valor del combo */
                var cedulaCliente = document.getElementById("usuario").value;
                var tipoMovimiento = document.getElementById("tipoMovimiento").value;

                var obj = {
                    "cedulaCliente": cedulaCliente,
                    "direccion": dataFormulario.direccion,
                    "numeroComunicacion": dataFormulario.numeroComunicacion,
                    "descripcion": dataFormulario.descripcion,
                    "tipoMovimiento": tipoMovimiento,
                    "idProductos": idProductos1,
                    "cantidadesProductos": cantidadesProductos1,
                    "precio": precio1,
                    "descuentos": descuentos1
                }

                console.log(obj);

                $http.post('/Movimiento/RegistrarMovimiento/', obj)
                    .success(function (res) {

                        var tipo = "";

                        if (res == 'Operacion exitosa') {
                            new PNotify({
                                title: res,
                                text: 'Pedido registrado satisfactoriamente.',
                                type: 'success'
                            });
                            $scope.CancelarPedido1();

                            //setTimeout(function () { location.href = '/Mesero'; }, 5000);

                        } else {
                            new PNotify({
                                title: 'Error al registrar el pedido',
                                text: res.msm,
                                type: 'error'
                            });
                        }

                    })
                    .error(function (res, status) {
                        new PNotify({
                            title: 'Error: ' + status + ' $scope.RegistrarPedido',
                            text: res.msm,
                            type: 'error',
                            hide: false
                        });
                    });
            }
        }
    });
})();