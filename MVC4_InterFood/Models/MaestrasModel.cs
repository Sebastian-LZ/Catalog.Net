using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class MaestrasModel
    {

        // Instancia contexto de LINQ
        ConexionDataContext DB = new ConexionDataContext();

        // Intancia singleton Comun
        Comun var = Comun.GetInstance();



        /**
         * Consulatar columnas de una tabla
         */
        public object ConsulatarColumnas(string nombreTabla)
        {
            try
            {
                var.MsmError = "Error al consultar las columnas de la tabla " + nombreTabla + " : " ;
                var res = DB.SpConsultarColumnas(nombreTabla).ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al consultar las columnas de la tabla " + nombreTabla + " : " + ex.Message;
            }

            return null;
        }


    }
}