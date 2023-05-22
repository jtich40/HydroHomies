import React from 'react';
import ProductCard from '../components/ProductCard';

import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';

export default function Flasks() {
    const { loading, data } = useQuery(QUERY_PRODUCTS, {
        variables: { categoryId: '2' }
    });
    const products = data?.products || [];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {products.map(product => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )
}