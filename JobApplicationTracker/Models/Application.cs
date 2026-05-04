namespace JobTrackerAPI.Models
{
    public class Application
    {
        public int Id { get; set; } // Unikt ID
        public string Company { get; set; } // Företagsnamn
        public string Role { get; set; } // Jobbtitel
        public string Status { get; set; } = "Applied"; // Status, default "Applied"
        public string AppliedAt { get; set; } // Datum
    }
}

