import React, { useEffect, useState } from "react";
import { FixedSizeGrid } from "react-window";
import Comic from "../Comic";

const GridWindow = ({ data }) => {
    const [cellData, setData] = useState([]);

    const renderCell = ({ columnIndex, rowIndex, style }) => {
        if (cellData.length === 0) return null;
        const newData = [];

        while (cellData.length) newData.push(cellData.splice(0, 3));
        return <Comic comic={newData[rowIndex][columnIndex]} />;
    };

    useEffect(() => {
        if (data.length === 0) return;
        setData(data);
    }, [data]);

    if (data.length === 0) return null;
    return (
        <FixedSizeGrid
            columnCount={3}
            columnWidth={280}
            rowCount={40}
            rowHeight={465}
            width={1100}
            height={1500}
            itemData={data}
        >
            {renderCell}
        </FixedSizeGrid>
    );
};

export default GridWindow;
