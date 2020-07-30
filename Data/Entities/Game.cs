using System.ComponentModel.DataAnnotations;
using ndso_bowling.Enums;

namespace ndso_bowling.Database
{
    public class Game
    {
        [Key]
        public int Id { get; set; }
        public int Score { get; set; }
        public string Location { get; set; }
        public string Date { get; set; }
        public byte[] ScoreImage { get; set; }
        public Athlete Athlete { get; set; }
        public ReviewStatus Review { get; set; }
        public string Witness { get; set; }
    }
}