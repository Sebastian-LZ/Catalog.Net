using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class InformacionUsuarioModel
    {

        // Instancia contexto de LINQ
        ConexionDataContext DB = new ConexionDataContext();

        // Intancia singleton Comun
        Comun var = Comun.GetInstance();


        /* Modificar un usuario */
        public bool ModificarUsuario(usuarios usuario)
        {
            try
            {
                var res = DB.SpModificarUsuarioCliente(
                    usuario.nombres,
                    usuario.apellidos,
                    usuario.idDepartamento,
                    usuario.idCiudad,
                    usuario.direccionResidencia,
                    usuario.email,
                    usuario.fechaNacimiento,
                    usuario.identificacion
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al modificar el usuario : " + ex.Message;
            }
            return false;
        }


        /* Listar pedidos del cliente */
        public object ListarPedidosDelCliente(int id)
        {
            try
            {
                var res = DB.SpListarPedidosCliente(id).ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar los pedidos del cliente: " + ex.Message;
            }
            return null;
        }

        //Consultar detalle pedido
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


        /* Modificar un usuario */
        public bool CambiarPregunta(usuarios usuario)
        {
            try
            {
                var res = DB.SpCambiarPregunta(
                    usuario.pregunta_IdPregunta,
                    usuario.respuesta,
                    usuario.identificacion
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al modificar el usuario : " + ex.Message;
            }
            return false;
        }
    }
}