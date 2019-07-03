import React, { Component } from 'react'
import { 
    Card,
    Table,
    Button,
    Icon,
    Modal 
} from 'antd'
import moment from 'moment'
import XLSX from 'xlsx'
import { getArticleList, deleteArticle } from '../../requests'
import ButtonGroup from 'antd/lib/button/button-group';

export default class article extends Component {
  constructor() {
    super()
    this.state = {
      dataSource: [],
      columns:[],
      isLoading: false,
      total: 0,
      data: [],
      visible: false,
      confirmLoading: false,
      ModalText: '是否删除当前文章信息'
    }
  }

    createColumns = () => {
      const titleMap = {
        title: '标题',
        author: '作者',
        createAt: '创建时间',
        amount: '阅读量'
      }
      const columns =[]
      for (let attr in titleMap) {
        let column = null
        if (attr === 'createAt') {
          column = {
            title: titleMap[attr],
            key: attr,
            render(text, record, index) {
              return moment(record.createAt).format('YYYY年MM月DD日')
              // return new Date(record.createAt).toISOString()
            }
          }
        } else {
          column = {
            title: titleMap[attr],
            dataIndex: attr,
            key: attr
          }
        }
        columns.push(column)
      }

      columns.push({
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return (
            <ButtonGroup>
            <Button onClick={
              (id) => {
                this.editHandler(record.id)
                }
                }><Icon type="edit" />编辑</Button>
            &nbsp;&nbsp;
            <Button 
              type="danger"
              onClick={() =>{
                this.deleteArticleHandler(record.id)
                }}><Icon type="delete" />删除</Button>
            </ButtonGroup>
          )
        }
      })

      this.setState ({
        columns
      })
    }

    editHandler = (id) => {
      this.props.history.push(`/admin/article/edit/${id}`)
    }
    
    deleteArticleHandler = (id) => {
     // console.log(id)
      this.setState({
        visible: true
      })
    }

    handleOk = () => {
      this.setState({
        confirmLoading: true
      })
      // 发送ajax请求，请求删除文章的 api 接口
      // 传递待删除的文章的id

      // deleteArticle (id)
      setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false,
        })
        this.getData()
      }, 2000);
      
    }

    handleCancel = () => {
        this.setState({
          visible: false
        })
    }

    getData = () => {
      this.setState({
        isLoading: true
      }, () => {
        getArticleList().then(resp => {
          // console.log(resp.list)
          this.setState({
            dataSource: resp.list,
            total: resp.total
          })
          this.createColumns()
          // Object.keys(resp.list[0])

          // 导出excel 文件中的数据
          const data = [['标题', '作者', '创建时间', '阅读量']]
          resp.list.forEach((article) =>{
            data.push([
              article.title,
              article.author,
              moment(article.createAt).format('YYYY年MM月DD日'),
              article.amount
            ])
          })
          this.setState({
            data
          })
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.setState({
            isLoading:false
          })
        })
      })
    }

    componentDidMount () {
      this.getData()
    }

    exportFile= () => {
      /* convert state to workbook */
      const ws = XLSX.utils.aoa_to_sheet(this.state.data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      /* generate XLSX file and send to client */
      XLSX.writeFile(wb, "sheetjs.xlsx")
    };

    
    render() {
      const {
        dataSource,
        columns,
        total,
        isLoading,
        visible,
        confirmLoading,
        ModalText
      } = this.state
      return (
          <Card title="文章列表" extra={<Button onClick={this.exportFile}>导出Excel</Button>}>
              <Table
                bordered={true} 
                dataSource={dataSource} 
                columns={columns} 
                pagination={{
                  showSizeChanger: true,
                  showQuickJumper: true,
                  total: total,
                  onChange:(page, pageSize) => {
                    //console.log(page, pageSize)
                    this.getData()
                  }
                }}
                loading={isLoading}
                />
                <Modal
                    title="确认删除"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                  >
                    <p>{ModalText}</p>
                </Modal>
          </Card>
      )
    }
}
