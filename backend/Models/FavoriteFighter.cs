using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DTOs;

namespace Models
{
    public class FavoriteFighter
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? FighterId { get; set; }

        public FavoriteFighterDTO ToDto()
        {
            return new FavoriteFighterDTO
            {
                FighterId = FighterId
            };
        }

    }
}
