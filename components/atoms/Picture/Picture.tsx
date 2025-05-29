import Image from 'next/image';
import {JSX} from "react";
import {PictureProps} from "@typesFront";
import {cn} from "@lib";

const Picture: ({src, alt, width, height, ref, ...other}: PictureProps) => JSX.Element = ({
                                                                                              src,
                                                                                              alt,
                                                                                              width,
                                                                                              height,
                                                                                              ref,
                                                                                              ...other
                                                                                          }: PictureProps): JSX.Element =>
{
    return (
        <div className={cn("relative", other.className)}
             style={{
                 ...(width && {width: `${width}px`}),
                 ...(height && {height: `${height}px`}),
             }}>
            <Image
                ref={ref}
                src={src}
                alt={alt}
                loading="lazy"
                width={width ?? 200}
                height={height ?? 200}
                style={{
                    objectFit:      'contain',
                    objectPosition: 'center',
                    width:          '100%',
                    height:         '100%',
                }}
                {...other}
            />
        </div>
    );
}

export default Picture;