using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC4_InterFood.Models;

namespace MVC4_InterFood.Controllers
{
    public class UsuarioController : Controller
    {

        // Instancia del modelo Producto
        Models.UsuarioModel usuarioModel = new UsuarioModel();

        // Intancia singleton Comun
        Comun var = Comun.GetInstance();


        // GET: Producto
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Registrarse()
        {
            return View();
        }


        /**
         * Listar productos
         */
        [HttpPost]
        public JsonResult ListarUsuarios()
        {
            object res = usuarioModel.ListarUsuarios();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }


        /**
         * Listar tipos productos
         */
        [HttpPost]
        public JsonResult ListarTiposUsuarios()
        {
            object res = usuarioModel.ListarTiposUsuario();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }

        [HttpPost]
        public JsonResult ListarDepartamentos()
        {
            object res = usuarioModel.ListarDepartamentos();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }

        [HttpPost]
        public JsonResult ListarPreguntas()
        {
            object res = usuarioModel.ListarPreguntas();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }

        [HttpPost]
        public JsonResult ListarCiudades()
        {
            object res = usuarioModel.ListarCiudades();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }


        /**
        * Registrar producto 
        */
        [HttpPost]
        public JsonResult RegistrarUsuario(usuarios usuario)
        {
            bool res = usuarioModel.RegistrarUsuario(usuario);

            if (res)
            {

                return Json(new { msm = "Operacion exitosa" });
            }
            else { 
                return Json(new { msm = var.MsmError }); 
            }
        }


        /* Modificar usuarios */
        [HttpPost]
        public JsonResult ModificarUsuario(usuarios usuario)
        {
            bool res = usuarioModel.ModificarUsuario(usuario);

            if (res) return Json(new { msm = "Operacion exitosa" });
            else return Json(new { msm = var.MsmError });
        }
    }
}