'use strict';
(function () {
    app.controller('PedidoController', function ($scope, $http, $sessionStorage) {
        
        $scope.ListadosPendientes = "Listado de Pedidos Pendientes";
        $scope.ListadosFacturados = "Listado de Pedidos Facturados";
        $scope.ListadoPedidos = [];
        $scope.ListadoPedidosAntiguosob = [];
        $scope.ListarPedidos = function () {
            $http.post('/Pedidos/ListadoPedidos/')
            .success(function (lista) {
                $scope.ListadoPedidos = lista;
                console.log(lista);
            }).error(function (malo) {
                alert("error");
            })
        }
        $scope.ListadoPedidosAntiguos = function () {
            $http.post('/Pedidos/ListaPedidosAntiguos/')
            .success(function (lista) {
                if (lista.msm == "") {
                    new PNotify({
                        title: 'Error!',
                        text: 'Ha ocurrido un error al listar los productos antiguos',
                        type: 'error',
                        hide: false
                    });
                } else {
                    $scope.ListadoPedidosAntiguosob = lista;
                }
            })
            .error(function (error) {

            })
        }
        $scope.GenerarFactura = function (idPedido, propina) {
            
            $sessionStorage.idPedido = idPedido;
            $sessionStorage.propina = propina;
           window.location = "/Factura/Index";
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