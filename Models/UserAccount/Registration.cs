using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace WarThunderForum.Models.User
{
    public class Registration
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
    }
}
