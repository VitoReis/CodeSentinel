const readline = require("readline");
import { colors } from "../utils/console";

import {
  create,
  embed,
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
  "* 2 - EMBED MODEL            *\n" +
  "* 3 - LIST MODELS            *\n" +
  "* 4 - DELETE MODEL           *\n" +
  "* 5 - ADD NEW LANGUAGE       *\n" +
  "* 6 - DELETE LANGUAGE        *\n" +
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
        model = await askQuestion(
          `FOR WHICH MODEL DO YOU WANT ${colors.fgGreen}GENERATE${colors.reset} ${colors.fgYellow}EMBEDS${colors.reset}? `
        );
        path = await askQuestion(
          `WHAT IS THE NAME OF YOUR ${colors.fgYellow}EMBEDDINGS FILE${colors.reset} AND ${colors.fgMagenta}EXTENSION${colors.reset}? (EX: EMBED.TXT) `
        );
        console.log(`\nGENERATING EMBED...\n`);
        response = await embed(model, path);
        if (response) {
          console.log(`\n${colors.fgGreen}MODEL EMBEDDED${colors.reset}\n`);
        } else {
          console.log(
            `\n${colors.fgBrightRed}UNABLE TO GENERATE EMBED FOR MODEL${colors.reset}\n`
          );
        }
        break;
      case 3:
        models = await running();
        console.log(
          `\n${colors.fgGreen}AVAILABLE MODELS${colors.reset}:${models.map(
            (model) => ` ${model}`
          )}`
        );
        break;
      case 4:
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
      case 5:
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
      case 6:
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
