import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'
import Helmet from 'react-helmet'
import {
  inject,
  observer,
} from 'mobx-react'

import dateFormat from 'dateformat'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import { CircularProgress } from 'material-ui/Progress'

import Container from '../layout/container'

import { topicDetailStyle } from './styles'

import Reply from './reply'

@inject((stores) => {
  return {
    topicStore: stores.topicStore,
  }
}) @observer
class TopicDetail extends React.Component {
  componentDidMount() {
    const id = this.getTopicId()
    this.props.topicStore.getTopicDetail(id)
  }

  getTopicId() {
    return this.props.match.params.id
  }

  render() {
    const {
      classes,
      topicStore,
    } = this.props
    const id = this.getTopicId()
    const topic = topicStore.detailMap[id]
    if (!topic) {
      return (
        <Container>
          <section className={classes.loadingContainer}>
            <CircularProgress color="accent" />
          </section>
        </Container>
      )
    }

    return (
      <div>
        <Container>
          <Helmet>
            <title>{topic.title}</title>
          </Helmet>
          <header className={classes.header}>
            <h3>{topic.title}</h3>
          </header>
          <section className={classes.body}>
            <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
          </section>
        </Container>

        <Paper elevation={4} className={classes.replies}>
          <header className={classes.replyHeader}>
            <span>{`${topic.reply_count} 回复`}</span>
            <span>{`最新回复 ${dateFormat(topic.last_reply_at, 'yy-mm-dd H:mm:s')}`}</span>
          </header>
          <section>
            {
              topic.replies.map(reply => <Reply reply={reply} key={reply.id} />)
            }
          </section>
        </Paper>
      </div>
    )
  }
}

TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
}

TopicDetail.propTypes = {
  match: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(topicDetailStyle)(TopicDetail)
