using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using DTOs;

namespace Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? DisplayName { get; set; }
        public string? AboutMe { get; set; }

        public UserDTO ToDto()
        {
            return new UserDTO
            {
                Username = this.Username,
                DisplayName = this.DisplayName,
                AboutMe = this.AboutMe
            };
        }

    }
}