using Microsoft.EntityFrameworkCore;
using Records.Utils;

namespace RecordAPI.Data
{
    internal static class RecordsRepository
    {
        internal async static Task<IReadOnlyList<Record>> GetRecordsAsync()
        {
            using (var db = new RecordDbContext())
            {
                return await db.Records.ToListAsync();
            }
        }

        internal async static Task<PagedList<Record>> GetRecordsAsync(RecordSearchParameters searchParameters)
        {
            using (var db = new RecordDbContext())
            {
                var queryable = db.Records.AsQueryable().OrderBy(o => o.RecordId);
                return await PagedList<Record>.CreateAsync(queryable, searchParameters.PageNumber, searchParameters.PageSize);
            }
        }

        internal async static Task<Record> GetRecordAsync(int recordId)
        {
            using (var db = new RecordDbContext())
            {
                return await db.Records.FirstOrDefaultAsync(post => post.RecordId == recordId);
            }
        }

        internal async static Task<bool> CreateRecordAsync(Record recorDTOCreate)
        {
            using (var db = new RecordDbContext())
            {
                try
                {
                    await db.Records.AddAsync(recorDTOCreate);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch
                {
                    return false;
                }
            }
        }

        internal async static Task<bool> UpdateRecordAsync(int recordId, Record recorDTOUpdate)
        {
            using (var db = new RecordDbContext())
            {
                try
                {
                    Record record = await db.Records.AsNoTracking().FirstOrDefaultAsync(record => record.RecordId == recordId);
                    if (record == null) return false;
                    db.Records.Update(recorDTOUpdate);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch
                {
                    return false;
                }
            }
        }

        internal async static Task<bool> DeleteRecordAsync(int recordId)
        {
            using (var db = new RecordDbContext())
            {
                try
                {
                    Record recorDTODelete = await GetRecordAsync(recordId);
                    db.Remove(recorDTODelete);
                    return await db.SaveChangesAsync() >= 1;
                }
                catch
                {
                    return false;
                }
            }
        }
    }
}
