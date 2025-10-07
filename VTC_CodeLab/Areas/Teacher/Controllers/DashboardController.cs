using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VTC_CodeLab.Data;
using VTC_CodeLab.Models;

namespace VTC_CodeLab.Areas.Teacher.Controllers
{
    [Area("Teacher")]
    [Authorize(Roles = "Teacher")]
    public class DashboardController : Controller
    {
        private readonly ApplicationDBContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public DashboardController(ApplicationDBContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        public async Task<IActionResult> Index()
        {
            var teacher = await _userManager.GetUserAsync(User);
            if (teacher == null)
                return Unauthorized();

            var teacherCourses = await _context.Courses
                .Where(c => c.CourseTeachers.Any(ct => ct.TeacherId == teacher.Id))
                .ToListAsync();

            ViewData["CourseCount"] = teacherCourses.Count;
            return View(teacherCourses);
        }


    }
}
