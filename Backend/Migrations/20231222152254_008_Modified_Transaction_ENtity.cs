using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class _008_Modified_Transaction_ENtity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveredPlace",
                table: "TransactionDetails");

            migrationBuilder.AddColumn<int>(
                name: "ShippingRouteId",
                table: "Transactions",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("Relational:ColumnOrder", 7);

            migrationBuilder.AddColumn<int>(
                name: "DeliveredPlaceId",
                table: "TransactionDetails",
                type: "int",
                maxLength: 150,
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_ShippingRouteId",
                table: "Transactions",
                column: "ShippingRouteId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_ShippingRoutes_ShippingRouteId",
                table: "Transactions",
                column: "ShippingRouteId",
                principalTable: "ShippingRoutes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransactionDetails_Locations_DeliveredPlaceId",
                table: "TransactionDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_ShippingRoutes_ShippingRouteId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_ShippingRouteId",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_TransactionDetails_DeliveredPlaceId",
                table: "TransactionDetails");

            migrationBuilder.DropColumn(
                name: "ShippingRouteId",
                table: "Transactions");

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
    }
}
