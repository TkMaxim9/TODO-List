import React, { Component } from 'react';
import button from "bootstrap/js/src/button";

const UpdateCategory = ({categoryData, handleSubmit }) => {
    const [title, setTitle] = React.useState(categoryData.title);

    const Submit = (event) => {
        event.preventDefault();
        handleSubmit(title);
    };

    return(
        <div>
            <form onSubmit={Submit}>
                    <input type="text"
                           placeholder="Название категории"
                           onChange={(e) => setTitle(e.target.value)}
                           value={title}
                           required />
                    <button type="submit">Изменить</button>
            </form>
        </div>
    )
}

export default UpdateCategory;