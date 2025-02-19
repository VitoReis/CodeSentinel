const readline = require("readline");
import { colors } from "../utils/console";

import {
  create,
  running,
  deleteModel,
  addLanguage,
  deleteLanguage,
} from "../services/configure";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const options =
  "\n" +
  "******************************\n" +
  "*        SERVER OPTIONS      *\n" +
  "******************************\n" +
  "* 1 - CREATE NEW MODEL       *\n" +
  "* 2 - LIST MODELS            *\n" +
  "* 3 - DELETE MODEL           *\n" +
  "* 4 - ADD NEW LANGUAGE       *\n" +
  "* 5 - DELETE LANGUAGE        *\n" +
  "* 0 - CLOSE AND START SERVER *\n" +
  "******************************\n" +
  "ENTER YOUR CHOICE: ";

function askQuestion(question: string): Promise<string> {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer: string) => {
      resolve(answer);
    });

    rl.on("error", (err: Error) => {
      reject(err);
    });
  });
}

export async function menu(): Promise<void> {
  let choice: number = -1;
  let models: string[];
  let model: string, baseModel: string, language: string, path: string;
  let response: boolean;
  do {
    choice = parseInt(await askQuestion(options));
    switch (choice) {
      case 0:
        console.log(`CLOSING...\n`);
        rl.close();
        break;
      case 1:
        model = await askQuestion(
          `WHAT IS THE NAME OF YOUR ${colors.fgGreen}NEW MODEL${colors.reset}? `
        );
        baseModel = await askQuestion(
          `WHAT IS THE NAME OF YOUR ${colors.fgBlue}BASE MODEL${colors.reset}? `
        );
        response = await create(model, baseModel);
        if (response) {
          console.log(`\nMODEL ${colors.fgGreen}CREATED${colors.reset}\n`);
        } else {
          console.log(
            `\n${colors.fgBrightRed}UNABLE TO CREATE MODEL${colors.reset}\n`
          );
        }
        break;
      case 2:
        models = await running();
        console.log(
          `\n${colors.fgGreen}AVAILABLE MODELS${colors.reset}:${models.map(
            (model) => ` ${model}`
          )}`
        );
        break;
      case 3:
        model = await askQuestion(
          `WHAT IS THE NAME OF THE MODEL YOU WANT TO ${colors.fgRed}DELETE${colors.reset}? `
        );
        response = await deleteModel(model);
        if (response) {
          console.log(`\nMODEL ${colors.fgRed}DELETED${colors.reset}\n`);
        } else {
          console.log(
            `${colors.fgBrightRed}UNABLE TO DELETE MODEL${colors.reset}\n`
          );
        }
        break;
      case 4:
        language = await askQuestion(
          `WHICH ${colors.fgYellow}LANGUAGE${colors.reset} DO YOU WANNA ${colors.fgGreen}ADD${colors.reset}? `
        );
        response = addLanguage(language);
        if (response) {
          console.log(`\nLANGUAGE ${colors.fgGreen}ADDED${colors.reset}\n`);
        } else {
          console.log(
            `${colors.fgBrightRed}UNABLE TO DELETE LANGUAGE${colors.reset}\n`
          );
        }
        break;
      case 5:
        language = await askQuestion(
          `WHICH ${colors.fgYellow}LANGUAGE${colors.reset} DO YOU WANNA ${colors.fgRed}DELETE${colors.reset}? `
        );
        response = deleteLanguage(language);
        if (response) {
          console.log(`\nLANGUAGE ${colors.fgRed}DELETED${colors.reset}\n`);
        } else {
          console.log(
            `${colors.fgBrightRed}UNABLE TO DELETE LANGUAGE${colors.reset}\n`
          );
        }
        break;
      default:
        console.log(`${colors.fgYellow}OPTION UNAVAILABLE${colors.reset}\n`);
        break;
    }
  } while (choice !== 0);
}
