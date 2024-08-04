using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Repositories;
using DTOs;
using Mscc.GenerativeAI;

[ApiController]
[Route("api/[controller]")]
public class PredictionController : ControllerBase
{
    private readonly IFighterRepository _fighterRepository;
    private GoogleAI googleai;
    private GenerativeModel gemini;

    public PredictionController(IFighterRepository fighterRepository, IConfiguration configuration)
    {
        _fighterRepository = fighterRepository;
        var apiKey = configuration["GeminiApiKey"];

        googleai = new GoogleAI(apiKey);
        gemini = googleai.GenerativeModel(model: Model.Gemini15Pro);


    }

    [HttpPost]
    public async Task<IActionResult> PredictFight([FromBody] PredictionRequest request)
    {

        var Fighter1 = await _fighterRepository.GetFighterById(request.Fighter1Id);
        var Fighter2 = await _fighterRepository.GetFighterById(request.Fighter2Id);
        var prompt = $"Predict me a fight between two fighters, just talk about the fight round by round at the end have a line showing the winner to parse [winner-id:(ID OF THE WINNER)]\n" +
                     $"Fighter 1 id: {request.Fighter1Id}\n" +
                     $"Fighter 1 name: {Fighter1.Name}\n" +
                     $"Fighter 1 id: {request.Fighter2Id}\n" +
                     $"Fighter 2 name: {Fighter2.Name}\n" +
                     $"rounds in fight: {request.Rounds}";

        var response = gemini.GenerateContent(prompt).Result;

        var (winnerId, cleanedText) = ExtractWinnerId(response.Text);

        var winner = await _fighterRepository.GetFighterById(winnerId);

        var prediction = new PredictionDTO
        {
            Text = cleanedText,
            WinnerName = winner?.Name ?? "Unknown"
        };

        return Ok(prediction);
    }

    private (string WinnerId, string CleanedText) ExtractWinnerId(string predictionText)
    {
        var winnerTag = "[winner-id:";
        var startIndex = predictionText.IndexOf(winnerTag) + winnerTag.Length;
        var endIndex = predictionText.IndexOf("]", startIndex);

        if (startIndex < winnerTag.Length || endIndex < 0)
        {
            return (string.Empty, predictionText);
        }

        var winnerId = predictionText.Substring(startIndex, endIndex - startIndex);
        var cleanedText = predictionText.Remove(startIndex - winnerTag.Length, (endIndex - startIndex) + winnerTag.Length + 1);

        return (winnerId, cleanedText);
    }

}
