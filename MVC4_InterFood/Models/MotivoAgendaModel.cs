using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class MotivoAgendaModel
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
                var res = DB.SpListarMotivoAgenda().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar los motivos de la agenda: " + ex.Message;
            }

            return null;
        }


        public bool Registrar(motivoAgenda motivo)
        {
            try
            {
                var res = DB.SpRegistrarMotivoAgenda(
                    motivo.motivoAgendas
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al registrar el motivo de la agenda : " + ex.Message;
            }

            return false;
        }


        /**
         * Modificar un pregunta
         */
        public bool Modificar(motivoAgenda motivo)
        {
            try
            {
                var res = DB.SpModificarMotivoAgenda(
                    motivo.motivoAgendas,
                    motivo.idMotivoAgenda
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al modificar  el motivo de la agenda: " + ex.Message;
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
                var res = DB.SpHabilitarMotivoAgenda(idMotivo);
                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al habilitar el motivo de agenda: " + ex.Message;
            }

            return false;
        }


        /**
         * Inhabilitar un zona
         */
        public bool Inhabilitar(int idMotivo)
        {
            try
            {
                var res = DB.SpInhabilitarMotivoAgenda(idMotivo);
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