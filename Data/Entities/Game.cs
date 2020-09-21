using System.ComponentModel.DataAnnotations;
using ndso_bowling.Enums;

namespace ndso_bowling.Database
{
    public class Game
    {
        [Key]
        public int Id { get; set; }

        public Athlete Athlete { get; set; }

        public Coach Coach { get; set; }

        [Required]
        [Range(0, 300)]
        public int Score { get; set; }

        [Required]
        [MaxLength(36)]
        public string Location { get; set; }

        [Required]
        public string Date { get; set; }

        [MaxLength(72)]
        public string Witness { get; set; }

        [Phone]
        public string WitnessPhone { get; set; }
    }
}