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
    public class RegistrarseController : Controller
    {

        // Instancia del modelo zonas
        Models.RegistrarseModel registroModel = new RegistrarseModel();

        // Intancia singleton Comun
        Comun var = Comun.GetInstance();

        // GET: Mesero
        public ActionResult Index()
        {
            return View();                
        }
        

        /* Registrar usuario */
        [HttpPost]
        public JsonResult RegistrarUsuario(usuarios jsonUsuario)
        {
            bool res = registroModel.RegistrarUsuario(jsonUsuario);

            if (res)
            {

                return Json(new { msm = "Operacion exitosa" });
            }
            else
            {
                return Json(new { msm = var.MsmError });
            }
        }


        /* Listar preguntas */
        [HttpPost]
        public JsonResult ListarPreguntas()
        {
            object res = registroModel.ListarPreguntas();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }

    }
}