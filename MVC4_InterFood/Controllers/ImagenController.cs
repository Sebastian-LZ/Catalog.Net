using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC4_InterFood.Models;
using System.IO;

namespace MVC4_InterFood.Controllers
{
    public class ImagenController : Controller
    {

        // Instancia del modelo Producto
        Models.ProductoModel productoModel = new ProductoModel();


        // Intancia singleton Comun
        Comun var = Comun.GetInstance();


        // GET: Producto
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(HttpPostedFileBase file)
        {
            if (file != null && file.ContentLength > 0)
            {
                var fileName = "banner1.png";
                var path = Path.Combine(Server.MapPath("~/IMAGENES/PAGINA"), fileName);
                file.SaveAs(path);
            }
            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult Index1(HttpPostedFileBase file)
        {
            if (file != null && file.ContentLength > 0)
            {
                var fileName = "banner2.png";
                var path = Path.Combine(Server.MapPath("~/IMAGENES/PAGINA"), fileName);
                file.SaveAs(path);
            }
            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult Index2(HttpPostedFileBase file)
        {
            if (file != null && file.ContentLength > 0)
            {
                var fileName = "camibusos.png";
                var path = Path.Combine(Server.MapPath("~/IMAGENES/PAGINA"), fileName);
                file.SaveAs(path);
            }
            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult Index3(HttpPostedFileBase file)
        {
            if (file != null && file.ContentLength > 0)
            {
                var fileName = "pantalon.png";
                var path = Path.Combine(Server.MapPath("~/IMAGENES/PAGINA"), fileName);
                file.SaveAs(path);
            }
            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult Index4(HttpPostedFileBase file)
        {
            if (file != null && file.ContentLength > 0)
            {
                var fileName = "guantes.png";
                var path = Path.Combine(Server.MapPath("~/IMAGENES/PAGINA"), fileName);
                file.SaveAs(path);
            }
            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult Index5(HttpPostedFileBase file)
        {
            if (file != null && file.ContentLength > 0)
            {
                var fileName = "cascos.png";
                var path = Path.Combine(Server.MapPath("~/IMAGENES/PAGINA"), fileName);
                file.SaveAs(path);
            }
            return RedirectToAction("Index");
        }
    }
}