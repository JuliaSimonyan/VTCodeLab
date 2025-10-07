using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace VTC_CodeLab.Areas.Teacher.Controllers
{
    [Area("Teacher")]
    [Authorize(Roles ="Teacher")]
    public class CoursesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
