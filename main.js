let final_transcript = "";
let recognizing = false;

const speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.maxAlternatives = 3;
recognition.lang = "en-US";

recognition.onstart = () => {
  console.log("recognition started");
};
recognition.onerror = ({ error }) => {
  console.error(error);
};
recognition.onend = () => {
  console.log("recognition stopped");
  if (!recognizing) return;
  recognition.start();
};
recognition.onresult = (e) => {
  let interim_transcript = "";
  for (let i = e.resultIndex; i < e.results.length; i++) {
    if (e.results[i].isFinal) {
      const result = editInterim(e.results[i][0].transcript);
      final_transcript += result;
    } else {
      interim_transcript += e.results[i][0].transcript;
    }
  }
  final_transcript = editFinal(final_transcript);
  final_text.value = final_transcript + interim_transcript;
};

//russian special symbols dictionary
const DICTIONARY_RU = {
  точка: ".",
  запятая: ",",
  вопрос: "?",
  восклицание: "!",
  двоеточие: ":",
  тире: "-",
  абзац: "\n",
  отступ: "\t"
};

//english special symbols dictionary
const DICTIONARY_US = {
  period: ".",
  comma: ",",
  question: "?",
  exclamation: "!",
  colon: ":",
  dash: "-",
  paragraph: "\n",
  indent: "\t"
};

function editInterim(s) {
  return s
    .split(" ")
    .map((word) => {
      word = word.trim();
      if (recognition.lang == "ru-RU")
          return DICTIONARY_RU[word] ? DICTIONARY_RU[word] : word;
      else if (recognition.lang == "en-US")
          return DICTIONARY_US[word] ? DICTIONARY_US[word] : word;
    })
    .join(" ");
}

function editFinal(s) {
  return s.replace(/\s([\.+,?!:-])/g, "$1");
}

buttons.onclick = ({ target }) => {
  switch (target.className) {
    case "start":
      final_transcript = "";
      recognition.start();
      recognizing = true;
      final_text.value = "";
      break;
    case "stop":
      recognition.stop();
      recognizing = false;
      break;
    case "copy":
      navigator.clipboard.writeText(final_text.value)
      break;
    case "clear":
      final_text.value = "";
      break;
    case "language":
      if (recognition.lang == "en-US") {
        recognition.lang = "ru-RU";
        target.textContent = 'change to English';
        console.log('language changed to Russian');
      }
      else if (recognition.lang == "ru-RU") {
        recognition.lang = "en-US";
        target.textContent = 'change to Russian';
        console.log('language changed to English')
      }
      else console.log('language changing error');
      recognition.stop();
      break;
    default:
      break;
  }
};