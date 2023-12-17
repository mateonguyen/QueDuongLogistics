using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class _007_Mofify_Shipping_Route : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Destination",
                table: "ShippingRoutes");

            migrationBuilder.DropColumn(
                name: "Origin",
                table: "ShippingRoutes");

            migrationBuilder.AddColumn<int>(
                name: "DestinationId",
                table: "ShippingRoutes",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("Relational:ColumnOrder", 4);

            migrationBuilder.AddColumn<int>(
                name: "OriginId",
                table: "ShippingRoutes",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("Relational:ColumnOrder", 3);

            migrationBuilder.CreateIndex(
                name: "IX_ShippingRoutes_DestinationId",
                table: "ShippingRoutes",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_ShippingRoutes_OriginId",
                table: "ShippingRoutes",
                column: "OriginId");

            migrationBuilder.AddForeignKey(
                name: "FK_ShippingRoutes_Locations_DestinationId",
                table: "ShippingRoutes",
                column: "DestinationId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ShippingRoutes_Locations_OriginId",
                table: "ShippingRoutes",
                column: "OriginId",
                principalTable: "Locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShippingRoutes_Locations_DestinationId",
                table: "ShippingRoutes");

            migrationBuilder.DropForeignKey(
                name: "FK_ShippingRoutes_Locations_OriginId",
                table: "ShippingRoutes");

            migrationBuilder.DropIndex(
                name: "IX_ShippingRoutes_DestinationId",
                table: "ShippingRoutes");

            migrationBuilder.DropIndex(
                name: "IX_ShippingRoutes_OriginId",
                table: "ShippingRoutes");

            migrationBuilder.DropColumn(
                name: "DestinationId",
                table: "ShippingRoutes");

            migrationBuilder.DropColumn(
                name: "OriginId",
                table: "ShippingRoutes");

            migrationBuilder.AddColumn<string>(
                name: "Destination",
                table: "ShippingRoutes",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true)
                .Annotation("Relational:ColumnOrder", 4);

            migrationBuilder.AddColumn<string>(
                name: "Origin",
                table: "ShippingRoutes",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true)
                .Annotation("Relational:ColumnOrder", 3);
        }
    }
}
