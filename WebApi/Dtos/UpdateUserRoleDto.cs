namespace WebApi.Dtos
{
    public class UpdateUserRoleDto
    {
        public string Email { get; set; }
        public string Role { get; set; }
        public bool Delete { get; set; }
    }
}