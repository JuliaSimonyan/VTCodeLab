using Microsoft.AspNetCore.Mvc;

namespace VTC_CodeLab.Controllers
{
    public class AboutUsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
