import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContex";
import storeItems from '../mock-data/items.json'
import { formatCurrency } from "../utils/formatCurrency";

type CartItemProps = {
    id: number;
    quantity: number;
}

const CartItem = ({id, quantity}: CartItemProps) => {
  const {removeFromCart} = useShoppingCart();
  const item = storeItems.find(e => e.id === id);
  if (item == null) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
        <img src={item.imgUrl} style={{width: '125px', height: '75px', objectFit: 'cover'}}/>
        <div className="me-auto">
            <div>
                {item.name} {quantity > 1 && <span style={{fontSize: '0.65rem'}} className="text-muted">x{quantity}</span>} 
            </div>
            <div className="text-muted" style={{fontSize: '0.75rem'}}>
                {formatCurrency(item.price)}
            </div>
            <div>
                {formatCurrency(item.price * quantity)}
                <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>
                    &times;
                </Button>
            </div>
        </div>
    </Stack>
  )
}

export default CartItem