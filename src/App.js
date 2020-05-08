import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { HorizontalDnDList } from './HorizontalDnDList/HorizontalDnDList'

const data = [
    [
        {
            id: 'column-1-card-1',
            data: 'custom data',
            content: 'Column 1 Card 1'
        },
        { id: 'column-1-card-2', content: 'Column 1 Card 2' },
        { id: 'column-1-card-3', content: 'Column 1 Card 3' },
        { id: 'column-1-card-4', content: 'Column 1 Card 4' },
        { id: 'column-1-card-5', content: 'Column 1 Card 5' },
        { id: 'column-1-card-6', content: 'Column 1 Card 6' },
        { id: 'column-1-card-7', content: 'Column 1 Card 7' },
        { id: 'column-1-card-8', content: 'Column 1 Card 8' }
    ],
    [{ id: 'column-2-card-1', content: 'Column 2 Card 1' }],
    [],
    [
        { id: 'column-4-card-1', content: 'Column 4 Card 1' },
        { id: 'column-4-card-2', content: 'Column 4 Card 2' },
        { id: 'column-4-card-3', content: 'Column 4 Card 3' }
    ]
]

const createNewCard = (index, state, setState) => {
    const newState = state
    newState[index] = [
        ...newState[index],
        {
            id: `column-${index + 1}-card-${state[index].length + 1}`,
            content: `Column ${index + 1} Card ${state[index].length + 1}`
        }
    ]
    setState([...newState])
}

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    console.log(result)
    return result
}

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    // Forbid column change
    if (source !== destination) {
        const result = {}
        result[droppableSource.droppableId] = source
        result[droppableDestination.droppableId] = destination

        return result
    }
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    destClone.splice(droppableDestination.index, 0, removed)

    const result = {}
    result[droppableSource.droppableId] = sourceClone
    result[droppableDestination.droppableId] = destClone

    return result
}
const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    borderRadius: '5%',

    // change background colour if dragging
    background: isDragging ? '#90EE90' : '#fafafa',
    height: '100px',

    // styles we need to apply on draggables
    ...draggableStyle
})
const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? '#b3ffb3' : 'lightgrey',
    padding: grid,
    overflow: 'scroll',
    maxHeight: '700px',
    width: 250
})

const Column = ({ onDragEnd, state, setState }) => {
    return (
        <HorizontalDnDList
            state={state.map((element, index) => ({
                id: 'index-' + index,
                content: (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable key={index} droppableId={`${index}`}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(
                                        snapshot.isDraggingOver
                                    )}
                                    {...provided.droppableProps}
                                >
                                    <h3>{`Category ${index}`}</h3>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            createNewCard(
                                                index,
                                                state,
                                                setState
                                            )
                                        }
                                    >
                                        Add new question
                                    </button>

                                    <Cards element={element} />
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                )
            }))}
        />
    )
}

const Cards = ({ element }) => {
    return element.map((item, index) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around'
                        }}
                    >
                        {item.content}
                        <button type="button" onClick={() => {}}>
                            delete
                        </button>
                    </div>
                </div>
            )}
        </Draggable>
    ))
}

function App() {
    const [state, setState] = useState(data)

    function onDragEnd(result) {
        const { source, destination } = result

        // dropped outside the list
        if (!destination) {
            return
        }
        const sInd = +source.droppableId
        const dInd = +destination.droppableId

        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index)
            const newState = [...state]
            newState[sInd] = items
            setState(newState)
        } else {
            const result = move(state[sInd], state[dInd], source, destination)
            const newState = [...state]
            newState[sInd] = result[sInd]
            newState[dInd] = result[dInd]

            setState(newState)
        }
    }

    return (
        <div>
            <button
                type="button"
                onClick={() => {
                    setState([...state, []])
                }}
            >
                Add new group
            </button>

            <div style={{ display: 'flex' }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Column
                        state={state}
                        onDragEnd={onDragEnd}
                        setState={setState}
                    />
                </DragDropContext>
            </div>
        </div>
    )
}
export default App
