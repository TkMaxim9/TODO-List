import React from 'react';
import UpdateTask from "./UpdateTask";

const ListItem = ({ itemData, delPost, userCategories, updateAllItems, userId }) => {
    const [isDone, setIsDone] = React.useState(itemData.isDone);
    const [isUpdating, setIsUpdating] = React.useState(false);
    
    const SetDone = async (value) => {
        const response = await fetch(`/Posts/${itemData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Data: itemData.data,
                IsDone: value,
                CategoryId: itemData.categoryId
            }),
        });
    }

    const Update = async (data, categoryId) => {
        const response = await fetch(`/Posts/${itemData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Data: data,
                IsDone: itemData.isDone,
                CategoryId: categoryId
            }),
        });

        ChangeIsUpdating();
        updateAllItems(userId);
    }
    
    const ChangeStatusHandle = () => {
        if (isDone){
            SetDone(false);
            setIsDone(false);
        }
        else {
            SetDone(true);
            setIsDone(true);
        }
    }
    
    const DelItemHandle = () => {
        delPost(itemData.id);
    }
    
    const ChangeIsUpdating = () => {
        if (isUpdating){
            setIsUpdating(false);
        }
        else{
            setIsUpdating(true);
        }
    }
    
    return (
        <div>
            <p>{itemData.data}</p>
            <p>Категория: {itemData.categoryName}</p>
            <p>Статус: 
                {
                    isDone ? " Выполнено" : " Не выполнено"
                }
            </p>
            <button onClick={ChangeStatusHandle}>Изменить статус</button>
            <button onClick={ChangeIsUpdating}>Редактировать</button>
            <button onClick={DelItemHandle}>Удалить</button>
            {isUpdating ? (
                <UpdateTask userCategories={userCategories} handleSubmit={Update} itemData={itemData} />
            ) : (
                <></>
            )}
        </div>
    );
};

export default ListItem;