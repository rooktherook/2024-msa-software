using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Listranking
    {
        [Key]
        public int? Id { get; set; }
        public string? Weightclassid { get; set; }
        public string? Weightclassname { get; set; }
        public int? Ranking { get; set; }
        public string? Fighterid { get; set; }

    }
}
