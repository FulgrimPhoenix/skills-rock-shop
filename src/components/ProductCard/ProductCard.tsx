import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { IProduct } from "src/types/product.type";

export const ProductCard = ({
  id,
  title,
  avatar,
  description,
  price,
  remained,
}: IProduct) => {
  return (
    <Card key={id}>
      <CardMedia sx={{ height: 140 }} image={avatar} title={title} />
      <CardContent sx={{ pb: "0" }}>
        <Typography variant="h5" component="h6">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mb: "32px" }}>
          {description}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
        >{`Remained: ${remained}`}</Typography>
        <Typography variant="h6">{price} ₽</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" sx={{ ml: "auto" }}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};
