import fs from 'fs/promises';
import handlebars from 'handlebars';

export const htmlCompiler = async (htmlFile: string, context: {}) => {
  const html = await fs.readFile(htmlFile);
  const compiler = handlebars.compile(html.toString());
  const htmlString = compiler(context);
  return htmlString;
};
