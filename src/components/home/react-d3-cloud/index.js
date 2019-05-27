// Forked from https://github.com/Yoctol/react-d3-cloud

import React from 'react'
import PropTypes from 'prop-types'
import ReactFauxDom from 'react-faux-dom'
import * as d3 from 'd3'
import cloud from 'd3-cloud'
// import { Icon } from 'antd'

const defaultFontSizeMapper = word => word.value
const fill = d3.scaleOrdinal(d3.schemeCategory10)

class WordCloud extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      }),
    ).isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    padding: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    font: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    fontSizeMapper: PropTypes.func,
    rotate: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  }

  static defaultProps = {
    padding: 5,
    font: 'serif',
    fontSizeMapper: defaultFontSizeMapper,
    rotate: 0,
  }

  constructor(props) {
    super(props)
    this.wordCloud = ReactFauxDom.createElement('div')
    this.wordCloud.style.setProperty('width', '100%')
    this.wordCloud.style.setProperty('height', '100%')
    this.wordCloud.style.setProperty('margin', '0 auto')
    // this.wordCloud.style.setProperty('text-align', 'center')
    // this.wordCloud.appendChild(<Icon key="1" style={{ fontSize: '36px', marginTop: '60px' }} type="loading" />)
  }

  componentDidMount() {
    const windowWidth = window.innerWidth
    this.renderChart()

    d3.select(window).on('resize', () => {
      if (window.innerWidth >= 320 && window.innerWidth !== windowWidth) {
        this.renderChart()
      }
    })
  }

  renderChart() {
    const { data, padding, font, fontSizeMapper, rotate } = this.props
    // const { width, height } = this.state
    const wordCounts = data.map(text => ({ ...text }))
    // clear old words
    d3.select(this.wordCloud)
      .selectAll('*')
      .remove()
    // render based on new data
    const layout = cloud()
      .size([this.wordCloud.component.offsetWidth, this.wordCloud.component.offsetHeight])
      .font(font)
      .words(wordCounts)
      .padding(padding)
      .rotate(rotate)
      .fontSize(fontSizeMapper)
      .on('end', words => {
        d3.select(this.wordCloud)
          .append('svg')
          // .attr('width', layout.size()[0])
          // .attr('height', layout.size()[1])
          .append('g')
          .attr('transform', `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`)
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', d => `${d.size}px`)
          .style('font-size', d => `${d.size}px`)
          .style('font-family', font)
          .style('fill', (d, i) => fill(i))
          .attr('text-anchor', 'middle')
          .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
          .text(d => d.text)
      })
    layout.start()
    this.forceUpdate()
  }

  render() {
    return this.wordCloud.toReact()
  }
}

export default WordCloud
