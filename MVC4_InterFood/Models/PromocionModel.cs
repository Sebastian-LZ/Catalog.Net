using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class PromocionModel
    {

        // Instancia contexto de LINQ
        ConexionDataContext DB = new ConexionDataContext();

        // Intancia singleton Comun
        Comun var = Comun.GetInstance();


        /**
         * Listar productos fitrados por cantidad
         */
        public object ListarProductos()
        {
            try
            {
                var res = DB.SpListarProductos().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar los productos : " + ex.Message;
            }

            return null;
        }


        /**
         * Listar todos los productos sin filtro
         */
        public object ListarTodasPromociones()
        {
            try
            {
                var res = DB.SpListarTodosPromociones().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar todas las promociones : " + ex.Message;
            }

            return null;
        }


        /* Listar todas las clasificaciones */
        public object ListarClasificaciones()
        {
            try
            {
                var res = DB.SpListarClasificaciones().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar todas las clasificaciones: " + ex.Message;
            }
            return null;
        }

        /* Listar promociones */
        public object ListarPromociones()
        {
            try
            {
                var res = DB.SpListarPromociones().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar las promociones: " + ex.Message;
            }
            return null;
        }

        /* Listar tallas */
        public object ListarTallas()
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
         * Registrar un producto
         */
        public bool RegistrarPromocion(promocion promocion)
        {
            try
            {
                var res = DB.SpRegistrarPromocion(
                    promocion.nombrePromocion,
                    promocion.descripcion,
                    promocion.porcentaje,
                    promocion.efectivo,
                    promocion.vigencia,
                    promocion.estado
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al registrar la promocion : " + ex.Message;
            }

            return false;
        }


        /**
         * Modificar un producto
         */
        public bool ModificarPromocion(promocion promocion)
        {
            try
            {
                var res = DB.SpModificarPromocion(
                    promocion.nombrePromocion,
                    promocion.descripcion,
                    promocion.porcentaje,
                    promocion.efectivo,
                    promocion.vigencia,
                    promocion.estado,
                    promocion.idPromocion
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al modificar  promocion : " + ex.Message;
            }

            return false;
        }


        /**
         * Eliminar un producto
         */
        public bool EliminarProducto(int idProducto)
        {
            try
            {
                var res = DB.SpEliminarProducto(idProducto);
                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al eliminar  producto : " + ex.Message;
            }

            return false;
        }

    }
}