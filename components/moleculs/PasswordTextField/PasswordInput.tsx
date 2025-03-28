'use client';

import { Button, Input } from "@components";
import { useState } from "react";
import Eye from '@svg/eye.svg';
import EyeOff from '@svg/eye-off.svg';

export default function PasswordInput() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative flex items-center rounded-md border border-input w-full max-w-xs">
            <Input
                type={showPassword ? 'text' : 'password'}
                className="border-0 focus-visible:ring-0"
            />
            <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? (
                    <EyeOff/>
                ) : (
                    <Eye/>
                )}
            </Button>
        </div>
    );
}