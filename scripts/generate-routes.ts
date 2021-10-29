import { EOL } from 'os';
import { writeFile, appendFile } from 'fs';

const fileName = 'routes.txt';
const menuData: any = require('../src/assets/menu.json');

const errCallback = (err: any) => {
    if (err) {
        console.log(err);
    }
};

generateRoutes();

/**
 * Generate a text file with all the application routes that should be processed in Angular pre-rendering.
 */
function generateRoutes(): void {
    writeFile(fileName, '/' + EOL, errCallback);

    for (const sector in menuData) {
        if (menuData[sector]) {
            appendFile(fileName, '/sector/' + sector + EOL, errCallback);

            if (Array.isArray(menuData[sector].scenes)) {
                menuData[sector].scenes.forEach((scene: any) => {
                    appendFile(fileName, '/sector/' + sector + '/' + scene.alias + EOL, errCallback);
                });
            }
        }
    }
}
