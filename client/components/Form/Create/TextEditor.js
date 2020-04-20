import React, { useState, useEffect } from "react";

// Styled-css
import styled from "styled-components";

// For ssr render
import dynamic from "next/dynamic";

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
    matchVisual: false,
  },
};

const formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent"];

export default ({ handleChange, valueProps, error }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    handleChange({ ...valueProps, description: value });
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
