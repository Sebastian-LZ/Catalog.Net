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
    public class PedidosController : Controller
    {
        Models.PedidoModel pedido = new Models.PedidoModel();

        // Intancia singleton Comun
        Comun var = Comun.GetInstance();

        [HttpPost]
        public JsonResult ListadoProductosPedido(int id)
        {
            var objListaPedidos = pedido.ListadoProductosPedido(id);
            if (objListaPedidos != null)
            {
                return Json(objListaPedidos);
            }
            else
            {
                return Json(new { msm = "Error en la visualización de datos" });
            }
        }

        [HttpPost]
        public JsonResult ListarPedidos()
        {
            object res = pedido.ListarPedidos1();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }

        [HttpPost]
        public JsonResult ListadoPedidos()
        {
            var objListaPedidos = pedido.ListadoPedidos();
            if (objListaPedidos != null)
            {
                return Json(objListaPedidos);
            }
            else
            {
                return Json(new { msm = "Error en la visualización de datos" });
            }
        }

        [HttpPost]
        public JsonResult ListadoPedidosEnProceso()
        {
            var objListaPedidos = pedido.ListadoPedidosEnProceso();
            if (objListaPedidos != null)
            {
                return Json(objListaPedidos);
            }
            else
            {
                return Json(new { msm = "Error en la visualización de datos" });
            }
        }

        [HttpPost]
        public JsonResult ListadoPedidosFinalizado()
        {
            var objListaPedidos = pedido.ListadoPedidosFinalizado();
            if (objListaPedidos != null)
            {
                return Json(objListaPedidos);
            }
            else
            {
                return Json(new { msm = "Error en la visualización de datos" });
            }
        }

        [HttpPost]
        public JsonResult ListadoPedidosCancelados()
        {
            var objListaPedidos = pedido.ListadoPedidosCancelados();
            if (objListaPedidos != null)
            {
                return Json(objListaPedidos);
            }
            else
            {
                return Json(new { msm = "Error en la visualización de datos" });
            }
        }

        [HttpPost]
        public JsonResult FormulaPedido(int idPedido)
        {
            var objFormulaPedido = pedido.FormulaPedido(idPedido);
            if (objFormulaPedido != null)
            {
                return Json(objFormulaPedido);
            }
            else
            {
                return Json(new { msm = "Error en la visualización de la formula del pedido."});
            }
        }
        [HttpPost]
        public JsonResult CambiarEstadoPedido(int idPedido, string estado)
        {
            var Cambiar = pedido.CambiarEstadoPedido(idPedido, estado);

            if (Cambiar==true)
            {
                return Json(new { msm = "Actualización exitosa"});
            }
            else
            {
                return Json(new { msm = "" });
            }
        }
    }
}
