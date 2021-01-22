'use strict';
(function () {
    app.controller('InformacionUsuarioController', function ($scope, $http, Fabrica) {

        // Lista de productos
        $scope.listaUsuarios = [];

        // Lista de pedidos
        $scope.pedidosCliente = [];

        // ng-model para formulario de usuario
        $scope.DatosFormRegUsuario = {
            identificacion: "",
            nombres: "",
            apellidos: "",
            idDepartamento: "",
            idCiudad: 1,
            direccionResidencia: "",
            email: "",
            fechaNacimiento: "",
            pregunta_IdPregunta: 1
        }

        // ng-model para formulario de cambiar pregunta de seguridad
        $scope.DatosFormCamPregunta = {
            identificacion: "",
            respuestaAnterior: "",
            pregunta_IdPregunta: 1,
            respuesta: ""
        }

        // ng-model para select departamentos
        $scope.selectDepartamento = {
            options: [],
            // Opción por default
            selectedOption: {
                idDepartamento: 2
            }
        };

        // ng-model para select ciudades
        $scope.selectCiudad = {
            options: [],
            // Opción por default
            selectedOption: {
                idCiudad: 1
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

        $scope.selectPregunta = {
            options: [],
            // Opción por default
            selectedOption: {
                idPregunta: 1
            }
        };

        /* Listar todos los usuarios  */
        $scope.ListarUsuarios = function () {
            $http.post('/Usuario/ListarUsuarios/')
                .success(function (res) {
                    $scope.listaUsuarios = res
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

        /* Consulatar usuario */
        $scope.ConsultarUsuario = function (id) {

            $scope.ListarDepartamentos();
            $scope.ListarCiudades();
            $scope.ListarPreguntas();

            var usuario;

            angular.forEach($scope.listaUsuarios, function (value, key) {
                if (value.identificacion == id) {
                    usuario = value;
                }
            });

            var form = $scope.DatosFormRegUsuario;

            form.identificacion = usuario.identificacion;
            form.nombres = usuario.nombres;
            form.apellidos = usuario.apellidos;
            $scope.selectDepartamento.selectedOption.idDepartamento = usuario.idDepartamento;
            $scope.selectCiudad.selectedOption.idCiudad = usuario.idCiudad;
            form.direccionResidencia = usuario.direccionResidencia;
            form.email = usuario.email;
            form.fechaNacimiento = usuario.fechaNacimiento;
            $scope.selectPregunta.selectedOption.idPregunta = usuario.pregunta_IdPregunta;

            $('#bienvenida').text('Hola, ' + usuario.nombres + " " + usuario.apellidos);
        }


        $scope.consultarPedido1 = function (id, cedula) {
            $http.post('/InformacionUsuario/ConsultarPedido/', {
                'id': id,
                'identificacion': cedula
            })
            .success(function (lista) {
                if (lista == "") {
                    new PNotify({
                        title: 'Error !',
                        text: 'No hay pedidos relacionados con estos datos',
                        type: 'error',
                        hide: true
                    });
                    return;
                }

                $scope.ListadoProductosDelPedido = lista;
            }).error(function (error) {
                new PNotify({
                    title: 'Hubo un error al consultar el pedido',
                    text: res.msm,
                    type: 'error',
                    hide: true
                });
            })
        }


        $scope.ListarPedidosDelCliente = function (id) {
            $http.post('/InformacionUsuario/ListarPedidosDelCliente/', {
                'id': id
            })
                .success(function (res) {
                    $scope.pedidosCliente = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarPedidosDelCliente',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }

        /* Dejar el formulario igual que como inicia la web */
        $scope.ResetForm = function () {
            var usuario = $scope.DatosFormRegUsuario;
            usuario.identificacion = "";
            usuario.nombres = "";
            usuario.apellidos = "";
            $scope.selectDepartamento.selectedOption.idDepartamento = 2;
            $scope.selectCiudad.selectedOption.idCiudad = 1;
            usuario.direccionResidencia = "";
            usuario.email = "";
            usuario.fechaNacimiento = "";
            $scope.selectPregunta.selectedOption.idPregunta = 1;
        }

        /* Limpiar el formulario de preguntas*/
        $scope.ResetForm1 = function () {
            var pregunta = $scope.DatosFormCamPregunta;
            pregunta.identificacion = "";
            pregunta.respuestaAnterior = "";
            pregunta.respuesta = "";
            $scope.selectPregunta.selectedOption.idPregunta = 1;
        }

        /* Consultar cliente */
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

        $scope.CambiarPregunta = function (form, data, cedula) {

            if (form.validate()) {

                var obj = {
                    "identificacion": data.identificacion,
                    "respuestaAnterior": data.respuestaAnterior,
                    "pregunta_IdPregunta": data.pregunta_IdPregunta,
                    "respuesta": data.respuesta,
                    "idUsuario": idUsuario
                }
                console.log(obj);

                $http.post('/InformacionUsuario/CambiarPregunta/', obj)
                    .success(function (res) {

                        var tipo = "";
                        // $scope.ResetForm1();
                        if (res == 'Operacion exitosa') {
                            new PNotify({
                                title: res,
                                text: 'Pregunta modificada correctamente.',
                                type: 'success'
                            });
                        } else {
                            new PNotify({
                                title: 'Error al modificar la pregunta de seguridad',
                                text: res.msm,
                                type: 'error'
                            });
                        }

                    })
                    .error(function (res, status) {
                        new PNotify({
                            title: 'Error: ' + status + ' $scope.CambiarPregunta',
                            text: res.msm,
                            type: 'error',
                            hide: false
                        });
                    });
            }
        }

        /* Modificar usuario */
        $scope.ModificarUsuario = function (form, data) {

            var url = "";
            var msmExito = "";

            data.idDepartamento = $scope.selectDepartamento.selectedOption.idDepartamento;
            data.idCiudad = $scope.selectCiudad.selectedOption.idCiudad;

            url = "/InformacionUsuario/ModificarUsuario";
            msmExito = "Usuario modificado correctamente.";

            $http.post(url, data)
                .success(function (res) {

                    var tipo = (res.msm == 'Operacion exitosa') ? "success" : "error";
                    new PNotify({
                        title: res.msm,
                        text: msmExito,
                        type: tipo
                    });
                    $scope.ListarUsuarios();
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ModificarUsuario',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }

        /* Listar tipos de departamentos */
        $scope.ListarDepartamentos = function () {
            $http.post('/Usuario/ListarDepartamentos/', {
                //idZona: $scope.locacionMesa
            })
                .success(function (res) {
                    $scope.selectDepartamento.options = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarDepartamentos',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }


        /* Listar tipos de preguntas */
        $scope.ListarPreguntas = function () {
            $http.post('/Usuario/ListarPreguntas/', {
                //idZona: $scope.locacionMesa
            })
                .success(function (res) {
                    $scope.selectPregunta.options = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarPreguntas',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }

        $scope.ListarCiudades = function () {

            $http.post('/Usuario/ListarCiudades/', {
                //idZona: $scope.locacionMesa
            })
                .success(function (res) {
                    $scope.selectCiudad.options = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarCiudades',
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
        $scope.cargarProducto = function (referencia, imagen, precio) {
            alert(referencia);
            $scope.ListarTallasDeReferencia(referencia);

            $scope.imagenProd = imagen;
            $scope.precio = precio;
            alert('paso');

            
            alert('ccero');

            alert($scope.imagenProd);
            alert($scope.precio);

            $("#cerrarModal").click();
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

        // Lista de productos a cambiar
        $scope.listaProductosACambiar = [];

        // Vigila si hay un servicio activo
        $scope.HayPedidoActivo = false;

        //$scope.listaProductoCantidad = $sessionStorage.SS_llistaProductoCantidad || [];

        /* Agregar producto al pedido del cliente */
        $scope.AgregarProductoACambiar = function (id, cantidad, precio, img) {

            var obj;
            // Objeto temporar para luego agregarlo a la lista del pedido
            function CrearObjTemp() {
                obj = {
                    id: id,
                    cantidad: cantidad,
                    precio: precio,
                    img: img
                }
            }

            // Agregar objeto creado al arreglo
            function AgregarObj() {
                // Agregar producto al arreglo temporal listaProductosPedido
                $scope.listaProductosACambiar.push(obj);
            }

            // Validar si es el primer producto que se va agregar
            if ($scope.listaProductosACambiar.length === 0) {

                $scope.HayPedidoActivo = true;

                CrearObjTemp();
                AgregarObj();
            } else {
                var productoFueEncontrado = false;

                // Consulatar si el pruducto ya fué agregado
                angular.forEach($scope.listaProductosACambiar, function (value, key) {
                    if (id === value.id) {

                        // Actualizar la cnatidad del producto
                        value.cantidad += cantidad;

                        productoFueEncontrado = true;
                    } else {
                        productoFueEncontrado = false;
                        $scope.listaProductosACambiar = [];
                    }
                });

                // Si el producto no esta en el arreglo entonces
                if (!productoFueEncontrado) {
                    CrearObjTemp();
                    AgregarObj();
                }
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


        // Validación para el formulario Registrar Pedido
        $scope.V_FormUsuario = {
            rules: {
                email: {
                    RE_Numbers: true
                },
                idTipoProducto: {
                    required: true
                }
            }
        }
    });
})();