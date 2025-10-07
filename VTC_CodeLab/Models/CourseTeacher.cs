namespace VTC_CodeLab.Models
{
    public class CourseTeacher
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }
        public string TeacherId { get; set; }
        public ApplicationUser Teacher { get; set; }
    }
}
