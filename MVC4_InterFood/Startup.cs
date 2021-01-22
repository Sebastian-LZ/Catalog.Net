using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MVC4_InterFood.Startup))]
namespace MVC4_InterFood
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
           
        }
    }
}
