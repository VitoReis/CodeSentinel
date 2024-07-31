const readline = require("readline");
import { languages } from "../data/availables";
import {
  create,
  deleteModel,
  addLanguage,
  deleteLanguage,
} from "../services/configure";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const options =
  "\n\n\n" +
  "************************\n" +
  "*    SERVER OPTIONS    *\n" +
  "************************\n" +
  "* 1 - CREATE NEW MODEL *\n" +
  "* 2 - DELETE MODEL     *\n" +
  "* 3 - ADD NEW LANGUAGE *\n" +
  "* 4 - DELETE LANGUAGE  *\n" +
  "* 0 - CLOSE SERVER     *\n" +
  "************************\n" +
  "ENTER YOUR CHOICE: ";

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fgBlack: "\x1b[30m",
  fgRed: "\x1b[31m",
  fgGreen: "\x1b[32m",
  fgYellow: "\x1b[33m",
  fgBlue: "\x1b[34m",
  fgMagenta: "\x1b[35m",
  fgCyan: "\x1b[36m",
  fgWhite: "\x1b[37m",

  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",

  fgBrightBlack: "\x1b[90m",
  fgBrightRed: "\x1b[91m",
  fgBrightGreen: "\x1b[92m",
  fgBrightYellow: "\x1b[93m",
  fgBrightBlue: "\x1b[94m",
  fgBrightMagenta: "\x1b[95m",
  fgBrightCyan: "\x1b[96m",
  fgBrightWhite: "\x1b[97m",

  bgBrightBlack: "\x1b[100m",
  bgBrightRed: "\x1b[101m",
  bgBrightGreen: "\x1b[102m",
  bgBrightYellow: "\x1b[103m",
  bgBrightBlue: "\x1b[104m",
  bgBrightMagenta: "\x1b[105m",
  bgBrightCyan: "\x1b[106m",
  bgBrightWhite: "\x1b[107m",
};

export default function menu(): void {
  let choice: number = -1;
  let model: string, baseModel: string, language: string;
  let response: boolean;
  let responseP: boolean;
  rl.question(`${options}`, (answer: string) => {
    choice = parseInt(answer);
    switch (choice) {
      case 0:
        console.log(`CLOSING...\n`);
        rl.close();
      case 1:
        rl.question(
          `WHAT IS THE NAME OF YOUR ${colors.fgGreen}NEW MODEL${colors.reset}? `,
          (modelAnswer: string) => {
            model = modelAnswer;
          }
        );
        rl.question(
          `WHAT IS THE NAME OF YOUR ${colors.fgBlue}BASE MODEL${colors.reset}? `,
          async (baseAnswer: string) => {
            baseModel = baseAnswer;
            responseP = await create(model, baseModel);
            if (responseP) {
              console.log(
                `\nMODEL CREATED ${colors.fgGreen}SUCCESSFULLY${colors.reset}\n`
              );
            } else {
              console.log(
                `${colors.fgBrightRed}UNABLE TO CREATE MODEL${colors.reset}\n`
              );
            }
          }
        );
        break;
      case 2:
        rl.question(
          `WHAT IS THE NAME OF THE MODEL YOU WANT TO ${colors.fgRed}DELETE${colors.reset}? `,
          async (modelAnswer: string) => {
            model = modelAnswer;
            responseP = await deleteModel(model);
            if (responseP) {
              console.log(`\nMODEL ${colors.fgRed}DELETED${colors.reset}\n`);
            } else {
              console.log(
                `${colors.fgBrightRed}UNABLE TO DELETE MODEL${colors.reset}\n`
              );
            }
          }
        );
        break;
      case 3:
        rl.question(
          `WHICH ${colors.fgYellow}LANGUAGE${colors.reset} DO YOU WANNA ${colors.fgGreen}ADD${colors.reset}? `,
          (languageAnswer: string) => {
            language = languageAnswer;
            response = addLanguage(language);
            if (response) {
              console.log(`\nLANGUAGE ${colors.fgGreen}ADDED${colors.reset}\n`);
            } else {
              console.log(
                `${colors.fgBrightRed}UNABLE TO DELETE LANGUAGE${colors.reset}\n`
              );
            }
            console.log(languages);
          }
        );
        break;
      case 4:
        rl.question(
          `WHICH ${colors.bgYellow}LANGUAGE${colors.reset} DO YOU WANNA ${colors.fgRed}DELETE${colors.reset}? `,
          (languageAnswer: string) => {
            language = languageAnswer;
            response = deleteLanguage(language);
            if (response) {
              console.log(`\nLANGUAGE ${colors.fgRed}DELETED${colors.reset}\n`);
            } else {
              console.log(
                `${colors.fgBrightRed}UNABLE TO DELETE LANGUAGE${colors.reset}\n`
              );
            }
            console.log(languages);
          }
        );
        break;
      default:
        console.log(`${colors.bgYellow}OPTION UNAVAILABLE${colors.reset}\n`);
        break;
    }
    menu();
  });
}
