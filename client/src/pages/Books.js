import React, { useState, useEffect, useRef } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import API from "../utils/API";

function Books() {
  // Initialize books as an empty array
    const [books, setBooks] = useState([]);
    const [data, setInputData] = useState({
      title: "",
      author: "",
      synopsis: ""
    })

    useEffect(() => {
      loadBooks();
    }, []);

    function loadBooks() {
      // Add code here to get all books from the database and store them using setBooks
      API.getBooks().then(res => {
        setBooks(res.data);
      })
    }
    
    function handleSubmit(e){
      // e.preventDefault();
      const title = data.title;
      const author = data.author;
      const synopsis = data.synopsis;

      API.saveBook({
        title,
        author,
        synopsis
      });
    }

    function handleDelete(e){
      // e.preventDefault();
      const id = e.target.id;
      API.deleteBook(id).then(res => {
        window.location.reload();
      })

    }

    function handleChange(e){
      const value = e.target.value;
      const type = e.target.name;
      setInputData({
        ...data,
        [type]: value
      });

    }

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form onSubmit={handleSubmit}>
              <Input onChange={handleChange} name="title" placeholder="Title (required)" />
              <Input onChange={handleChange} name="author" placeholder="Author (required)" />
              <TextArea onChange={handleChange} name="synopsis" placeholder="Synopsis (Optional)" />
              <FormBtn>Submit Book</FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {books.length ? (
              <List>
                {books.map(book => (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a>
                    <DeleteBtn id={book._id} onClick={handleDelete} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }

export default Books;
