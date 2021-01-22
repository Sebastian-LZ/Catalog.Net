using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class FormatoModificarUsuario
    {
        public int identificacion { get; set; }
        public string respuestaAnterior { get; set; }
        public int pregunta_IdPregunta { get; set; }
        public string respuesta { get; set; }
        public int idUsuario { get; set; }
    }
}