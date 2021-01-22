using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class SubtipoProductoModel
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
                var res = DB.SpListarSubtiposProducto().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar los subtipos de productos: " + ex.Message;
            }

            return null;
        }


        public bool Registrar(subTipoProducto subtipo)
        {
            try
            {
                var res = DB.SpRegistrarSubTipoProducto(
                    subtipo.clasificacion
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
         * Modificar un zona
         */
        public bool Modificar(subTipoProducto subtipo)
        {
            try
            {
                var res = DB.SpModificarSubTipoProducto(
                    subtipo.clasificacion,
                    subtipo.idSubTipo
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
        public bool Habilitar(int idSubTipoProducto)
        {
            try
            {
                var res = DB.SpHabilitarSubTipoProducto(idSubTipoProducto);
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
                var res = DB.SpInhabilitarSubTipoProducto(idTipoProducto);
                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al Inhabilitar el subtipo de producto : " + ex.Message;
            }

            return false;
        }

    }
}