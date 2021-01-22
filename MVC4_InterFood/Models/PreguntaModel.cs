using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class PreguntaModel
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
                var res = DB.SpListarPreguntas().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar las preguntas: " + ex.Message;
            }

            return null;
        }


        public bool Registrar(pregunta preg)
        {
            try
            {
                var res = DB.SpRegistrarPregunta(
                    preg.nombrePregunta
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al registrar subtipo de producto : " + ex.Message;
            }

            return false;
        }


        /**
         * Modificar un pregunta
         */
        public bool Modificar(pregunta preg)
        {
            try
            {
                var res = DB.SpModificarPregunta(
                    preg.nombrePregunta,
                    preg.idPregunta
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al modificar  el subtipo de producto : " + ex.Message;
            }

            return false;
        }


        /**
         * Habilitar un zona
         */
        public bool Habilitar(int idPregunta)
        {
            try
            {
                var res = DB.SpHabilitarPregunta(idPregunta);
                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al habilitar el tipo de producto : " + ex.Message;
            }

            return false;
        }


        /**
         * Inhabilitar un zona
         */
        public bool Inhabilitar(int idPregunta)
        {
            try
            {
                var res = DB.SpInhabilitarPregunta(idPregunta);
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