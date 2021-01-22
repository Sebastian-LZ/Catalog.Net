'use strict';

(function myfunction() {

    app.controller('MainController', function ($scope, $http, Fabrica, $sessionStorage) {
        $scope.HayPedidoActivo = $sessionStorage.SS_HayPedidoActivo;
    });

    app.factory("Fabrica", function () {

        var servicio = {
            
           listaProductos: [],
            listaProductosPedido:[],
            HayPedidoActivo: false
        };
        return servicio;
    });
})();