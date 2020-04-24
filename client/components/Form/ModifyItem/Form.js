import React, { useState } from "react";

// Styled-css
import styled from "styled-components";

// Next router
import { useRouter } from "next/router";

// Graphql
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

// For cloudinary
import axios from "axios";
import { cloudinary_name, cloudinary_preset } from "../../../config";

// Component
import RichEditorExample from "./TextEditor";
// import Dropzone from "./Dropzone";
import Loading from "../../Loading";
import ErrorMessage from "../../ErrorMessage";

const ITEM_QUERY = gql`
  query getItem($_id: ID!) {
    getItem(_id: $_id) {
      _id
      title
      description
      price
      image {
        public_id
        url
      }
    }
  }
`;

const MODIFY_ITEM_MUTATION = gql`
  mutation MODIFY_ITEM_MUTATION($_id: ID!, $title: String!, $description: String!, $price: Int!) {
    updateItem(_id: $_id, title: $title, description: $description, price: $price) {
      _id
      title
      description
      price
    }
  }
`;

export default function Form({ id }) {
  const router = useRouter();

  const [stateInput, setStateInput] = useState({
    title: "",
    price: 0,
    image: [],
    description: "",
  });

  const [loadingState, setLoadingState] = useState(false);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    setStateInput({ ...stateInput, [name]: val });
  };

  const { error, data } = useQuery(ITEM_QUERY, {
    onCompleted({ getItem }) {
      console.log(getItem);
      setStateInput(getItem);
    },
    variables: { _id: id },
  });

  const [addItem, { loading }] = useMutation(MODIFY_ITEM_MUTATION, {
    update(_, { data }) {
      console.log(data);
      router.push({
        pathname: "/item",
        query: { id: data.updateItem._id, message: "Good ! The article is online and modify !" },
      });
    },
    onError(err) {
      console.log(err.graphQLErrors);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: stateInput,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    addItem();
  };

  return (
    <FormStyled onSubmit={onSubmit}>
      {(loading || loadingState) && <Loading />}
      <Label htmlFor="title">
        TITLE
        <Input type="text" name="title" onChange={onChange} value={stateInput.title} error={Object.keys(errors).includes("title")} />
        {Object.keys(errors).includes("title") && <ErrorMessage>{errors["title"]}</ErrorMessage>}
      </Label>
      {/* <Label htmlFor="title">
        <Dropzone preview={previewImg} setPreviewImg={setPreviewImg} error={Object.keys(errors).includes("image")} />
        {Object.keys(errors).includes("image") && <ErrorMessage>{errors["image"]}</ErrorMessage>}
      </Label> */}
      <Label htmlFor="price">
        Price
        <Input type="number" name="price" onChange={onChange} value={stateInput.price} error={Object.keys(errors).includes("price")} />
        {Object.keys(errors).includes("price") && <ErrorMessage>{errors["price"]}</ErrorMessage>}
      </Label>
      <Label>
        <RichEditorExample error={Object.keys(errors).includes("description")} valueProps={stateInput} handleChange={setStateInput} />
        {Object.keys(errors).includes("description") && <ErrorMessage>{errors["description"]}</ErrorMessage>}
      </Label>
      <Button>Modify Item</Button>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  padding: 20px 0 100px;
  display: grid;
  gap: 20px;
`;

const Label = styled.label`
  display: grid;
  text-transform: uppercase;
`;

const Input = styled.input`
  padding: 5px 10px;
  border: 1px solid ${(props) => (props.error ? "red" : "rgba(0, 0, 0, 0.2)")};
`;

const Button = styled.button`
  font-weight: 500;
  font-size: 1.2rem;
  text-transform: uppercase;
  border-radius: 1px;
  color: ${(props) => props.theme.white};
  justify-self: center;
  padding: 10px 35px;
  border: none;
  background-color: ${(props) => props.theme.grey};
`;
