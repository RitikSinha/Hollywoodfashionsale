import NextLink from "next/link";
import { Grid, Link, Typography, Avatar } from "@mui/material";
import Layout from "../components/Layout";
import db from "../utils/db";
import Product from "../models/Product";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import ProductItem from "../components/ProductItem";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "../utils/classes";
import Image from "next/image";

export default function Home(props) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { topRatedProducts, featuredProducts, newArrivalProducts } = props;
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };
  useEffect(() => {
    handleWindowResize();
  }, []);

  return (
    <Layout>
      <Carousel>
        {featuredProducts.map((product) => (
          <NextLink
            key={product._id}
            href={`/product/${product.slug}`}
            passHref
          >
            <Link sx={classes.flex}>
              <Image
                src={product.featuredImage}
                alt={product.name}
                width={width}
                height={height}
              />
            </Link>
          </NextLink>
        ))}
      </Carousel>

      <Grid container spacing={3}>
        <Grid item md={2}>
          <NextLink href="search?category=Jeans" passHref>
            <Avatar sx={{ bgcolor: "#121212", width: 100, height: 100 }}>
              Jeans
            </Avatar>
          </NextLink>
        </Grid>
        <Grid item md={2}>
          <NextLink href="search?category=shirts" passHref>
            <Avatar sx={{ bgcolor: "#121212", width: 100, height: 100 }}>
              Shirts
            </Avatar>
          </NextLink>
        </Grid>
        <Grid item md={2}>
          <NextLink href="search?category=t-shirt" passHref>
            <Avatar sx={{ bgcolor: "#121212", width: 100, height: 100 }}>
              T-Shirts
            </Avatar>
          </NextLink>
        </Grid>
        <Grid item md={2}>
          <NextLink href="search?category=lower" passHref>
            <Avatar sx={{ bgcolor: "#121212", width: 100, height: 100 }}>
              Lower
            </Avatar>
          </NextLink>
        </Grid>
        <Grid item md={2}>
          <NextLink href="search?category=cap" passHref>
            <Avatar sx={{ bgcolor: "#121212", width: 100, height: 100 }}>
              Cap
            </Avatar>
          </NextLink>
        </Grid>
        <Grid item md={2}>
          <NextLink href="search?category=shoes" passHref>
            <Avatar sx={{ bgcolor: "#121212", width: 100, height: 100 }}>
              Shoes
            </Avatar>
          </NextLink>
        </Grid>
      </Grid>

      <Typography variant="h2">new Arrival</Typography>
      <Grid container spacing={3}>
        {newArrivalProducts.map((product) => (
          <Grid item md={4} key={product.name}>
            <ProductItem
              product={product}
              addToCartHandler={addToCartHandler}
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h2">best sellers</Typography>
      <Grid container spacing={3}>
        {topRatedProducts.map((product) => (
          <Grid item md={4} key={product.name}>
            <ProductItem
              product={product}
              addToCartHandler={addToCartHandler}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    "-reviews"
  )
    .lean()
    .limit(3);
  const newArrivalProductsDocs = await Product.find({}, "-reviews")
    .sort({})
    .lean()
    .limit(6);
  const topRatedProductsDocs = await Product.find({}, "-reviews")
    .lean()
    .sort({
      rating: -1,
    })
    .limit(6);
  await db.disconnect();
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
      newArrivalProducts: newArrivalProductsDocs.map(db.convertDocToObj),
    },
  };
}
