using System.ComponentModel.DataAnnotations;
using ndso_bowling.Enums;

namespace ndso_bowling.Database
{
    public class Game
    {
        [Key]
        public string GameId { get; set; }
        public int Score { get; set; }
        public byte[] Image { get; set; }
        public ReviewStatus Review { get; set; }
    }
}