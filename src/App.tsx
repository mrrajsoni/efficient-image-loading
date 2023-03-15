import { useEffect, useRef, useState } from "react";

import "./styles.scss";
import photos from "./AllPhotos";
import ImageRenderer from "./ImageRenderer";
import PhotoModal from "./PhotoModal";

interface IModalPhotoObj {
    url: string;
    alt: string;
}

const App = () => {
    const modalUrlRef = useRef("");
    const [showModal, setShowModal] = useState(false);
    const [modalPhotoObj, setModalPhotoObj] = useState<IModalPhotoObj>({
        alt: "",

        url: "",
    });

    const openImage = (imageUrl: string, alt: string) => {
        document.body.classList.add("stop-scroll");
        setShowModal(true);
        modalUrlRef.current = imageUrl;
        setModalPhotoObj({
            url: imageUrl,
            alt: alt,
        });
    };

    const handleKeyEvents = (event: KeyboardEvent) => {
        // For closing modal on espace or backspace or delete mac
        if (
            event.key === "Escape" ||
            event.key === "Backspace" ||
            event.key === "Delete"
        ) {
            setShowModal(false);
            document.body.classList.remove("stop-scroll");
            return;
        }
        if (
            (event.key === "ArrowLeft" || event.key === "ArrowRight") &&
            modalPhotoObj
        ) {
            let nextImage = {} as any;

            // navigate through image left
            if (event.key === "ArrowLeft") {
                const currentImageIndex = photos.findIndex(
                    (value) => value.urls["full"] === modalPhotoObj.url
                );
                nextImage =
                    currentImageIndex === 0
                        ? photos[photos.length - 1]
                        : photos[currentImageIndex - 1];
            }

            // navigate through image right
            if (event.key === "ArrowRight") {
                const currentImageIndex = photos.findIndex(
                    (value) => value.urls["full"] === modalPhotoObj.url
                );
                nextImage =
                    currentImageIndex === photos.length - 1
                        ? photos[0]
                        : photos[currentImageIndex + 1];
            }

            setModalPhotoObj({
                url: nextImage.urls["full"],
                alt: nextImage.alt_description,
            });
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyEvents);
        return () => document.removeEventListener("keydown", handleKeyEvents);
    }, [modalPhotoObj]);

    return (
        <div className="App">
            <h3>Photos courtesy of Unsplash and it's users</h3>
            <div className="photos-container">
                {photos.map((p) => (
                    <div
                        onClick={() =>
                            openImage(
                                p.urls["full"],
                                p.alt_description as string
                            )
                        }
                        className="photo"
                        key={p.id}
                    >
                        <ImageRenderer
                            height={p.height}
                            width={p.width}
                            url={p.urls["thumb"]}
                            alt={`Taken by ${p.user.name}`}
                        />
                    </div>
                ))}
            </div>
            {showModal && (
                <PhotoModal url={modalPhotoObj.url} alt={modalPhotoObj.alt} />
            )}
        </div>
    );
};

export default App;
