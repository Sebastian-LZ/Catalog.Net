'use strict';

(function () {
    app.controller('MeseroController', function ($scope, $http, Fabrica, $sessionStorage) {

        //Img seleccionada
        $scope.imgSeleccionada = "";

        // Lista de productos ref
        $scope.productosRef = $sessionStorage.SS_listaProductosRef || [];

        // Lista de clasificaciones
        $scope.clasificaciones;

        // Lista de tipos de producto
        $scope.tipoProducto;

        // Lista de productos
        $scope.listaProductos = $sessionStorage.SS_listaProductos || [];

        // Lista de cantidad de unidades por producto
        $scope.listaProductoCantidad = $sessionStorage.SS_llistaProductoCantidad || [];

        // ng-model para select talla
        $scope.selectTalla = {
            options: [],
            // Opción por default
            selectedOption: {
                idProducto: 1
            }
        };

        // ng-model para formulario de cliente
        $scope.CargarImagen = function (url) {
            $scope.imgSeleccionada = url;
        }

        // ng-model para formulario de cliente
        $scope.DatosFormRegCliente = {
            nombre: "",
            apellido: "",
            cedula: ""
        }

        // ng-model del producto
        $scope.DatosFormDetalleProducto = {
            IdProducto: "",
            referencia: "",
            nombreProducto: "",
            descripcionProducto: "",
            inventario: "",
            precio: "",
            bdPromocion_IdPromocion: "",
            porcentaje: "",
            efectivo: "",
            imagen1: "",
            imagen2: "",
            imagen3: "",
            imagen4: "",
            imagen5: ""
        }

        // ng-model del producto
        $scope.DatosFormDetalleProd = {
            IdProducto: "",
            referencia: "",
            nombreProducto: "",
            descripcionProducto: "",
            inventario: "",
            precio: "",
            bdPromocion_IdPromocion: "",
            porcentaje: "",
            efectivo: "",
            imagen1: "",
            imagen2: "",
            imagen3: "",
            imagen4: "",
            imagen5: ""
        }

        // ng-model de la imagen
        $scope.DatosFormImagen = {
            imagen1: ""
        }

        // Controla si se edita o modifica
        $scope.esModificar = false;

        // Lista de productos para el pedido
        $scope.listaProductosPedido = $sessionStorage.SS_listaProductosPedido || [];

        // Lista de productos vistos resientemente
        $scope.listaProductosVistos = $sessionStorage.SS_listaProductosVistos || [];

        // Vigila si hay un producto visto
        $scope.HayProductoVisto = $sessionStorage.SS_HayProductoVisto || false;

        // Vigila si hay un servicio activo
        $scope.HayPedidoActivo = $sessionStorage.SS_HayPedidoActivo || false;

        // Datos para la grafica
        $scope.pagoTotal = 0;
        $scope.pagoNeto = 0;
        $scope.iva = 0;
        $scope.propina = 0;
        $scope.cantidadProductos = 0;

        /* Consulatar detalle del producto */
        $scope.ConsultarDetalleProducto = function () {

            var id = document.getElementById("talla").value;
            $http.post('/Mesero/ConsultarProducto/', {
                'idProducto': id
            })
                .success(function (res) {
                })
                .error(function (res, status) {
                });
        }

        /* Consulatar detalle del producto */
        $scope.ConsultarDetalleProducto1 = function (id) {
            var producto;

            angular.forEach($scope.listaProductos, function (value, key) {
                if (value.IdProducto == id) {
                    producto = value;
                }
            });

            var form = $scope.DatosFormDetalleProd;
            form.IdProducto = producto.IdProducto;
            form.referencia = producto.referencia;
            form.nombreProducto = producto.nombreProducto;
            form.descripcionProducto = producto.descripcionProducto;
            form.inventario = producto.inventario;
            form.precio = producto.precio;
            form.bdPromocion_IdPromocion = producto.bdPromocion_IdPromocion;
            form.porcentaje = producto.porcentaje;
            form.efectivo = producto.efectivo;
            form.imagen1 = producto.imagen1;
            form.imagen2 = producto.imagen2;
            form.imagen3 = producto.imagen3;
            form.imagen4 = producto.imagen4;
            form.imagen5 = producto.imagen5;

            $scope.imgSeleccionada = producto.imagen1;
        }

        /* Consulatar detalle del producto */
        $scope.ConsultarDetalleProducto2 = function () {
            var producto;
            var id = document.getElementById("talla").value;
            angular.forEach($scope.listaProductos, function (value, key) {
                if (value.IdProducto == id) {
                    producto = value;
                }
            });

            var form = $scope.DatosFormDetalleProducto;
            form.IdProducto = producto.IdProducto;
            form.referencia = producto.referencia;
            form.nombreProducto = producto.nombreProducto;
            form.descripcionProducto = producto.descripcionProducto;
            form.inventario = producto.inventario;
            form.precio = producto.precio;
            form.bdPromocion_IdPromocion = producto.bdPromocion_IdPromocion;
            form.porcentaje = producto.porcentaje;
            form.efectivo = producto.efectivo;
            form.imagen1 = producto.imagen1;
            form.imagen2 = producto.imagen2;
            form.imagen3 = producto.imagen3;
            form.imagen4 = producto.imagen4;
            form.imagen5 = producto.imagen5;

            $scope.imgSeleccionada = producto.imagen1;
        }

        /* Consulatar detalle del producto */
        $scope.ConsultarImagenProd = function (ref) {
            var producto;

            angular.forEach($scope.listaProductos, function (value, key) {
                if (value.referencia == ref) {
                    producto = value;
                }
            });

            var form = $scope.DatosFormImagen;
            form.imagen1 = producto.imagen1;
        }


        /* Listar todos los PRODUCTOS  */
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


        /* Listar todos los PRODUCTOS por ref */
        $scope.ListarProductosRef = function () {
            $http.post('/Mesero/ListarProductosRef/')
                .success(function (res) {
                    $scope.productosRef = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarProductosRef',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }

        /* Listar todos los PRODUCTOS por ref */
        $scope.ListarProductosFiltro = function (id) {
            $http.post('/Mesero/ListarProductosFiltro/', {
                'id': id
            })
                .success(function (res) {
                    $scope.productosRef = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarProductosFiltro',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }

        /* Listar todos los PRODUCTOS por ref */
        $scope.ListarProductosFiltro1 = function (id) {
            $http.post('/Mesero/ListarProductosFiltro1/', {
                'id': id
            })
                .success(function (res) {
                    $scope.productosRef = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarProductosFiltro',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }

        /* Listar todos los tipos de producto */
        $scope.ListarTiposProducto = function () {
            $http.post('/Configuracion/Listar/', {
                nombreTabla: 'tipoProducto1'
            })
                .success(function (res) {
                    $scope.tipoProducto = res;
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


        /* Listar todas las clasificaciones */
        $scope.ListarClasificaciones = function (id) {
            $http.post('/Mesero/ListarFiltroClasificaciones/', {
                'id': id
            })
                .success(function (res) {
                    $scope.clasificaciones = res;
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


        /* Consulatar cliente */
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

        /* mostrar detalle */
        $scope.mostrarDetalle = function (referencia, descripcion, precio) {
            $scope.ListarProductos();
            $('#precio').text(precio);
            $('#nombre').text(descripcion);
            $scope.ListarTallasDeReferencia(referencia);
        }


        /* Listar tipo de movimiento */
        $scope.ListarTallasDeReferencia = function (ref) {

            $http.post('/Movimiento/obtenerTallas/', {
                'referencia': ref
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


        /* Respaldar los datos temporales con SessionStorage */
        $scope.RespaldarDatos = function (esReseet) {

            // Reseter todo y volver a consultar via ajax los productos
            if (!esReseet) {
                $scope.HayPedidoActivo = false;
                $scope.listaProductoCantidad = [];
                $scope.listaProductosPedido = [];
                //$scope.ListarProductos();
                $scope.ListarProductosRef();
            }

            $sessionStorage.SS_HayPedidoActivo = $scope.HayPedidoActivo;
            $sessionStorage.SS_listaProductos = $scope.listaProductos;
            $sessionStorage.SS_listaProductosRef = $scope.productosRef;
            $sessionStorage.SS_listaProductosPedido = $scope.listaProductosPedido;
            $sessionStorage.SS_llistaProductoCantidad = $scope.listaProductoCantidad;
        }


        $scope.RespaldarVistos = function (esReseet) {
            // Reseter todo y volver a consultar via ajax los productos
            if (!esReseet) {
                $scope.HayProductoVisto = false;
                $scope.listaProductosVistos = [];
            }
            $sessionStorage.SS_listaProductosVistos = $scope.listaProductosVistos;
        }

        /* Agregar producto al pedido del cliente */
        $scope.AgregarProductoPedido = function (cantidad, IdPromo, enPorcentaje, enEfectivo, precio, descripcion, img) {

            var id = document.getElementById("talla").value;

            var des = 0;
            var porcentaje = 0 + "." + enPorcentaje;

            if (IdPromo != 1) {
                if (enPorcentaje > 0) {
                    des = precio * porcentaje;
                } else {
                    des = enEfectivo;
                }
            } else {
                des = 0;
            }

            var obj;

            // Objeto temporar para luego agregarlo a la lista del pedido
            function CrearObjTemp() {
                obj = {
                    id: id,
                    nombre: descripcion,
                    cantidad: cantidad,
                    precio: precio,
                    descuentos: (des * cantidad),
                    subTotal: (cantidad * precio) - (des * cantidad),
                    img: img
                }
            }

            // Agregar objeto creado al arreglo
            function AgregarObj() {
                // Agregar producto al arreglo temporal listaProductosPedido
                $scope.listaProductosPedido.push(obj);

                //// Disminuir la cantidad del unidades del producto en la vista
                //producto.inventario -= cantidad;
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
                    if (id === value.id) {

                        // Actualizar la cnatidad del producto
                        value.cantidad += cantidad;

                        // Actualizo el subtotal
                        value.subTotal += (cantidad * precio);

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







        /* Agregar producto al la tabla del visto recientemente */
        $scope.AgregarProductoVisto = function (precio, descripcion, img, referencia) {
            var id = document.getElementById("talla").value;

            var obj;

            // Objeto temporar para luego agregarlo a la lista de visto recientemente
            function CrearObjTemp1() {
                obj = {
                    id: id,
                    referencia: referencia,
                    nombre: descripcion,
                    precio: precio,
                    img: img
                }
            }

            // Agregar objeto creado al arreglo
            function AgregarObj1() {
                // Agregar producto visto al arreglo
                $scope.listaProductosVistos.push(obj);
            }

            // Validar si es el primer producto que se va agregar
            if ($scope.listaProductosVistos.length === 0) {
                $scope.HayProductoVisto = true;

                CrearObjTemp1();
                AgregarObj1();
            } else {
                var productoFueEncontrado1 = false;

                // Consulatar si el pruducto ya fué agregado
                angular.forEach($scope.listaProductosVistos, function (value, key) {
                    if (id === value.referencia) {
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
            $scope.RespaldarVistos(true);
        }



        /**
         * Eliminar producto del arreglo de pedidos
         */
        $scope.EliminarProductoPedido = function (producto, cantidad) {

            angular.forEach($scope.listaProductosPedido, function (value, key) {

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
         * Se ejecuta cuando inicia la pagina 
         */
        $scope.Init = function (vista) {

            // Si no hay datos en SessionStorage no se ejecuta 
            if (!$scope.HayPedidoActivo && vista === 'indexMesero') {
                //$scope.ListarProductos();
                $scope.ListarProductosRef();
            }

            if (vista === 'detallesPedidoVista' || vista === 'detallesPedido') {
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
        $scope.pageSize = 27;


        // Grafica 
        $scope.MostrarGrafica = function () {

            angular.forEach($scope.listaProductosPedido, function (value, key) {
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
                }
            }
        }

        /**
         * Registrar pedido en la DB
         */
        $scope.RegistrarPedido = function (form, dataFormulario, cedula) {

            if (form.validate()) {

                var idProductos = [];
                var cantidadesProductos = [];
                var precio = [];
                var descuentos = [];

                angular.forEach($scope.listaProductosPedido, function (value, key) {
                    idProductos.push(value.id);
                    cantidadesProductos.push(value.cantidad);
                    precio.push(value.precio);
                    descuentos.push(value.descuentos);
                });

                var obj = {
                    "cedulaCliente": dataFormulario.cedulaCliente,
                    "cedula": cedula,
                    "direccion": dataFormulario.direccion,
                    "numeroComunicacion": dataFormulario.numeroComunicacion,
                    "descripcion": dataFormulario.descripcion,
                    "idProductos": idProductos,
                    "cantidadesProductos": cantidadesProductos,
                    "precio": precio,
                    "descuentos": descuentos
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