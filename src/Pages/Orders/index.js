import { Avatar, Rate, Space, Table, Typography } from 'antd';
import React,{useState,useEffect} from 'react';
import { getOrders } from '../../API';


const {Text,Title} = Typography;


function Orders() {
  const [loading,setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    setLoading(true);
    getOrders().then((res)=>{
      setDataSource(res.products);
      setLoading(false);
    })
  
   
  }, [])
  return (
    <div>
       <Space size={15} direction='vertical'>
    <Typography>
        <Title level={3}>Orders</Title>

        </Typography>
        <Table
        loading={loading}
        columns={[
        {
          title:"Title",
          dataIndex:"title",
        },
        {
          title:"Price",
          dataIndex:"price",
          render:(value)=><span>${value}</span>
        },
        {
          title:"DiscountedPrice",
          dataIndex:"discountedPrice",
          render:(value)=><span>${value}</span>
        },
        {
          title:"Quantity",
          dataIndex:"quantity",
        },
       
       
        {
          title:"total",
          dataIndex:"total",
        },
        
       
       
      ]}
      dataSource={dataSource}
      pagination={{
        pageSize:5
      }}
      
        ></Table>
        </Space>
</div>
  )
}

export default Orders