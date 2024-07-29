namespace DTOs
{
    public class PredictionRequest
    {
        public string? Fighter1Id { get; set; }
        public string? Fighter1Name { get; set; }
        public string? Fighter2Id { get; set; }
        public string? Fighter2Name { get; set; }
        public int Rounds { get; set; }
    }
}
