export default [
  {
    authName: '系统管理',
    id: 1,
    order: 1,
    path: 'system',
    children: [
      {
        authName: '账户管理',
        children: [],
        id: 11,
        order: null,
        path: 'system/account'
      }
    ]
  },
  {
    authName: '报修管理',
    id: 2,
    order: 2,
    path: 'report',
    children: [
      {
        authName: '报修记录',
        children: [],
        id: 22,
        order: null,
        path: 'report/record'
      }
    ]
  }
]
