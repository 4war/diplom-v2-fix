import {Gender} from "../../shared/Tournament";
import {TestResult} from "../../shared/TestResult";
import Enumerable from "linq";
import from = Enumerable.from;
import {Player} from "../../shared/Player";

export class Test {
  questions: Question[] = [];

  getResult(player: Player): TestResult {
    let styleMap = [
      {style: Style.Defensive, count: 0},
      {style: Style.Active, count: 0},
      {style: Style.Reactive, count: 0},
      {style: Style.None, count: 0},
    ];
    let styleTotalMap = [
      {style: Style.Defensive, count: 0},
      {style: Style.Active, count: 0},
      {style: Style.Reactive, count: 0},
      {style: Style.None, count: 0},
    ];
    let moralMap = [
      {moral: Moral.Positive, count: 0},
      {moral: Moral.Negative, count: 0},
      {moral: Moral.None, count: 0},
    ];
    let moralTotalMap = [
      {moral: Moral.Positive, count: 0},
      {moral: Moral.Negative, count: 0},
      {moral: Moral.None, count: 0},
    ];

    let maxSinglePositiveMoral = from(this.questions).where(q => q.type == 'single').select(q => from(q.variants).where(v => v.moral == Moral.Positive).distinct(v => v.moral).count()).sum();
    let maxMultiplePositiveMoral = from(this.questions).where(q => q.type == 'multiple').select(q => from(q.variants).where(v => v.moral == Moral.Positive).count()).sum();
    let maxSingleNegativeMoral = from(this.questions).where(q => q.type == 'single').select(q => from(q.variants).where(v => v.moral == Moral.Negative).distinct(v => v.moral).count()).sum();
    let maxMultipleNegativeMoral = from(this.questions).where(q => q.type == 'multiple').select(q => from(q.variants).where(v => v.moral == Moral.Negative).count()).sum();
    let maxStyle = from(this.questions).where(q => q.type == 'single').select(q => from(q.variants).where(v => v.style == Style.Defensive).distinct(v => v.style).toArray()).toArray();

    for (let question of this.questions) {
      if (question.type == 'multiple') {
        for (let variant of question.variants) {
          from(moralTotalMap).first(x => x.moral == variant.moral).count++;
          from(styleTotalMap).first(x => x.style == variant.style).count++;
          if (variant.checked) {
            from(moralMap).first(x => x.moral == variant.moral).count++;
            from(styleMap).first(x => x.style == variant.style).count++;
          }
        }
      } else {
        from(moralTotalMap).first(x => x.moral == Moral.Positive).count++;
        from(moralTotalMap).first(x => x.moral == Moral.Negative).count++;
        let answer = from(question.variants).single(x => x.checked);
        if (answer.moral == Moral.Positive) from(moralMap).first(x => x.moral == Moral.Positive).count++;
        if (answer.moral == Moral.Negative) from(moralMap).first(x => x.moral == Moral.Positive).count++;
        if (answer.style == Style.Defensive) from(styleMap).first(x => x.style == Style.Defensive).count++;
        if (answer.style == Style.Active) from(styleMap).first(x => x.style == Style.Active).count++;
        if (answer.style == Style.Reactive) from(styleMap).first(x => x.style == Style.Reactive).count++;

        for (let variant of from(question.variants).where(x => x.style != Style.None).distinct(x => x.style)) {
          from(styleTotalMap).first(x => x.style == variant.style).count++;
        }
      }
    }

    let defensive = from(styleMap).first(x => x.style == Style.Defensive).count / from(styleTotalMap).first(x => x.style == Style.Defensive).count;
    let active = from(styleMap).first(x => x.style == Style.Active).count / from(styleTotalMap).first(x => x.style == Style.Active).count;
    let reactive = from(styleMap).first(x => x.style == Style.Reactive).count / from(styleTotalMap).first(x => x.style == Style.Reactive).count;

    let positive = from(moralMap).first(x => x.moral == Moral.Positive).count / from(moralTotalMap).first(x => x.moral == Moral.Positive).count;
    let negative = from(moralMap).first(x => x.moral == Moral.Negative).count / from(moralTotalMap).first(x => x.moral == Moral.Negative).count;

    let moral = (positive - negative) * 100;
    let testResult: TestResult = {
      moral: moral > 100 ? 100 : moral < 0 ? 0 : Math.round(moral),
      defensive: defensive > 1 ? 100 : Math.round(defensive * 100),
      active: active > 1 ? 100 : Math.round(active * 100),
      reactive: reactive > 1 ? 100 : Math.round(reactive * 100),
      lastTimeCompleted: new Date(Date.now()),
      player: player
    };

    return testResult;
  }

  setTestQuestions(gender: Gender): void {
    this.questions = [{
      question: `Я получаю удовольствие от …`,
      type: `multiple`,
      variants: [
        {moral: Moral.Positive, style: Style.None, answer: `Процесса игры`, checked: false},
        {moral: Moral.Positive, style: Style.None, answer: `Участия в турнирах`, checked: false},
        {moral: Moral.Positive, style: Style.Reactive, answer: `Преодоления сложностей на тренировках`, checked: false},
        {moral: Moral.Positive, style: Style.Active, answer: `Развития собственного мастерства`, checked: false},
      ]
    },
      {
        question: `Перед турниром я ставлю себе основную цель – …`,
        type: `single`,
        variants: [
          {
            moral: Moral.Positive,
            style: Style.Defensive,
            answer: `Играть своим стилем, дойти по турнирной сетке настолько далеко, насколько смогу`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Reactive,
            answer: `Изучить технику соперников, набраться опыта`,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Занять место в соответствии со своим местом в сетке (по очкам)`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Active,
            answer: `Первое место, даже если соперники сильнее меня`,
            checked: false
          },
        ]
      },
      {
        question: `В процессе тренировки меня раздражает …`,
        type: `multiple`,
        variants: [
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Давление от тренера, ссоры, недопонимание`,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Само ожидание тренировки, осознание, что придется справляться с нагрузкой`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.None,
            answer: `Что приходится иногда тренироваться со слабыми ${gender == Gender.Male ? 'соперниками' : 'соперницами'}`,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.Active,
            answer: `Повторение одного и того же элемента, ведь это скучно и морально выматывает`,
            checked: false
          },
        ]
      },
      {
        question: `Когда я выполняю какое-либо задание на тренировке, я …`,
        type: `multiple`,
        variants: [
          {moral: Moral.Positive, style: Style.Defensive, answer: `Понимаю, зачем я это делаю`, checked: false},
          {
            moral: Moral.Positive,
            style: Style.Defensive,
            answer: `Ставлю себе цели закрепить/исправить/совершенствовать элемент`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Reactive,
            answer: `Представляю реальные игровые условия`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Reactive,
            answer: `Заставляю себя выходить из зоны комфорта, делать больше, чем требуется`,
            checked: false
          },
        ]
      },
      {
        question: `Если бы у меня была возможность выбрать на турнире соперников, я бы ${gender == Gender.Male ? 'выбрал' : 'выбрала'} …`,
        type: `single`,
        variants: [
          {
            moral: Moral.Negative,
            style: Style.Defensive,
            answer: `Слабых или равных по силе, чтобы по ходу турнира набрать форму`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Reactive,
            answer: `С кем играть неудобно (из-за техники или стиля игры)`,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Тех, c кем уже ${gender == Gender.Male ? 'играл' : 'играла'} , или против кого знаю как играть`,
            checked: false
          },
          {moral: Moral.Positive, style: Style.Active, answer: `Без разницы, моя цель – 1 место`, checked: false},
        ]
      },
      {
        question: `В матче с сильным соперником, я ставлю себе основную задачу …`,
        type: `single`,
        variants: [
          {
            moral: Moral.Positive,
            style: Style.Defensive,
            answer: `Найти его слабые стороны, ${gender == Gender.Male ? 'самому' : 'самой'} вести игру`,
            checked: false
          }, //В тест 2 стиля сразу
          {
            moral: Moral.Positive,
            style: Style.Reactive,
            answer: `Понять, чем ${gender == Gender.Male ? 'он' : 'она'} сильнее меня, чтобы потом на тренировках знать в каком направлении совершенствоваться`,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.Active,
            answer: `Получить удовольствие, отключить негативные эмоции`,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.Active,
            answer: `Победить. Если я не могу побеждать сильных соперников, как тогда развиваться?`,
            checked: false
          },
        ]
      },
      {
        question: `Когда ${gender == Gender.Male ? 'соперник, которому' : 'соперница, которой'} я бы скорее всего ${gender == Gender.Male ? 'проиграл' : 'проиграла'}, не приходит на матч, я …`,
        type: `single`,
        variants: [
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Чувствую облегчение, для меня любая победа важна`,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Чувствую облегчение, я трачу меньше сил, чем другие участники турнира и мне будет проще в следующих матчах`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Defensive,
            answer: `Чувствую облегчение, но начну сразу морально готовиться к следующему матчу`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Reactive,
            answer: `Разочаровываюсь, для меня важнее опыт, чем результат `,
            checked: false
          },
        ]
      },
      {
        question: `До начала любого матча, я …`,
        type: `single`,
        variants: [
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Сильно волнуюсь, страюсь не думать об ошибках`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Reactive,
            answer: `Понимаю тактику против ${gender == Gender.Male ? 'конкретного соперника' : 'конкретной соперницы'}. Я заранее ${gender == Gender.Male ? 'проанализировал его' : 'проанализировала её'} матчи и знаю, что делать по игре.`,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.Defensive,
            answer: `Не волнуюсь. Мне легко контролировать страх до и во время матча`,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.Active,
            answer: `Ставлю себе цель играть своим стилем и действовать «первым номером», а не подстраиваться под игру ${gender == Gender.Male ? 'соперника' : 'соперницы'}`,
            checked: false
          },
        ]
      },
      {
        question: `Разминка для меня …`,
        type: `single`,
        variants: [
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Неприятная часть любого матча, которую приходиться делать`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.None,
            answer: `Нужна. Уже в первом гейме, я почувствую, если разомнусь недостаточно`,
            checked: false
          },
          {moral: Moral.None, style: Style.None, answer: `Это привычка, мне не сложно делать разминку`, checked: false},
          {
            moral: Moral.Negative,
            style: Style.Reactive,
            answer: `Не имеет особо важного значения, делаю её по настроению`,
            checked: false
          },
        ]
      },
      {
        question: `Я поддерживаю себя мотивирующими словами в мачте …`,
        type: `single`,
        variants: [
          {moral: Moral.None, style: Style.None, answer: `Не осознанно, как получается`, checked: false},
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Чтобы побороть волнение и набрать уверенность`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.None,
            answer: `Чтобы создать положительный эмоциональный фон, чтобы было приятнее и удобнее играть`,
            checked: false
          },
          {
            moral: Moral.None,
            style: Style.None,
            answer: `Не осознанно, меня просто переполняют положительные эмоции от выигранного мяча`,
            checked: false
          },
        ]
      },
      {
        question: `Перед игрой я чувствую страх …`,
        type: `single`,
        variants: [
          {
            moral: Moral.Positive,
            style: Style.Defensive,
            answer: `Но могу его побороть, поставив себе цели на игру`,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Но стараюсь не думать о нем, отвлекаться на разные вещи, дольше разминаться`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Active,
            answer: `Но я стараюсь отключить все эмоции и играть на автомате`,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Но он проходит, как только матч начинается`,
            checked: false
          },
        ]
      },
      {
        question: `Когда у меня в голове возникают мысли об ошибке во время удара …`,
        type: `single`,
        variants: [
          {
            moral: Moral.Negative,
            style: Style.Reactive,
            answer: `Настраиваюсь морально, что не буду переживать, если мяч сорвется`,
            checked: false
          },
          {moral: Moral.Positive, style: Style.Defensive, answer: `Я играю более надежным ударом`, checked: false},
          {
            moral: Moral.Negative,
            style: Style.Active,
            answer: `Все равно играю тем ударом, которым и ${gender == Gender.Male ? 'хотел' : 'хотела'} изначально `,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Иногда паникую, но на следующий удар восстанавливаюсь `,
            checked: false
          },
        ]
      },
      {
        question: `Мысли об ошибке у меня …`,
        type: `single`,
        variants: [
          {
            moral: Moral.Positive,
            style: Style.Active,
            answer: `Не возникают в принципе. Я играю на автомате, без эмоций`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Defensive,
            answer: `Иногда возникают, тогда я стараюсь себя отвлекать мотивирующими фразами`,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Иногда возникают, и я задерживаю время между розыгрышами и геймами, чтобы успокоиться`,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Иногда возникают, но их стараюсь игнорировать`,
            checked: false
          },
        ]
      },
      {
        question: `Со слабыми соперниками обычно играть сложнее, из-за того, что им нечего терять и они часто лучше мотивированы против сильных игроков. Когда ${gender == Gender.Male ? 'слабый соперник' : 'слабая соперница'} начинает меня побеждать, я чувствую … `,
        type: `single`,
        variants: [
          {moral: Moral.Negative, style: Style.None, answer: `(╯°□°）╯︵ ┻━┻`, checked: false},
          {
            moral: Moral.Negative,
            style: Style.Active,
            answer: `Волнение, но стараюсь отключить эмоции и не думать о результате`,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.Defensive,
            answer: `Волнение, но начинаю менять тактику, играть более надежно`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.None,
            answer: `Уверенность. Пытаюсь понять, чем я в данный момент слабее ${gender == Gender.Male ? 'него' : 'неё'} и выбираю тот стиль игры, в котором я сильнее.`,
            checked: false
          },
        ]
      },
      {
        question: `Когда  ${gender == Gender.Male ? 'соперник' : 'соперница'} делает невынужденную ошибку, …`,
        type: `single`,
        variants: [
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Я чувствую облегчение от легкого выигранного мяча`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Active,
            answer: `Я стараюсь игнорировать это, чтобы сохранить настрой`,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.Defensive,
            answer: `Я чувствую облегчение, ${gender == Gender.Male ? 'соперник' : 'соперница'} отдает победу`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Reactive,
            answer: `Я понимаю, что выигрываю ${gender == Gender.Male ? 'его' : 'её'} на моральному уровне`,
            checked: false
          },
        ]
      },
      {
        question: `Когда ${gender == Gender.Male ? 'соперник' : 'соперница'} играет от обороны, надежно, не рискует и ждет моей ошибки, я чувствую …`,
        type: `single`,
        variants: [
          {
            moral: Moral.Positive,
            style: Style.Active,
            answer: `Уверенность. ${gender == Gender.Male ? 'Он' : 'Она'} дает мне свободу действий, и я играю как хочу`,
            checked: false
          },
          {moral: Moral.Negative, style: Style.None, answer: `Сомнение. Я отдаю выигранную игру`, checked: false},
          {
            moral: Moral.Negative,
            style: Style.Reactive,
            answer: `Раздражение. На каждый розыгрыш придется тратить больше усилий, чтобы выиграть`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Defensive,
            answer: `Спокойствие. Если ${gender == Gender.Male ? 'соперник' : 'соперница'} не оказывает давления, я могу навязывать тот стиль игры, в котором я сильнее`,
            checked: false
          },
        ]
      },
      {
        question: `Когда ${gender == Gender.Male ? 'соперник' : 'соперница'} догоняет по счёту. Я ...`,
        type: `multiple`,
        variants: [
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Волнуюсь, так как приходиться менять тактику`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Defensive,
            answer: `Тяну время, меняю темп игры, играю нестандартно, чтобы сбить игру ${gender == Gender.Male ? 'сопернику' : 'сопернице'}`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Active,
            answer: `Исправляю ошибки и продолжаю играть своим стилем`,
            checked: false
          },
          {moral: Moral.Negative, style: Style.Defensive, answer: `Ничего не меняю`, checked: false},
        ]
      },
      {
        question: `Когда я психую, а пытаюсь выйти из этого состояния с помощью …`,
        type: `multiple`,
        variants: [
          {moral: Moral.Positive, style: Style.None, answer: `Мотивирующих слов, подбадривания`, checked: false},
          {
            moral: Moral.Positive,
            style: Style.Defensive,
            answer: `Долгих перерывов между розыгрышами и геймами. Если надо, беру медицинский перерыв`,
            checked: false
          },
          {moral: Moral.Positive, style: Style.Active, answer: `Отключения эмоций. Играю на автомате`, checked: false},
          {
            moral: Moral.Positive,
            style: Style.Reactive,
            answer: `Установки целей на игру. Я все равно пытаюсь выжать из матча максимум, набраться опыта.`,
            checked: false
          },
        ]
      },
      {
        question: `Когда после обидно проигранного мяча хочется выплеснуть эмоции, я …`,
        type: `single`,
        variants: [
          {
            moral: Moral.Positive,
            style: Style.Defensive,
            answer: `Сдерживаю себя, чтобы не создавать негативный фон`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Active,
            answer: `Не сдерживаю себя, могу показать эмоции, но мысленно уже ${gender == Gender.Male ? 'готов' : 'готова'} к следующему розыгрышу.`,
            checked: false
          },
          {moral: Moral.Negative, style: Style.None, answer: `Отключения эмоций. Играю на автомате`, checked: false},
          {moral: Moral.Negative, style: Style.None, answer: `Скрываю от всех эмоции `, checked: false},
        ]
      },
      {
        question: `Когда выиграваю мяч случайно, я …`,
        type: `single`,
        variants: [
          {
            moral: Moral.Negative,
            style: Style.Defensive,
            answer: `Чувствую радость за выигранный розыгрыш`,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.Active,
            answer: `Чувствую сомнение, что в следующий раз получится также`,
            checked: false
          },
          {moral: Moral.Positive, style: Style.None, answer: `Извиняюсь перед соперником`, checked: false},
          {moral: Moral.Positive, style: Style.None, answer: `Забываю, чтобы не сбивать настрой`, checked: false},
        ]
      },
      {
        question: `Когда я точно знаю, что судья допустил ошибку в мою пользу, но ${gender == Gender.Male ? 'соперник' : 'соперница'} начинает спорить, я …`,
        type: `single`,
        variants: [
          {moral: Moral.Negative, style: Style.None, answer: `Встаю на сторону судьи`, checked: false},
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Ничего не делаю, но если ошибка будет в пользу противника, буду спорить`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.None,
            answer: `Стараюсь игнорировать, чтобы не сбить настрой игры`,
            checked: false
          },
          {moral: Moral.Positive, style: Style.Reactive, answer: `Даю понять судье, что он ошибся`, checked: false},
        ]
      },
      {
        question: `Когда ${gender == Gender.Male ? 'соперник' : 'соперница'} случайно выигрывает мяч, ...`,
        type: `single`,
        variants: [
          {
            moral: Moral.Negative,
            style: Style.Reactive,
            answer: `Не игнорирую, чтобы ${gender == Gender.Male ? 'соперник чувствовал' : 'соперница чувствовала'} сомнение за выигранный мяч`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Active,
            answer: `Стараюсь игнорировать. Если я сильнее, я все равно выиграю`,
            checked: false
          },
        ]
      },
      {
        question: `Когда в парном матче стою у сетки, я …`,
        type: `multiple`,
        variants: [
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Готовлюсь на каждый удар, и если соперник сыграет на меня, я смогу забить`,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Встаю дальше от сетки, чтобы было больше времени перехватить и среагировать на перехват соперников`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Active,
            answer: `Стою как можно ближе, чтобы забить любым ударом `,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Defensive,
            answer: `Максимально мешаю соперникам движениями, фэйк перехватами, предугадываю их движения`,
            checked: false
          },
        ]
      },
      {
        question: `Я считаю, что укороченные …`,
        type: `multiple`,
        variants: [
          {
            moral: Moral.Positive,
            style: Style.Active,
            answer: `Эффективны только если находиться в корте, а не за задней линией`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Reactive,
            answer: `Делают неудобно сопернику, так как их тяжело пробить и срывают темп`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Defensive,
            answer: `Помогают растащить соперника по корту`,
            checked: false
          },
          {moral: Moral.Negative, style: Style.None, answer: `Эффективны всегда, если их скрывать`, checked: false},
        ]
      },
      {
        question: `На приеме подачи …`,
        type: `single`,
        variants: [
          {
            moral: Moral.Positive,
            style: Style.Active,
            answer: `Мне удобнее занимать позицию в зависимости от вращения подачи, которое я читаю по замаху соперника`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Reactive,
            answer: `Мне удобнее занимать глубокую позицию на первой подаче, и по ситуации двигаюсь ближе на второй`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Defensive,
            answer: `Мне удобнее держать позицию в корте, чтобы играть на опережении и уже с приема оказывать давление на ${gender == Gender.Male ? 'соперника' : 'соперницу'}`,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Мне удобнее занимать глубокую позицию, чтобы вложить больше силы в удар`,
            checked: false
          },
        ]
      },
      {
        question: `Главная цель на первой подаче ...`,
        type: `single`,
        variants: [
          {moral: Moral.Negative, style: Style.None, answer: `Забить на вылет`, checked: false},
          {
            moral: Moral.Positive,
            style: Style.Active,
            answer: `«Отодвинуть» ${gender == Gender.Male ? 'соперника' : 'соперницу'} за счёт силы подачи`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Reactive,
            answer: `Выбить ${gender == Gender.Male ? 'соперника' : 'соперницу'} из корта`,
            checked: false
          },
          {moral: Moral.Negative, style: Style.Defensive, answer: `Стабильно попадать`, checked: false},
        ]
      },
      {
        question: `Когда ${gender == Gender.Male ? 'соперник' : 'соперниц'} меняет темп, с плоских ударов переходит на резанные или глубокие крученные и наоборот, я …`,
        type: `single`,
        variants: [
          {
            moral: Moral.Positive,
            style: Style.Reactive,
            answer: `Быстро подстраиваюсь к новому стилю ${gender == Gender.Male ? 'соперника' : 'соперницы'}`,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Долго подстраиваюсь к новому стилю ${gender == Gender.Male ? 'соперника' : 'соперницы'}`,
            checked: false
          },
          {moral: Moral.Negative, style: Style.None, answer: `Стараюсь играть более надежно`, checked: false},
          {
            moral: Moral.Negative,
            style: Style.Active,
            answer: `Ничего не меняю, продолжаю играть своим стилем`,
            checked: false
          },
        ]
      },
      {
        question: `Когда во время розыгрыша меняется сила и направление ветра, я ... `,
        type: `single`,
        variants: [
          {
            moral: Moral.Positive,
            style: Style.Reactive,
            answer: `Обращаю на это внимание и использую это как преимущество`,
            checked: false
          },
          {
            moral: Moral.Positive,
            style: Style.Defensive,
            answer: `Обращаю на это внимание и играю более надежно`,
            checked: false
          },
          {
            moral: Moral.Negative,
            style: Style.None,
            answer: `Стараюсь игнорировать, чтобы не терять концентрацию`,
            checked: false
          },
        ]
      },
      {
        question: `Негативные эмоции ${gender == Gender.Male ? 'соперника' : 'соперницы'}`,
        type: `single`,
        variants: [
          {moral: Moral.Positive, style: Style.Active, answer: `Дают мне уверенность в победе`, checked: false},
          {
            moral: Moral.Negative,
            style: Style.Defensive,
            answer: `Стараюсь игнорировать и сосредоточиться на своей игре`,
            checked: false
          },
        ]
      },
      {
        question: `Когда кто-то из зрителей громко разговаривают или у кого-то звонит телефон, я …`,
        type: `multiple`,
        variants: [
          {
            moral: Moral.Positive,
            style: Style.Active,
            answer: `Не буду начинать розыгрыш, и попрошу тишины`,
            checked: false
          },
          {moral: Moral.Negative, style: Style.Defensive, answer: `Стараюсь игнорировать`, checked: false},
        ]
      },
    ]


    this.getResult(new Player());
  }
}

export class Question {
  type!: `multiple` | `single`;
  question!: string;
  variants: Variant[] = [];
}

export class Variant {
  style!: Style;
  moral!: Moral;
  answer!: string;
  checked = false;
}

export enum Style {
  None,
  Defensive,
  Active,
  Reactive,
}

export enum Moral {
  Negative,
  None,
  Positive
}

