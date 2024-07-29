using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

public interface IGeminiService
{
    Task<string> GetFightPrediction(string prompt);
}

public class GeminiService : IGeminiService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;


    public GeminiService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiKey = configuration["GeminiApiKey"];
    }

    public async Task<string> GetFightPrediction(string prompt)
    {
        var requestContent = new
        {
            prompt = prompt,
        };

        var response = await _httpClient.PostAsync(
            "https://api.gemini.com/v1/predict",
            new StringContent(JsonConvert.SerializeObject(requestContent), Encoding.UTF8, "application/json")
        );

        response.EnsureSuccessStatusCode();

        var responseContent = await response.Content.ReadAsStringAsync();
        var prediction = JsonConvert.DeserializeObject<dynamic>(responseContent);

        return prediction.choices[0].text; 
    }
}
