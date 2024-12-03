
interface IItemRowProps {
    label?: string,
    children?: React.ReactNode
}

export function Item({ label, children }: IItemRowProps) {
    return (
        <div className="flex items-center space-x-2 justify-between w-full">
            <strong>{label}</strong>
            <div>{children}</div>
        </div>
    )
}

export default Item