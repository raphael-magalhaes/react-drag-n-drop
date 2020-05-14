import React from 'react'
import { Draggable as BeautifulDraggable } from 'react-beautiful-dnd'

const Draggable = ({ draggableId, index, children, getDraggingStyle }) => {
    return (
        <BeautifulDraggable draggableId={draggableId} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {children({
                        style: getDraggingStyle(snapshot.isDragging)
                    })}
                </div>
            )}
        </BeautifulDraggable>
    )
}

export { Draggable }
