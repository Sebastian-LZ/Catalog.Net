using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class ProductoModel
    {

        // Instancia contexto de LINQ
        ConexionDataContext DB = new ConexionDataContext();

        // Intancia singleton Comun
        Comun var = Comun.GetInstance();


        /* Listar productos fitrados por cantidad */
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


        /* Consultar producto */
        public producto ConsultarProducto(int idProducto)
        {
            try
            {
                var res = DB.SpValidarProducto(idProducto).FirstOrDefault();
                producto prod = new producto();

                if (res.IdProducto > 0)
                {
                    prod.IdProducto = res.IdProducto;
                    prod.referencia = res.referencia;
                    prod.nombreProducto = res.nombreProducto;
                    prod.descripcionProducto = res.descripcionProducto;
                    prod.inventario = res.inventario;
                }
                return prod;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al consultar el producto : " + ex.Message;
            }
            return null;
        }

        /* Consultar producto */
        public bool ConsultarProducto(int referencia, int talla)
        {
            try
            {
                var res = DB.SpConsultarProducto(referencia, talla).FirstOrDefault();
                producto prod = new producto();

                if (res.IdProducto > 0)
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al consultar el producto : " + ex.Message;
                return false;
            }
            return false;
        }



        /* Listar productos fitrados por cantidad */
        public object ListarProductosRef()
        {
            try
            {
                var res = DB.SpListarTodosProductoRef().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar los productos por ref: " + ex.Message;
            }
            return null;
        }

 

        /* Listar productos fitrados por clasificaciones */
        public object ListarFiltroClasificaciones(int id)
        {
            try
            {
                var res = DB.SpListarFiltroClasificaciones(id).ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar los productos por ref: " + ex.Message;
            }
            return null;
        }

        /* Listar productos fitrados por filtro */
        public object ListarProductosFiltro(int id)
        {
            try
            {
                var res = DB.SpListarTodosProductoFiltro(id).ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar los productos por filtro: " + ex.Message;
            }
            return null;
        }


        /* Listar productos fitrados por clasificacion */
        public object ListarProductosFiltro1(int id)
        {
            try
            {
                var res = DB.SpListarTodosProductoFiltro1(id).ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar los productos por filtro: " + ex.Message;
            }
            return null;
        }



        /**
         * Listar todos los productos sin filtro
         */
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

        /* Listar diseños */
        public object ListarDisenos()
        {
            try
            {
                var res = DB.SpListarDisenos().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar los diseños: " + ex.Message;
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
 * Registrar productos del pedido (detallePedido_Producto)  
 */
        public bool RegistrarProducto1(int referencia, string nombreProducto, string descripcionProducto, float inventario, float stockMinimo, string estadoProducto, float precioCompra,
                    string edicionLimitada, float precio, int bdPromocion_IdPromocion, int bdClasificacionProducto_IdClasificacionProducto, int bdTalla_IdTalla, int diseno)
        {
            try
            {
                var res = DB.SpRegistrarProducto(
                    referencia,
                    nombreProducto,
                    descripcionProducto,
                    inventario,
                    stockMinimo,
                    estadoProducto,
                    precioCompra,
                    edicionLimitada,
                    precio,
                    bdPromocion_IdPromocion,
                    bdClasificacionProducto_IdClasificacionProducto,
                    bdTalla_IdTalla,
                    diseno
                );
                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al registrar el producto: " + ex.Message;
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

        /*Asignarle promocion al producto */
        public bool AsignarPromocion(int idProducto, int idPromocion, int idTalla)
        {
            try
            {
                var res = DB.SpAsignarPromocion(idProducto, idPromocion, idTalla);
                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al modificar  producto : " + ex.Message;
            }
            return false;
        }

        // Insertar las imagenes del producto
        public bool CambiarImagen(string fileName, int id)
        {
            try
            {
                var res = DB.SpModificarImagenes(
                    fileName,
                    id
                    );
                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al modificar la imagen del  producto : " + ex.Message;
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