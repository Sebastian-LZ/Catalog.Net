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
    public class FacturaController : Controller
    {
        Models.FacturaModel factura = new FacturaModel();
        public ActionResult Index()
        {
            return View();
        }
        
        //public JsonResult RegistrarFactura(factura JsonFactura)
        //{
        //    bool RegistrarFactura = factura.RegistrarFactura(JsonFactura);
        //    if (RegistrarFactura==true)
        //    {
        //        return Json(new { msm = "Operacion Exitosa" });
        //    }
        //    else
        //    {
        //        return Json(new { msm = "" });
        //    }
        //}

        public JsonResult ConsultarFactura(int idPedido)
        {
            var consultaFactura = factura.ConsultaFactura(idPedido);
            if (consultaFactura!= null)
            {
                return Json(consultaFactura);
            }
            else
            {
                return Json(new { msm = "Error en la visualización de la factura del pedido." });
            }
        }
    }
}
