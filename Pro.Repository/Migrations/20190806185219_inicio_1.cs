using Microsoft.EntityFrameworkCore.Migrations;

namespace Pro.Repository.Migrations
{
    public partial class inicio_1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lote",
                table: "Eventos");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Lote",
                table: "Eventos",
                nullable: true);
        }
    }
}
