using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC4_InterFood.Models;
using System.Web.Security;
using System;

namespace MVC4_InterFood.Controllers
{

    public class CuentasController : Controller
    {

        Models.UsuariosModel objUsuario = new Models.UsuariosModel();

        // GET: Cuentas

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]

        public JsonResult ValidarUsuario(usuarios jsonDatosUsuario)
        {
            try
            {
                var DatosUsuario = objUsuario.Login(jsonDatosUsuario);
                string rolUsuario = DatosUsuario.Item1;
                int idUsuario = DatosUsuario.Item2;
                string nombreUsuario = DatosUsuario.Item3;
                Session["nombreUsuario"] = nombreUsuario;
                Session["idUsuario"] = idUsuario;

                if (DatosUsuario != null)
                {
                    return Json(new { msm = rolUsuario });
                }
                else
                {
                    return Json(new { msm = "" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { msm = "" });
            }
        }

        public void Cerrar()
        {
            Session.Abandon();
            Response.Redirect("/Cuentas/Index/");
        }
    }
}