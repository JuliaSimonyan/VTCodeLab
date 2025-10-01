using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace VTC_CodeLab.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "Admin")]
    public class RolesController : Controller
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        public RolesController(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }
        public IActionResult Index()
        {
            var roles = _roleManager.Roles.ToList();
            return View(roles);
        }
        [HttpPost]
        public async Task<IActionResult> Add(string roleName)
        {
            if (!string.IsNullOrWhiteSpace(roleName))
            {
                var roleExist = await _roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    await _roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }

            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<IActionResult> Delete(string roleId)
        {
            if (!string.IsNullOrWhiteSpace(roleId))
            {
                var role = await _roleManager.FindByIdAsync(roleId);
                if (role != null)
                {
                    await _roleManager.DeleteAsync(role);
                }
            }
            return RedirectToAction("Index");
        }
    }
}
