namespace Piwo.Dtos;

public class BeerDto
{
    public int BeerId { get; set; }
    public string Name { get; set; }
    public string Producer { get; set; }
    public string Description { get; set; }
    public string Image { get; set; }
    public double Alcohol { get; set; }
    public double Price { get; set; }
    
    public double? AverageRating { get; set; }
    public int? RatingCount { get; set; }
    
}