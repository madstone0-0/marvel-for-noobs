import React, { useEffect, useState } from "react";
import { FixedSizeGrid } from "react-window";

const Grid = ({ data = [] }) => {
    const [cellData, setData] = useState([]);

    const renderCell = ({ columnIndex, rowIndex, style }) => {
        if (data.length === 0) return null;

        const newData = [];
        while (data.length) newData.push(data.splice(0, 3));
        return (
            <div
                style={{
                    ...style,
                    ...{
                        display: "flex",
                        alignItems: "center",
                    },
                }}
            >
                <img
                    src={`${newData[rowIndex][columnIndex].thumbnail.path}.${newData[rowIndex][columnIndex].thumbnail.extension}`}
                    alt={newData[rowIndex][columnIndex].title}
                />
                <p>{newData[rowIndex][columnIndex].title}</p>
            </div>
        );
    };

    useEffect(() => {
        if (data.length === 0) return;
        setData(data);
    }, [data]);

    if (data.length === 0) return null;
    return (
        <FixedSizeGrid
            columnCount={3}
            columnWidth={100}
            height={1000}
            rowCount={10}
            rowHeight={35}
            width={1000}
        >
            {renderCell}
        </FixedSizeGrid>
    );
};

export default Grid;
