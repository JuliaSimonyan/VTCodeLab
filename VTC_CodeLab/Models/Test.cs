namespace VTC_CodeLab.Models
{
    public class Test
    {
        public int Id { get; set; }
        public string Queston { get; set; }
        public string ExpectedAnswer { get; set; }
        public int LessonId { get; set; }
        public Lesson Lesson { get; set; }
    }
}
