import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import './cart-dropdown.styles.scss'
import CartItem from '../cart-item/cart-item.componenet';


const CartDropdown = () => {
const { cartItems } = useContext(CartContext)
    return (
     <div className='cart-dropdown-container'>
         <div className='cart-items'>
          {cartItems.map((item) => <CartItem key={item.id} cartItem={item}/>  )}
         </div>
       <button> GO TO CHECKOUT</button>
     </div>
    )
}

export default CartDropdown;