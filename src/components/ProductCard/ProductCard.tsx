import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { IProduct } from "src/types/product.type";
import DeleteIcon from "@mui/icons-material/Delete";

export const ProductCard = ({
  id,
  title,
  avatar,
  description,
  price,
  remained,
}: IProduct) => {
  return (
    <Card key={id} sx={{ height: "100%", width: 200, m: "0 auto" }}>
      <CardMedia sx={{ height: 140 }} image={avatar} title={title} />
      <CardContent
        sx={{
          pb: "0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h5" component="h6" overflow="clip" noWrap>
            {title}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ textAlign: "right", mt: "auto" }}>
            {price} ₽
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ textAlign: "right" }}
          >{`Remained: ${remained}`}</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="secondary">
          <DeleteIcon />
        </IconButton>
        <Button size="small" variant="contained">
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};
