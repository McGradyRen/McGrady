import React, { Component } from 'react'
import { 
    Card,
    Table 
} from 'antd'
import { getArticleList } from '../../requests'

const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

export default class article extends Component {
    componentDidMount () {
      getArticleList()
    }
    
    render() {
      return (
          <Card title="文章列表" extra={<a href="#">More</a>}>
              <Table
                bordered={true} 
                dataSource={dataSource} 
                columns={columns} 
                pagination={{showSizeChanger: true}}
                />
          </Card>
      )
    }
}
