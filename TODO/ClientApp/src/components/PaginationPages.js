import React from 'react';

const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNums = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNums.push(i)
    }

    console.log(pageNums);
    return (
        <div>
            <ul>
                {
                    pageNums.map(num => (
                        <li key={num}>
                            <a href="#" onClick={() => paginate(num)}>{num}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Pagination;