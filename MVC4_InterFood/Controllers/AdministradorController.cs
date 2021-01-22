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
    public class AdministradorController : Controller
    {
        
        
             public ActionResult Index()
        {
                return View();

        }

        // GET: Facturacion
        public ActionResult Facturacion()
        {
            return View();
        }

    }
    }

