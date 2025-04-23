using Microsoft.EntityFrameworkCore;
using BloodDonationAPI.Models;

namespace BloodDonationAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options)
        {
        }

        public DbSet<Donor> Donors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed initial data
            modelBuilder.Entity<Donor>().HasData(
                new Donor
                {
                    DonorId = 1,
                    Name = "Mohamed Ben Ali",
                    CIN = "12345678",
                    BloodType = "O+",
                    Governorate = "Tunis",
                    LastDonation = new DateTime(2023, 11, 15),
                    DonationsCount = 5,
                    Phone = "12345678",
                    Email = "mohamed.benali@example.com",
                    Status = "active"
                },
                new Donor
                {
                    DonorId = 2,
                    Name = "Amira Trabelsi",
                    CIN = "87654321",
                    BloodType = "A-",
                    Governorate = "Sousse",
                    LastDonation = new DateTime(2023, 10, 20),
                    DonationsCount = 3,
                    Phone = "98765432",
                    Email = "amira.trabelsi@example.com",
                    Status = "active"
                }
            );
        }
    }
}