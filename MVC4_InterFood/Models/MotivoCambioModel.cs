using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class MotivoCambioModel
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
                var res = DB.SpListarMotivoCambio().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar las preguntas: " + ex.Message;
            }

            return null;
        }


        public bool Registrar(motivoCambio motivo)
        {
            try
            {
                var res = DB.SpRegistrarMotivoCambio(
                    motivo.motivoCambios
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
        public bool Modificar(motivoCambio motivo)
        {
            try
            {
                var res = DB.SpModificarMotivoCambio(
                    motivo.motivoCambios,
                    motivo.idMotivoCambio
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al modificar el motivo de cambio : " + ex.Message;
            }

            return false;
        }


        /**
         * Habilitar un zona
         */
        public bool Habilitar(int idMotivo)
        {
            try
            {
                var res = DB.SpHabilitarMotivoCambio(idMotivo);
                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al habilitar el motivo de cambio : " + ex.Message;
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
                var res = DB.SpInhabilitarMotivoCambio(idPregunta);
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