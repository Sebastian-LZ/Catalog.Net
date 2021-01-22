'use strict';

(function () {


    app.controller('MeseroController', function ($scope, $http, Fabrica, $sessionStorage) {

        // Lista de productos
        $scope.listaProductos = $sessionStorage.SS_listaProductos || [];

        // Lista de cantidad de unidades por producto
        $scope.listaProductoCantidad = $sessionStorage.SS_llistaProductoCantidad || [];

        // ng-model para formulario de cliente
        $scope.DatosFormRegCliente = {
            nombre: "",
            apellido: "",
            cedula: ""
        }

        // Controla si se edita o modifica
        $scope.esModificar = false;


        // Lista de productos para el pedido
        $scope.listaProductosPedido = $sessionStorage.SS_listaProductosPedido || [];


        // Vigila si hay un servicio activo
        $scope.HayPedidoActivo = $sessionStorage.SS_HayPedidoActivo || false;

        // Lista de zonas
        $scope.listaZonas = [];

        // Lista de mesas por zona
        $scope.listaMesas = [];


        // Datos para la grafica
        $scope.pagoTotal = 0;
        $scope.pagoNeto = 0;
        $scope.iva = 0;
        $scope.propina = 0;
        $scope.cantidadProductos = 0;



        /**
         * Listar todos los PRODUCTOS
         */
        $scope.ListarProductos = function () {

            $http.post('/Mesero/ListarProductos/')
                .success(function (res) {
                    $scope.listaProductos = res;

                    angular.forEach(res, function (value, key) {
                        var obj = {
                            id: value.idTipoProducto,
                            cantidad: value.cantidadProducto
                        }
                        $scope.listaProductoCantidad.push(obj);
                    });

                    // Respaldar datos en SessionStorage
                    $scope.RespaldarDatos(true);

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
         * Consulatar cliente 
         */
        $scope.ConsultarCliente = function () {
            if ($scope.txtBucarCliente != null) {

                $http.post('/Mesero/ConsultarCliente/', {
                    'cedula': $scope.txtBucarCliente
                })
                    .success(function (res) {
                        console.log(res);
                        if (res.msm != null) {
                            new PNotify({
                                title: 'Error',
                                text: 'El usuario no esta registrado.',
                                type: 'error'
                            });
                        }
                           
                        else {
                            new PNotify({
                                title: 'Consulta exitosa',
                                text: 'El usuario ya se encuentra registrado, desea modificar sus datos',
                                type: 'success'
                            });

                            var cliente = $scope.DatosFormRegCliente;
                            cliente.nombre = res.nombre;
                            cliente.apellido = res.apellido;
                            cliente.cedula = res.cedula;

                            $scope.esModificar = true;
                        }
                            

                    })
                    .error(function (res, status) {
                        new PNotify({
                            title: 'Error: ' + status + ' $scope.ListarProductos',
                            text: res.msm,
                            type: 'error',
                            hide: false
                        });
                    });
            } else {
                new PNotify({
                    title: 'Error',
                    text: "Por favor escribe alguna cédula.",
                    type: 'error'
                });

            }
        }


        /**
         * Registrar o Modificar cliente
         */
        $scope.GestionarCliente = function (form, data) {

            var url = "";
            var msmExito = "";

            if (!$scope.esModificar) {
                url = "/Mesero/RegistrarCliente/";
                msmExito = "Cliente registrado correctamente.";
                $scope.esModificar = false;
            } else {
                url = "/Mesero/ModificarCliente/";
                msmExito = "Cliente modificado correctamente.";
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

                        $scope.ResetForm();

                    })
                    .error(function (res, status) {
                        new PNotify({
                            title: 'Error: ' + status + ' $scope.RegistrarCliente',
                            text: res.msm,
                            type: 'error',
                            hide: false
                        });
                    });

            }

        }


        /**
         * Dejar el formulario igual que como inicia la web
         */
        $scope.ResetForm = function () {
            var cliente = $scope.DatosFormRegCliente;
            cliente.nombre = "";
            cliente.apellido = "";
            cliente.cedula = "";
            $scope.esModificar = false;
        }

        // Validación para el formulario FormRegCliente
        $scope.V_FormRegCliente = {
            rules: {
                nombre: {
                    lettersonly: true
                },
                apellido: {
                    lettersonly: true
                },
                cedula: {
                    RE_Numbers: true
                }
            }
        }



        /**
         * Respaldar los datos temporales con SessionStorage
         */
        $scope.RespaldarDatos = function (esReseet) {


            // Reseter todo y volver a consultar via ajax los productos
            if (!esReseet) {

                $scope.HayPedidoActivo = false;
                $scope.listaProductoCantidad = [];
                $scope.listaProductosPedido = [];
                $scope.ListarProductos();

            }

            $sessionStorage.SS_HayPedidoActivo = $scope.HayPedidoActivo;
            $sessionStorage.SS_listaProductos = $scope.listaProductos;
            $sessionStorage.SS_listaProductosPedido = $scope.listaProductosPedido;
            $sessionStorage.SS_llistaProductoCantidad = $scope.listaProductoCantidad;


        }


        /**
         * Agregar producto al pedido del cliente
         */
        $scope.AgregarProductoPedido = function (producto, cantidad) {

            var obj;


            // Objeto temporar para luego agregarlo a la lista del pedido
            function CrearObjTemp() {
                obj = {
                    id: producto.idProducto,
                    nombre: producto.descripcionProducto,
                    cantidad: cantidad,
                    precio: producto.precio,
                    subTotal: (cantidad * producto.precio),
                    marca: producto.marca,
                    tipo: producto.descripcionTipoProducto
                }
            }


            // Agregar objeto creado al arreglo
            function AgregarObj() {
                // Agregar producto al arreglo temporal listaProductosPedido
                $scope.listaProductosPedido.push(obj);

                // Disminuir la cantidad del unidades del producto en la vista
                producto.cantidadProducto -= cantidad;
            }


            // Validar si es el primer producto que se va agregar
            if ($scope.listaProductosPedido.length === 0) {

                $scope.HayPedidoActivo = true;

                CrearObjTemp();
                AgregarObj();


            } else {

                var productoFueEncontrado = false;

                // Consulatar si el pruducto ya fué agregado
                angular.forEach($scope.listaProductosPedido, function (value, key) {
                    if (producto.idProducto === value.id) {

                        // Actualizar la cnatidad del producto
                        value.cantidad += cantidad;

                        // Actualizo el subtotal
                        value.subTotal += (cantidad * producto.precio);

                        // Disminuir la cantidad del unidades del producto en la vista
                        producto.cantidadProducto -= cantidad;

                        productoFueEncontrado = true;
                    } else {
                        productoFueEncontrado = false;
                    }


                });

                // Si el producto no esta en el arreglo entonces
                if (!productoFueEncontrado) {
                    CrearObjTemp();
                    AgregarObj();
                }

            }

            // Respaldar datos en SessionStorage
            $scope.RespaldarDatos(true);

        }


        /**
         * Eliminar producto del arreglo de pedidos
         */
        $scope.EliminarProductoPedido = function (producto, cantidad) {

            angular.forEach($scope.listaProductosPedido, function (value, key) {

                // Si encuentra el producto
                if (producto.idProducto === value.id) {

                    // Si se intenta eliminar mas productos de los que se tienen
                    if (cantidad > value.cantidad) {

                        new PNotify({
                            title: 'Error en la operación ',
                            text: 'En el pedido no tienes tantos productos.',
                            type: 'error'
                        });

                    } else {

                        if (cantidad  > 0) {
                            // Actualizar la cantidad del producto
                            value.cantidad -= cantidad;

                            // Actualizo el subtotal
                            value.subTotal -= (cantidad * producto.precio);

                            // Aumentar la cantidad del unidades del producto en la vista
                            producto.cantidadProducto += cantidad;

                            // Si la cantidad del producto es 0 entonces lo elimino del arreglo
                            if (value.cantidad === 0) {
                                $scope.listaProductosPedido.splice(key, 1);
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
            if ($scope.listaProductosPedido.length == 0) {
                $scope.HayPedidoActivo = false;
            }

            // Respaldar datos en SessionStorage
            $scope.RespaldarDatos(true);

        }


        /**
         * Cancelar el pedido
         */
        $scope.CancelarPedido = function () {
            $scope.RespaldarDatos(false);
        }


        /**
         * Listar zonas 
         */
        $scope.ListarZonas = function () {

            $http.post('/Mesero/ListarZonas/')
                .success(function (res) {
                    $scope.listaZonas = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarZonas',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });

        }


        /**
         * Listar mesas filtradas por zona 
         */
        $scope.FiltrarMesas = function () {

            $http.post('/Mesero/FiltrarMesas/', {
                idZona: $scope.locacionMesa
            })
                .success(function (res) {
                    $scope.listaMesas = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.FiltrarMesas',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });

        }


        /**
         * Se ejecuta cuando inicia la pagina 
         */
        $scope.Init = function (vista) {

            // Si no hay datos en SessionStorage no se ejecuta 
            if (!$scope.HayPedidoActivo && vista === 'indexMesero') {
                $scope.ListarProductos();
            }

            if (vista === 'detallesPedido') {
                $scope.ListarZonas();
                $scope.MostrarGrafica();
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


        // Grafica 
        $scope.MostrarGrafica = function () {

            angular.forEach($scope.listaProductosPedido, function (value, key) {
                $scope.pagoTotal += value.subTotal;
                $scope.cantidadProductos += value.cantidad;
            });


            $scope.iva = $scope.pagoTotal * 0.16;
            $scope.propina = $scope.pagoTotal * 0.02;

            $scope.pagoNeto = $scope.pagoTotal;

            $scope.pagoTotal += $scope.iva + $scope.propina;

            Morris.Donut({
                element: 'graph_donut',
                data: [{
                    label: 'Propina',
                    value: $scope.propina
                }, {
                    label: 'Pago Total',
                    value: $scope.pagoTotal
                }, {
                    label: 'Pago Neto',
                    value: $scope.pagoNeto
                }, {
                    label: 'Iva',
                    value: $scope.iva
                }],
                colors: ['#26B99A', '#34495E', '#ACADAC', '#3498DB'],
                formatter: function (y) {
                    return "$ " + y;
                }
            });
        }

        // Notificación de datos insuficientes para generar detalle de pedido
        angular.element(document).ready(function () {
            if (!$scope.HayPedidoActivo) {
                $('.noHayPedido').modal('show');
            }
        });

        // Validación para el formulario Registrar Pedido
        $scope.V_FormRegPedido = {
            rules: {
                cedulaCliente: {
                    RE_Numbers: true,
                    required: true
                },
                idEnser: {
                    RE_Numbers: true,
                    required: true
                },
                locacionMesa: {
                    RE_Numbers: true,
                    required: true
                }
            }
        }

        /**
         * Registrar pedido en la DB
         */
        $scope.RegistrarPedido = function (form, dataFormulario) {

            if (form.validate()) {

                var idProductos = [];
                var cantidadesProductos = [];

                angular.forEach($scope.listaProductosPedido, function (value, key) {
                    idProductos.push(value.id);
                    cantidadesProductos.push(value.cantidad);
                });

                
                var obj = {
                    "cedulaCliente": dataFormulario.cedulaCliente,
                    "idEnser": dataFormulario.idEnser,
                    "idMesero": dataFormulario.idMesero,
                    "idProductos": idProductos,
                    "cantidadesProductos": cantidadesProductos
                }
                console.log(obj);

                $http.post('/Mesero/RegistrarPedido/', obj)
                    .success(function (res) {

                        var tipo = "";

                        if (res == 'Operacion exitosa') {
                            new PNotify({
                                title: res,
                                text: 'Pedido registrado satisfactoriamente.',
                                type: 'success'
                            });
                            $scope.CancelarPedido();

                            setTimeout(function () { location.href = '/Mesero'; }, 5000);
                            
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