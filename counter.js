const ВЕБХУК = "https://discord.com/api/webhooks/1184805919255703614/36INVBwP3dExlHkayNEqvqKN84BSk8cus5duHiA7oakPi9ABrFlCm9w7yH4ODAn1oDq";

const УПОМИНАНИЕ = "<@&1088429634095435837>";
const ЦВЕТ = 11393254;
const ПОДЗАГОЛОВОК = "";
const КАРТИНКА_СПРАВА = "";
const КАРТИНКА_СНИЗУ = "";

// Авторский блок //
const ИМЯ = "";
const ССЫЛКА_2 = "";
const АВАТАР = "";

// Подпись //
const ПОДПИСЬ = "";
const ИКОНКА = "";
const ВРЕМЯ_ОТПРАВКИ = false;

// Initialize the counter from the script properties
let counter = Number(PropertiesService.getScriptProperties().getProperty('counter')) || 215;

function onSubmit(e) {
  const response = e.response.getItemResponses();
  let items = [];

  for (const responseAnswer of response) {
    const question = responseAnswer.getItem().getTitle();
    const answer = responseAnswer.getResponse();
    let parts = [];

    try {
      parts = answer.match(/[\s\S]{1,1024}/g) || [];
    } catch (e) {
      parts = answer;
    }

    if (!answer) {
      continue;
    }

    for (const [index, part] of Object.entries(parts)) {
      if (index == 0) {
        items.push({
          "name": question,
          "value": part,
          "inline": false
        });
      } else {
        items.push({
          "name": question.concat(" (cont.)"),
          "value": part,
          "inline": false
        });
      }
    }
  }

  var TIME = "";
  if (ВРЕМЯ_ОТПРАВКИ) {
    TIME = new Date().toISOString();
  }

  const ЗАГОЛОВОК = `DOJ-${padNumber(counter, 3)}`;

  var options = {
    "method": "post",
    "headers": {
      "Content-Type": "application/json",
    },
    "payload": JSON.stringify({
      "content": УПОМИНАНИЕ,
      "embeds": [{
        "title": ЗАГОЛОВОК,
        "color": ЦВЕТ,
        "description": ПОДЗАГОЛОВОК,
        "fields": items,
        "image": {
          "url": КАРТИНКА_СНИЗУ
        },
        "author": {
          "name": ИМЯ,
          "url": ССЫЛКА_2,
          "icon_url": АВАТАР
        },
        "thumbnail": {
          "url": КАРТИНКА_СПРАВА
        },
        "footer": {
          "text": ПОДПИСЬ,
          "icon_url": ИКОНКА,
        },
        "timestamp": TIME
      }],
    })
  };

  UrlFetchApp.fetch(ВЕБХУК, options);

  // Increment the counter for the next message
  counter= counter + 210;

  // Update the counter in the script properties
  PropertiesService.getScriptProperties().setProperty('counter', counter.toString());
}

// Function to pad numbers with leading zeros
function padNumber(number, width) {
  const str = number.toString();
  return str.length >= width ? str : new Array(width - str.length + 1).join('0') + str;
}
