namespace RecordAPI.Data
{
    internal sealed record CreateRecordDTO (string Title, string Description);
    internal sealed record UpdateRecordDTO (string Title, string Description);
}
