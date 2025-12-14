const e = React.createElement;

function Questionnaire() {
  const [questions, setQuestions] = React.useState([]);
  const [answers, setAnswers] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [submittedAnswers, setSubmittedAnswers] = React.useState({});

  React.useEffect(() => {
    fetch('/api/question')
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error(err));
  }, []);

  function handleChange(qid, value) {
    setAnswers(prev => ({ ...prev, [qid]: value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const payload = Object.keys(answers).map(k => ({ QuestionId: parseInt(k), AnswerText: answers[k] }));
    fetch('/api/question/answers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => {
        if (res.ok) {
          setSubmittedAnswers(answers); // Сохраняем ответы для отображения
          setSubmitted(true);
        } else alert('Ошибка при отправке');
      })
      .catch(err => {
        console.error(err);
        alert('Ошибка при отправке');
      });
  }

  function handleBack() {
    setAnswers({});
    setSubmitted(false);
    setSubmittedAnswers({});
  }

  if (submitted) {
    return e('div', null,
        e('div', { style: { fontWeight: 'bold', marginBottom: 10 } }, 'Спасибо!'),
      // Новый отдельный блок для ответов
      e('div', {
        style: {
          border: '1px solid #ccc',
          background: '#f9f9f9',
          padding: '12px',
          marginBottom: '12px',
          maxWidth: 400
        }
      },
        e('div', { style: { marginBottom: 8, fontWeight: 'bold' } }, 'Ваши ответы:'),
        e('ul', null,
          questions.map(q =>
            e('li', { key: q.id },
              e('span', { style: { fontWeight: 'bold' } }, q.text + ': '),
              e('span', null, submittedAnswers[q.id] || '(не заполнено)')
            )
          )
        )
      ),
      e('button', { onClick: handleBack }, 'Назад')
    );
  }

  return e('form', { onSubmit: handleSubmit },
    questions.map(q => {
      if (q.type === 'text') {
        return e('div', { key: q.id },
          e('label', null, q.text),
          e('br'),
          e('input', { type: 'text', value: answers[q.id] || '', onChange: (ev) => handleChange(q.id, ev.target.value) })
        );
      }

      if (q.type === 'radio') {
        return e('div', { key: q.id },
          e('div', null, q.text),
          q.options && q.options.map((opt, idx) =>
            e('label', { key: idx, style: { marginRight: 10 } },
              e('input', { type: 'radio', name: 'q' + q.id, value: opt, checked: answers[q.id] === opt, onChange: () => handleChange(q.id, opt) }),
              opt
            )
          )
        );
      }

      return null;
    }),
    e('div', null,
      e('button', { type: 'submit' }, 'Отправить')
    )
  );
}

const domContainer = document.querySelector('#root');
ReactDOM.createRoot(domContainer).render(e(Questionnaire));

<script type="text/babel" src="/app.js"></script>
