﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class FormatoRegPedido
    {
        public int cedulaCliente { get; set; }
        public int cedula { get; set; }
        public string direccion { get; set; }
        public string numeroComunicacion { get; set; }
        public string descripcion { get; set; }
        public List<int> idProductos { get; set; }
        public List<float> cantidadesProductos { get; set; }
        public List<float> precio { get; set; }
        public List<float> descuentos { get; set; }
    }
}