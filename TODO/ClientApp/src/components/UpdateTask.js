import React, { Component } from 'react';

const UpdateTask = ({userCategories, handleSubmit, itemData}) => {
    const [data, setData] = React.useState(itemData.data);
    const [categoryId, setCategoryId] = React.useState(itemData.categoryId);

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
                       value={data}
                       required />
                <label htmlFor="categoryId">Категория:</label>
                <select
                    id="categoryId"
                    onChange={(e) => setCategoryId(e.target.value)}
                    value={itemData.categoryId}
                    required
                >
                    {userCategories.map(category => (
                        <option key={category.id} value={category.id}>{category.title}</option>
                    ))}
                </select>
                <button type="submit">Изменить</button>
            </form>
        </div>
    )
}

export default UpdateTask;