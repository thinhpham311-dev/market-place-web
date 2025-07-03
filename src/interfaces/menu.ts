export interface IMenuItem {
    title: string;
    url?: string;
    icon?: React.ComponentType<{ className?: string }>;
    children?: IMenuItem[];
}
