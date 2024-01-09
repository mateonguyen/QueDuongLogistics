using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class _014_RemoveShippingRoute : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShippingRoutes_Locations_DestinationId",
                table: "ShippingRoutes");

            migrationBuilder.DropForeignKey(
                name: "FK_ShippingRoutes_Locations_OriginId",
                table: "ShippingRoutes");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_ShippingRoutes_ShippingRouteId",
                table: "Transactions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ShippingRoutes",
                table: "ShippingRoutes");

            migrationBuilder.DropIndex(
                name: "IX_ShippingRoutes_DestinationId",
                table: "ShippingRoutes");

            migrationBuilder.DropIndex(
                name: "IX_ShippingRoutes_OriginId",
                table: "ShippingRoutes");

            migrationBuilder.RenameTable(
                name: "ShippingRoutes",
                newName: "ShippingRoute");

            migrationBuilder.AlterColumn<int>(
                name: "ShippingRouteId",
                table: "Transactions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("Relational:ColumnOrder", 7);

            migrationBuilder.AddColumn<string>(
                name: "Destination",
                table: "Transactions",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Origin",
                table: "Transactions",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ShippingRoute",
                table: "ShippingRoute",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_ShippingRoute_ShippingRouteId",
                table: "Transactions",
                column: "ShippingRouteId",
                principalTable: "ShippingRoute",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_ShippingRoute_ShippingRouteId",
                table: "Transactions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ShippingRoute",
                table: "ShippingRoute");

            migrationBuilder.DropColumn(
                name: "Destination",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "Origin",
                table: "Transactions");

            migrationBuilder.RenameTable(
                name: "ShippingRoute",
                newName: "ShippingRoutes");

            migrationBuilder.AlterColumn<int>(
                name: "ShippingRouteId",
                table: "Transactions",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true)
                .Annotation("Relational:ColumnOrder", 7);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ShippingRoutes",
                table: "ShippingRoutes",
                column: "Id");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_ShippingRoutes_ShippingRouteId",
                table: "Transactions",
                column: "ShippingRouteId",
                principalTable: "ShippingRoutes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
