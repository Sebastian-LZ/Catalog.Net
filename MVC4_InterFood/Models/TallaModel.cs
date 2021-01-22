using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class TallaModel
    {

        // Instancia contexto de LINQ
        ConexionDataContext DB = new ConexionDataContext();

        // Intancia singleton Comun
        Comun var = Comun.GetInstance();


        /**
         * Listar las zonas fitrado por estado
         */
        public object ListarTallas(string estado)
        {
            try
            {
                var res = DB.SpListarTallas(estado).ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar las zonas : " + ex.Message;
            }

            return null;
        }


        /**
         * Listar todas las zonas sin filtro
         */
        public object ListarTodasTallas()
        {
            try
            {
                var res = DB.SpListarTodasTallas().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar las tallas: " + ex.Message;
            }

            return null;
        }



        /**
         * Registrar una zona
         */
        public bool RegistrarTalla(talla tallas)
        {
            try
            {
                var res = DB.SpRegistrarTalla(
                    tallas.nombreTalla
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al registrar la talla : " + ex.Message;
            }

            return false;
        }


        /**
         * Modificar un zona
         */
        public bool ModificarTalla(talla tallas)
        {
            try
            {
                var res = DB.SpModificarTalla(
                    tallas.nombreTalla,
                    tallas.idTalla
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al modificar la talla : " + ex.Message;
            }

            return false;
        }


        /**
         * Habilitar un zona
         */
        public bool HabilitarTalla(int IdTalla)
        {
            try
            {
                var res = DB.SpHabilitarTalla(IdTalla);
                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al habilitar la talla : " + ex.Message;
            }

            return false;
        }


        /**
         * Inhabilitar un zona
         */
        public bool InhabilitarTalla(int idZona)
        {
            try
            {
                var res = DB.SpInhabilitarTalla(idZona);
                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al Inhabilitar la zona : " + ex.Message;
            }

            return false;
        }


    }
}