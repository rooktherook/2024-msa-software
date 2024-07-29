using Microsoft.AspNetCore.Mvc;
using Models;
using Repositories;
using DTOs;

[ApiController]
[Route("api/[controller]")]
public class PredictionController : ControllerBase
{
    private readonly IGeminiService _geminiService;
    private readonly IFighterRepository _fighterRepository;

    public PredictionController(IGeminiService geminiService, IFighterRepository fighterRepository)
    {
        _geminiService = geminiService;
        _fighterRepository = fighterRepository;
    }

    [HttpPost]
    public async Task<IActionResult> PredictFight([FromBody] PredictionRequest request)
    {
        var prompt = $"Predict me a fight between two fighters, just talk about the fight round by round at the end have a line showing the winner to parse [winner-id:(Id of the winner)]\n" +
                     $"Fighter 1 id: {request.Fighter1Id}\n" +
                     $"Fighter 1 name: {request.Fighter1Name}\n" +
                     $"Fighter 2 id: {request.Fighter2Id}\n" +
                     $"Fighter 2 name: {request.Fighter2Name}\n" +
                     $"rounds in fight: {request.Rounds}";

        var predictionText = await _geminiService.GetFightPrediction(prompt);

        // Extract winner from the predictionText
        var winnerId = ExtractWinnerId(predictionText);

        var prediction = new Prediction
        {
            Fighter1Id = request.Fighter1Id,
            Fighter2Id = request.Fighter2Id,
            Rounds = request.Rounds,
            Text = predictionText,
            Outcome = $"winner-id:{winnerId}"
        };

        await _fighterRepository.AddPrediction(prediction);

        return Ok(prediction);
    }

    private string ExtractWinnerId(string predictionText)
    {
        var winnerTag = "[winner-id:";
        var startIndex = predictionText.IndexOf(winnerTag) + winnerTag.Length;
        var endIndex = predictionText.IndexOf("]", startIndex);
        return predictionText.Substring(startIndex, endIndex - startIndex);
    }
}
