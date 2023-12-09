using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class _002_AddFieldsToTransaction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DocManager",
                table: "Transactions",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true)
                .Annotation("Relational:ColumnOrder", 26);

            migrationBuilder.AddColumn<bool>(
                name: "IsCustomerReturn",
                table: "Transactions",
                type: "bit",
                nullable: false,
                defaultValue: false)
                .Annotation("Relational:ColumnOrder", 27);

            migrationBuilder.AddColumn<bool>(
                name: "IsSummitedDoc",
                table: "Transactions",
                type: "bit",
                nullable: false,
                defaultValue: false)
                .Annotation("Relational:ColumnOrder", 25);

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Transactions",
                type: "nvarchar(max)",
                nullable: true)
                .Annotation("Relational:ColumnOrder", 28);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DocManager",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "IsCustomerReturn",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "IsSummitedDoc",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Transactions");
        }
    }
}
