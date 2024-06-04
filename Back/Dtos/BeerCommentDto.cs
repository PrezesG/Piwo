namespace Piwo.Dtos
{
    public class BeerCommentDto
    {
        public int CommentId { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public int BeerId { get; set; }
        public string Comment { get; set; }
        public DateTime DateAdded { get; set; }
    }
}