import React, { Component } from 'react';
import button from "bootstrap/js/src/button";

const AddTask = ({userCategories, handleSubmit}) => {
    const [data, setData] = React.useState('');
    const [categoryId, setCategoryId] = React.useState('');

    const Submit = (event) => {
        event.preventDefault();
        console.log(categoryId)
        handleSubmit(data, categoryId);
    };
    
    return(
        <div>
            <form onSubmit={Submit}>
                <input type="text" 
                       placeholder="Текст задания"
                       onChange={(e) => setData(e.target.value)}
                       required />
                <label htmlFor="categoryId">Категория:</label>
                <select
                    id="categoryId"
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                >
                    <option value="" disabled selected>Выберите категорию</option>
                    {userCategories.map(category => (
                        <option key={category.id} value={category.id}>{category.title}</option>
                    ))}
                </select>
                <button type="submit">Добавить</button>
            </form>
        </div>
    )
}

export default AddTask;