using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class MovimientoModel
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


        /* Listar todos los productos sin filtro */
        public object ListarMovimientos()
        {
            try
            {
                var res = DB.SpListarMovimiento().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar todos los movimientos : " + ex.Message;
            }
            return null;
        }


        /* Registrar productos del movimiento cuando es de salida*/
        public bool RegistrarProductoPedido(int idPedido, int idProducto, float cantidad, float precio, float descuento)
        {
            try
            {
                var res = DB.SpRegistrarDetalleProductoPedido(idPedido, idProducto, cantidad, precio, descuento);
                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al registrar el producto para el pedido : " + ex.Message;
            }
            return false;
        }

        /* Registrar productos del movimiento cuando es de entrada*/
        public bool RegistrarProductoPedido1(int idPedido, int idProducto, float cantidad, float precio, float descuento)
        {
            try
            {
                var res = DB.SpRegistrarDetalleProductoPedido1(idPedido, idProducto, cantidad, precio, descuento);
                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al registrar el producto para el pedido : " + ex.Message;
            }
            return false;
        }

        /* Registrar movimiento  */
        public int RegistrarMovimiento(movimiento p)
        {
            try
            {
                var res = DB.SpRegistrarMovimiento(p.usuarios_identificacion, p.direccion, p.numeroComunicacion, p.descripcion, p.tipoMovimiento_idTipo_movimiento, p.subtotal, p.descuento, p.total).FirstOrDefault();
                usuarios user = new usuarios();

                if (res.idUltimoPedido != null) return Convert.ToInt32(res.idUltimoPedido);
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al registrar el pedido : " + ex.Message;
            }

            return 0;
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

        /* Listar referencias */
        public object ListarReferencia()
        {
            try
            {
                var res = DB.SpListarReferencia().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar las referencias: " + ex.Message;
            }
            return null;
        }

        /* Listar tipo de movimiento */
        public object ListarTipoMovimiento()
        {
            try
            {
                var res = DB.SpListarTiposMovimiento().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar las referencias: " + ex.Message;
            }
            return null;
        }

        /* Listar referencias */
        public object ListarUsuarios()
        {
            try
            {
                var res = DB.SpListarUsuario().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar los usuarios: " + ex.Message;
            }
            return null;
        }

        /* Listar tallas deacuerdo a la referencia*/
        public object ListarTallasReferencia(int referencia)
        {
            try
            {
                var res = DB.SpListarTallasReferencia(referencia).ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar las tallas: " + ex.Message;
            }
            return null;
        }

        public object ListarTodosProductos()
        {
            try
            {
                var res = DB.SpListarTodosProducto().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar todos los productos : " + ex.Message;
            }

            return null;
        }

        /**
         * Registrar un producto
         */
        public bool RegistrarProducto(producto producto)
        {
            try
            {
                var res = DB.SpRegistrarProducto(
                    producto.referencia,
                    producto.nombreProducto,
                    producto.descripcionProducto,
                    producto.inventario,
                    producto.stockMinimo,
                    producto.estadoProducto,
                    producto.precioCompra,
                    producto.edicionLimitada,
                    producto.precio,
                    producto.bdPromocion_IdPromocion,
                    producto.bdClasificacionProducto_IdClasificacionProducto,
                    producto.bdTalla_IdTalla,
                    producto.diseno
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al registrar producto : " + ex.Message;
            }

            return false;
        }


        /**
         * Modificar un producto
         */
        public bool ModificarProducto(producto producto)
        {
            try
            {
                var res = DB.SpModificarProducto(
                    producto.nombreProducto,
                    producto.descripcionProducto,
                    producto.inventario,
                    producto.stockMinimo,
                    producto.estadoProducto,
                    producto.precioCompra,
                    producto.edicionLimitada,
                    producto.precio,
                    producto.bdPromocion_IdPromocion,
                    producto.bdClasificacionProducto_IdClasificacionProducto,
                    producto.bdTalla_IdTalla,
                    producto.diseno,
                    producto.IdProducto
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al modificar  producto : " + ex.Message;
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