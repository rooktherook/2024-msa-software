using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Rankings
    {
        [Key]
        public int Id { get; set; }
        public string WeightClassId { get; set; }
        public string WeightClassName { get; set; }
        public int Ranking { get; set; }
        public string FighterId { get; set; }
    }
}

