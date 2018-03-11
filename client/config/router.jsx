import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom'

import TopicList from '../views/topic-list/index'
import TopicDetail from '../views/topic-detail/index'
import UserLogin from '../views/user/login'
import UserInfo from '../views/user/info'
import TopicCreate from '../views/topic-create/index'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="first" />,
  <Route path="/list" component={TopicList} key="list" />,
  <Route path="/detail/:id" component={TopicDetail} key="detail" />,
  <Route path="/topic/create" component={TopicCreate} key="create" />,
  <Route path="/user/login" exact component={UserLogin} key="login" />,
  <Route path="/user/info" component={UserInfo} key="user-info" />,
]
