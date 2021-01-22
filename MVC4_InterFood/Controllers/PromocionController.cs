using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC4_InterFood.Models;

namespace MVC4_InterFood.Controllers
{

    public class PromocionController : Controller
    {

        // Instancia del modelo Producto
        Models.PromocionModel promocionModel = new PromocionModel();


        // Intancia singleton Comun
        Comun var = Comun.GetInstance();


        // GET: Producto
        public ActionResult Index()
        {
            return View();
        }

        /**
         * Listar productos
         */
        [HttpPost]
        public JsonResult ListarPromociones()
        {
            object res = promocionModel.ListarTodasPromociones();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }


        /* Listar clasificaciones */
        [HttpPost]
        public JsonResult ListarClasificaciones()
        {
            object res = promocionModel.ListarClasificaciones();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }

        /* Listar tallas */
        [HttpPost]
        public JsonResult ListarTallas()
        {
            object res = promocionModel.ListarTallas();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }


        /* Registrar promocion */
        [HttpPost]
        public JsonResult RegistrarPromocion(promocion jsonPromocion)
        {
            bool res = promocionModel.RegistrarPromocion(jsonPromocion);

            if (res)
            {

                return Json(new { msm = "Operacion exitosa" });
            }
            else
            {
                return Json(new { msm = var.MsmError });
            }
        }


        /* Modificar promocion */
        [HttpPost]
        public JsonResult ModificarPromocion(promocion jsonPromocion)
        {
            bool res = promocionModel.ModificarPromocion(jsonPromocion);

            if (res) return Json(new { msm = "Operacion exitosa" });
            else return Json(new { msm = var.MsmError });
        }


        /**
         * Modificar producto 
         */
        [HttpPost]
        public JsonResult EliminarProducto(int idProducto)
        {
            bool res = promocionModel.EliminarProducto(idProducto);

            if (res) return Json(new { msm = "Operacion exitosa" });
            else return Json(new { msm = var.MsmError });
        }


    }
}
