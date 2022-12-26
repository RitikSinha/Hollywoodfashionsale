import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import NextLink from "next/link";
import Rating from "@mui/material/Rating";

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <Card>
      <NextLink href={`/product/${product.slug}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={product.image}
            title={product.name}
          ></CardMedia>
          <CardContent>
            <Typography>{product.category}</Typography>
            <Typography variant="subtitle2">{product.name}</Typography>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>₹{product.price}</Typography>
              <Rating size="small" value={product.rating} readOnly></Rating>
            </Grid>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          style={{ width: "100%" }}
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
