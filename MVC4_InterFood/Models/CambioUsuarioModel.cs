using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class CambioUsuarioModel
    {

        // Instancia contexto de LINQ
        ConexionDataContext DB = new ConexionDataContext();

        // Intancia singleton Comun
        Comun var = Comun.GetInstance();




        public List<Object> ConsultarPedido(int id, int identificacion)
        {
            try
            {
                var objQuery = DB.SpConsultarProductosPedido(id, identificacion).ToList();
                if (objQuery != null)
                {
                    DateTime fecha = new DateTime();
                    List<Object> listObj = new List<Object>();

                    foreach (SpConsultarProductosPedidoResult res in objQuery)
                    {
                        fecha = (DateTime)res.Fecha;
                        var obj = new
                        {
                            ID = res.ID,
                            fecha = fecha.ToString("dd-MM-yyyy  H:mm:ss"),
                            producto = res.Producto,
                            cantidad = res.Cantidad,
                            descuento = res.Descuento,
                            precio = res.Precio,
                            img = res.Imagen1
                        };
                        listObj.Add(obj);
                    }
                    return listObj;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al consultar los productos del pedido : " + ex.Message;
                return null;
            }
        }























        /**
         * Registrar pedido  
         */
        public int RegistrarPedido(movimiento p)
        {
            try
            {
                var res = DB.SpRegistrarPedido(p.usuarios_identificacion, p.direccion, p.numeroComunicacion, p.descripcion, p.subtotal, p.descuento, p.total).FirstOrDefault();
                usuarios user = new usuarios();

                if (res.idUltimoPedido != null) return Convert.ToInt32(res.idUltimoPedido);
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al registrar el pedido : " + ex.Message;
            }

            return 0;
        }


        /**
         * Registrar productos del pedido (detallePedido_Producto)  
         */
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








        public List<Object> ListadoPedidos()
        {
            try
            {
                var objQuery = DB.SpListarPedidos().ToList();
                if (objQuery != null)
                {

                    DateTime fecha = new DateTime();
                    List<Object> listObj = new List<Object>();

                    foreach (SpListarPedidosResult res in objQuery)
                    {
                        fecha = (DateTime)res.Fecha;
                        var obj = new
                        {
                            ID = res.ID,
                            fecha = fecha.ToString("dd-MM-yyyy  H:mm:ss"),
                            cedula = res.Cedula,
                            nombreCliente = res.Nombre_Cliente,
                            direccion = res.Direccion,
                            telefono = res.Telefono,
                            descripcion = res.Descripcion,
                            descuentos = res.Descuentos,
                            total = res.Total,
                            estado = res.Estado 
                        };
                        listObj.Add(obj);
                    }
                    return listObj;
                }
                else
                {
                    return null;
                    }
                }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar los pedidos : " + ex.Message;
                return null;
            }
        }

        public List<Object> ListadoProductosPedido(int id)
        {
            try
            {
                var objQuery = DB.SpListarProductosPedido(id).ToList();
                if (objQuery != null)
                {
                    List<Object> listObj = new List<Object>();

                    foreach (SpListarProductosPedidoResult res in objQuery)
                    {
                        var obj = new
                        {
                            referencia = res.referencia,
                            nombreProducto = res.nombreProducto,
                            edicionLimitada = res.edicionLimitada,
                            cantidad = res.cantidad,
                            nombreTalla = res.nombreTalla,
                        };
                        listObj.Add(obj);
                    }
                    return listObj;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar los productos del pedido : " + ex.Message;
                return null;
            }
        }

        public List<Object> ListadoPedidosFinalizado()
        {
            try
            {
                var objQuery = DB.SpListarPedidosFinalizado().ToList();
                if (objQuery != null)
                {

                    DateTime fecha = new DateTime();
                    List<Object> listObj = new List<Object>();

                    foreach (SpListarPedidosFinalizadoResult res in objQuery)
                    {
                        fecha = (DateTime)res.Fecha;
                        var obj = new
                        {
                            ID = res.ID,
                            fecha = fecha.ToString("dd-MM-yyyy  H:mm:ss"),
                            cedula = res.Cedula,
                            nombreCliente = res.Nombre_Cliente,
                            direccion = res.Direccion,
                            telefono = res.Telefono,
                            descripcion = res.Descripcion,
                            descuentos = res.Descuentos,
                            total = res.Total,
                            estado = res.Estado
                        };
                        listObj.Add(obj);
                    }
                    return listObj;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar los pedidos : " + ex.Message;
                return null;
            }
        }

        public List<Object> ListadoPedidosEnProceso()
        {
            try
            {
                var objQuery = DB.SpListarPedidosEnProceso().ToList();
                if (objQuery != null)
                {

                    DateTime fecha = new DateTime();
                    List<Object> listObj = new List<Object>();

                    foreach (SpListarPedidosEnProcesoResult res in objQuery)
                    {
                        fecha = (DateTime)res.Fecha;
                        var obj = new
                        {
                            ID = res.ID,
                            fecha = fecha.ToString("dd-MM-yyyy  H:mm:ss"),
                            cedula = res.Cedula,
                            nombreCliente = res.Nombre_Cliente,
                            direccion = res.Direccion,
                            telefono = res.Telefono,
                            descripcion = res.Descripcion,
                            descuentos = res.Descuentos,
                            total = res.Total,
                            estado = res.Estado
                        };
                        listObj.Add(obj);
                    }
                    return listObj;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar los pedidos : " + ex.Message;
                return null;
            }
        }


        public List<Object> ListadoPedidosCancelados()
        {
            try
            {
                var objQuery = DB.SpListarPedidosCancelado().ToList();
                if (objQuery != null)
                {

                    DateTime fecha = new DateTime();
                    List<Object> listObj = new List<Object>();

                    foreach (SpListarPedidosCanceladoResult res in objQuery)
                    {
                        fecha = (DateTime)res.Fecha;
                        var obj = new
                        {
                            ID = res.ID,
                            fecha = fecha.ToString("dd-MM-yyyy  H:mm:ss"),
                            cedula = res.Cedula,
                            nombreCliente = res.Nombre_Cliente,
                            direccion = res.Direccion,
                            telefono = res.Telefono,
                            descripcion = res.Descripcion,
                            descuentos = res.Descuentos,
                            total = res.Total,
                            estado = res.Estado
                        };
                        listObj.Add(obj);
                    }
                    return listObj;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar los pedidos : " + ex.Message;
                return null;
            }
        }

        /* Listar todos los pedidos */
        public object ListarPedidos1()
        {
            try
            {
                var res = DB.SpListarTodosPedidos().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar todos los productos : " + ex.Message;
            }

            return null;
        }


        public object FormulaPedido(int idPedido)
        {
            //try
            //{
            //    var query = DB.SpConsultaFormulasPedido(idPedido);
            //    if (query != null)
            //    {
            //        return query;
            //    }
            //    else
            //    {
            //        return null;
            //    }
            //}
            //catch (Exception ex)
            //{

            //    var.MsmError = "Error al listar la formula de los pedidos : " + ex.Message;
                return null;
            //}
        }

        public Boolean CambiarEstadoPedido(int idPedido, string estado)
        {
            try
            {
                var cambiar = DB.SpCambiarEstadoPedido(idPedido, estado);
                if (cambiar > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {

                return false;
            }
        }
    }
}