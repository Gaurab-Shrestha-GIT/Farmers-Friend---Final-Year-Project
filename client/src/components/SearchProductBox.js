import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

const SearchProductBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  //search product
  const search = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      //navigate to given url
      navigate(`/find/${keyword}`);
      window.location.reload();
    } else {
      //go to home page
      navigate("/");
    }
  };
  return (
    <>
      <div>
        <Form onSubmit={search} className="input-group">
          <Form.Control
            type="text"
            name="search"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Find Products"
          ></Form.Control>
          <Button
            style={{ width: "90px" }}
            type="submit"
            className="p-2 input-group-prepend"
          >
            Find
          </Button>
        </Form>
      </div>
    </>
  );
};

export default SearchProductBox;
