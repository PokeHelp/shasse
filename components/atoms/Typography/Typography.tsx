'use client';

import {cn} from '@lib';
import {ComponentPropsWithoutRef, ReactNode, JSX} from 'react';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';

type TypographyProps<T extends HeadingTag = 'span'> = {
    as?: T;
    children: ReactNode;
    className?: string;
} & ComponentPropsWithoutRef<T>;

const tagClasses: Record<HeadingTag, string> = {
    h1:   'text-3xl font-bold px-2',
    h2:   'text-2xl font-bold px-2',
    h3:   'text-xl font-bold px-2',
    h4:   'text-xl font-semibold px-2',
    h5:   'text-lg font-bold px-2',
    h6:   'text-lg font-semibold px-2',
    span: '',
};

const CustomTypography: <T extends HeadingTag = 'span'>({
                                                            as,
                                                            children,
                                                            className,
                                                            ...rest
                                                        }: TypographyProps<T>) => JSX.Element
          = <T extends HeadingTag = 'span'>({
                                                as,
                                                children,
                                                className,
                                                ...rest
                                            }: TypographyProps<T>): JSX.Element =>
{
    const Tag: 'span' | T = as || 'span';

    return (
        <Tag className={cn(tagClasses[Tag as HeadingTag], className)} {...rest}>
            {children}
        </Tag>
    );
};

export default CustomTypography;
