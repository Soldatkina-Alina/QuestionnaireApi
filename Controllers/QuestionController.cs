using Microsoft.AspNetCore.Mvc;
using QuestionnaireApi.Models;

namespace QuestionnaireApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionController : ControllerBase
    {
        private static readonly List<Question> _questions = new List<Question>
        {
            new Question { Id = 1, Text = "Ваше имя?", Type = "text", Options = null },
            new Question { Id = 2, Text = "Ваш возраст?", Type = "text", Options = null },
            new Question { Id = 3, Text = "Ваш любимый цвет?", Type = "radio", Options = new List<string> { "Красный", "Синий", "Зеленый" } }
        };

        private static readonly List<Answer> _answers = new List<Answer>();

        [HttpGet]
        public ActionResult<List<Question>> Get()
        {
            return Ok(_questions);
        }

        [HttpPost("answers")]
        public ActionResult SubmitAnswers([FromBody] List<Answer> answers)
        {
            if (answers == null || answers.Count == 0)
                return BadRequest("No answers provided");

            foreach (var a in answers)
            {
                a.CreatedAt = DateTime.UtcNow;
                _answers.Add(a);
            }

            return Ok();
        }
    }
}
