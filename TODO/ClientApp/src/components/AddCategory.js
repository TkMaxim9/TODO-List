import React, { Component } from 'react';
import button from "bootstrap/js/src/button";

const AddCategory = ({handleSubmit}) => {
    const [title, setTitle] = React.useState('');

    const Submit = (event) => {
        event.preventDefault();
        console.log('sdfsfd');
        handleSubmit(title);
    };

    return(
        <div>
            <form onSubmit={Submit}>
                <input type="text"
                       placeholder="Название категории"
                       onChange={(e) => setTitle(e.target.value)}
                       required />
                <button type="submit">Добавить</button>
            </form>
        </div>
    )
}

export default AddCategory;