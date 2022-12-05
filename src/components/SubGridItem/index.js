import React from "react";

const SubGridItem = ({ data }) => {
    return (
        <>
            <figure className="data-grid-figure">
                <div className="data-grid-photo-wrap">
                    <img
                        className="data-grid-photo"
                        src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
                        alt={data.title}
                    />
                </div>
                <div>
                    <figcaption>
                        <p className="data-title">{data.title}</p>
                    </figcaption>
                </div>
            </figure>
        </>
    );
};

export default SubGridItem;
