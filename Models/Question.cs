using System.Collections.Generic;

namespace QuestionnaireApi.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Type { get; set; } // "text", "radio", "slider", etc.
        public List<string>? Options { get; set; }
        public int? MinValue { get; set; } // Минимальное значение для слайдера
        public int? MaxValue { get; set; } // Максимальное значение для слайдера
    }
}
