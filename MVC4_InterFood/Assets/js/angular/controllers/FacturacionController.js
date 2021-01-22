'use strict';
(function () {
    app.controller('PedidoController', function ($scope, $http, $sessionStorage) {

        $scope.ListadosPendientes = "Listado de Pedidos Pendientes";
        $scope.ListadosEnProceso = "Listado de Pedidos En Proceso";
        $scope.ListadosFinalizado = "Listado de Pedidos Facturados";
        $scope.ListadosCancelado = "Listado de Pedidos Cancelados";

        $scope.ListadoPedidos = [];
        $scope.ListadoPedidosEnProceso = [];
        $scope.ListadoPedidosFinalizado = [];
        $scope.ListadoPedidosCancelado = [];

        $scope.ListadoProductosPedido = [];

        $scope.DatosFormConsultarPedido = {
            idMovimiento: "",
            usuarios_identificacion: "",
            direccion: "",
            numeroComunicacion: "",
            descripcion: "",
            NombreCompleto: ""
        }

        // Lista de pedidos
        $scope.listaPedidos = [];

        $scope.ListarPedidos1 = function () {

            $http.post('/Pedidos/ListarPedidos/')
                .success(function (res) {
                    $scope.listaPedidos = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarPedidos',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }

        $scope.ListarProductosPedidos = function (id) {
            $scope.ListarPedidos1();
            $http.post('/Pedidos/ListadoProductosPedido/', {
                id
            })
            .success(function (lista) {
                $scope.ListadoProductosPedido = lista;
                console.log(lista);
            }).error(function (malo) {
                alert("error");
            })
        }

        $scope.ListarPedidos = function () {
            $http.post('/Pedidos/ListadoPedidos/')
            .success(function (lista) {
                $scope.ListadoPedidos = lista;
                console.log(lista);
            }).error(function (malo) {
                alert("error");
            })
        }

        $scope.ListarPedidosFinalizado = function () {
            $http.post('/Pedidos/ListadoPedidosFinalizado/')
            .success(function (lista) {
                $scope.ListadoPedidosFinalizado = lista;
                console.log(lista);
            }).error(function (malo) {
                alert("error");
            })
        }

        //$scope.ListarPedidosFinalizado = function () {
        //    $http.post('/Pedidos/ListadoPedidosFinalizado/')
        //    .success(function (lista) {
        //        if (lista.msm == "") {
        //            new PNotify({
        //                title: 'Error!',
        //                text: 'Ha ocurrido un error al listar los pedidos finalizados',
        //                type: 'error',
        //                hide: false
        //            });
        //        } else {
        //            $scope.ListadoPedidosFinalizado = lista;
        //        }
        //    })
        //    .error(function (error) {

        //    })
        //}

        $scope.ListarPedidosEnProceso = function () {
            $http.post('/Pedidos/ListadoPedidosEnProceso/')
            .success(function (lista) {
                if (lista.msm == "") {
                    new PNotify({
                        title: 'Error!',
                        text: 'Ha ocurrido un error al listar los pedidos en proceso',
                        type: 'error',
                        hide: false
                    });
                } else {
                    $scope.ListadoPedidosEnProceso = lista;
                }
            })
            .error(function (error) {

            })
        }


        // Listar los pedidos cancelados //
        $scope.ListarPedidosCancelado = function () {
            $http.post('/Pedidos/ListadoPedidosCancelados/')
            .success(function (lista) {
                if (lista.msm == "") {
                    new PNotify({
                        title: 'Error!',
                        text: 'Ha ocurrido un error al listar los pedidos cancelados',
                        type: 'error',
                        hide: false
                    });
                } else {
                    $scope.ListadoPedidosCancelado = lista;
                }
            })
            .error(function (error) {

            })
        }


        /* Consulatar pedido */
        $scope.ConsultarPedido = function (id) {

            var pedido;
            angular.forEach($scope.listaPedidos, function (value, key) {
                if (value.idMovimiento == id) {
                    pedido = value;
                }
            });

            var form = $scope.DatosFormConsultarPedido;

            form.idMovimiento = pedido.idMovimiento;
            form.usuarios_identificacion = pedido.usuarios_identificacion;
            form.direccion = pedido.direccion;
            form.numeroComunicacion = pedido.numeroComunicacion;
            form.descripcion = pedido.descripcion;
            form.NombreCompleto = pedido.NombreCompleto;
        }


        $scope.GenerarFactura = function (idPedido, propina) {

            $sessionStorage.idPedido = idPedido;
            $sessionStorage.propina = propina;
            window.location = "/Factura/Index";
        }


        /* Cambiar estado del pedido */
        $scope.cambiarEstado = function (idPedido, estado) {


            $http.post('/Pedidos/CambiarEstadoPedido/', {
                'idPedido': idPedido,
                'estado': estado
            })
                .success(function (res) {
                    new PNotify({
                        title: "Operacion exitosa",
                        text: "Pedido procesado correctamente.",
                        type: "success",
                    });

                    $scope.ListarPedidos();
                    $scope.ListarPedidosEnProceso();
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.CambiarEstadoPedido',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }



        $scope.GenerarFacturaAntigua = function (idPedido, facturado) {
            $sessionStorage.idPedido = idPedido;
            $sessionStorage.facturado = facturado;
            window.location = "/Factura/Index";
        }

        $scope.currentPage = 1;
        $scope.pageSize = 6;
    })
})();