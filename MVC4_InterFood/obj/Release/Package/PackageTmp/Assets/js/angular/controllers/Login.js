var app = angular.module('Login', []);
 	
app.controller('ControllerLogin', ['$scope', '$http', function ($scope, $http) {
 	
    $scope.DatosLogin = {
 	
        nombreUsuario : "",
 	
       clave:""
 	
    }
 	7
   
 	8
    $scope.ValidarUsuario = function (DatosLogin) {
 	
        var url = "/Cuentas/ValidarUsuario";
 	
        $http.post(url, DatosLogin)
 	
       .success(function (rol) {
 	
            var RolPersona = rol.msm;
             console.log(RolPersona);
            if (RolPersona.toLowerCase() == "mesero") {
                window.location = "/Mesero/Index";
            } else if (RolPersona.toLowerCase() == "administrador") {
 	
                window.location = "/Administrador/Index";
 	
            }
 	
            if (rol.msm == "") {
 	
                new PNotify({
 	
                    title: "Error!",
 	
                    text: "usuario y/o clave incorrectas",
 	
                   type: "error"
 	
});
 	
            }
 	
        })
 	
       .error(function (vacio) {
 	
            new PNotify({
 	
                title: "Error!",
 	
                text: "usuario y/o clave incorrectas",
 
                type: "error"
 	
            });
 	
        })
 	
    }
 	
}]);


