import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    carts: [], // This should be an array to hold cart items
    wish: [],
    wishTotalItems: [],
    isVisible: false,
}

export const counterSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        Addtocart: (state, action) => {
            // action payload check
            console.log(action.payload);

            let addcart = {...action.payload, qty : 1, total : action.payload.price}
            // addcart['qty'] = 1 / new add qty / new add total

            // Check if item already exists in cart
            let temp = state.carts.filter((item) => {
                return item.id == action.payload.id //  item.id == action.payload.id 0 j thy 
            })
            // console.log('datass',temp.length)

            if (temp.length == 0) {
                state.carts.push(addcart); // data push in carts array
                // addcart['qty'] = 1 // new add qty
                // addcart['total'] = addcart.price // new add total

                toast.success(`${addcart.title} Added Successfully`, {
                    position: "bottom-left",
                    // className: 'foo-bar',
                    pauseOnHover: true,
                    autoClose: 1800,
                })
            } else {
                toast.error(`${addcart.title} Already In Cart`, {
                    position: "bottom-left",
                    // className: 'foo-bar',
                    autoClose: 1800,
                    pauseOnHover: true,
                })
            }

            // Calculate grand total //update that qty incres and value in total
            let alltotal = 0;
            state.carts.map((item) => {
                alltotal += Number(item.total)
            })
            state.grandTotal = alltotal;
        },

        Removeitem: (state, action) => {
            // const temp = action.payload;
            // Action to remove item from cart

            state.carts = state.carts.filter((item, index) => {
                return index != action.payload;  //return index != temp;
            })

            let alltotal = 0;
            state.carts.map((item) => {
                alltotal += Number(item.total)
            })
            state.grandTotal = alltotal

            toast.error('Delete Successfully', {
                position: "bottom-left",
                autoClose: 1000,
                pauseOnHover: true,
            })
        },

        inc: (state, action) => {
            let itemId = action.payload; //index
            let temp = state.carts;

            // Action to increment item quantity in cart
            temp[itemId].qty += 1 // temp[index] ni qty + 1
            console.log('itemId', itemId);
            temp[itemId].total = temp[itemId].price * temp[itemId].qty

            // Calculate grand total //update that qty incres and value in total
            let alltotal = 0;
            state.carts.map((item) => {
                alltotal += Number(item.total)
            })
            state.grandTotal = alltotal

        },

        dec: (state, action) => {
            let itemId = action.payload; //index
            let temp = state.carts;
            // temp[index] ni qty - 1

            if (temp[itemId].qty > 1) {
                // Action to decrement item quantity in cart
                temp[itemId].qty -= 1
                temp[itemId].total = temp[itemId].price * temp[itemId].qty;

                // Calculate grand total
                let alltotal = 0;
                state.carts.map((item) => {
                    alltotal += Number(item.total)
                })
                state.grandTotal = alltotal

            } else {
                // If quantity becomes 0, remove item from cart
                state.carts = state.carts.filter((item, index) => {
                    return index != action.payload;  //return index != temp;
                })

                // Calculate grand total
                let alltotal = 0;
                state.carts.map((item) => {
                    alltotal += Number(item.total)
                })
                state.grandTotal = alltotal

            }
        },

        showOffcanvas: (state) => {
            state.isVisible = true;
        },
        hideOffcanvas: (state) => {
            state.isVisible = false;
        },
        addToWish: (state, action) => {

            let addwish = action.payload;
            //  addwishlist ['qty'] = 1 // new add qty

            // Check if item already exists in cart
            let temp = state.wish.filter((item) => {
                return item.id == action.payload.id //  item.id == action.payload.id 0 j thy 
            })

            if (temp.length == 0) {
                state.wish.push(addwish); //dta push in carts array
                state.wishTotalItems += 1 // new add qty

                toast.success(`${addwish.title} Added Successfully`, {
                    position: "bottom-left",
                    // className: 'foo-bar',
                    pauseOnHover: true,
                    autoClose: 1800,
                })
            } else {
                toast.error(`${addwish.title} Already In wishlist`, {
                    position: "bottom-left",
                    // className: 'foo-bar',
                    autoClose: 1800,
                    pauseOnHover: true,
                })
            }

            // state.wish.push(action.payload);
            // state.wishTotalItems += 1;
            // toast.success("Item added to wishlist")
        },
        emptyWish: (state) => {
            state.wish = [];
            state.wishTotalItems = 0;
        },
        removeToWish: (state, action) => {
            const itemId = action.payload
            const index = state.wish.findIndex((item, index) => index === itemId)

            if (index >= 0) {

                state.wishTotalItems--;
                state.wish.splice(index, 1)

            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { Addtocart, Removeitem, inc, dec, showOffcanvas, hideOffcanvas, addToWish, emptyWish, removeToWish } = counterSlice.actions

export default counterSlice.reducer