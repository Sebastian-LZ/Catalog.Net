using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC4_InterFood.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Security.Permissions;
using System.Web.Security;

namespace MVC4_InterFood.Controllers
{
    public class MeseroController : Controller
    {

        // Instancia del modelo Cliente
        Models.ClienteModel clienteModel = new ClienteModel();

        // Instancia del modelo Producto
        Models.ProductoModel productoModel = new ProductoModel();

        //// Instancia del modelo zonas
        //Models.ZonaModel zonaModel = new ZonaModel();
        
        // Instancia del modelo zonas
        Models.PedidoModel pedidoModel = new PedidoModel();


        // Intancia singleton Comun
        Comun var = Comun.GetInstance();



        // GET: Mesero
        public ActionResult Index()
        {
            if (Request.IsAuthenticated == false)
            {
                return View();
            }
            else
            {
                Response.Redirect("/Cuentas/Index");
                return null;
            }
                
        }

        // GET: Mesero
        public ActionResult CatalogoSinCliente()
        {
            return View();
        }

        // GET: Mesero
        public ActionResult DetallesPedido()
        {
            return View();
        }

        // GET: Mesero
        public ActionResult DetallesPedidoVista()
        {
            return View();
        }
        
        // GET: Mesero
        public ActionResult DetalleProducto()
        {
            return View();
        }

        // GET: Mesero
        public ActionResult DetalleProductoSinCliente()
        {
            return View();
        }

        /* Listar productos */
        [HttpPost]
        public JsonResult ListarProductos()
        {
            object res = productoModel.ListarProductos();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }

        /* Listar productos ref */
        [HttpPost]
        public JsonResult ListarProductosRef()
        {
            object res = productoModel.ListarProductosRef();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }

        /* Listar productos filtro */
        [HttpPost]
        public JsonResult ListarProductosFiltro(int id)
        {
            object res = productoModel.ListarProductosFiltro(id);

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }

        /* Listar productos filtro */
        [HttpPost]
        public JsonResult ListarProductosFiltro1(int id)
        {
            object res = productoModel.ListarProductosFiltro1(id);

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }

        /* Filtro de clasificaciones */
        [HttpPost]
        public JsonResult ListarFiltroClasificaciones(int id)
        {
            object res = productoModel.ListarFiltroClasificaciones(id);

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }


        /**
         * Listar Zonas filtrando por estado
         */
        //[HttpPost]
        //public JsonResult ListarZonas()
        //{
        //    object res = zonaModel.ListarZonas("Activo");

        //    if (res != null) return Json(res);
        //    else return Json(new { msm = var.MsmError });
        //}


        /**
         * Registrar pedido
         */

        //[HttpPost]
        public JsonResult RegistrarPedido(FormatoRegPedido pedidoJson)
        {

            usuarios valCliente = clienteModel.ConsulatarCliente(pedidoJson.cedulaCliente);

            if (valCliente != null)
            {
                if (pedidoJson.cedulaCliente == pedidoJson.cedula)
                {
                    movimiento p = new movimiento();
                    p.usuarios_identificacion = pedidoJson.cedulaCliente;
                    p.direccion = pedidoJson.direccion;
                    p.numeroComunicacion = pedidoJson.numeroComunicacion;
                    p.descripcion = pedidoJson.descripcion;

                    float subtotal = 0, total = 0;
                    for (int i = 0; i < pedidoJson.idProductos.Count; i++)
                    {
                        subtotal = subtotal + (pedidoJson.precio[i] * pedidoJson.cantidadesProductos[i]);
                        total = subtotal;
                    }

                    p.subtotal = subtotal;
                    p.descuento = 0;
                    p.total = total;

                    int idPedido = pedidoModel.RegistrarPedido(p);

                    if (idPedido != 0)
                    {
                        for (int i = 0; i < pedidoJson.idProductos.Count; i++)
                        {
                            Console.Write(idPedido + " id pedido");
                            Console.Write(pedidoJson.idProductos[i] + " producto");
                            Console.Write(pedidoJson.cantidadesProductos[i] + " cantidades");
                            Console.Write(pedidoJson.precio[i] + " precio");
                            Console.Write(pedidoJson.descuentos[i] + " descuento");

                            bool res = pedidoModel.RegistrarProductoPedido(
                                idPedido,
                                pedidoJson.idProductos[i],
                                pedidoJson.cantidadesProductos[i],
                                pedidoJson.precio[i],
                                pedidoJson.descuentos[i]
                            );

                            if (res) continue;
                            else return Json(new { msm = "No se pudo registrar el producto :  " + i + " para el pedido : " + idPedido });
                        }
                    }
                    else
                        return Json(new { msm = "Ocurrio un error al registrar el pedido" });
                }
                else
                    return Json(new { msm = "La cedula no pertenece a esta cuenta." });
            }
            else
                return Json(new { msm = "El cliente no existe, verifique la cedula." });


            return Json("Operacion exitosa");

        }






        // GET: GestionarCliente
        public ActionResult GestionarCliente()
        {
            return View();
        }


        /**
         * Consultar cliente
         */
        [HttpPost]
        public JsonResult ConsultarCliente(int cedula)
        {
            object res = clienteModel.ConsulatarCliente(cedula);

            if (res != null ) return Json(res );
            else return Json(new { msm = var.MsmError } );
        }

        [HttpPost]
        public JsonResult ConsultarProducto(int idProducto)
        {
            object res = productoModel.ConsultarProducto(idProducto);
            Session["idProducto"] = idProducto;

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }


        /**
         * Registrar cliente 
         */
        //[HttpPost]
        //public JsonResult RegistrarCliente(usuario jsonCliente)
        //{
        //    bool res = clienteModel.RegistrarCliente(jsonCliente);

        //    if (res) return Json(new { msm = "Operacion exitosa" }); 
        //    else  return Json(new { msm = var.MsmError });
        //}


        /**
         * Modificar cliente 
         */
        //[HttpPost]
        //public JsonResult ModificarCliente(usuarios jsonCliente)
        //{
        //    bool res = clienteModel.ModificarCliente(jsonCliente);

        //    if (res) return Json(new { msm = "Operacion exitosa" });
        //    else return Json(new { msm = var.MsmError });
        //}



    }
}