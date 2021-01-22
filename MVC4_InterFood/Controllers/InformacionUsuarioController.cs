using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC4_InterFood.Models;

namespace MVC4_InterFood.Controllers
{
    public class InformacionUsuarioController : Controller
    {

        // Instancia del modelo Producto
        Models.InformacionUsuarioModel infoUsuarioModel = new InformacionUsuarioModel();

        // Instancia del modelo cliente
        Models.ClienteModel clienteModel = new ClienteModel();


        // Intancia singleton Comun
        Comun var = Comun.GetInstance();


        // GET: Producto
        public ActionResult Index()
        {
            return View();
        }

        // GET: detalle cambio
        public ActionResult DetalleCambio()
        {
            return View();
        }

        /* Listar productos ref */
        [HttpPost]
        public JsonResult ListarPedidosDelCliente(int id)
        {
            object res = infoUsuarioModel.ListarPedidosDelCliente(id);

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }


        //Consultar detalle pedido 
        [HttpPost]
        public JsonResult ConsultarPedido(int id, int identificacion)
        {
            var objListaPedidos = infoUsuarioModel.ConsultarPedido(id, identificacion);
            if (objListaPedidos != null)
            {
                Session["pedido"] = id;
                return Json(objListaPedidos);
            }
            else
            {
                return Json(new { msm = "Error en la visualización de datos" });
            }
        }

        /* Modificar usuario */
        [HttpPost]
        public JsonResult ModificarUsuario(usuarios jsonUsuario)
        {
            bool res = infoUsuarioModel.ModificarUsuario(jsonUsuario);

            if (res) return Json(new { msm = "Operacion exitosa" });
            else return Json(new { msm = var.MsmError });
        }

        /* Cambiar preg usuario */
        [HttpPost]
        public JsonResult CambiarPregunta(FormatoModificarUsuario datosUsuario)
        {

            usuarios valCliente = clienteModel.ConsulatarCliente(datosUsuario.identificacion);

            if (valCliente != null)
            {
                if (datosUsuario.idUsuario.Equals(datosUsuario.identificacion))
                {

                    usuarios usu = new usuarios();
                    usu.identificacion = datosUsuario.idUsuario;
                    usu.pregunta_IdPregunta = datosUsuario.pregunta_IdPregunta;
                    usu.respuesta = datosUsuario.respuesta;

                    bool res = infoUsuarioModel.CambiarPregunta(usu);

                    return Json("Operacion exitosa");
                }
                else
                {
                    return Json(new { msm = "La cedula no pertenece a esta cuenta." });
                }       
            }
            else
            {
                return Json(new { msm = "El cliente no existe, verifique la cedula." });
            }
        }

        /**
         * Modificar producto 
         */
        //[HttpPost]
        //public JsonResult EliminarProducto(int idProducto)
        //{
        //    bool res = infoUsuarioModel.EliminarProducto(idProducto);

        //    if (res) return Json(new { msm = "Operacion exitosa" });
        //    else return Json(new { msm = var.MsmError });
        //}


    }
}