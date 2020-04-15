import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import cross from "../../../public/svg/cross.svg";

export default function Dropzone({ data, setFormData }) {
  // const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFormData({
        ...data,
        image: acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      });
    },
  });

  const deletePreview = (name) => {
    setFormData({ ...data, image: data.image.filter((item) => item.name !== name) });
  };

  useEffect(() => {
    data.image.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [data]);

  const thumbs = data.image.map((file) => (
    <Thumb key={file.name}>
      <ArrowImg onClick={() => deletePreview(file.name)} src={cross} alt="" />
      <ThumbInner>
        <Img src={file.preview} />
      </ThumbInner>
    </Thumb>
  ));

  return (
    <section className="container">
      <ContainerInput {...getRootProps()}>
        <Input {...getInputProps()} />
        <Text>Drag 'n' drop some files here, or click to select files</Text>
      </ContainerInput>
      {data.image.length > 0 && <ThumbsContainer>{thumbs}</ThumbsContainer>}
    </section>
  );
}

const ArrowImg = styled.img`
  width: 12px !important;
  height: 12px;
  position: absolute;
  right: 5px;
  top: 5px;
`;

const ThumbsContainer = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
`;
const Thumb = styled.div`
  position: relative;
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-right: 8px;
  width: 100px;
  height: 100px;
  padding: 4px;
  box-sizing: border-box;
`;

const ThumbInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;

const ContainerInput = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  text-align: center;
  height: 100px;
  background: #fafafa;
  color: #bdbdbd;
`;

const Input = styled.input`
  border: 1px solid black;
`;

const Text = styled.p`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  display: block;
  width: auto;
  height: 100%;
`;
