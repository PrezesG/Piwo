﻿namespace Piwo.Dtos;

public class UserDto
{  
    public string Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public List<string> Roles { get; set; } = new List<string>();
}