using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class DisenoModel
    {

        // Instancia contexto de LINQ
        ConexionDataContext DB = new ConexionDataContext();

        // Intancia singleton Comun
        Comun var = Comun.GetInstance();

        /**
         * Listar 
         */
        public object Listar()
        {
            try
            {
                var res = DB.SpListarDisenos().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar las preguntas: " + ex.Message;
            }

            return null;
        }


        public bool Registrar(diseno diseno)
        {
            try
            {
                var res = DB.SpRegistrarDiseno(
                    diseno.nombreDiseno
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al registrar el diseño : " + ex.Message;
            }

            return false;
        }


        /* Modificar un diseño */
        public bool Modificar(diseno diseno)
        {
            try
            {
                var res = DB.SpModificarDiseno(
                    diseno.nombreDiseno,
                    diseno.idDiseno
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al modificar  el diseño: " + ex.Message;
            }

            return false;
        }


        /**
         * Habilitar un zona
         */
        public bool Habilitar(int idDiseno)
        {
            try
            {
                var res = DB.SpHabilitarDiseno(idDiseno);
                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al habilitar el diseño: " + ex.Message;
            }

            return false;
        }


        /**
         * Inhabilitar un zona
         */
        public bool Inhabilitar(int idDiseno)
        {
            try
            {
                var res = DB.SpInhabilitarDiseno(idDiseno);
                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al Inhabilitar la pregunta : " + ex.Message;
            }

            return false;
        }

    }
}