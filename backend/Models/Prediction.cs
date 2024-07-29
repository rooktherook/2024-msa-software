using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Prediction
    {
        [Key]
        public int Id { get; set; }
        public string? User { get; set; } = "guest";
        public string? Fighter1Id { get; set; }
        public string? Fighter2Id { get; set; }
        public int? Rounds { get; set; }
        public string? Text { get; set; }
        public string? Outcome { get; set; }
    }
}