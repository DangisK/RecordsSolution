using System.ComponentModel.DataAnnotations;

namespace RecordAPI.Data
{
    public class Record
    {
        [Key]
        public int RecordId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;
    }
}
