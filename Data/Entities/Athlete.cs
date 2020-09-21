using System.ComponentModel.DataAnnotations;

namespace ndso_bowling.Database
{
    public class Athlete
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(36)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(36)]
        public string LastName { get; set; }
        public string Birthday { get; set; }

        [Phone]
        public string PhoneNumber { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public string City { get; set; }

        public Coach Coach { get; set; }
    }
}