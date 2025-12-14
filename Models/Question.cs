using System.Collections.Generic;

namespace QuestionnaireApi.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Type { get; set; } // "text" or "radio"
        public List<string>? Options { get; set; }
    }
}
