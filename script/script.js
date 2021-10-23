document.addEventListener("DOMContentLoaded", function () {
  // VARIABLES
  const btnOpenModal = document.querySelector("#btnOpenModal");
  const modalTitle = document.querySelector(".modal-title");
  const modalBlock = document.querySelector("#modalBlock");
  const closeModal = document.querySelector("#closeModal");
  const questionTitle = document.querySelector("#question");
  const formAnswers = document.querySelector("#formAnswers");
  const prevButton = document.querySelector("#prev");
  const nextButton = document.querySelector("#next");
  const sendButton = document.querySelector("#send");

  const model = {
    defaults: {
      question: {
        className: "question",
      },
      answer: {
        className: "answer",
        onClick: (quest) => quest.next(),
      },
      screen: {
        className: "screen",
      },
    },
    questions: [
      {
        title: "выберите лишнее",
        answers: [
          { title: "mac os" },
          { title: "windows" },
          { title: "linux" },
        ],
      },
      {
        title: "пробелы или табуляция?",
        answers: [
          { title: "два пробела" },
          { title: "четыре пробела" },
          {
            title: "табуляция",
            onClick: (quest) => quest.show("fail"),
          },
        ],
      },
      {
        title: "История это",
        className: "question trollface",
        answers: [
          {
            title: "наука",
            onClick: (quest) => quest.show("fail"),
          },
          { title: "не наука" },
        ],
      },
    ],
    screens: {
      finish: {
        className: "screen success",
        title: "Прекрасно, вы прошли наше задание",
      },
      fail: {
        className: "screen fail",
        title: "Извините, вы ошиблись",
      },
    },
  };

  const questions = [
    {
      question: "Какого года рождения Андрей?",
      answers: [
        {
          title: "1984",
          id: 1,
        },
        {
          title: "1985",
          id: 0,
        },
        {
          title: "1986",
          id: 0,
        },
        {
          title: "1987",
          id: 0,
        },
      ],
      type: "radio",
    },
    {
      question: "Какую передачу ведёт Андрей?",
      answers: [
        {
          title: "Что было дальше?",
          id: 0,
        },
        {
          title: "Kuji Podcast",
          id: 1,
        },
        {
          title: "Вечерний Ургант",
          id: 0,
        },
      ],
      type: "radio",
    },
    {
      question: "Где преподаёт Андрей?",
      answers: [
        {
          title: "МГИМО",
          id: 0,
        },
        {
          title: "ММУ",
          id: 0,
        },
        {
          title: "МГУ",
          id: 1,
        },
      ],
      type: "radio",
    },
    {
      question: "Последний вопрос. Арбуз или дыня?",
      answers: [
        {
          title: "Арбуз",
          id: 0,
        },
        {
          title: "Дыня",
          id: 1,
        },
      ],
      type: "radio",
    },
  ];

  // MODAL EVENTS
  btnOpenModal.addEventListener("click", () => {
    modalBlock.classList.add("d-block");
    playTest();
  });

  closeModal.addEventListener("click", () => {
    modalBlock.classList.remove("d-block");
  });

  // FUNCTIONS
  const playTest = () => {
    const finalAnswers = [];
    let numbersQuestion = 0;

    const renderAnswers = (index, counter) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement("div");
        console.log(counter);
        if (counter === 1) {
          answerItem.classList.add("animated", "fadeInLeft");
        } else if (counter === 0) {
          answerItem.classList.add("animated", "fadeInRight");
        }

        answerItem.classList.add(
          "answers-item",
          "d-flex",
          "justify-content-center"
        );

        answerItem.innerHTML = `
				<input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
        <label for="${answer.title}" class="d-flex flex-column justify-content-between">
					<span>${answer.title}</span>
				</label>
				`;

        formAnswers.appendChild(answerItem);
      });
      const def = document.createElement("div");
      def.classList.add("hide");
      def.innerHTML = `
      <input type="radio" name="answer" id="zero" name="zero" class="d-none" value="zero" checked>
      `;
      formAnswers.appendChild(def);
    };

    const renderQuestions = (indexQuestion, counter) => {
      formAnswers.innerHTML = "";
      switch (true) {
        case numbersQuestion === 0:
          prevButton.classList.add("d-none");
          nextButton.classList.remove("d-none");
          questionTitle.textContent = `${questions[indexQuestion].question}`;
          renderAnswers(indexQuestion, counter);
          questionTitle.classList.remove("d-none");
          break;

        case numbersQuestion >= 0 && numbersQuestion <= questions.length - 1:
          questionTitle.textContent = `${questions[indexQuestion].question}`;
          renderAnswers(indexQuestion, counter);
          nextButton.classList.remove("d-none");
          prevButton.classList.remove("d-none");
          questionTitle.classList.remove("d-none");
          break;

        case numbersQuestion === questions.length:
          nextButton.classList.add("d-none");
          prevButton.classList.add("d-none");
          sendButton.classList.remove("d-none");
          questionTitle.classList.add("d-none");
          modalTitle.remove();
          formAnswers.innerHTML = `
					<div class="form-group">
						<h3 style="text-align: center;">Поздравляю, вы прошли тест на знание Андрея Коняева!</h3>
						<h3 style="text-align: center;">Можете закончить или перепройти заново.</h3>
            </div>`;
          break;

        case numbersQuestion === questions.length + 1:
          formAnswers.textContent = "Спасибо!";
          sendButton.classList.add("d-none");
          setTimeout(() => {
            modalBlock.classList.remove("d-block");
          }, 5000);
          break;

        default:
          console.log("Что-то пошло не так");
      }
    };

    renderQuestions(numbersQuestion);

    //FORM EVENTS
    nextButton.onclick = () => {
      let input =
        document.querySelector('input[name="answer"]:checked').value || "zero";
      let answer =
        questions[numbersQuestion].answers.find((o) => o.title === input) ||
        "zero";

      if (answer.id === 1) {
        numbersQuestion++;
        renderQuestions(numbersQuestion, 1);
      } else if (answer === "zero") {
        swal("Вы не выбрали вариант ответа!", "Выберите заново", "info");
      } else {
        swal(
          "Вы ошиблись ответом!",
          "Нажмите ниже, чтобы ответить заново",
          "error"
        );
      }
    };

    prevButton.onclick = () => {
      numbersQuestion--;
      renderQuestions(numbersQuestion, 0);
    };

    sendButton.onclick = () => {
      playTest();
      sendButton.classList.add("d-none");
    };
  };
});
