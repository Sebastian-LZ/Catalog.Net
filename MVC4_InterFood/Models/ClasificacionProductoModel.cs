using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class ClasificacionProductoModel
    {

        // Instancia contexto de LINQ
        ConexionDataContext DB = new ConexionDataContext();

        // Intancia singleton Comun
        Comun var = Comun.GetInstance();


        /**
         * Listar las zonas fitrado por estado
         */
        public object ListarClasificaciones(string estado)
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
        public object ListarTodasClasificaciones()
        {
            try
            {
                var res = DB.SpListarTodasClasificaciones().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar las clasificaciones: " + ex.Message;
            }

            return null;
        }



        /**
         * Registrar una zona
         */
        public bool Registrar(clasificacionProducto clasificacion)
        {
            try
            {
                var res = DB.SpRegistrarClasificacion(
                    clasificacion.nombreClasificacion,
                    clasificacion.tipoProducto_idTipoProducto,
                    clasificacion.subTiposProducto_idSubTipo
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
        public bool Modificar(clasificacionProducto clasificaciones)
        {
            try
            {
                var res = DB.SpModificarClasificacion(
                    clasificaciones.nombreClasificacion,
                    clasificaciones.tipoProducto_idTipoProducto,
                    clasificaciones.subTiposProducto_idSubTipo,
                    clasificaciones.idClasificacionProducto
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al modificar la clasificacion : " + ex.Message;
            }

            return false;
        }


        /**
         * Habilitar un zona
         */
        public bool Habilitar(int IdClasificacion)
        {
            try
            {
                var res = DB.SpHabilitarClasificacion(IdClasificacion);
                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al habilitar la clasificacion : " + ex.Message;
            }

            return false;
        }


        /**
         * Inhabilitar un zona
         */
        public bool Inhabilitar(int IdClasificacion)
        {
            try
            {
                var res = DB.SpInhabilitarClasificacion(IdClasificacion);
                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al Inhabilitar la clasificacion : " + ex.Message;
            }

            return false;
        }


    }
}