using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC4_InterFood.Models;

namespace MVC4_InterFood.Controllers
{
    public class MovimientoController : Controller
    {

        // Instancia del modelo movimiento
        Models.MovimientoModel movimientoModel = new MovimientoModel();

        // Instancia del modelo Cliente
        Models.ClienteModel clienteModel = new ClienteModel();


        // Intancia singleton Comun
        Comun var = Comun.GetInstance();


        // GET: Movimiento
        public ActionResult Index()
        {
            return View();
        }

        /* Listar movimientos */
        [HttpPost]
        public JsonResult ListarMovimientos()
        {
            object res = movimientoModel.ListarMovimientos();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }


        /* Listar clasificaciones */
        [HttpPost]
        public JsonResult ListarClasificaciones()
        {
            object res = movimientoModel.ListarClasificaciones();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }

        /* Listar tallas */
        [HttpPost]
        public JsonResult ListarTallas()
        {
            object res = movimientoModel.ListarTallas();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }

        /* Listar promociones */
        [HttpPost]
        public JsonResult ListarPromociones()
        {
            object res = movimientoModel.ListarPromociones();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }

        [HttpPost]
        public JsonResult ListarProductos()
        {
            object res = movimientoModel.ListarTodosProductos();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }


        /* Listar referencias */
        [HttpPost]
        public JsonResult ListarReferencia()
        {
            object res = movimientoModel.ListarReferencia();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }

        /* Listar tipo movimiento */
        [HttpPost]
        public JsonResult ListarTipoMovimiento()
        {
            object res = movimientoModel.ListarTipoMovimiento();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }

        /* Listar usuarios */
        [HttpPost]
        public JsonResult ListarUsuarios()
        {
            object res = movimientoModel.ListarUsuarios();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }


        [HttpPost]
        public JsonResult obtenerTallas(int referencia)
        {
            object res = movimientoModel.ListarTallasReferencia(referencia);

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }

        /**
        * Registrar producto 
        */
        [HttpPost]
        public JsonResult RegistrarProducto(producto jsonProducto)
        {
            bool res = movimientoModel.RegistrarProducto(jsonProducto);
            
            if (res)
            {

                return Json(new { msm = "Operacion exitosa" });
            }
            else { 
                return Json(new { msm = var.MsmError }); 
            }
        }


        //Registrar el movimiento
        [HttpPost]
        public JsonResult RegistrarMovimiento(FormatoRegMovimiento pedidoJson)
        {

            usuarios valCliente = clienteModel.ConsulatarCliente(pedidoJson.cedulaCliente);

            if (valCliente != null)
            {
                movimiento p = new movimiento();
                p.usuarios_identificacion = pedidoJson.cedulaCliente;
                p.direccion = pedidoJson.direccion;
                p.numeroComunicacion = pedidoJson.numeroComunicacion;
                p.descripcion = pedidoJson.descripcion;
                p.tipoMovimiento_idTipo_movimiento = pedidoJson.tipoMovimiento;

                float subtotal = 0, total = 0;
                for (int i = 0; i < pedidoJson.idProductos.Count; i++)
                {
                    subtotal = subtotal + (pedidoJson.precio[i] * pedidoJson.cantidadesProductos[i]);
                    total = subtotal;
                }

                p.subtotal = subtotal;
                p.descuento = 0;
                p.total = total;

                int idMovimiento = movimientoModel.RegistrarMovimiento(p);
                var accion = "";

                if(p.tipoMovimiento_idTipo_movimiento == 1)
                {
                    accion = "Entrada";
                } else
                {
                    accion = "Salida";
                }

                if (idMovimiento != 0)
                {
                    for (int i = 0; i < pedidoJson.idProductos.Count; i++)
                    {

                        bool res = false;
                        if(accion.Equals("Salida"))
                        {
                            res = movimientoModel.RegistrarProductoPedido(
                                     idMovimiento,
                                     pedidoJson.idProductos[i],
                                     pedidoJson.cantidadesProductos[i],
                                     pedidoJson.precio[i],
                                     0
                             );
                        } else
                        {
                            res = movimientoModel.RegistrarProductoPedido1(
                            idMovimiento,
                            pedidoJson.idProductos[i],
                            pedidoJson.cantidadesProductos[i],
                            pedidoJson.precio[i],
                            0
                        );
                        }

                        if (res) continue;
                        else return Json(new { msm = "No se pudo registrar el producto :  " + i + " para el pedido : " + idMovimiento });
                    }
                }
                else
                    return Json(new { msm = "Ocurrio un error al registrar el pedido" });
            }
            else
                return Json(new { msm = "El cliente no existe, verifique la cedula." });
            return Json("Operacion exitosa");
        }



        /**
         * Modificar producto 
         */
        [HttpPost]
        public JsonResult ModificarProducto(producto jsonProducto)
        {
            bool res = movimientoModel.ModificarProducto(jsonProducto);

            if (res) return Json(new { msm = "Operacion exitosa" });
            else return Json(new { msm = var.MsmError });
        }


        /**
         * Modificar producto 
         */
        [HttpPost]
        public JsonResult EliminarProducto(int idProducto)
        {
            bool res = movimientoModel.EliminarProducto(idProducto);

            if (res) return Json(new { msm = "Operacion exitosa" });
            else return Json(new { msm = var.MsmError });
        }


    }
}