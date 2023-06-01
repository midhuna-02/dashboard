import { Avatar, Rate, Space, Table, Typography } from 'antd';
import React,{useState,useEffect} from 'react';
import { getInventory } from '../../API';

const {Title} = Typography;


function Inventory() {
  const [loading,setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    setLoading(true);
    getInventory().then((res)=>{
      setDataSource(res.products);
      setLoading(false);
    })
  
   
  }, [])
  
  return (
    <div>
      <Space size={15} direction='vertical'>
        <Typography>
            <Title level={3}>Inventory</Title>
            </Typography>
           
            <Table 
             loading={loading}
            columns={[
               {
                title:"Thumbnail",
                dataIndex:"thumbnail",
                render:(link)=>{
                  return <Avatar src={link}/>
                }
              },
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
                title:"Rating",
                dataIndex:"rating",
                render:(rating)=>{
                  return <Rate value={rating} allowHalf/>
                }
              },
              {
                title:"Stock",
                dataIndex:"stock",
              },
             
             
              {
                title:"Brand",
                dataIndex:"brand",
              },
              
              {
                title:"Category",
                dataIndex:"category",
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

export default Inventory