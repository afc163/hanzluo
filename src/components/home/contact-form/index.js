import React, { Component } from 'react'
import { Form, Input, Button, Modal } from 'antd'
import ajax from '../../../client/utils/ajax'

const { TextArea } = Input
const FormItem = Form.Item

class ContactForm extends Component {
  state = {
    isLoading: false,
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        ajax({
          method:'POST',
          url: '/api/message',
          data: values,
          success(data) {
            console.log(data)
          },
          fail(err) {
            console.log(err)
          },
        })
      }
    })
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <FormItem
          labelCol={{ xs: { span: 24 }, sm: { span: 24 }, md: { span: 24 } }}
          wrapperCol={{ xs: { span: 24 }, sm: { span: 24 }, md: { span: 24 } }}
          label="Your Name"
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please input your name!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem
          labelCol={{ xs: { span: 24 }, sm: { span: 24 }, md: { span: 24 } }}
          wrapperCol={{ xs: { span: 24 }, sm: { span: 24 }, md: { span: 24 } }}
          label="E-mail"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem
          labelCol={{ xs: { span: 24 }, sm: { span: 24 }, md: { span: 24 } }}
          wrapperCol={{ xs: { span: 24 }, sm: { span: 24 }, md: { span: 24 } }}
          label="Subject"
          hasFeedback
        >
          {getFieldDecorator('subject', {
            rules: [
              {
                required: true,
                message: 'Please input subject!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem
          labelCol={{ xs: { span: 24 }, sm: { span: 24 }, md: { span: 24 } }}
          wrapperCol={{ xs: { span: 24 }, sm: { span: 24 }, md: { span: 24 } }}
          label="Content"
          hasFeedback
        >
          {getFieldDecorator('content', {
            rules: [
              {
                required: true,
                message: 'Please input content!',
              },
            ],
          })(<TextArea />)}
        </FormItem>
        <Button size="large" type="primary" htmlType="submit">
          Send
        </Button>
      </Form>
    )
  }
}

const WrappedContactForm = Form.create()(ContactForm)

export default WrappedContactForm