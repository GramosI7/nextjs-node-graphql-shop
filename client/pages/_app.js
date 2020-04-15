import App from "next/app";

// Graphql
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";
import "react-quill/dist/quill.snow.css";

// Component
import Layout from "../components/Layout/Layout";

// Styled
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

const theme = {
  white: "#ffffff",
  black: "#000000",
  grey: "#A9BED4",
  maxWidth: "1200px",
  paddingAll: "0 70px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Gill-Sans';
    src: url('/static/GillSansStd-Light.otf');
    font-weight: lighter;
    font-style: normal;
  }
  html {
    font-size: 10px;
  }
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  body {
    font-size: 1.6rem;
    line-height: 2;
    font-family: "Gill Sans", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
`;

class MyApp extends App {
  render() {
    const { Component, apollo } = this.props;
    return (
      <>
        <ApolloProvider client={apollo}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Layout>
              <Component />
            </Layout>
          </ThemeProvider>
        </ApolloProvider>
      </>
    );
  }
}

export default withData(MyApp);
