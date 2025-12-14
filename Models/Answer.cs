using System;

namespace QuestionnaireApi.Models
{
    public class Answer
    {
        public int QuestionId { get; set; }
        public string AnswerText { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
