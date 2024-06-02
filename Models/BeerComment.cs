using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Piwo.Models
{
    public class BeerComment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CommentId { get; set; }

        [Required]
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        [Required]
        public int BeerId { get; set; }

        [ForeignKey("BeerId")]
        public virtual Beer? Beer { get; set; }

        [Required]
        public string Comment { get; set; }

        public DateTime DateAdded { get; set; }

        public BeerComment(string userId, int beerId, string comment)
        {
            UserId = userId;
            BeerId = beerId;
            Comment = comment;
            DateAdded = DateTime.Now;
        }

        public BeerComment()
        {
        }
    }
}