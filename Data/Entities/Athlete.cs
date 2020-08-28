using System.ComponentModel.DataAnnotations;
using System;
using ndso_bowling.Enums;

namespace ndso_bowling.Database
{
    public class Athlete
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Birthday { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public Coach Coach { get; set; }
    }
}