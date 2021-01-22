using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class FacturaModel
    {
        ConexionDataContext DB = new ConexionDataContext();
        Comun var = Comun.GetInstance();
        
        //public Boolean RegistrarFactura(factura datosFatura)
        //{
        //    //try
            //{
            //    var registro = DB.SpRegistrarFactura(
            //        datosFatura.IdMovimiento,
            //        datosFatura.propina,
            //        datosFatura.iva,
            //        datosFatura.pagoBruto,
            //        datosFatura.pagoNeto
            //        );
            //    return true;
            //}
            //catch (Exception ex)
            //{

            //    var.MsmError = "Error al registrar producto : " + ex.Message;
        //    return false;
        //    //}
        //}
        public List<Object> ConsultaFactura(int idPedido)
        {
            //try
            //{
            //    var query = DB.SpConsultarFactura(idPedido);
            //    DateTime fecha = new DateTime();
            //    List<Object> objLista = new List<object>();
            //    foreach (SpConsultarFacturaResult cf in query)
            //    {
            //        fecha = (DateTime)cf.fecha;
            //        var objeto = new
            //        { 
            //        idFactura = cf.idFactura,
            //        iva = cf.iva,
            //        propina = cf.propina,
            //        pagoNeto = cf.pagoNeto,
            //        pagoBruto = cf.pagoBruto,
            //        descripcionProducto = cf.descripcionProducto,
            //        cantidadProducto = cf.cantidadProducto,
            //        SubTotal = cf.SubTotal,
            //        descripcionTipoProducto = cf.descripcionTipoProducto,
            //        idPedido = cf.idPedido,
            //        fecha = fecha.ToString("dd/MM/yyyy  H:mm:ss"),
            //        Cedula_Cliente = cf.Cedula_Cliente,
            //        Nombre_Cliente = cf.Nombre_Cliente,
            //        Cedula_Empleado = cf.Cedula_Empleado,
            //        Nombre_Empleado = cf.Nombre_Empleado,
            //        precio = cf.precio
            //        };
            //        objLista.Add(objeto);
            //    }

            //    return objLista;
            //}
            //catch (Exception ex)
            //{

            return null;
            //    var.MsmError = "Ha ocurrido un error al momento de visualizar los datos de la factura" + ex.Message;
            //}
        }
    }
}