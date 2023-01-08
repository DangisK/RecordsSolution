using Microsoft.EntityFrameworkCore;

namespace RecordAPI.Data
{
    internal sealed class RecordDbContext : DbContext
    {
        public DbSet<Record> Records { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=./Data/RecordDb.db");
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            Record[] records = new Record[6];

            for (int i = 1; i <= records.Length; i++)
            {
                records[i-1] = new Record
                {
                    RecordId = i,
                    Title = $"Post {i}",
                    Description = $"Post {i} description :)"
                };
            }

            builder.Entity<Record>().HasData(records);
        }
    }
}
