using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class UsuarioModel
    {

        // Instancia contexto de LINQ
        ConexionDataContext DB = new ConexionDataContext();

        // Intancia singleton Comun
        Comun var = Comun.GetInstance();


        /**
         * Listar productos fitrados por cantidad
         */
        public object ListarUsuarios()
        {
            try
            {
                var res = DB.SpListarUsuario().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar los productos : " + ex.Message;
            }

            return null;
        }


        /**
        * Listar todos los tipos de producto
        */
        public object ListarTiposUsuario()
        {
            try
            {
                var res = DB.SpListarTiposUsuarios().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar todos los tipos de usuarios : " + ex.Message;
            }

            return null;
        }

        /* Listar todos los departamentos */
        public object ListarDepartamentos()
        {
            try
            {
                var res = DB.SpListarDepartamentos().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar todos los departamentos : " + ex.Message;
            }

            return null;
        }

        public object ListarPreguntas()
        {
            try
            {
                var res = DB.SpListarPreguntas().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar todas las preguntas : " + ex.Message;
            }

            return null;
        }

        /* Listar todos las ciudades */
        public object ListarCiudades()
        {
            try
            {
                var res = DB.SpListarCiudades().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar todas las ciudades : " + ex.Message;
            }

            return null;
        }

        /**
         * Registrar un producto
         */
        public bool RegistrarUsuario(usuarios usuario)
        {
            try
            {
                var res = DB.SpRegistrarUsuario(
                    usuario.identificacion,
                    usuario.nombres,
                    usuario.apellidos,
                    usuario.idDepartamento,
                    usuario.idCiudad,
                    usuario.direccionResidencia,
                    usuario.email,
                    usuario.estadoCuenta,
                    usuario.fechaNacimiento,
                    usuario.password,
                    usuario.respuesta,
                    usuario.tipoUsuario_IdTipo,
                    usuario.pregunta_IdPregunta
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al registrar usuario : " + ex.Message;
            }

            return false;
        }


        /* Modificar un producto */
        public bool ModificarUsuario(usuarios usuario)
        {
            try
            {
                var res = DB.SpModificarUsuario(
                    usuario.nombres,
                    usuario.apellidos,
                    usuario.idDepartamento,
                    usuario.idCiudad,
                    usuario.direccionResidencia,
                    usuario.email,
                    usuario.estadoCuenta,
                    usuario.fechaNacimiento,
                    usuario.password,
                    usuario.respuesta,
                    usuario.tipoUsuario_IdTipo,
                    usuario.pregunta_IdPregunta,
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