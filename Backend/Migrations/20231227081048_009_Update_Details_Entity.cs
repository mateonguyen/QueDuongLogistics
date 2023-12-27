using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class _009_Update_Details_Entity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransactionDetails_Locations_DeliveredPlaceId",
                table: "TransactionDetails");

            migrationBuilder.DropIndex(
                name: "IX_TransactionDetails_DeliveredPlaceId",
                table: "TransactionDetails");

            migrationBuilder.DropColumn(
                name: "DeliveredPlaceId",
                table: "TransactionDetails");

            migrationBuilder.AddColumn<string>(
                name: "DeliveredPlace",
                table: "TransactionDetails",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveredPlace",
                table: "TransactionDetails");

            migrationBuilder.AddColumn<int>(
                name: "DeliveredPlaceId",
                table: "TransactionDetails",
                type: "int",
                maxLength: 150,
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TransactionDetails_DeliveredPlaceId",
                table: "TransactionDetails",
                column: "DeliveredPlaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_TransactionDetails_Locations_DeliveredPlaceId",
                table: "TransactionDetails",
                column: "DeliveredPlaceId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
