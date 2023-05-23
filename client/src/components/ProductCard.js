import React from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

import { ADD_TO_CART } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';

export default function ProductCard({ _id, price, image, name }) {
    const [addProduct] = useMutation(ADD_TO_CART);

    function handleAdd() {
        if (!Auth.loggedIn()) {
            return alert('You must be logged in to add items to your cart.');
        }
        addProduct({
            variables: { productId: _id },
            refetchQueries: [{ query: QUERY_USER }],
        });
    }

    return (
        <div className="card">
            <img src={image} alt={name} />
            <div className="card-body">
                <h3>{name}</h3>
                <p>${price}</p>
                <button onClick={handleAdd}>Add to Cart</button>
            </div>
        </div>
    );
}