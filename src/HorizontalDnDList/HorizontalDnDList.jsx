import React, { Component } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { DropArea } from '../DragAndDrop/DropArea/DropArea'
/* 
    TODO: HorizontalDnDList component, it should be the wrapper that adds drag and drop functionality
    to it's children, the Columns in this case.
*/

const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k}`,
        content: `item ${k}`
    }))

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    display: 'flex',
    flexDirection: 'column',
    marginRight: '1rem',
    background: isDragging ? 'lightgreen' : '#fafafa',
    ...draggableStyle
})

const getListStyle = (isDraggingOver) => ({
    padding: '1rem',
    background: isDraggingOver ? 'lightblue' : 'white',
    display: 'flex',
    overflow: 'auto'
})

export class HorizontalDnDList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: getItems(6)
        }
        this.onDragEnd = this.onDragEnd.bind(this)
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return
        }

        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        )

        this.setState({
            items
        })
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (
            <DropArea
                droppableId={'0'}
                direction="horizontal"
                onDrop={this.onDragEnd}
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                    >
                        {this.props.state.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style
                                        )}
                                    >
                                        <div {...provided.dragHandleProps}>
                                            Drag area
                                        </div>
                                        {item.content}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </DropArea>
        )
    }
}
