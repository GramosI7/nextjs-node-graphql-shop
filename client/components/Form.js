// import React, { useState } from "react";
// import gql from "graphql-tag";
// // import { Mutation } from "react-apollo";
// import { useMutation, useQuery } from "@apollo/react-hooks";
// import { ALL_ITEM_QUERY } from "../pages/index";

// const CREATE_ITEM_MUTATION = gql`
//   mutation CREATE_ITEM_MUTATION($title: String!, $description: String!, $price: Int!) {
//     createItem(title: $title, description: $description, price: $price) {
//       title
//       description
//       price
//     }
//   }
// `;

// export default function Form() {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     price: 0,
//   });
//   const [errors, setErrors] = useState({});

//   const onChange = (e) => {
//     const { name, type, value } = e.target;
//     const val = type === "number" ? parseFloat(value) : value;
//     setFormData({ ...formData, [name]: val });
//   };

//   const [addItem, { loading }] = useMutation(CREATE_ITEM_MUTATION, {
//     update(proxy, result) {
//       console.log(result);
//     },
//     onError(err) {
//       console.log(err.graphQLErrors);
//       setErrors(err.graphQLErrors[0].extensions.errors);
//     },
//     variables: formData,
//     refetchQueries: [{ query: ALL_ITEM_QUERY }],
//   });

//   const onSubmit = (e) => {
//     e.preventDefault();
//     addItem();
//   };

//   return (
//     <div>
//       {loading && <p>Loading...</p>}
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={formData.name} type="text" name="title" placeholder="Name" />
//         <input onChange={onChange} value={formData.description} type="text" name="description" placeholder="Description" />
//         <input onChange={onChange} value={formData.price} type="number" name="price" placeholder="Price" />
//         <button type="submit">Send</button>
//       </form>
//       {Object.keys(errors).length > 0 && (
//         <div className="error">
//           <ul>
//             {Object.values(errors).map((value) => (
//               <li key={value}>{value}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
