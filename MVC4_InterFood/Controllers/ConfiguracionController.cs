using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC4_InterFood.Models;
using Newtonsoft.Json;

namespace MVC4_InterFood.Controllers
{
    public class ConfiguracionController : Controller
    {

        // Intancia singleton Comun
        Comun var = Comun.GetInstance();

        // Instancia del modelo Maestras
        Models.MaestrasModel maestrasModel = new MaestrasModel();


        // Instancia del modelo talla
        Models.TallaModel tallaModel = new TallaModel();

        // Instancia del modelo Tipo Producto
        Models.TipoProductoModel tipoProductoModel = new TipoProductoModel();
        
        // Instancia del modelo subtipo
        Models.SubtipoProductoModel subtipoModel = new SubtipoProductoModel();
        
        // Instancia del modelo subtipo
        Models.ClasificacionProductoModel clasificacionModel = new ClasificacionProductoModel();

        // Instancia del modelo tipo usuario
        Models.TipoUsuarioModel tipoUsuarioModel = new TipoUsuarioModel();

        // Instancia del modelo preguntas
        Models.PreguntaModel preguntasModel = new PreguntaModel();

        // Instancia del modelo motivo de cambio
        Models.MotivoCambioModel motivoCambioModel = new MotivoCambioModel();

        // Instancia del modelo motivo de agenda
        Models.MotivoAgendaModel motivoAgendaModel = new MotivoAgendaModel();

        // Instancia del modelo motivo del diseño
        Models.DisenoModel disenoModel = new DisenoModel();


        // GET: Configuracion
        public ActionResult Index()
        {
            return View();
        }


        /**
         * Consultar estructura de columnas tabla
         */
        [HttpPost]
        public JsonResult ConsulatarColumnas(string tablaNombre)
        {
            
            object res = maestrasModel.ConsulatarColumnas(tablaNombre);

            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }


        /**
         * Listar 
         */
        [HttpPost]
        public JsonResult Listar(string nombreTabla)
        {
            var res = new object();
            
            // Validar la tabla con la que se va a trabjar
            if (nombreTabla == "talla") res = tallaModel.ListarTodasTallas();
            else if (nombreTabla == "tipoProducto") res = tipoProductoModel.Listar1();
            else if (nombreTabla == "tipoProducto1") res = tipoProductoModel.Listar();
            else if (nombreTabla == "subTipoProducto") res = subtipoModel.Listar();
            else if (nombreTabla == "clasificacionProducto") res = clasificacionModel.ListarTodasClasificaciones();
            else if (nombreTabla == "tipoUsuario") res = tipoUsuarioModel.Listar();
            else if (nombreTabla == "pregunta") res = preguntasModel.Listar();
            else if (nombreTabla == "motivoCambio") res = motivoCambioModel.Listar();
            else if (nombreTabla == "motivoAgenda") res = motivoAgendaModel.Listar();
            else if (nombreTabla == "diseno") res = disenoModel.Listar();
            else var.MsmError = "Falta el nombre de la tabla";


            if (res != null) return Json(res);
            else return Json(new { msm = var.MsmError });
        }


        /**
         * Registrar 
         */
        [HttpPost]
        public JsonResult Registrar(string nombreTabla, string datos)
        {
            bool res = false;

            // Validar la tabla con la que se va a trabjar
            if (nombreTabla == "talla")
            {
                talla talla = JsonConvert.DeserializeObject<talla>(datos);
                res = tallaModel.RegistrarTalla(talla);
            }
            else if (nombreTabla == "tipoProducto")
            {
                tipoProducto tipoProducto = JsonConvert.DeserializeObject<tipoProducto>(datos);
                res = tipoProductoModel.Registrar(tipoProducto);
            }
            else if (nombreTabla == "subTipoProducto")
            {
                subTipoProducto subtipo = JsonConvert.DeserializeObject<subTipoProducto>(datos);
                res = subtipoModel.Registrar(subtipo);
            }
            else if (nombreTabla == "clasificacionProducto")
            {
                clasificacionProducto clasificacion = JsonConvert.DeserializeObject<clasificacionProducto>(datos);
                res = clasificacionModel.Registrar(clasificacion);
            }
            else if (nombreTabla == "tipoUsuario")
            {
                tipoUsuario tipoUsu = JsonConvert.DeserializeObject<tipoUsuario>(datos);
                res = tipoUsuarioModel.Registrar(tipoUsu);
            }
            else if (nombreTabla == "pregunta")
            {
                pregunta preg = JsonConvert.DeserializeObject<pregunta>(datos);
                res = preguntasModel.Registrar(preg);
            }
            else if (nombreTabla == "motivoCambio")
            {
                motivoCambio motivo = JsonConvert.DeserializeObject<motivoCambio>(datos);
                res = motivoCambioModel.Registrar(motivo);
            }
            else if (nombreTabla == "motivoAgenda")
            {
                motivoAgenda motivo = JsonConvert.DeserializeObject<motivoAgenda>(datos);
                res = motivoAgendaModel.Registrar(motivo);
            }
            else if (nombreTabla == "diseno")
            {
                diseno diseno = JsonConvert.DeserializeObject<diseno>(datos);
                res = disenoModel.Registrar(diseno);
            }
            else var.MsmError = "Falta el nombre de la tabla";


            if (res) return Json("Operacion exitosa");
            else return Json(new { msm = var.MsmError });
        }

        /**
         * Modificar 
         */
        [HttpPost]
        public JsonResult Modificar(string nombreTabla, string datos)
        {

            bool res = false;

            // Validar la tabla con la que se va a trabjar
            if (nombreTabla == "talla")
            {
                talla talla = JsonConvert.DeserializeObject<talla>(datos);
                res = tallaModel.ModificarTalla(talla);
            }
            else if (nombreTabla == "tipoProducto")
            {
                tipoProducto tipoProducto = JsonConvert.DeserializeObject<tipoProducto>(datos);
                res = tipoProductoModel.Modificar(tipoProducto);
            }
            else if (nombreTabla == "subTipoProducto")
            {
                subTipoProducto subtipo = JsonConvert.DeserializeObject<subTipoProducto>(datos);
                res = subtipoModel.Modificar(subtipo);
            }
            else if (nombreTabla == "clasificacionProducto")
            {
                clasificacionProducto clasificacion = JsonConvert.DeserializeObject<clasificacionProducto>(datos);
                res = clasificacionModel.Modificar(clasificacion);
            }
            else if (nombreTabla == "tipoUsuario")
            {
                tipoUsuario tipoUsu = JsonConvert.DeserializeObject<tipoUsuario>(datos);
                res = tipoUsuarioModel.Modificar(tipoUsu);
            }
            else if (nombreTabla == "pregunta")
            {
                pregunta preg = JsonConvert.DeserializeObject<pregunta>(datos);
                res = preguntasModel.Modificar(preg);
            }
            else if (nombreTabla == "motivoCambio")
            {
                motivoCambio motivo = JsonConvert.DeserializeObject<motivoCambio>(datos);
                res = motivoCambioModel.Modificar(motivo);
            }
            else if (nombreTabla == "motivoAgenda")
            {
                motivoAgenda motivo = JsonConvert.DeserializeObject<motivoAgenda>(datos);
                res = motivoAgendaModel.Modificar(motivo);
            }
            else if (nombreTabla == "diseno")
            {
                diseno diseno = JsonConvert.DeserializeObject<diseno>(datos);
                res = disenoModel.Modificar(diseno);
            }
            else var.MsmError = "Falta el nombre de la tabla";


            if (res) return Json("Operacion exitosa");
            else return Json(new { msm = var.MsmError });
        }


        /**
         * Habilitar registro 
         */
        [HttpPost]
        public JsonResult Habilitar(string nombreTabla, int id)
        {

            bool res = false;

            // Validar la tabla con la que se va a trabjar
            if (nombreTabla == "talla") res = tallaModel.HabilitarTalla(id);
            else if (nombreTabla == "tipoProducto") res = tipoProductoModel.Habilitar(id);
            else if (nombreTabla == "subTipoProducto") res = subtipoModel.Habilitar(id);
            else if (nombreTabla == "clasificacionProducto") res = clasificacionModel.Habilitar(id);
            else if (nombreTabla == "tipoUsuario") res = tipoUsuarioModel.Habilitar(id);
            else if (nombreTabla == "pregunta") res = preguntasModel.Habilitar(id);
            else if (nombreTabla == "motivoCambio") res = motivoCambioModel.Habilitar(id);
            else if (nombreTabla == "motivoAgenda") res = motivoAgendaModel.Habilitar(id);
            else if (nombreTabla == "diseno") res = disenoModel.Habilitar(id);
            else var.MsmError = "Falta el nombre de la tabla";

            if (res) return Json("Operacion exitosa");
            else return Json(new { msm = var.MsmError });
        }



        /**
         * Inhabilitar registro 
         */
        [HttpPost]
        public JsonResult Inhabilitar(string nombreTabla, int id)
        {

            bool res = false;

            // Validar la tabla con la que se va a trabjar
            if (nombreTabla == "talla") res = tallaModel.InhabilitarTalla(id);
            else if (nombreTabla == "tipoProducto") res = tipoProductoModel.Inhabilitar(id);
            else if (nombreTabla == "subTipoProducto") res = subtipoModel.Inhabilitar(id);
            else if (nombreTabla == "clasificacionProducto") res = clasificacionModel.Inhabilitar(id);
            else if (nombreTabla == "tipoUsuario") res = tipoUsuarioModel.Inhabilitar(id);
            else if (nombreTabla == "pregunta") res = preguntasModel.Inhabilitar(id);
            else if (nombreTabla == "motivoCambio") res = motivoCambioModel.Inhabilitar(id);
            else if (nombreTabla == "motivoAgenda") res = motivoAgendaModel.Inhabilitar(id);
            else if (nombreTabla == "diseno") res = disenoModel.Inhabilitar(id);
            else var.MsmError = "Falta el nombre de la tabla";


            if (res) return Json("Operacion exitosa");
            else return Json(new { msm = var.MsmError });
        }

    }
}