import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './styles.scss';
import ListItem from './components/ListItem';
import AuthReg from './components/Auth-reg'
import {List} from "reactstrap";
import AddTask from "./components/AddTask";
import CategoryItem from './components/CategoryItem';
import AddCategory from "./components/AddCategory";
import PaginationPages from "./components/PaginationPages";

const App = () => {
  const [user, setUser] = React.useState(null);
  const [userTasks, setUserTasks] = React.useState([]);
  const [isAuth, setIsAuth] = React.useState(false);
  const [userCategories, setUserCategories] = React.useState([]);
  const [isAdding, setIsAdding] = React.useState(false);
  const [isCategoryAdding, setIsCategoryAdding] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  
  const postsPerPage = 5;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPageIndex = lastPostIndex - postsPerPage;

  const NewUser = async (userData) => {
      setUser(userData);
      await GetUserPosts(userData.id);
      await GetUserCategories(userData.id);
      setIsAuth(true);
  }
  
  async function GetUserPosts(id) {
      const response = await fetch(`/Users/${id}/Posts`);

      if (!response.ok) {
          console.log(response.json());
          return;
      }
        
      const tasksData = await response.json();
      console.log(tasksData);
      setUserTasks(tasksData);
  }

  async function GetUserCategories(id){
      const response = await fetch(`/Users/${id}/Categories`);
      if (!response.ok) {
          console.log(response.json());
          return;
      }
    
      const categoriesData = await response.json();
      console.log(categoriesData);
      setUserCategories(categoriesData);
      console.log("sgdfgsdfg");
      console.log(categoriesData);
  }
  
  const UpdatePostsAndCategories = async () => {
      await GetUserPosts(user.id);
      await GetUserCategories(user.id);
  }
  
  const AddPost = async (data, categoryId) => {
      const response = await fetch('/Posts', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              Data: data,
              IsDone: false,
              UserId: user.id,
              CategoryId: categoryId
          }),
      });

      if (!response.ok) {
          console.log(await response.json());
          return;
      }

      await GetUserPosts(user.id);
      ChangeIsAdding();
      setCurrentPage(Math.ceil(userTasks.length / postsPerPage));
  }

  const AddCat = async (title) => {
      const response = await fetch('/Categories', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              Title: title,
              UserId: user.id
          }),
      });

      if (!response.ok) {
          console.log(response.json());
          return;
      }

      await GetUserCategories(user.id);
      ChangeIsCategoryAdding();
  }
  
  const ChangeIsAdding = () => {
      if (isAdding){
          setIsAdding(false);
      }
      else{
          setIsAdding(true);
      }
  }

    const ChangeIsCategoryAdding = () => {
        if (isCategoryAdding){
            setIsCategoryAdding(false);
        }
        else{
            setIsCategoryAdding(true);
        }
    }

  const DelPost = async (id) => {
      const response = await fetch(`/Posts/${id}`, {
          method: 'DELETE'
      });

      if (!response.ok) {
          console.log(response.json());
          return;
      }
      await GetUserPosts(user.id);
  }
  
  const Paginate = pageNum => setCurrentPage(pageNum);
  
  const Logout = () => setIsAuth(false);
  
  return (
      <div className="container">
          {isAuth ? (
              <div>
                  <button onClick={Logout}>Выйти из аккаунта</button>
                  <div>
                      <h2>Категории</h2>
                      <button onClick={ChangeIsCategoryAdding}>Добавить категорию</button>
                      {isCategoryAdding ? (
                          <AddCategory handleSubmit={AddCat} />
                      ) : (
                          <></>
                      )}
                      <details>
                          <summary>Все категории</summary>
                          {userCategories.map((category) => {
                              return <CategoryItem categoryData={category} updateCategoriesMethod={UpdatePostsAndCategories} />
                          })}
                      </details>
                  </div>
                  <div>
                      <h2>Cписок задач</h2>
                      <button onClick={ChangeIsAdding}>Добавить задание</button>
                      {isAdding ? (
                          <AddTask userCategories={userCategories} handleSubmit={AddPost} />
                      ) : (
                          <></>
                      )}
                      {userTasks.slice(firstPageIndex, lastPostIndex).map((task, index) => {
                          return <ListItem itemData={task} delPost={DelPost} userCategories={userCategories} updateAllItems={GetUserPosts} userId={user.id} />
                      })}
                      <PaginationPages postsPerPage={postsPerPage} totalPosts={userTasks.length} paginate={Paginate} />
                  </div>
              </div>
          ) : (
              <AuthReg authHandle={NewUser} />
          )}
      </div>
    );
}

export default App;