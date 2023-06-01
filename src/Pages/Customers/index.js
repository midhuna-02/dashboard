import { Avatar, Space, Table, Typography } from 'antd';
import React,{useState,useEffect} from 'react';
import { getCustomers} from '../../API';

const {Title} = Typography;


function Customers() {
  const [loading,setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    setLoading(true);
    getCustomers().then((res)=>{
      setDataSource(res.users);
      setLoading(false);
    })
  
   
  }, [])
  
  return (
    <div>
      <Space size={15} direction='vertical'>
        <Typography>
            <Title level={3}>Customers</Title>
            </Typography>
           
            <Table 
             loading={loading}
            columns={[
               {
                title:"Photo",
                dataIndex:"image",
                render:(link)=>{
                  return <Avatar src={link}/>
                }
              },
              {
                title:"First Name",
                dataIndex:"firstName",
              },
              {
                title:"phone",
                dataIndex:"phone",
                
              },
              {
                title:"Email",
                dataIndex:"email",
                
              },
              {
                title:"Address",
                dataIndex:"address",
                render:(address)=>{
                  return <span>{address.address},{address.city}</span>
                }
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

export default Customers