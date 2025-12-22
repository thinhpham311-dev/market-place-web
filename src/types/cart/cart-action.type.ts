export type CartItemAction =
    | 'update_qty'
    | 'update_variant'
    | 'delete_item'

export type CartGlobalAction =
    | 'show_list'
    | 'create_item'
    | 'delete_items_selected'
    | 'delete_items_all'
