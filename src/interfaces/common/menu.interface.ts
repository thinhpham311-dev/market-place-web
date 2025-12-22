
interface BaseMenuItem {
    title: string
    icon?: React.ComponentType<{ className?: string }>;
}

export interface LinkMenuItem extends BaseMenuItem {
    type: 'link'
    url: string
}

export interface GroupMenuItem extends BaseMenuItem {
    type: 'group'
    children?: MenuItem[]
}

export type MenuItem = LinkMenuItem | GroupMenuItem
