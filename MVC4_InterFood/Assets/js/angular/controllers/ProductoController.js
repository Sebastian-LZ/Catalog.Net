'use strict';
(function () {
    app.controller('ProductoController', function ($scope, $http, Fabrica, $sessionStorage) {

        // Lista de productos
        $scope.listaProductos = [];

        // ng-model para formulario de producto
        $scope.DatosFormRegProducto = {
            IdProducto: "",
            referencia: "",
            nombreProducto: "",
            descripcionProducto: "",
            inventario: 0,
            stockMinimo: 0,
            estadoProducto: "",
            precioCompra: 0,
            edicionLimitada: "",
            precio: 0,
            bdPromocion_IdPromocion: 1,
            bdClasificacionProducto_IdClasificacionProducto: 1,
            bdTalla_IdTalla: 1,
            diseno: 1
        }

        // ng-model para formulario de producto
        $scope.ImagenesProducto = {
            IdProducto: 0,
            imagen1: "img.png",
            imagen2: "img.png",
            imagen3: "img.png",
            imagen4: "img.png",
            imagen5: "img.png"
        }

        // ng-model para select tipos de productos
        $scope.selectClasificaciones = {
            options: [],
            // Opción por default
            selectedOption: {
                idClasificacionProducto: 1
            }
        };

        // ng-model para select subtipos de productos
        $scope.selectTallas = {
            options: [],
            // Opción por default
            selectedOption: {
                idTalla: 1
            }
        };

        // ng-model para select diseños
        $scope.selectDiseno = {
            options: [],
            // Opción por default
            selectedOption: {
                idDiseno: 1
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

        // ng-model para select subtipos de productos
        $scope.selectPromociones = {
            options: [],
            // Opción por default
            selectedOption: {
                idPromocion: 1
            }
        };

        // Controla si se edita o modifica
        $scope.esModificar = false;


        /* Listar todos los PRODUCTOS */
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


        /* Consulatar producto */
        $scope.ConsultarProducto = function (id) {
            $scope.esModificar = true;

            $scope.ListarClasificaciones();
            $scope.ListarTallas();
            $scope.ListarPromociones();
            $scope.ListarDisenos();

            var producto;
            angular.forEach($scope.listaProductos, function (value, key) {
                if (value.IdProducto == id) {
                    producto = value;
                }
            });


            var form = $scope.DatosFormRegProducto;

            form.IdProducto = producto.IdProducto;
            form.referencia = producto.referencia;
            form.nombreProducto = producto.nombreProducto;
            form.descripcionProducto = producto.descripcionProducto;
            form.inventario = producto.inventario;
            form.stockMinimo = producto.stockMinimo;
            form.estadoProducto = producto.estadoProducto;
            form.precioCompra = producto.precioCompra;
            form.edicionLimitada = producto.edicionLimitada;
            form.precio = producto.precio;
            $scope.selectPromociones.selectedOption.idPromocion = producto.bdPromocion_IdPromocion;
            $scope.selectClasificaciones.selectedOption.idClasificacionProducto = producto.bdClasificacionProducto_IdClasificacionProducto;
            $scope.selectTallas.selectedOption.idTalla = producto.bdTalla_IdTalla;
            $scope.selectDiseno.selectedOption.idDiseno = producto.diseno;
        }

        /* Consulatar producto */
        $scope.ConsultarImagenes = function () {

            var id = document.getElementById("referencia").value;

            var producto;
            angular.forEach($scope.listaProductos, function (value, key) {
                if (value.referencia == id) {
                    producto = value;
                }
            });


            var form = $scope.ImagenesProducto;
            form.IdProducto = producto.IdProducto;

            if (producto.imagen1 == "") {
                form.imagen1 = "img.png";
            } else {
                form.imagen1 = producto.imagen1;
            }

            if (producto.imagen2 = "") {
                form.imagen2 = "img.png";
            } else {
                form.imagen2 = producto.imagen2;
            }


            form.imagen3 = producto.imagen3;
            form.imagen4 = producto.imagen4;
            form.imagen5 = producto.imagen5;
        }


        /**
        * Dejar el formulario igual que como inicia la web
        */
        $scope.ResetForm = function () {
            var producto = $scope.DatosFormRegProducto;

            producto.IdProducto = "";
            producto.referencia = "";
            producto.nombreProducto = "";
            producto.descripcionProducto = "";
            producto.inventario = 0;
            producto.stockMinimo = 0;
            producto.estadoProducto = "";
            producto.precioCompra = 0;
            producto.edicionLimitada = "";
            producto.precio = 0;
            $scope.selectPromociones.selectedOption.idPromocion = 1;
            $scope.selectClasificaciones.selectedOption.idClasificacionProducto = 1;
            $scope.selectTallas.selectedOption.idTalla = 1;
            $scope.selectDiseno.selectedOption.idDiseno = 1;
            $scope.esModificar = false;
        }

        $scope.LimpiarTallas = function () {
            // Reseter todo y volver a consultar via ajax los productos
            $scope.listaTallasProducto = [];

        }


        // Lista de tallas
        $scope.listaTallasProducto = $sessionStorage.SS_listaTallasProducto || [];

        /* Agregar producto al la tabla del visto recientemente */
        $scope.AgregarTalla = function (inventario) {

            //Obtenemos el id de la talla del select
            var id = document.getElementById("idTalla").value;

            // Obtenemos el nombre del select 
            var combo = document.getElementById("idTalla");
            var nombre = combo.options[combo.selectedIndex].text;

            var obj;

            // Objeto temporar para luego agregarlo a la lista de visto recientemente
            function CrearObjTemp1() {
                obj = {
                    id: id,
                    nombre: nombre,
                    inventario: inventario
                }
            }

            // Agregar objeto creado al arreglo
            function AgregarObj1() {
                // Agregar producto visto al arreglo
                $scope.listaTallasProducto.push(obj);

                new PNotify({
                    title: 'Operacion exitosa',
                    text: 'Talla agregada exitosamente.',
                    type: 'success',
                    hide: true
                });
                $scope.cantidadAgregar = 0;
            }

            // Validar si es el primer producto que se va agregar
            if ($scope.listaTallasProducto.length === 0) {
                $scope.HayProductoVisto = true;

                CrearObjTemp1();
                AgregarObj1();
            } else {
                var productoFueEncontrado1 = false;

                // Consulatar si el pruducto ya fué agregado
                angular.forEach($scope.listaTallasProducto, function (value, key) {
                    if (id === value.id) {
                        value.inventario += inventario;

                        new PNotify({
                            title: 'Operacion exitosa',
                            text: 'Cantidades actualizadas exitosamente.',
                            type: 'success',
                            hide: true
                        });
                        $scope.cantidadAgregar = 0;
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
            //$scope.RespaldarTallas(true);
        }

        //Eliminar talla de la creacion
        $scope.EliminarTallaProducto = function (producto) {
            angular.forEach($scope.listaTallasProducto, function (value, key) {
                // Si encuentra el producto
                if (producto === value.id) {
                    // Si la cantidad del producto es 0 entonces lo elimino del arreglo
                    $scope.listaTallasProducto.splice(key, 1);
                }
            });
        }


        /* Registrar o Modificar producto */
        $scope.GestionarProducto = function (form, data) {

            //Obtenemos la referencia para validar
            var referencia = document.getElementById("referencia").value;
            //Validamos referencia
            if (referencia.length < 4) {
                new PNotify({
                    title: 'Error',
                    text: 'La referencia debe estar compuesta por minimo 4 numeros',
                    type: 'error',
                    hide: true
                });
                return;
            }

            // Obtenemos el nombre del select para validar
            var combo = document.getElementById("idClasificacion");
            var nombre = combo.options[combo.selectedIndex].text;
            //Validamos que si halla una clasificacion
            if (nombre == "" || nombre == null) {
                new PNotify({
                    title: 'Error',
                    text: 'Seleccione una clasificación',
                    type: 'error',
                    hide: true
                });
                return;
            }

            //Obtenemos el nombre del producto para validar
            var nombreProducto = document.getElementById("nombreProducto").value;
            //Validamos el nombre del producto
            if (nombreProducto == null || nombreProducto == "") {
                new PNotify({
                    title: 'Error',
                    text: 'Ingrese el nombre del producto',
                    type: 'error',
                    hide: true
                });
                return;
            }
            if (nombreProducto.length < 4) {
                new PNotify({
                    title: 'Error',
                    text: 'Ingrese un nombre de producto valido.',
                    type: 'error',
                    hide: true
                });
                return;
            }
            if (nombreProducto.length > 25) {
                new PNotify({
                    title: 'Error',
                    text: 'Nombre del producto muy largo. Maximo 25 car',
                    type: 'error',
                    hide: true
                });
                return;
            }

            // Obtenemos el nombre del select para validar
            var combo = document.getElementById("estadoProducto");
            var nombre = combo.options[combo.selectedIndex].text;
            //Validamos que si halla una clasificacion
            if (nombre == "" || nombre == null) {
                new PNotify({
                    title: 'Error',
                    text: 'Seleccione un estado.',
                    type: 'error',
                    hide: true
                });
                return;
            }

            // Obtenemos el nombre del select para validar
            var combo = document.getElementById("ediccionLimitada");
            var nombre = combo.options[combo.selectedIndex].text;
            //Validamos que si halla una clasificacion
            if (nombre == "" || nombre == null) {
                new PNotify({
                    title: 'Error',
                    text: 'Seleccione edicción limitada.',
                    type: 'error',
                    hide: true
                });
                return;
            }

            // Obtenemos el nombre del select para validar
            var combo = document.getElementById("idPromocion");
            var nombre = combo.options[combo.selectedIndex].text;
            //Validamos que si halla una clasificacion
            if (nombre == "" || nombre == null) {
                new PNotify({
                    title: 'Error',
                    text: 'Seleccione una promoción.',
                    type: 'error',
                    hide: true
                });
                return;
            }

            // Obtenemos el nombre del select para validar
            var combo = document.getElementById("idDiseno");
            var nombre = combo.options[combo.selectedIndex].text;
            //Validamos que si halla una clasificacion
            if (nombre == "" || nombre == null) {
                new PNotify({
                    title: 'Error',
                    text: 'Seleccione un diseño.',
                    type: 'error',
                    hide: true
                });
                return;
            }

            //$scope.ConsultarProducto(idTallas, referencia, nombres);

            //Obtenemos el valor del campo
            var stockMinimo = document.getElementById("stockMinimo").value;
            if (stockMinimo <= 5) {
                new PNotify({
                    title: 'Error',
                    text: 'El stock minimo debe ser 5 o mas',
                    type: 'error',
                    hide: true
                });
                return;
            }

            //Obtenemos el valor del campo
            var precioCompra = document.getElementById("precioCompra").value;
            if (precioCompra <= 1000) {
                new PNotify({
                    title: 'Error',
                    text: 'El precio de compra debe ser mayor a $ 1.000',
                    type: 'error',
                    hide: true
                });
                return;
            }

            //Obtenemos el valor del campo
            var precioVenta = document.getElementById("precioVenta").value;
            if (precioVenta <= 1000) {
                new PNotify({
                    title: 'Error',
                    text: 'El precio de venta debe ser mayor a $ 1.000',
                    type: 'error',
                    hide: true
                });
                return;
            }

            var ganancia = precioVenta - precioCompra;

            if (ganancia <= 0) {
                new PNotify({
                    title: 'Error',
                    text: 'El precio de venta debe ser mayor al precio de compra.',
                    type: 'error',
                    hide: true
                });
                return false;
            }

            if (ganancia < 1000) {
                new PNotify({
                    title: 'Error',
                    text: 'La ganancia es muy poca.',
                    type: 'error',
                    hide: true
                });
                return false;
            }

            var url = "";
            var msmExito = "";
            data.bdPromocion_IdPromocion = $scope.selectPromociones.selectedOption.idPromocion;
            data.bdClasificacionProducto_IdClasificacionProducto = $scope.selectClasificaciones.selectedOption.idClasificacionProducto;
            data.bdTalla_IdTalla = $scope.selectTallas.selectedOption.idTalla;
            data.diseno = $scope.selectDiseno.selectedOption.idDiseno;

            

            if (!$scope.esModificar) {
                url = "/Producto/RegistrarProducto1/";

                var idTallas = [];
                var nombres = [];
                var cantidadesTalla = [];

                angular.forEach($scope.listaTallasProducto, function (value, key) {
                    idTallas.push(value.id);
                    nombres.push(value.nombre);
                    cantidadesTalla.push(value.cantidad);
                });

                if (idTallas[0] == null || idTallas[0] == "") {
                    new PNotify({
                        title: 'Error',
                        text: 'Seleccione por lo menos 1 talla',
                        type: 'error',
                        hide: true
                    });
                    return;
                }
                alert('paso por aca');

                //if (idTallas[0] == null || idTallas[0] == "") {
                //    new PNotify({
                //        title: "Error !",
                //        text: "Seleccione una talla.",
                //        type: "error"
                //    });
                //    return;
                //}

                alert('paso por aca');

                var obj = {
                    "referencia": data.referencia,
                    "nombreProducto": data.nombreProducto,
                    "descripcionProducto": data.descripcionProducto,
                    "stockMinimo": data.stockMinimo,
                    "estadoProducto": data.estadoProducto,
                    "precioCompra": data.precioCompra,
                    "edicionLimitada": data.edicionLimitada,
                    "precio": data.precio,
                    "bdPromocion_IdPromocion": data.bdPromocion_IdPromocion,
                    "bdClasificacionProducto_IdClasificacionProducto": data.bdClasificacionProducto_IdClasificacionProducto,
                    "idTallas": idTallas,
                    "cantidadesTalla": cantidadesTalla
                }

                alert('paso por aca 2');
                if (form.validate()) {
                    alert('paso entroooo aca');
                    $http.post(url, obj)
                        .success(function (res) {
                            new PNotify({
                                title: "Operacion exitosa",
                                text: "Producto registrado correctamente.",
                                type: "success"
                            });

                            $scope.ListarProductos();
                            $scope.ResetForm();
                            $scope.LimpiarTallas();
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

                $scope.esModificar = false;
            } else {
                url = "/Producto/ModificarProducto";
                msmExito = "Producto modificado correctamente.";
                $scope.esModificar = true;

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
        }

        /* Consultar producto */
        $scope.ConsultarProducto1 = function (referencia) {

            var idTallas = [];
            var nombres = [];
            var cantidadesTalla = [];

            angular.forEach($scope.listaTallasProducto, function (value, key) {
                idTallas.push(value.id);
                nombres.push(value.nombre);
                cantidadesTalla.push(value.cantidad);
            });

            if (idTallas[0] == null || idTallas[0] == "") {
                new PNotify({
                    title: 'Error',
                    text: 'Seleccione por lo menos 1 talla',
                    type: 'error',
                    hide: true
                });
                return;
            }

            var i = 0;
            $scope.next = true;

            angular.forEach(idTallas, function (value, key) {
                var nombre = nombres[i];

                if ($scope.next) {
                    $http.post('/Producto/ConsultarProducto/', {
                        "referencia": referencia,
                        "talla": idTallas[i]
                    })

                         .success(function (res) {
                             if (res == true) {
                                 new PNotify({
                                     title: 'Error. ',
                                     text: "La talla " + nombre + " ya existe en esta referencia.",
                                     type: "error",
                                     hide: true
                                 });
                                 $scope.next = false;

                                 if (!$scope.next) {
                                     new PNotify({
                                         title: 'Error. ',
                                         text: "No se puede continuar.",
                                         type: "error",
                                         hide: true
                                     });
                                     return null;
                                 }
                             } else {
                             }
                         })
                       .error(function (res, status) {
                       });
                }
                i++;
            });
        }



        /* Eliminar producto */
        $scope.EliminarProducto = function (idProducto) {
            $http.post('/Producto/EliminarProducto/', {
                'IdProducto': idProducto
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

        /* Listar promociones */
        $scope.ListarPromociones = function () {

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

        /* Listar diseños */
        $scope.ListarDisenos = function () {

            $http.post('/Producto/ListarDisenos/', {
                //idZona: $scope.locacionMesa
            })
                .success(function (res) {
                    $scope.selectDiseno.options = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarDisenos',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
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
        $scope.ListarTallas = function () {
            $http.post('/Producto/ListarTallas/', {
                //idZona: $scope.locacionMesa
            })
                .success(function (res) {
                    $scope.selectTallas.options = res;
                })
                .error(function (res, status) {
                    new PNotify({
                        title: 'Error: ' + status + ' $scope.ListarTallas',
                        text: res.msm,
                        type: 'error',
                        hide: false
                    });
                });
        }

        //cambiar imagen del producto
        $scope.cambiarIMG = function (lugar) {

            var fileName, id = document.getElementById("referencia").value;

            if (lugar = 1) {
                fileName = document.getElementById("imagen1").value;
                $scope.cambiarImagen1(fileName, id, 1);
            } else if (lugar = 2) {
                fileName = document.getElementById("imagen2").value;
                $scope.cambiarImagen1(fileName, id, 2);
            } else if (lugar = 3) {
                fileName = document.getElementById("imagen3").value;
                $scope.cambiarImagen1(fileName, id, 3);
            } else if (lugar = 4) {
                fileName = document.getElementById("imagen4").value;
                $scope.cambiarImagen1(fileName, id, 4);
            } else if (lugar = 5) {
                fileName = document.getElementById("imagen5").value;
                $scope.cambiarImagen1(fileName, id, 5);
            } else {
                alert('Codigo no establecido');
                return;
            }
        }


        /* Registrar img */
        $scope.cambiarImagen1 = function (fileName, id, lugar) {
            var url = "";
            var msmExito = "";

            fileName = fileName.substring(12, fileName.length);

            if (lugar = 1) {
                url = "";
                msmExito = "Imagen vinculada exitosamente.";

                $http.post('/Producto/CambiarImagen/', {
                    'fileName': fileName,
                    'id': id
                })
                    .success(function (res) {
                        var tipo = (res.msm == 'Operacion exitosa') ? "success" : "error";
                        new PNotify({
                            title: res.msm,
                            text: msmExito,
                            type: tipo
                        });
                    })
                    .error(function (res, status) {
                        new PNotify({
                            title: 'Error: ' + status + ' $scope.CambiarImagen',
                            text: res.msm,
                            type: 'error',
                            hide: false
                        });
                    });
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
        $scope.pageSize = 10;


        $scope.maxlength = 25;

        // Validación para el formulario Registrar Pedido
        $scope.V_FormRegPoducto = {
            rules: {
                referencia: {
                    RE_Numbers: true,
                    required: true
                },
                stockMinimo: {
                    RE_Numbers: true,
                    required: true
                },
                precioCompra: {
                    RE_Numbers: true,
                    required: true
                },
                precio: {
                    RE_Numbers: true,
                    required: true
                }
            }
        }
    });
})();