import React from "react";

export const Comic = ({ comic }) => {
    return (
        <>
            <figure className="comic-grid-figure">
                <div className="comic-grid-photo-wrap">
                    <img
                        className="comic-grid-photo"
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        alt={comic.title}
                    />
                </div>
                <div>
                    <figcaption>
                        <p className="comic-title">{comic.title}</p>
                    </figcaption>
                </div>
            </figure>
        </>
    );
};

export default Comic;
