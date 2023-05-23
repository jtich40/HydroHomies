import React from 'react';
import ProductCard from '../components/ProductCard';

import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';

export default function FlavorPacks() {
    const { loading, error, data } = useQuery(QUERY_PRODUCTS, {
        variables: { categoryId: '3' }
    });
    const products = data?.products || [];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error! {error.message}</div>;
    }

    return (
        <div>
            {products.map(product => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )
}