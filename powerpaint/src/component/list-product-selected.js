import React, { Component } from 'react'; 

class ListProductSelected extends Component {
    state = {
        listProductSelected: this.props.listProductSelected,
      }
    render() { 
        let listShop=JSON.parse(localStorage.getItem('listShop'));
        let listProductSelected = this.state.listProductSelected;
        let rows =listProductSelected.map ( x => {
            let shopName;
            for ( let i=0; i< listShop.length; i++){
                if (listShop[i].shop_id == x.shop_id) shopName=listShop[i].name;
            }
            return (
            <>
            <tr>
                <td>{shopName}</td>
                <td>{x.item.name}</td>
            </tr>
            </>
        )}
        )
        return ( 
            <>
            <div>Danh sách sản phẩm đã chọn</div>
            <table>
                <thead>
                    <th>Shop</th>
                    <th>Tên sản phẩm</th>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
            </>
         );
    }
}
 
export default ListProductSelected;