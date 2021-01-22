using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class ClienteModel
    {

        // Instancia contexto de LINQ
        ConexionDataContext DB = new ConexionDataContext();

        // Intancia singleton Comun
        Comun var = Comun.GetInstance();


        /**
         * Validar si el cliente existe en la DB   
         */
        public usuarios ConsulatarCliente(int cedula)
        {
            try
            {
                var res = DB.SpValidarCliente(cedula).FirstOrDefault();
                usuarios user = new usuarios();

                if (res.identificacion > 0)
                {
                    user.identificacion = res.identificacion;
                    user.nombres = res.nombres;
                    user.apellidos = res.apellidos;
                    //user.ciudad = res.ciudad;
                    user.direccionResidencia = res.direccionResidencia;
                    user.email = res.email;
                    user.estadoCuenta = res.estadoCuenta;
                    user.tipoUsuario_IdTipo = res.tipoUsuario_IdTipo;
                }
                 return user;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al consultar el cliente : " + ex.Message;
            }
            return null;
        }


        /**
         * Registrar cliente en la DB   
         */
        //public bool RegistrarCliente(usuario cliente)
        //{
        //    try
        //    {
        //        var res = DB.SpRegistrarCliente(cliente.nombre, cliente.apellido, cliente.cedula);
        //        return true;

        //    }
        //    catch (Exception ex)
        //    {
        //        var.MsmError = "Error al registrar el cliente : " + ex.Message;
        //        return false;
        //    }

        //}

        /**
         * Modificar cliente en la DB   
         */
        //public bool ModificarCliente(usuario cliente)
        //{
        //    try
        //    {
        //        var res = DB.SpModificarCliente(cliente.nombre, cliente.apellido, cliente.cedula);
        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        var.MsmError = "Error al modificar el cliente : " + ex.Message;
        //        return false;
        //    }

        //}

    }
}