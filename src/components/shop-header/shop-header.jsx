import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./shop-header.css"

const ShopCart = ({ items, order }) => {
    if (items === 0) return null

    return (
        <div className="shopping-cart">
            <i className="cart-icon fa fa-shopping-cart" />
            {items} items (${order})
        </div>
    )
}

const ShopHeader = ({ itemsTotal, orderTotal }) => {
    return (
        <header className="shop-header row">
            <Link to="/">
                <div className="logo text-dark" >ReStore</div>
            </Link>
            <Link to="/cart">
                <ShopCart items={itemsTotal} order={orderTotal} />
            </Link>
        </header>
    )
}

const mapStateToProps = ({ shoppingCart: { itemsTotal, orderTotal } }) => {
    return {
        itemsTotal,
        orderTotal
    }
}

export default connect(mapStateToProps)(ShopHeader);