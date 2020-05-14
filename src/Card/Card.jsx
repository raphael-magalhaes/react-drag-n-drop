import React from 'react'
import { styles } from './Card.style'
import { useState } from 'react'

const Card = ({ style, content, onClick }) => {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <div
            style={{ ...styles.container, ...style }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {content}
            {isHovered && (
                <button onClick={() => onClick(content)}>Delete</button>
            )}
        </div>
    )
}

export { Card }
