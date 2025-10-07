namespace VTC_CodeLab.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int? Credits { get; set; }

        public string TeacherId { get; set; }
        public ApplicationUser Teacher { get; set; }
        public List<Lesson> Lessons { get; set; }

    }
}
