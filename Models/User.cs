﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Piwo.Models
{
    public class User : IdentityUser
    {
        [StringLength(30, ErrorMessage = "Name length can't be more than 30.")]
        public string Name { get; set; }
        public ICollection<UserBeer> UserBeers { get; set; }
        public ICollection<BeerComment> BeerComments { get; set; }

        public User(string name)
        {
            Name = name;
        }

        public User()
        {
        }
    }
}

