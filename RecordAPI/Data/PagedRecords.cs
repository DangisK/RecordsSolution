using RecordAPI.Data;
using Records.Utils;

namespace Records.Data
{
    public class PagedRecords
    {
        public PagedList<Record> Records { get; set; }
        public object PaginationMetadata { get; set; }
    }
}
