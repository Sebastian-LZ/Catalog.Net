using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class TipoProductoModel
    {

        // Instancia contexto de LINQ
        ConexionDataContext DB = new ConexionDataContext();

        // Intancia singleton Comun
        Comun var = Comun.GetInstance();

        /* Listar */
        public object Listar()
        {
            try
            {
                var res = DB.SpListarTiposProducto().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar los tipos de productos: " + ex.Message;
            }

            return null;
        }

        // Listar todos
        public object Listar1()
        {
            try
            {
                var res = DB.SpListarTiposProducto1().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar los tipos de productos: " + ex.Message;
            }

            return null;
        }



        /**
         * Registrar una zona
         */
        public bool Registrar(tipoProducto tipoProducto)
        {
            try
            {
                var res = DB.SpRegistrarTipoProducto(
                    tipoProducto.descripcionTipoProducto
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al registrar tipo de producto : " + ex.Message;
            }

            return false;
        }


        /**
         * Modificar un zona
         */
        public bool Modificar(tipoProducto tipoProducto)
        {
            try
            {
                var res = DB.SpModificarTipoProducto(
                    tipoProducto.descripcionTipoProducto,
                    tipoProducto.idTipoProducto
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al modificar  tipo de producto : " + ex.Message;
            }

            return false;
        }


        /**
         * Habilitar un zona
         */
        public bool Habilitar(int idTipoProducto)
        {
            try
            {
                var res = DB.SpHabilitarTipoProducto(idTipoProducto);
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
        public bool Inhabilitar(int idTipoProducto)
        {
            try
            {
                var res = DB.SpInhabilitarTipoProducto(idTipoProducto);
                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al Inhabilitar el tipo de producto : " + ex.Message;
            }

            return false;
        }

    }
}