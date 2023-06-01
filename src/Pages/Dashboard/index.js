
import { Card, Space, Statistic, Table, Typography } from 'antd';
import {DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined} from "@ant-design/icons";

import React, { useEffect, useState } from 'react';


import { getOrders, getRevenue,getInventory,getCustomers } from '../../API';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,

  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';







const {Text,Title} = Typography;
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  
  Tooltip,
  Legend
);


function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);
  useEffect(() => {
    getOrders().then((res)=>{
      setOrders(res.total);
    })
  
    
  }, [])
  useEffect(() => {
    getInventory().then((res)=>{
      setInventory(res.total);
    })
  
    
  }, [])
  useEffect(() => {
    getCustomers().then((res)=>{
      setCustomers(res.total);
    })
  
    
  }, [])
  useEffect(() => {
    getOrders().then((res)=>{
      setRevenue(res.discountedTotal);
    })
  
    
  }, [])
  
  return (
    <div>
        <Typography>
            <Title level={3}>Dashboard</Title>
            <Space direction='horizontal'>

               <DashboardCard icon={<ShoppingCartOutlined 
               style={{color:"green",
               backgroundColor:"rgba(0, 225 ,0 ,0.25)",
               borderRadius:20,
               fontSize:24,
              padding:8}}
               />} title={"Orders"} value={orders}/>
               <DashboardCard icon={<UserOutlined
                style={{color:"red",
                backgroundColor:"rgba( 225,0,0 ,0.25)",
                borderRadius:20,
                fontSize:24,
               padding:8}}
               
               />} title={"Customers"} value={customers}/>
               <DashboardCard icon={<ShoppingOutlined
                style={{color:"blue",
                backgroundColor:"rgba(0,0,225,0.25)",
                borderRadius:20,
                fontSize:24,
               padding:8}}
               
               />} title={"Inventory"} value={inventory}/>

              
<DashboardCard icon={<DollarCircleOutlined
               style={{color:"green",
               backgroundColor:"rgba(0, 225 ,0 ,0.25)",
               borderRadius:20,
               fontSize:24,
              padding:8}}
               />} title={"Revenue"} value={revenue}/>
            </Space> 
          </Typography>
          <Space>
          <RecentOrders/>
          <DashboardChart/>
          
        </Space>
           
    </div>
  )
}
function DashboardCard({title,value,icon})
{
  
    return(
        <Card>
        <Space direction='horizontal'>
       {icon}
        <Statistic title={title} value={value}></Statistic>
        </Space>
      

    </Card>
    );
}
function RecentOrders() {
  const[dataSource,setDataSource]=useState([]);
  const[loading,setLoading]=useState(false);
  useEffect(() => {
    setLoading(true);
    getOrders().then(res=>{
      setDataSource(res.products.splice(0, 3));
      setLoading(false);
    })

   
  }, [])
  

  return (
    <>
    <Typography.Title level={4}>RecentOrders</Typography.Title>
<Table

columns={[
  {
    title:"Title",
    dataIndex:"title",
  },
  {
    title:"Quantity",
    dataIndex:"quantity",
  },
  {
    title:"Price",
    dataIndex:"discountedPrice",
  },
]}
loading={loading}
dataSource={dataSource}
pagination={false}
>
  
</Table>
</>
  );
  
}
function DashboardChart() 
{
  const [revenueData, setrevenueData] = useState({
    labels:[],
    datasets: []

  })
  useEffect(() => {
    getRevenue().then(res=>{
      const labels=res.carts.map((cart)=>{
        return `user-${cart.userId}`;
      })
      const data=res.carts.map((cart)=>{
        return cart.discountedTotal;
      })
      const dataSource = {
        labels,
        datasets: [
          {
            label: 'Revenue',
            data: data,
            backgroundColor: 'rgba(255, 0, 0, 1)',
          },
         
        ],
      };
      setrevenueData(dataSource);

    })
  
   
  }, [])
  

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' ,
    },
    title: {
     display:true,
    
      text: "REVENUE ORDER",
    },
  },
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];



 return(
 <Card style={{width:500, height:250}}> 
 <Bar options={options} data={revenueData}  />
 </Card>
 );
}






export default Dashboard