# История промтов для проекта анкетирования

---

**1. Запрос на добавление функционала анкетирования:**

В существующем проекте ASP.NET Core Web API (.NET 8) добавь функционал для системы анкетирования. Проект уже создан в Visual Studio с контроллерами и Swagger.

Требуется внести следующие изменения:

Backend:

1. В папке Models создай два новых класса:

   Question.cs:
   - Свойства: int Id, string Text, string Type, List<string> Options (nullable)
   - Type может быть: "text" или "radio"

   Answer.cs:
   - Свойства: int QuestionId, string AnswerText, DateTime CreatedAt

2. В папке Controllers создай новый контроллер QuestionController.cs:

   - Маршрут: [Route("api/[controller]")]
   - Два эндпоинта:

     [HttpGet] → GET /api/question
     Возвращает статический список из 3-5 вопросов в формате JSON.
     Пример вопросов:
     1. { "id": 1, "text": "Ваше имя?", "type": "text", "options": null }
     2. { "id": 2, "text": "Ваш возраст?", "type": "text", "options": null }
     3. { "id": 3, "text": "Ваш любимый цвет?", "type": "radio", "options": ["Красный", "Синий", "Зеленый"] }

     [HttpPost] → POST /api/question/answers
     Принимает массив ответов в теле запроса.
     Сохраняет ответы в статической коллекции в памяти (используй static List<Answer>).
     Возвращает 200 OK при успехе, 400 Bad Request при ошибке.

3. В Program.cs добавь настройку CORS для разрешения запросов с localhost:3000:

   - Добавь services.AddCors() в раздел сервисов
   - Добавь app.UseCors() в раздел middleware с политикой, разрешающей:
     Origin: http://localhost:3000
     Methods: GET, POST
     Headers: любые

Frontend:

1. В папке wwwroot (если нет - создай) создай простой HTML файл index.html с базовой структурой
2. Рядом создай файл app.js с React-приложением (React подключается через CDN)
3. React-компонент должен:
   - При загрузке делать fetch('GET /api/question')
   - Отображать форму с вопросами
   - Для type="text" показывать input
   - Для type="radio" показывать radio buttons из options
   - По submit отправлять ответы на POST /api/question/answers
   - Показывать "Спасибо!" после успешной отправки

Файловая структура должна выглядеть так:

/Controllers
  QuestionController.cs
/Models
  Question.cs
  Answer.cs
/wwwroot
  index.html
  app.js
  styles.css (опционально)
Program.cs

---

**2. Запрос: Сделать так, чтобы по умолчанию открывалась страница с анкетой**

Допиши в Programm, чтобы по умолчанию сразу открывалась страница с анкетой

---

**3. Запрос: После "Спасибо" вывести ответы и добавить кнопку назад**

После сообщения "Спасибо". Выведи в окнке ниже все введеные ранее ответы ответы. И сделай кнопку назад, для возращения к анкете и вввода новых данных
