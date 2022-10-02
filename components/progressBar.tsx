import React from "react";
import zxcvbn from "zxcvbn";
import { Progress } from "@mantine/core";

const getPasswordAttrs = (score: number) => {
  if (score == 2)
    return {
      desc: "Fair",
      color: "yellow",
    };
  if (score == 3)
    return {
      desc: "Good",
      color: "green",
    };
  if (score == 4)
    return {
      desc: "Strong",
      color: "green",
    };
  return {
    desc: "Weak",
    color: "red",
  };
};

export type PasswordStrengthMeterType = {
  password: string;
};

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterType> = ({
  password,
}: {
  password: string;
}) => {
  const { score } = zxcvbn(password); // score: 0 - 4
  const { desc, color } = getPasswordAttrs(score);

  return (
    <div>
      <Progress value={(score / 4) * 100} color={color} />
    </div>
  );
};

export default PasswordStrengthMeter;
