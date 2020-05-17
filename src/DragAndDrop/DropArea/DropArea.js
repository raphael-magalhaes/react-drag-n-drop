import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const DropArea = ({ children, droppableId, direction, onDrop }) => {
    return (
        <DragDropContext onDragEnd={onDrop}>
            <Droppable droppableId={droppableId} direction={direction}>
                {(provided, snapshot) => (
                    <>
                        {children(provided, snapshot)}
                        {provided.placeholder}
                    </>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export { DropArea }
