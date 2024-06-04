import React from 'react';
import UpdateCategory from "./UpdateCategory";

const CategoryItem = ({ categoryData, updateCategoriesMethod }) => {
    const [isUpdating, setIsUpdating] = React.useState(false);
    
    const DeleteCategory = async () => {
        const response = await fetch(`/Categories/${categoryData.id}`, {
            method: 'DELETE'
        })
    }
    
    const UpdateCat = async (title) => {
        const response = await fetch(`/Categories/${categoryData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Title: title
            }),
        });

        ChangeIsUpdating();
        updateCategoriesMethod();
    }

    const delHandle = async () => {
        await DeleteCategory();
        updateCategoriesMethod();
    }
    
    const ChangeIsUpdating = () => {
        if (isUpdating){
            setIsUpdating(false);
        }
        else{
            setIsUpdating(true);
        }
    }
    
    return(
        <div>
            <p>{categoryData.title}</p>
            <button onClick={ChangeIsUpdating}>Изменить</button>
            <button onClick={delHandle}>Удалить</button>
            {isUpdating ? (
                <UpdateCategory categoryData={categoryData} handleSubmit={UpdateCat} />
            ) : (
                <></>
            )}
        </div>
    )
}

export default CategoryItem;