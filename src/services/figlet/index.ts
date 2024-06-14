import figlet from "figlet";

export const generateFiglet = async (text: string) => {
  return figlet.textSync(text);
};
