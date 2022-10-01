import { createHash } from "crypto";

export function mapToHsl(id:number) {
    const hash = createHash('sha256');
    hash.update(String(id));
    const output = hash.digest().toString('hex'); 
    return (
      "hsl(" +
      (parseInt(output.slice(0,2), 16) * 360 / 255) + "deg" +
      " " +
      (parseInt(output.slice(2,3), 16) + 84) + "%" +
      " " +
      "40%" +
      ")"
    );
  }