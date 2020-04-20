import React, { useState } from "react";

// Styled-css
import styled from "styled-components";

// Next router
import { useRouter } from "next/router";

// Graphql
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

// For cloudinary
import axios from "axios";
import { cloudinary_name, cloudinary_preset } from "../../../config";

// Component
import RichEditorExample from "./TextEditor";
import Dropzone from "./Dropzone";
import Loading from "../../Loading";
import ErrorMessage from "../../ErrorMessage";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION($title: String!, $description: String!, $price: Int!, $image: [PhotoInput!]!) {
    createItem(title: $title, description: $description, price: $price, image: $image) {
      _id
      title
      description
      price
      image {
        public_id
      }
    }
  }
`;

export default function Form() {
  const router = useRouter();

  const [stateInput, setStateInput] = useState({
    title: "",
    price: 0,
    image: [],
    description: "",
  });
  const [previewImg, setPreviewImg] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    setStateInput({ ...stateInput, [name]: val });
  };

  const [addItem, { loading }] = useMutation(CREATE_ITEM_MUTATION, {
    update(_, { data }) {
      console.log(data);
      router.push({
        pathname: "/item",
        query: { id: data.createItem._id, message: "Good ! The article is online." },
      });
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: stateInput,
  });

  const uploadFile = () => {
    const uploaders = previewImg.map((file) => {
      setLoadingState(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("cloud_name", cloudinary_name);
      formData.append("upload_preset", cloudinary_preset);
      return axios
        .post(`https://api.cloudinary.com/v1_1/${cloudinary_name}/image/upload`, formData, {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        })
        .then(({ data }) => {
          return {
            public_id: data.public_id,
            url: data.secure_url,
            created_at: data.created_at,
          };
        })
        .catch((err) => console.log(err));
    });

    axios
      .all(uploaders)
      .then((res) => {
        console.log("FINISH !", res);
        setStateInput({ ...stateInput, image: res });
        addItem();
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => setLoadingState(false));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    uploadFile();
  };

  return (
    <FormStyled onSubmit={onSubmit}>
      {(loading || loadingState) && <Loading />}
      <Label htmlFor="title">
        TITLE
        <Input type="text" name="title" onChange={onChange} value={stateInput.title} error={Object.keys(errors).includes("title")} />
        {Object.keys(errors).includes("title") && <ErrorMessage>{errors["title"]}</ErrorMessage>}
      </Label>
      <Label htmlFor="title">
        <Dropzone preview={previewImg} setPreviewImg={setPreviewImg} error={Object.keys(errors).includes("image")} />
        {Object.keys(errors).includes("image") && <ErrorMessage>{errors["image"]}</ErrorMessage>}
      </Label>
      <Label htmlFor="price">
        Price
        <Input type="number" name="price" onChange={onChange} value={stateInput.price} error={Object.keys(errors).includes("price")} />
        {Object.keys(errors).includes("price") && <ErrorMessage>{errors["price"]}</ErrorMessage>}
      </Label>
      <Label>
        <RichEditorExample error={Object.keys(errors).includes("description")} valueProps={stateInput} handleChange={setStateInput} />
        {Object.keys(errors).includes("description") && <ErrorMessage>{errors["description"]}</ErrorMessage>}
      </Label>
      <Button>Add</Button>
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
