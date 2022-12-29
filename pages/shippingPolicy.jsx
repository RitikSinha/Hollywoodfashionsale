import React from "react";
import Layout from "../components/Layout";
const shippingPolicy = () => {
  return (
    <Layout title="Shipping Policy">
      <h1>Shipping Policy</h1>
      <ul>
        <li>
          Free Shipping on orders above Rs. 250. There will be a shipping charge
          of Rs. 50 on order below Rs. 250
        </li>
        <li>
          COD (cash on delivery) service will be available as per logistics
          partner capability
        </li>
      </ul>
    </Layout>
  );
};

export default shippingPolicy;
