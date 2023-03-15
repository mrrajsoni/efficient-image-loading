import React from "react";
import { useEffect, useState } from "react";

const PhotoModal = ({ url, alt }: { url: string; alt: string }) => {
    const [loading, setLoading] = useState(true);

    const imageLoad = () => {
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
    }, [url]);
    return (
        <div className="photo-modal">
            <div className="overlay">
                {loading && (
                    <div className={loading ? "loading-state" : "hide-state"}>
                        Image loading. Please wait...
                    </div>
                )}
                <img
                    className={loading ? "image-loading" : "image-loaded"}
                    src={url}
                    alt={alt}
                    onLoad={imageLoad}
                />
            </div>
        </div>
    );
};

export default PhotoModal;
