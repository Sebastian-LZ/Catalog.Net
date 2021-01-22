using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class RegistrarseModel
    {

        // Instancia contexto de LINQ
        ConexionDataContext DB = new ConexionDataContext();

        // Intancia singleton Comun
        Comun var = Comun.GetInstance();

        /* Listar preguntas */
        public object ListarPreguntas()
        {
            try
            {
                var res = DB.SpListarPreguntas().ToList();
                if (res != null) return res;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al listar las preguntas: " + ex.Message;
            }
            return null;
        }


        /* Registrar un usuario */
        public bool RegistrarUsuario(usuarios usuario)
        {
            try
            {
                var res = DB.SpRegistrarUsuario1(
                    usuario.identificacion,
                    usuario.nombres,
                    usuario.apellidos,
                    usuario.email,
                    usuario.password,
                    usuario.pregunta_IdPregunta,
                    usuario.respuesta
                );

                return true;
            }
            catch (Exception ex)
            {
                var.MsmError = "Error al registrar usuario : " + ex.Message;
            }

            return false;
        }
    }
}