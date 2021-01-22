using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{
    public class FormatoRegProducto
    {
        public int referencia { get; set; }
        public string nombreProducto { get; set; }
        public string descripcionProducto { get; set; }
        public float stockMinimo { get; set; }
        public string estadoProducto { get; set; }
        public float precioCompra { get; set; }
        public string edicionLimitada { get; set; }
        public float precio { get; set; }
        public int bdPromocion_IdPromocion { get; set; }
        public int bdClasificacionProducto_IdClasificacionProducto { get; set; }
        public int diseno { get; set; }
        public List<int> idTallas { get; set; }
        public List<float> cantidadesTalla { get; set; }
    }
}