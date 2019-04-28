/**
 * Created by suwt on 2017/3/9.
 */
import Mock from 'mockjs'

export default {
  mockData() {
    Mock.mock('/api/menu', {
      'code': 0,
      'data|5-20': [{
        'id|1-100': 100,
        'name': '@name',
        'category|1': [
          'cold',
          'hot',
          'soup'
        ],
        'depict': '@sentence(5)',
        'price|1-100': 100
      }]
    })
    Mock.mock('/api/menu/delete', {
      'code': 0
    })
    Mock.mock('/api/menu/update', {
      'code': 0
    })
    Mock.mock('/api/user', {
      'code': '000',
      'datas': {
        'name': '@cname', // 内容：npm安装后 mockjs/src/mock/random/xxx.js
        'area': '@province(true)',
        'identity': '超级管理员'
      }
    })
    Mock.mock('/api/menu/getcategory', {
      'code': 0,
      'data': ['cold', 'hot', 'soup']
    })
    Mock.mock('/api/order', {
      'code': 0,
      'data|1-10': [{
        'id': '@id',
        'create_time': 'time',
        'state': 0,
        'table_id': '000',
        'data|1-5': [{
          'count': 10,
          'name': 'name',
          'menu_id': 1
        }]
      }]
    })
  }
}
