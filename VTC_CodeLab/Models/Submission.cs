namespace VTC_CodeLab.Models
{
    public class Submission
    {
        public int Id { get; set; }
        public string StudentId { get; set; }
        public ApplicationUser Student { get; set; }

        public int TestId { get; set; }
        public Test Test { get; set; }
        public string Code { get; set; }
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
        public bool IsCorrect { get; set; }
       
       
    }
}
