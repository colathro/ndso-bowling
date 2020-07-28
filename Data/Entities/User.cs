using System.ComponentModel.DataAnnotations;
using ndso_bowling.Enums;

namespace ndso_bowling.Database
{
    public class User
    {
        [Key]
        public string Id { get; set; }
        public Athlete Athlete { get; set; }
    }
}