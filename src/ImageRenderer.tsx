import React, { useState, useRef } from "react";
import { useIntersection } from "./hooks/IntersectionObserver";

interface IImageRenderer {
    url: string;
    alt: string;
    height: number;
    width: number;
}
const ImageRenderer = (props: IImageRenderer) => {
    const { alt, url, height, width } = props;
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const imgRef = useRef(null);
    useIntersection(imgRef, () => {
        setIsInView(true);
    });

    const onImageLoad = () => {
        setIsLoaded(true);
    };

    const imageStyles: React.CSSProperties = isLoaded
        ? {
              paddingBottom: 0,
          }
        : {
              paddingBottom: `${(height / width) * 75}%`,
          };

    return (
        <div className="image-container" style={imageStyles} ref={imgRef}>
            {isInView && (
                <>
                    <div className={`image thumb`} />
                    <img src={url} onLoad={onImageLoad} alt={alt} />
                </>
            )}
        </div>
    );
};

export default ImageRenderer;
