using System.Web;
using System.Web.Optimization;

namespace MVC4_InterFood
{
    public class BundleConfig
    {
     
       /**
        * Este archivo ayuda a realizar la carga de los css y js 
        * en una sola llamada al servidor ayudando a disminuir el tiempo de carga de la web. 
        */   

        public static void RegisterBundles(BundleCollection bundles)
        {


            // CARGA DE LOS JS

            
            // Los Js que primero se deben cargar en la web, ya que otros js lo utilizan como dependencia 
            bundles.Add(new ScriptBundle("~/Primero").Include(
                        "~/Assets/js/jquery/jquery.min.js",
                        "~/Assets/js/bootstrap/nprogress.js",
                        "~/Assets/js/jquery.catslider.js"
                        ));

            // Todas las librerias de terceros y que vienen por defecto con MVC4
            bundles.Add(new ScriptBundle("~/Libs").Include(
                        "~/Assets/js/jquery/jquery.validate.min.js",
                        "~/Assets/js/jquery/messages_es.min.js",
                        "~/Assets/js/jquery/Functions_Validation.js",
                        "~/Assets/js/bootstrap/bootstrap.min.js",
                        "~/Assets/js/progressbar/bootstrap-progressbar.min.js",
                        "~/Assets/js/propios/otros.js",
                        "~/Assets/js/notify/pnotify.core.js",
                        "~/Assets/js/notify/pnotify.buttons.js",
                        "~/Assets/js/notify/pnotify.nonblock.js",
                        "~/Assets/js/custom.js",
                        "~/Assets/js/bootstrap/respond.min.js"
                        ));

            // Libreria para graficas
            bundles.Add(new ScriptBundle("~/Graficas").Include(
                       "~/Assets/js/chartjs/chart.min.js",
                       "~/Assets/js/moris/raphael-min.js",
                       "~/Assets/js/moris/morris.js"
                       //"~/Assets/js/gauge/gauge.min.js",
                       //"~/Assets/js/gauge/gauge_demo.js"
                       ));


            // Libreria y js de angularJs y controladores 
            bundles.Add(new ScriptBundle("~/Angular").Include(
                       "~/Assets/js/angular/angular.min.js",
                       "~/Assets/js/angular/angular-validate.min.js",
                       "~/Assets/js/angular/ngStorage.min.js"
                       ));

            // Js propios
            /*bundles.Add(new ScriptBundle("~/Propios").Include(
                       "~/Assets/js/angular/angular.min.js",
                       "~/Assets/js/angular/controllers/pedidoController.js"
                       ));*/



            // CARGA DE LOS CSS
            bundles.Add(new StyleBundle("~/Estilos").Include(
                      "~/Assets/css/bootstrap.min.css",
                      "~/Assets/fonts/css/font-awesome.min.css",
                      "~/Assets/css/animate.min.css",
                      "~/Assets/css/custom.css",
                      "~/Assets/css/icheck/flat/green.css",
                      "~/Assets/css/floatexamples.css"
                      ));
        }
    }
}
