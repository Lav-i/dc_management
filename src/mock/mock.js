/**
 * Created by suwt on 2017/3/9.
 */
import Mock from 'mockjs'

export default {
  mockData() {
    Mock.mock('/api/getMenu', {
      "code": "000",
      "datas|5-20": [{
        "id|1-100": 100,
        "name": "@name",
        "category|1": [
          "cold",
          "hot",
          "soup"
        ],
        "depict": "@sentence(5)",
        "price|1-100": 100
      }]
    })
    Mock.mock('/api/deletemenu', {
      "code": "200"
    })
    Mock.mock('/api/editmenu', {
      "code": "200"
    })
    Mock.mock('/api/user', {
      "code": "000",
      "datas": {
        "name": "@cname", // 内容：npm安装后 mockjs/src/mock/random/xxx.js
        "area": "@province(true)",
        "identity": "超级管理员"
      }
    })
    Mock.mock('/api/getOptions', {
      "code": "000",
      "data": [{
        "label": "all",
        "value": "all"
      },
      {
        "label": "cold",
        "value": "cold"
      },
      {
        "label": "hot",
        "value": "hot"
      },
      {
        "label": "soup",
        "value": "soup"
      }]
    })
  }
}
