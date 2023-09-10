import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import {
  Card,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Container,
  Button,
} from '@mui/material';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

function PostManagementSystem() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setPosts(response.data);
      setFilteredPosts(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) || post.body.toLowerCase().includes(query)
      );
      setFilteredPosts(filtered);
    }
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = filteredPosts.filter((post) => post.id !== postId);
    setFilteredPosts(updatedPosts);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <TextField
            label="Search Posts"
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleSearch}
          />
        </Toolbar>
      </AppBar>
      <div className="post">
        <Container
          style={{
            maxWidth: '1000px',
            display: 'grid',
            gridGap: '16px',
            gridTemplateColumns: '1fr 1fr 1fr',
          }}
        >
          {filteredPosts.map((post) => (
            <Card className="cards" key={post.id} style={{ position: 'relative', margin: '16px 0' }}>
              <CardContent style={{ margin: '12px' }}>
                <Typography variant="h6" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.body}
                </Typography>
              </CardContent>
              <Button
                className="deletebtn"
                variant="contained"
                color="secondary"
                onClick={() => handleDeletePost(post.id)}
                style={{
                  fontSize: '8px',
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  // margin: '8px',
                }}
              >
                Delete
              </Button>
            </Card>
          ))}
        </Container>
      </div>
    </div>
  );
}

export default PostManagementSystem;
