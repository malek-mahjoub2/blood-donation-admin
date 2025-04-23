using System.ComponentModel.DataAnnotations;

namespace BloodDonationAPI.Models
{
    public class Donor
    {
        [Key]
        public int DonorId { get; set; }
        
        [Required]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        public string CIN { get; set; } = string.Empty;
        
        [Required]
        public string BloodType { get; set; } = "O+";
        
        [Required]
        public string Governorate { get; set; } = "Tunis";
        
        public DateTime? LastDonation { get; set; }
        
        public int DonationsCount { get; set; } = 0;
        
        [Required]
        public string Phone { get; set; } = string.Empty;
        
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string Status { get; set; } = "active";
    }
}