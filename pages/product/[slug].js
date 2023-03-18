import React, { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  TextField,
  CircularProgress,
  Box,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import Layout from "../../components/Layout";
import classes from "../../utils/classes";
import Product from "../../models/Product";
import db from "../../utils/db";
import axios from "axios";
import { Store } from "../../utils/Store";
import { getError } from "../../utils/error";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Form from "../../components/Form";
import Gallery from "../../components/Gallery";
export default function ProductScreen(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { product } = props;

  const { enqueueSnackbar } = useSnackbar();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `/api/products/${product._id}/reviews`,
        {
          rating,
          comment,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      setLoading(false);
      enqueueSnackbar("Review submitted successfully", { variant: "success" });
      fetchReviews();
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/products/${product._id}/reviews`);
      setReviews(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };
  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!product) {
    return <Box>Product Not Found</Box>;
  }
  const addToCartHandler = async () => {
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
  const items = [];

  product.image
    ? items.push({
        original: product.image,
        thumbnail: product.image,
      })
    : null;
  product.image1
    ? items.push({
        original: product.image1,
        thumbnail: product.image1,
      })
    : null;
  product.image2
    ? items.push({
        original: product.image2,
        thumbnail: product.image2,
      })
    : null;
  product.image3
    ? items.push({
        original: product.image3,
        thumbnail: product.image3,
      })
    : null;
  product.image4
    ? items.push({
        original: product.image4,
        thumbnail: product.image4,
      })
    : null;
  console.log(items);
  return (
    <Layout title={product.name}>
      <Box sx={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>back to products</Typography>
          </Link>
        </NextLink>
      </Box>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          {items.length > 0 ? <Gallery items={items} /> : <></>}
          {/**   <Carousel>
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              layout="responsive"
            ></Image>
            {product.image1 ? (
              <Image
                src={product?.image1}
                alt={product.name}
                width={640}
                height={640}
                layout="responsive"
              ></Image>
            ) : (
              <></>
            )}
            {product.image1 ? (
              <Image
                src={product?.image1}
                alt={product.name}
                width={640}
                height={640}
                layout="responsive"
              ></Image>
            ) : (
              <></>
            )}
            {product.image2 ? (
              <Image
                src={product?.image1}
                alt={product.name}
                width={640}
                height={640}
                layout="responsive"
              ></Image>
            ) : (
              <></>
            )}
            {product.image3 ? (
              <Image
                src={product?.image1}
                alt={product.name}
                width={640}
                height={640}
                layout="responsive"
              ></Image>
            ) : (
              <></>
            )}
            {product.image4 ? (
              <Image
                src={product?.image1}
                alt={product.name}
                width={640}
                height={640}
                layout="responsive"
              ></Image>
            ) : (
              <></>
            )}
          </Carousel>*/}
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Rating value={product.rating} readOnly></Rating>
              <Link href="#reviews">
                <Typography>({product.numReviews} reviews)</Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Typography> Description: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>₹{product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? "In stock" : "Unavailable"}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
      <List>
        <ListItem>
          <Typography name="reviews" id="reviews" variant="h2">
            Customer Reviews
          </Typography>
        </ListItem>
        {reviews.length === 0 && <ListItem>No review</ListItem>}
        {reviews.map((review) => (
          <ListItem key={review._id}>
            <Grid container>
              <Grid item sx={classes.reviewItem}>
                <Typography>
                  <strong>{review.name}</strong>
                </Typography>
                <Typography>{review.createdAt.substring(0, 10)}</Typography>
              </Grid>
              <Grid item>
                <Rating value={review.rating} readOnly></Rating>
                <Typography>{review.comment}</Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
        <ListItem>
          {userInfo ? (
            <Form onSubmit={submitHandler}>
              <List>
                <ListItem>
                  <Typography variant="h2">Leave your review</Typography>
                </ListItem>
                <ListItem>
                  <TextField
                    multiline
                    variant="outlined"
                    fullWidth
                    name="review"
                    label="Enter comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>

                  {loading && <CircularProgress></CircularProgress>}
                </ListItem>
              </List>
            </Form>
          ) : (
            <Typography variant="h2">
              Please{" "}
              <Link href={`/login?redirect=/product/${product.slug}`}>
                login
              </Link>{" "}
              to write a review
            </Typography>
          )}
        </ListItem>
      </List>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }, "-reviews").lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
