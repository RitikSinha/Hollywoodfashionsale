import React from "react";

import Link from "next/link";
const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <h1>Reach Out to Us</h1>
        <p>
          <strong>Email</strong>: hello@hollywoodfashionsale.com <br />
          <strong>Timing</strong>:11am to 6pm Mon - Sun* <br />
          <strong>Phone</strong>:+91 8292995048 <br />
          <strong>Address</strong>:Gautam Buddha Road, Chowk,
          <br /> Gaya - 823001, Kedarnath Market <br />
        </p>
      </div>
      <div>
        <Link href="/privacy"> Privacy Pollicy</Link>
        <Link href="/refundPolicy"> Refund Pollicy</Link>
        <Link href="/shippingPolicy"> Shipping Pollicy</Link>
        <Link href="/contact"> Contact</Link>
        <Link href="/terms"> Terms and Conditions</Link>
      </div>
    </footer>
  );
};

export default Footer;
