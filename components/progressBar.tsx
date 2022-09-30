
import React from 'react';
import zxcvbn from 'zxcvbn';
import { Progress } from '@mantine/core';

const getPasswordAttrs = (score: number) => {
    if (score == 2)
        return {
            desc: 'Fair',
            color: 'yellow',
        };
    if (score == 3)
        return {
            desc: 'Good',
            color: 'green',
        };
    if (score == 4)
        return {
            desc: 'Strong',
            color: 'green',
        };
    return {
        desc: 'Weak',
        color: 'red',
    };
};

export type PasswordStrengthMeterType = {
    password: string;
};



const PasswordStrengthMeter: React.FC<PasswordStrengthMeterType> = (props) => {
    const { password } = props;
    const { score } = zxcvbn(password); // score: 0 - 4
    const { desc, color } = getPasswordAttrs(score);
    if (password.length === 0) return null; // don't render if password id empty

    return (
        <div data-testid="component-password-strength-bar">
            <Progress value={score/4 * 100} color={color} />
        </div>
    );
};

export default PasswordStrengthMeter;

