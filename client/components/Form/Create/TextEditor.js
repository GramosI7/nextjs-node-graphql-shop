import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent"];

export default ({ handleChange, valueProps, error }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    // console.log(value);
    handleChange({ ...valueProps, description: value });
    // console.log(valueProps);
  }, [value]);

  return (
    <WrapperEditor error={error}>
      <QuillNoSSRWrapper modules={modules} formats={formats} value={value} onChange={setValue} theme="snow" />
    </WrapperEditor>
  );
};

const WrapperEditor = styled.div`
  border: ${(props) => (props.error ? "1px solid red" : "inherit")};
`;
