import React from 'react';

import logo from './logo.svg';
import './App.css';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { gql } from "apollo-boost";

const POSTS_QUERY = gql`
query fetchPosts {
  allPosts(orderBy: order_ASC) {
    id
    title
    order
  }
}
`

const REORDER_POST = gql`
  mutation Reorder($id: ID!, $order: Int!) {
    updatePost(
      id: $id
      order: $order
    ) { 
      id
      title
      order
    }
  }
`

const PostsList = ({ name }) => {
  const { data, loading, error } = useQuery(POSTS_QUERY);
  const [reorder] = useMutation(REORDER_POST, {
    refetchQueries: ['fetchPosts']
  });


  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return data.allPosts.map(post => (
    <div style={{color: 'white'}}>
      <span>{post.order} - </span>
      <strong>{post.title} </strong>
      <button onClick={() => {
        reorder({ variables: { id: post.id , order: post.order - 1 } })
        reorder({ variables: { id: post.id , order: post.order - 2 } })
      }}>Move Up</button>
      <button onClick={() => reorder({ variables: { id: post.id , order: post.order + 1 } })}>Move Down</button>
    </div>
  ));
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <PostsList/>
      </header>
    </div>
  );
}

export default App;
