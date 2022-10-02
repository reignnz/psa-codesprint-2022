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

export enum statusToColor {
  REQUESTED = "#0E80EACC",
  ISSUED = "#430198CC",
  PENDING = "#EA9F0ECC",
  SIGNED = "#439801CC",
  VERIFIED = "#90730ACC",
  ARCHIVED = "#90730ACC",
}