using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC4_InterFood.Models;
using System.IO;

namespace MVC4_InterFood.Controllers
{
    public class ProductoController : Controller
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

        public ActionResult Disenos()
        {
            return View();
        }

        public ActionResult Imagenes()
        {
            return View();
        }

        /**
         * Listar productos
         */
        [HttpPost]
        public JsonResult ListarProductos()
        {
            object res = productoModel.ListarTodosProductos();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }

        /* Listar clasificaciones */
        [HttpPost]
        public JsonResult ListarClasificaciones()
        {
            object res = productoModel.ListarClasificaciones();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }


        /* Listar tallas */
        [HttpPost]
        public JsonResult ListarTallas()
        {
            object res = productoModel.ListarTallas();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }

        /* Listar promociones */
        [HttpPost]
        public JsonResult ListarPromociones()
        {
            object res = productoModel.ListarPromociones();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }

        /* Listar diseños */
        [HttpPost]
        public JsonResult ListarDisenos()
        {
            object res = productoModel.ListarDisenos();

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }


        /**
        * Registrar producto 
        */
        [HttpPost]
        public JsonResult RegistrarProducto(producto jsonProducto)
        {
            bool res = productoModel.RegistrarProducto(jsonProducto);

            if (res)
            {

                return Json(new { msm = "Operacion exitosa" });
            }
            else
            {
                return Json(new { msm = var.MsmError });
            }
        }

        [HttpPost]
        public JsonResult RegistrarProducto1(FormatoRegProducto productoJson)
        {
            for (int i = 0; i < productoJson.idTallas.Count; i++)
            {
                bool res = productoModel.RegistrarProducto1(
                    productoJson.referencia,
                    productoJson.nombreProducto,
                    productoJson.descripcionProducto,
                    productoJson.cantidadesTalla[i],
                    productoJson.stockMinimo,
                    productoJson.estadoProducto,
                    productoJson.precioCompra,
                    productoJson.edicionLimitada,
                    productoJson.precio,
                    productoJson.bdPromocion_IdPromocion,
                    productoJson.bdClasificacionProducto_IdClasificacionProducto,
                    productoJson.idTallas[i],
                    productoJson.diseno
                );

                if (res) continue;
                else return Json(new { msm = "No se pudo registrar el producto" });
            }
            return Json("Operacion exitosa");
        }


        /* Modificar producto */
        [HttpPost]
        public JsonResult ModificarProducto(producto jsonProducto)
        {
            bool res = productoModel.ModificarProducto(jsonProducto);

            if (res) return Json(new { msm = "Operacion exitosa" });
            else return Json(new { msm = var.MsmError });
        }

        /* Asignar promocion a un producto */
        [HttpPost]
        public JsonResult AsignarPromocion(int idProducto, int idPromocion, int idTalla)
        {
            bool res = productoModel.AsignarPromocion(idProducto, idPromocion, idTalla);

            if (res) return Json(new { msm = "Operacion exitosa" });
            else return Json(new { msm = var.MsmError });
        }


        [HttpPost]
        public JsonResult ConsultarProducto(int referencia, int talla)
        {
            bool res = productoModel.ConsultarProducto(referencia, talla);

            if (res)
            {
                return Json(res);
            }
            else
            {
                return Json(
                    new { msm = var.MsmError });
            }
        }


        /* Eliminar producto */
        [HttpPost]
        public JsonResult EliminarProducto(int idProducto)
        {
            bool res = productoModel.EliminarProducto(idProducto);

            if (res) return Json(new { msm = "Operacion exitosa" });
            else return Json(new { msm = var.MsmError });
        }

        /* Cambiar imagen */
        [HttpPost]
        public JsonResult CambiarImagen(string fileName, int id)
        {
            bool res = productoModel.CambiarImagen(fileName, id);

            if (res) return Json(new { msm = "Operacion exitosa" });
            else return Json(new { msm = var.MsmError });
        }


        [HttpPost]
        public ActionResult Index(HttpPostedFileBase imagen1)
        {

            if (imagen1 != null && imagen1.ContentLength > 0)
            {
                var fileName = Path.GetFileName(imagen1.FileName);
                var path = Path.Combine(Server.MapPath("~/IMAGENES/PRODUCTOS"), fileName);
                imagen1.SaveAs(path);
            }

            return RedirectToAction("Imagenes");
        }
    }
}