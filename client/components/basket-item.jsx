var React = require('react'),
    productPresentation = require('./../presentation/product-presentation'),
    currencyFormatter = require('./../../lib/currency-formatter');

module.exports = React.createClass({
  render: function(){
    return (<tr>
              <td className="description">{productPresentation.getTitle(this.props.item.product, this.props.item.deliveryOption)}</td>
              <td className="total">{currencyFormatter.format('GBP', this.props.item.deliveryOption.price)}</td>
              {this.props.allowRemove ?
                <td className="remove">
                  <img
                    src="/interface/delete.svg"
                    title="Remove Item from Basket"
                    id={this.props.item._id}
                    onClick={this.props.onRemoveItem} />
                </td> : ''}
            </tr>);
  }
})
