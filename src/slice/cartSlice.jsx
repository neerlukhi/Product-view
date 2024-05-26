import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    carts: [], // This should be an array to hold cart items
    isVisible: false,
}

export const counterSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        Addtocart: (state, action) => {
            console.log(action.payload);
            // action payload check

            let addcart = action.payload;
            // addcart['qty'] = 1 // new add qty

            // Check if item already exists in cart
            let temp = state.carts.filter((item) => {
                return item.id == action.payload.id //  item.id == action.payload.id 0 j thy 
            })

            // console.log('datass',temp.length)
            if (temp.length == 0) {
                state.carts.push(addcart); //dta push in carts array
                addcart['qty'] = 1 // new add qty
                addcart['total'] = addcart.price //// new add total

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
    },
})

// Action creators are generated for each case reducer function
export const { Addtocart, Removeitem, inc, dec , showOffcanvas , hideOffcanvas } = counterSlice.actions

export default counterSlice.reducer