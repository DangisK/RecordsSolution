using Microsoft.OpenApi.Models;
using RecordAPI.Data;
using Records.Data;
using Records.Utils;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(o =>
{
    o.AddPolicy("myCors", builder =>
    {
        builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000", "https://appname.azurestaticapps.net");
    });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = "Records API for Present Connection", Version = "v1" });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(o =>
{
    o.DocumentTitle = "Records API for Present Connection";
    o.SwaggerEndpoint("/swagger/v1/swagger.json", "A simple version of Records API");
    o.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();
app.UseCors("myCors");

//app.MapGet("/records", async () => await RecordsRepository.GetRecordsAsync()).WithTags("Records Endpoints");

// Get all records
app.MapGet("/records", async (HttpContext httpContext) =>
{
    if (!RecordSearchParameters.TryParse(httpContext.Request.QueryString.Value, out RecordSearchParameters searchParameters))
    {
        // Return a Bad Request response if the query string could not be parsed
        httpContext.Response.StatusCode = 400;
        return new PagedRecords
        {
            Records = new PagedList<Record>(new List<Record>(), 0, 0, 0),
            PaginationMetadata = new {},
        };
    }

    var records = await RecordsRepository.GetRecordsAsync(searchParameters);

    var paginationMetadata = new
    {
        totalCount = records.TotalCount,
        pageSize = records.PageSize,
        currentPage = records.CurrentPage,
        totalPages = records.TotalPages,
    };
    return new PagedRecords
    {
        Records = records,
        PaginationMetadata = paginationMetadata,
    };
}).WithTags("Records Endpoints");

// Get one record by Id
app.MapGet("/records/{recordId}", async (int recordId) =>
{
    Record recorDTOReturn = await RecordsRepository.GetRecordAsync(recordId);
    if (recorDTOReturn == null) return Results.NotFound();

    return Results.Ok(recorDTOReturn);
}).WithTags("Records Endpoints");

// Post a record
app.MapPost("/records", async (CreateRecordDTO createRecordDTO) =>
{
    Record recorDTOCreate = new Record { Title = createRecordDTO.Title, Description = createRecordDTO.Description };
    bool isCreateSuccessful = await RecordsRepository.CreateRecordAsync(recorDTOCreate);
    if (!isCreateSuccessful) return Results.Conflict();

    return Results.NoContent();
}).WithTags("Records Endpoints");

// Modify the record
app.MapPut("/records/{recordId}", async (int recordId, UpdateRecordDTO updateRecordDTO) =>
{
    Record recorDTOUpdate = new Record { RecordId = recordId, Description = updateRecordDTO.Description, Title = updateRecordDTO.Title };
    bool isUpdateSuccessful = await RecordsRepository.UpdateRecordAsync(recordId, recorDTOUpdate);
    if (!isUpdateSuccessful) return Results.Conflict();

    return Results.Ok();
}).WithTags("Records Endpoints");

// Delete the record
app.MapDelete("/records/{recordId}", async (int recordId) =>
{
    bool isDeleteSuccessful = await RecordsRepository.DeleteRecordAsync(recordId);
    if (!isDeleteSuccessful) return Results.NotFound();

    return Results.NoContent();
}).WithTags("Records Endpoints");


app.Run();