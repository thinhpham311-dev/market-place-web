import * as React from "react"

import Item from "./item"

const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

const List = () => {
    return (
        <div className="p-3">
            {tags.map((tag) => (
                <Item key={tag} />
            ))}
        </div>
    )
}

export default List