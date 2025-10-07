namespace VTC_CodeLab.Models.ViewModels.Users
{
    public class EditUserViewModel
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public List<string> Roles { get; set; }
    }
}
