using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC4_InterFood.Models
{

    /**
     * Esta clase sirve para definir métodos y variables comunes para toda la app
     */
    public class Comun
    {

        // SINGLETON

        // Almacena la instancia que se va devolver (Singleton)
        private static Comun instancia;

        // Constructor privado para singleton
        private Comun() { }


        /**
        * Devuelve la unica instancia de esta clase (Singleton)
        */
        public static Comun GetInstance()
        {
            if (instancia == null) instancia = new Comun();
            return instancia;
        }





        // Mensaje de error, cualquir error que ocurra en el modelo recae sobre esta variable
        private String msmError;

        /** 
         *  Se encarga de controlar los estados del aplicativo 
         *  true  ==> estamos en modo producción  
         *  false ==> estamos en modo de despliegue
         */

        private bool esFaseProduccion = true;
        private String msmErrorDefault = @"Lo siento a ocurrido un error al ejecutar la operación anterior,
                                              por favor comuniquese con el administrador del sistema.";

        public string MsmError
        {
            get
            {
                return msmError;
            }

            set
            {
                msmError = value;
            }
        }
    }
}