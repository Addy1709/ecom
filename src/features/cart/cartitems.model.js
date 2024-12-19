

export default class CartItemsModel{
    constructor(prodid,userid,quantity,id){
        this.prodid=prodid;
        this.userid=userid;
        this.quantity=quantity;
        this.id=id;
    }

    static add(prodid,userid,quantity){
        const cartItem=new CartItemsModel(prodid,userid,quantity);//create
        cartItem.id=cartItems.length+1;//assign id
        cartItems.push(cartItem);//push
        return cartItem;
    }

    static get(userid){
        return cartItems.filter((item)=>item.userid==userid);
    }

    static delete(userid,cartitemID){
        const cartitemidx=cartItems.findIndex((i)=>i.id==cartitemID  && i.userid==userid);// else we get -1

        if(cartitemidx==-1){
            return "item not found";
        }else{
            cartItems.splice(cartitemidx,1);/// arr.splice()  pops elemets (startfrom,howmany?)
        }
    }
}

var cartItems=[
    new CartItemsModel(1,1,10,1),
    new CartItemsModel(2,2,80,2),
]
//////(prodid,user,quantity,itemid)




