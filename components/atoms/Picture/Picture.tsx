import Image, {ImageProps} from 'next/image';
import {JSX} from "react";

interface PictureProps extends Omit<ImageProps, 'width' | 'height'>
{
    width: number;
    height: number;
}

const Picture = ({src, alt, width, height, ...other}: PictureProps): JSX.Element =>
{
    return (
        <div style={{
            position: 'relative', maxWidth: '100%', margin: '0 auto',
            width:    `${width}px`, height: `${height}px`
        }}>
            <Image
                src={src} alt={alt} width={width} height={height} loading="lazy"
                style={{
                    objectFit: 'contain', objectPosition: 'center',
                    width:     '100%', height: '100%'
                }}
                {...other}
            />
        </div>
    );
}

export default Picture;