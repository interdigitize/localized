import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';
const FormItem = Form.Item;
import axios from 'axios';
import { InviteModalContainer } from '../styles/styled-components';

class InviteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      okText: 'Invite',
      emailString: '',
      validateStatus: '',
      btnText: 'Invite your Family',
      modalText: "Enter a family member's email here. They will get an invite link to your family!"
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (window.innerWidth < 768) {
      this.setState({
        btnText: '++'
      });
    }
  }

  showModal() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  handleOk(){
    this.setState({
      modalText: 'The modal will be closed after two seconds',
      okText: 'Inviting...',
      confirmLoading: true
    });
  }

  handleSubmit() {
    this.setState({
      validateStatus: 'validating',
      modalText: 'Emails are sending...'
    });
    const { email, first, last } = __PRELOADED_STATE__.user;
    axios.get('/api/mailer/inviteByEmail', {
      params: {
        toEmail: this.state.emailString,
        fromEmail: email,
        fromFirst: first,
        fromLast: last
      }})
      .then((response) => {
        if(response.data) {
          this.setState({
            validateStatus: 'success',
            modalText: 'Sucesss! Inform your family to check their email for your invite!'
          });
        } else {
          this.setState({
            validateStatus: 'error',
            modalText: 'Oh no! Something happened, please check your input and try again.'
          });
        }
      })
      .catch((error) => {
        this.setState({
          validateStatus: 'error',
          modalText: 'Oh no. Theres a problem. Please try again.'
        });
      });
  }

  handleInputChange(e) {
    this.setState({
      emailString: e.target.value
    });
  }

  render() {
    const { visible, confirmLoading, modalText } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
    };
    return (
      <InviteModalContainer>
        <Button type="primary" onClick={this.showModal}>{this.props.isCollapsed ? '++' : 'Invite your Family'}</Button>
        <Modal
          title="Invite by Email"
          visible={visible}
          onOk={this.handleSubmit}
          okText={this.state.okText}
          confirmLoading={confirmLoading}
          onCancel={this.showModal}
          width="316">
          <Form>
            <FormItem
              {...formItemLayout}
              hasFeedback
              validateStatus={this.state.validateStatus}>
              <Input placeholder="dad@myfamily.com" id="validating" onChange={this.handleInputChange} />
            </FormItem>
          </Form>
          <p>{modalText}</p>
        </Modal>
      </InviteModalContainer>
    );
  }
}

export default InviteModal;
