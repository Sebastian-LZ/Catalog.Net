using System;
using System.Collections.Generic;
using System.Linq;
using System.Globalization;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace MVC4_InterFood.Models
{
    public class UsuariosModel
    {

        // Instancia contexto de LINQ
        ConexionDataContext DB = new ConexionDataContext();

        // Intancia singleton Comun
        Comun var = Comun.GetInstance();


        /**
         * Validar si el usuario existe en la DB   
         */
        //public usuarios ConsulatarUsuario(string cedula)
        //{
        //    try
        //    {
        //        var res = DB.SpValidarUsuario(cedula).FirstOrDefault();
        //        usuarios user = new usuarios();

        //        if (res.cedula != null)
        //        {

        //            user.idUsuario = res.idUsuario;
        //            user.nombre = res.nombre;
        //            user.apellido = res.apellido;
        //            user.cedula = res.cedula;
        //            user.nombreUsuario = res.nombreUsuario;
        //            user.clave = res.clave;
        //            user.idTipoUsuario = res.idTipoUsuario;
        //            user.estado = res.estado;
        //        }


        //        return user;
        //    }
        //    catch (Exception ex)
        //    {
        //        var.MsmError = "Error al consultar el cliente : " + ex.Message;
        //    }

        //    return null;
        //}
        public Tuple<string, int, string> Login(usuarios DatosUsuarioLogin)
        {
            try
            {
                var validarLoginQuery = DB.SpValidarUsuarioLogin(
                    DatosUsuarioLogin.email,
                    DatosUsuarioLogin.password
                    ).Single();
                string NombreUsuario = validarLoginQuery.email;
                int idUsuario = validarLoginQuery.identificacion;
                string rolUsuario = validarLoginQuery.descripcionTipoUsuario;          
                return new Tuple<string, int,string>(rolUsuario, idUsuario, NombreUsuario);
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al iniciar sesión : " + ex.Message;
                return null;
            }
        }
    }

    public class LoginModel
    {
        [Required]
        [Display(Name = "Nombre de usuario")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Contraseña")]
        public string Password { get; set; }

        [Display(Name = "¿Recordar cuenta?")]
        public bool RememberMe { get; set; }
    }
}