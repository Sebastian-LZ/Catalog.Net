using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class TipoUsuarioModel
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
                var res = DB.SpListarTiposUsuario().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar los tipos de usuarios: " + ex.Message;
            }

            return null;
        }


        /**
         * Registrar 
         */
        public bool Registrar(tipoUsuario tipoUsuario)
        {
            try
            {
                var res = DB.SpRegistrarTipoUsuario(
                    tipoUsuario.descripcionTipoUsuario
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al registrar un tipo de usuario : " + ex.Message;
            }

            return false;
        }


        /**
         * Modificar 
         */
        public bool Modificar(tipoUsuario tipoUsuario)
        {
            try
            {
                var res = DB.SpModificarTipoUsuario(
                    tipoUsuario.descripcionTipoUsuario,
                    tipoUsuario.idTipoUsuario
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al modificar el tipo de usuario : " + ex.Message;
            }

            return false;
        }


        /**
         * Habilitar
         */
        public bool Habilitar(int id)
        {
            try
            {
                var res = DB.SpHabilitarTipoUsuario(id);
                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al habilitar tipo de usuario : " + ex.Message;
            }

            return false;
        }


        /**
         * Inhabilitar 
         */
        public bool Inhabilitar(int id)
        {
            try
            {
                var res = DB.SpInhabilitarTipoUsuario(id);
                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al Inhabilitar tipo de usuario : " + ex.Message;
            }

            return false;
        }

    }
}