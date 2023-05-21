import * as fs from 'fs';
import * as path from 'path';
import {request} from "undici";
// node .\task3.js C:\Users\sid19\WebstormProjects\Node\Lab4\list.json

const jsonFilePath = process.argv[2];
const links: string[] = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
const folderName = path.basename(jsonFilePath, path.extname(jsonFilePath)) + '_pages';
if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
}

const downloadPage = async (url: string, fileName: string) => {
    const {body} = await request(url);
    const filePath: string = path.join(folderName, fileName);
    await fs.promises.writeFile(filePath, body);
};

for (const link of links) {
    const fileName = `${link.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
    downloadPage(link, fileName);
}
