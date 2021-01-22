'use strict';
(function () {
    app.controller('FacturaController', function ($scope, $http, $sessionStorage) {
        $scope.ListaDelRegisto = [];
        $scope.ConsultaFacturaob = [];
        $scope.idPedidoSession = $sessionStorage.idPedido || 0;
        $scope.Propina = $sessionStorage.propina || false;
        $scope.facturado = $sessionStorage.facturado || "";
        

        $scope.ConsultaFactura = function (idPedido) {
            var url = '/Factura/ConsultarFactura/';
            $http.post(url, { idPedido: idPedido })
            .success(function (lista) {
                if (lista.msm == "") {
                    console.log("Error al listar los datos");
                } else {
                    $scope.precioNeto = lista[0].pagoNeto;
                    $scope.precioBruto = lista[0].pagoBruto;
                    $scope.idFactura = lista[0].idFactura;
                    $scope.idPedido = lista[0].idPedido;
                    $scope.Cedula_Cliente = lista[0].Cedula_Cliente;
                    $scope.Nombre_Cliente = lista[0].Nombre_Cliente;
                    $scope.Cedula_Empleado = lista[0].Cedula_Empleado;
                    $scope.Nombre_Empleado = lista[0].Nombre_Empleado;
                    $scope.propina = lista[0].propina;
                    $scope.iva = lista[0].iva;
                    $scope.fecha = lista[0].fecha;
                    $scope.ConsultaFacturaob = lista;

                }
            })
            .error(function (msm) {
                new PNotify({
                    title: "Error!",
                    text: 'Ha ocurrido un error al visualizar los datos de  la factura',
                    type: 'error',
                    hide: false
                });
            })
        }

        /*
        $scope.alerta = function (msm) {
            alert(msm);
        }*/


        if ($scope.idPedidoSession == 0 || $scope.idPedidoSession == "") {
            $('.noHayPedidoParaFactura').modal();
        } else if ($scope.facturado == "") {

            var url = '/Pedidos/FormulaPedido/';

            $http.post(url, { idPedido: $scope.idPedidoSession })
                .success(function (lista) {
                    $scope.ListaDelRegisto = lista;
                    console.log($scope.ListaDelRegisto);
                    $scope.RegistrarFactura($scope.idPedidoSession, $scope.Propina, lista);
                    window.sessionStorage.removeItem('ngStorage-idPedido');
                })
                .error(function (msm) {
                    console.log("Error" + msm);
                });

               
            } else {
            window.sessionStorage.removeItem('ngStorage-facturado');
            window.sessionStorage.removeItem('ngStorage-idPedido');
            $scope.ConsultaFactura($scope.idPedidoSession);
            }
                
            $scope.RegistrarFactura = function (idPedido, PropinaBoolean, lista) {
                var iva = lista[0].iva;
                var propina = 0.0;
                var precioBruto=0.0;
                var precioNeto = lista[0].precioNeto;
                precioBruto = lista[0].PrecioTotal;
                var bruto = 0.0;
                if (PropinaBoolean == true) {
                    propina = lista[0].Propina;
                    bruto = precioBruto;
                } else {
                    propina = 0.0;
                    bruto = precioBruto - lista[0].Propina;
                }
                var objet = {
                    idPedido: idPedido,
                    propina: propina,
                    iva: iva,
                    pagoBruto: bruto,
                    pagoNeto: precioNeto                   
                }
                var url = '/Factura/RegistrarFactura/';
                $http.post(url, objet)
                .success(function (data) {                   
                    $scope.ConsultaFactura(idPedido);
                })
                .error(function (msm) {
                    new PNotify({
                        title: "Error!",
                        text: 'Ha ocurrido un error al generar la factura',
                        type: 'error',
                        hide: false
                    });
                   // window.location = '/Administrador/Index/';
                })
            }
           
            $scope.currentPage = 1;
            $scope.pageSize = 5;
           
           

            
        
    })
})()