import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import * as api from '../utils/api'
import VideoListEntry from './VideoListEntry'

class VideoList extends Component {
  constructor(props) {
    super(props)
    this.state = { videos: [] }
    this.searchVideos = this.searchVideos.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    /* Extracts query string from nextProps */
    const qs = new URLSearchParams(nextProps.location.search)
    this.searchVideos(qs.get('q'))
  }

  componentDidMount() {
    /* Extracts query string from this.props */
    const qs = new URLSearchParams(this.props.location.search) 
    this.searchVideos(qs.get('q'))
  }

  searchVideos(query) {
    api
      .getVideos(query)
      .then((videos) => {
        this.setState({ 
          videos: videos
        })
      })
  }

  render() {
    return (
      <div className="o-container o-container--medium mt-1">
        <ul className="video-list">
          {this.state.videos.map((video) => (
            <VideoListEntry key={video._id} video={video}/>
          ))}
        </ul>
      </div>
    )
  }
}

export default withRouter(VideoList)