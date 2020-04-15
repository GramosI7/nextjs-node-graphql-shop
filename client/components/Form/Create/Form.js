import React, { useState, useCallback } from "react";
import styled from "styled-components";
import RichEditorExample from "./TextEditor";
import Dropzone from "./Dropzone";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import axios from "axios";
import { cloudinary_name, cloudinary_key, cloudinary_preset } from "../../../config";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION($title: String!, $description: String!, $price: Int!, $image: Upload!) {
    createItem(title: $title, description: $description, price: $price, image: $image) {
      title
      description
      price
      image
    }
  }
`;

export default function Form() {
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    image: [],
    description: "",
  });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: val });
  };

  const [addItem, { loading }] = useMutation(CREATE_ITEM_MUTATION, {
    update(proxy, result) {
      // console.log(result);
    },
    onError(err) {
      // console.log(err.graphQLErrors);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: formData,
  });

  const uploadFile = () => {
    const uploaders = formData.image.map((file) => {
      const formDataFile = new FormData();
      formDataFile.append("file", file);
      formDataFile.append("cloud_name", cloudinary_name);
      formDataFile.append("upload_preset", cloudinary_preset);
      // for (var pair of formDataFile.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }

      return axios
        .post(`https://api.cloudinary.com/v1_1/${cloudinary_name}/image/upload`, formDataFile, {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        })
        .then((response) => {
          const data = response.data;
          const fileURL = data.secure_url; // You should store this URL for future references in your app
          console.log("cloudinary: ", data);
        })
        .catch((err) => console.log(err));
    });

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
      console.log("FINISH !", uploaders);
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // addItem();
    uploadFile();
    console.log("Submit", formData);
  };

  return (
    <FormStyled onSubmit={onSubmit}>
      {loading && <p>Loading...</p>}
      <Label htmlFor="title">
        Title
        <Input type="text" name="title" onChange={onChange} value={formData.title} />
      </Label>
      <Label htmlFor="title">
        <Dropzone data={formData} setFormData={setFormData} />
      </Label>
      <Label htmlFor="price">
        Price
        <Input type="number" name="price" onChange={onChange} value={formData.price} />
      </Label>
      <RichEditorExample valueProps={formData} handleChange={setFormData} />
      <Button>Add</Button>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  padding: 40px 0 120px;
  display: grid;
  gap: 20px;
`;

const Label = styled.label`
  display: grid;
  text-transform: uppercase;
`;

const InputFile = styled.input``;

const Input = styled.input`
  padding: 5px 10px;
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
