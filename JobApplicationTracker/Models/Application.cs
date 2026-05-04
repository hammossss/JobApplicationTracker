// Models/Application.cs
namespace JobTrackerAPI.Models
{
    public enum ApplicationStatus
    {
        Ansokta,    // Applied
        Intervju,   // Interview
        Erbjudande, // Offer
        Nekade      // Rejected
    }

    public class Application
    {
        public int Id { get; set; }
        public string Company { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public ApplicationStatus Status { get; set; } = ApplicationStatus.Ansokta;
        public string AppliedAt { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
    }
}


