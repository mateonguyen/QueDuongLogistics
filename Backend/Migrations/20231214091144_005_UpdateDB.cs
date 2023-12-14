using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class _005_UpdateDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveredQuantity",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "EndPlace",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "KmEnd",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "KmStart",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "SoR",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "StartPlace",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "TimeEndIn",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "TimeEndOut",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "TimeStartIn",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "TimeStartOut",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "TranspotrationEntity",
                table: "Transactions");

            migrationBuilder.RenameColumn(
                name: "ReceivedQuantity",
                table: "Transactions",
                newName: "VendorId");

            migrationBuilder.AddColumn<byte[]>(
                name: "Photo",
                table: "Vendors",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "VendorId",
                table: "Transactions",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("Relational:ColumnOrder", 6)
                .OldAnnotation("Relational:ColumnOrder", 14);

            migrationBuilder.AlterColumn<string>(
                name: "IssuePlace",
                table: "Drivers",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HomeTown",
                table: "Drivers",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Photo",
                table: "Drivers",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Photo",
                table: "Customers",
                type: "varbinary(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LocationCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    LocationName = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Creator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Modified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Modifier = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ShippingRoutes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoadCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Origin = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Destination = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Creator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Modified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Modifier = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShippingRoutes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TransactionDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TransactionId = table.Column<int>(type: "int", nullable: false),
                    ContType = table.Column<int>(type: "int", nullable: false),
                    ContCount = table.Column<int>(type: "int", nullable: false),
                    PackageCount = table.Column<int>(type: "int", nullable: false),
                    PackageUnit = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Unit = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    GoodsDescription = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    DeliveredPlace = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    DeliveredTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TransactionDetails_Transactions_TransactionId",
                        column: x => x.TransactionId,
                        principalTable: "Transactions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_VendorId",
                table: "Transactions",
                column: "VendorId");

            migrationBuilder.CreateIndex(
                name: "IX_TransactionDetails_TransactionId",
                table: "TransactionDetails",
                column: "TransactionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_Vendors_VendorId",
                table: "Transactions",
                column: "VendorId",
                principalTable: "Vendors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_Vendors_VendorId",
                table: "Transactions");

            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.DropTable(
                name: "ShippingRoutes");

            migrationBuilder.DropTable(
                name: "TransactionDetails");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_VendorId",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "Photo",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "HomeTown",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "Photo",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "Photo",
                table: "Customers");

            migrationBuilder.RenameColumn(
                name: "VendorId",
                table: "Transactions",
                newName: "ReceivedQuantity");

            migrationBuilder.AlterColumn<int>(
                name: "ReceivedQuantity",
                table: "Transactions",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("Relational:ColumnOrder", 14)
                .OldAnnotation("Relational:ColumnOrder", 6);

            migrationBuilder.AddColumn<int>(
                name: "DeliveredQuantity",
                table: "Transactions",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("Relational:ColumnOrder", 15);

            migrationBuilder.AddColumn<string>(
                name: "EndPlace",
                table: "Transactions",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true)
                .Annotation("Relational:ColumnOrder", 10);

            migrationBuilder.AddColumn<string>(
                name: "KmEnd",
                table: "Transactions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true)
                .Annotation("Relational:ColumnOrder", 11);

            migrationBuilder.AddColumn<string>(
                name: "KmStart",
                table: "Transactions",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true)
                .Annotation("Relational:ColumnOrder", 7);

            migrationBuilder.AddColumn<string>(
                name: "SoR",
                table: "Transactions",
                type: "nvarchar(1)",
                maxLength: 1,
                nullable: false,
                defaultValue: "")
                .Annotation("Relational:ColumnOrder", 16);

            migrationBuilder.AddColumn<string>(
                name: "StartPlace",
                table: "Transactions",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true)
                .Annotation("Relational:ColumnOrder", 6);

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeEndIn",
                table: "Transactions",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified))
                .Annotation("Relational:ColumnOrder", 12);

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeEndOut",
                table: "Transactions",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified))
                .Annotation("Relational:ColumnOrder", 13);

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeStartIn",
                table: "Transactions",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified))
                .Annotation("Relational:ColumnOrder", 8);

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeStartOut",
                table: "Transactions",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified))
                .Annotation("Relational:ColumnOrder", 9);

            migrationBuilder.AddColumn<string>(
                name: "TranspotrationEntity",
                table: "Transactions",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true)
                .Annotation("Relational:ColumnOrder", 17);

            migrationBuilder.AlterColumn<string>(
                name: "IssuePlace",
                table: "Drivers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldNullable: true);
        }
    }
}
