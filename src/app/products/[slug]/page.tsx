export const dynamic = "force-dynamic";

// Components
import ProductDetail from './components/ProductDetail';
import ProductItemsListRelated from './components/ProductItemsListRelated';

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const _id = slug.split('.').pop() || '';

    return (
        <div className="space-y-10 md:my-5">
            <ProductDetail id={_id} />
            <ProductItemsListRelated />
        </div>
    );
}
