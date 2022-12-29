import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
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
          <strong>Address</strong>:Gautam Buddha Road, Chowk, Gaya - 823001,
          Kedarnath Market <br />
        </p>
      </div>
      <div>
        <Link href="/privacy"> Privacy Pollicy</Link>
        <Link href="/refundPolicy"> Refund Pollicy</Link>
        <Link href="/shippingPolicy"> Shipping Pollicy</Link>
        <Link href="/contact"> Contact</Link>
        <Link href="/terms"> Terms and Conditions</Link>
      </div>
      <div>
        <h1>community exclusive</h1>
      </div>
      <div className="icon-box">
        <a href="" target="_blank">
          <FacebookOutlinedIcon />
        </a>
        <a href="" target="_blank">
          <InstagramIcon />
        </a>
        <a href="" target="_blank">
          <TwitterIcon />
        </a>
        <a href="" target="_blank">
          <LinkedInIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
