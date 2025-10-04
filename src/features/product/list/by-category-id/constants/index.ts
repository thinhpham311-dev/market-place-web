export const PRO_LIST_BY_CATEGORYID = "PRO_LIST_BY_CATEGORYID"
export const PRO_LIST_BY_CATEGORYID_CACHE_KEY = "PRO_LIST_BY_CATEGORYID_CACHE_KEY"
export const PRO_LIST_BY_CATEGORYID_TAG = "PRO_LIST_BY_CATEGORYID_TAG"
export const PRO_LIST_BY_CATEGORYID_TTL = 5 * 60 * 1000 // 5 minutes
export const PRO_LIST_BY_CATEGORYID_RETRIES = 2
export const PRO_LIST_BY_CATEGORYID_RETRY_DELAY = 500 // 0.5 second


export const SORTBY_OPTIONS = [
    { label: 'Newest', value: 'ctime' },
    { label: 'Popularity', value: 'pop' },
    { label: 'Price: Low to High', value: 'asc' },
    { label: 'Price: High to Low', value: 'desc' },
]

export const FILTER_OPTIONS = [
    {
        label: "Brands",
        key: "brands",
        type: "checkbox",
        items: [
            { label: "Nike", value: "nike" },
            { label: "Adidas", value: "adidas" },
            { label: "Puma", value: "puma" },
            { label: "Converse", value: "converse" },
            { label: "Vans", value: "vans" },
            { label: "New Balance", value: "new-balance" },
            { label: "Reebok", value: "reebok" },
            { label: "Asics", value: "asics" },
            { label: "Fila", value: "fila" },
            { label: "Under Armour", value: "under-armour" },
        ],
    },
    {
        label: "Conditions",
        key: "conditions",
        type: "checkbox",
        items: [
            { label: "Used", value: "used" },
            { label: "New with tag", value: "new" },
        ],
    },
    {
        label: "Promotions",
        key: "promotions",
        type: "checkbox",
        items: [
            { label: "On sale", value: "sale" },
            { label: "Clearance Sale", value: "clearance" },
            { label: "Ready Stock", value: "stock" },
            { label: "Whole Sale", value: "wholesale" },
            { label: "Anything Cheap", value: "cheap" },
        ],
    },
    {
        label: "Services",
        key: "services",
        type: "checkbox",
        items: [
            { label: "Free Shipping", value: "free-shipping" },
            { label: "COD Available", value: "cod" },
            { label: "7-day Return", value: "return" },
            { label: "Warranty Included", value: "warranty" },
        ],
    },
    {
        label: "Ratings",
        key: "ratings",
        type: "checkbox",
        items: [
            { label: "1 Star", value: 1 },
            { label: "2 Star", value: 2 },
            { label: "3 Star", value: 3 },
            { label: "4 Star", value: 4 },
            { label: "5 Star", value: 5 },
        ]
    },
];
