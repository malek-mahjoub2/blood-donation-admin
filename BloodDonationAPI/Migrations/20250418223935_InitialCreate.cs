using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BloodDonationAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Donors",
                columns: table => new
                {
                    DonorId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CIN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BloodType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Governorate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastDonation = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DonationsCount = table.Column<int>(type: "int", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Donors", x => x.DonorId);
                });

            migrationBuilder.InsertData(
                table: "Donors",
                columns: new[] { "DonorId", "BloodType", "CIN", "DonationsCount", "Email", "Governorate", "LastDonation", "Name", "Phone", "Status" },
                values: new object[,]
                {
                    { 1, "O+", "12345678", 5, "mohamed.benali@example.com", "Tunis", new DateTime(2023, 11, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "Mohamed Ben Ali", "12345678", "active" },
                    { 2, "A-", "87654321", 3, "amira.trabelsi@example.com", "Sousse", new DateTime(2023, 10, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), "Amira Trabelsi", "98765432", "active" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Donors");
        }
    }
}
