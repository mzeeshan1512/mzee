import React, { CSSProperties } from 'react'

const RichTexPreviewer = ({ markdown, style, className }: { markdown: string, style?: CSSProperties, className?: string }) => {
    return (
        <article
            className={`${className || ""}`}
            style={style}
            dangerouslySetInnerHTML={{
                __html: markdown,
            }}
        />
    )
}

export default RichTexPreviewer