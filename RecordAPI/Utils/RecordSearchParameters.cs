using System.Text.Json.Serialization;

namespace Records.Utils
{
    public class RecordSearchParameters
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public static bool TryParse(string queryString, out RecordSearchParameters searchParameters)
        {
            searchParameters = new RecordSearchParameters();
            var queryDictionary = Microsoft.AspNetCore.WebUtilities.QueryHelpers.ParseQuery(queryString);

            if (queryDictionary.ContainsKey("pageNumber"))
            {
                if (int.TryParse(queryDictionary["pageNumber"][0], out int pageNumber))
                {
                    searchParameters.PageNumber = pageNumber;
                }
                else
                {
                    return false;
                }
            }

            if (queryDictionary.ContainsKey("pageSize"))
            {
                if (int.TryParse(queryDictionary["pageSize"][0], out int pageSize))
                {
                    searchParameters.PageSize = pageSize;
                }
                else
                {
                    return false;
                }
            }

            return true;
        }
    }
}
