import characterWidths from "./characterWidths.json";
 
export function getStringLength(string: string, fontSize:string = "19px") {
    const fontSizeNum = parseFloat(fontSize);
    const fallbackWidth = fontSizeNum * 0.55;

    let length = 0;
    for (const char of string) {
      length += characterWidths[fontSize][char] ?? fallbackWidth;
    }
    return length;
  }