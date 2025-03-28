import {ComponentProps} from "react";
import {Button as UiButton} from '@ui/button';
import {Input as UiInput} from '@ui/input';

export type ButtonProps = ComponentProps<typeof UiButton>
export type InputProps = ComponentProps<typeof UiInput>
export type TypographyProps = ComponentProps<"h1" | "h2">