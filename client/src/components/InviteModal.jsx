import React, { Component } from 'react';
import { Modal, Button, Form, Input, Icon } from 'antd';
const FormItem = Form.Item;
import axios from 'axios';
import { InviteModalContainer } from '../styles/styled-components';

class InviteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      okText: 'Invite',
      emailStrings: {},
      validateStatus: {},
      btnText: 'Invite your Family',
      modalText: 'Enter a family member\'s email here. They will get an invite link to your family!',
      invites: ['invite-0'],
      emailSuccess: false
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.appendInput = this.appendInput.bind(this);
    this.truncateInput = this.truncateInput.bind(this);
  }

  componentDidMount() {
    if (window.innerWidth < 768) {
      this.setState({
        btnText: '++'
      });
    }
  }

  showModal() {
    if (this.state.visible) {
      this.setState({
        visible: !this.state.visible,
        emailStrings: {},
        okText: 'Invite',
        emailSuccess: false,
        validateStatus: {},
        invites: ['invite-0']
      });
    } else {
      this.setState({
        visible: !this.state.visible,
      });
    }
  }

  handleOk(){
    this.setState({
      okText: 'Inviting...',
      confirmLoading: true
    });
  }

  handleSubmit() {
    this.setState({
      modalText: 'Emails are sending...'
    });

    const { email, first, last } = __PRELOADED_STATE__.user;
    const familyId = __PRELOADED_STATE__.family_id;
    const emailStrings = Object.values(this.state.emailStrings).join(', ');

    axios.get('/api/mailer/invite', {
      params: {
        toEmail: emailStrings,
        fromEmail: email,
        fromFirst: first,
        fromLast: last,
        familyId: familyId
      }})
      .then((response) => {
        if(response.data.success) {
          this.setState({
            validateStatus: 'success',
            modalText: 'Sucesss! The emails are on thier way!',
            emailSuccess: true,
            okText: 'Close'
          });
        } else {
          var context = this;
          var modalText = 'Hmmm there were some issues: ';
          response.data.payload.forEach((input, index) => {
            var emailInput = `invite-${index}`;
            if (!input.success) {
              modalText += input.payload.message + ' ';
              console.log(modalText);
            }
            var updatedValidateStatus = Object.assign({}, this.state.validateStatus, { [emailInput]: input.success })
            context.setState({
              validateStatus: updatedValidateStatus,
              modalText: modalText
            });
          });
        }

        var toEmails = response.data.payload.filter((input) => {
          return input.success === true;
        })
        .map((input) => {
          return input.payload.email;
        });

        axios.get('/api/mailer/sendEmails', {
          params: {
            toEmails
          }
        })
        .then((response) => {
          console.log('success');
        })
        .catch(error => {
          console.log(error);
        });

      })
      .catch((error) => {
        this.setState({
          validateStatus: 'error',
          modalText: 'Oh no. Theres a problem. Please try again.'
        });
      });
  }

  handleInputChange(e) {
    const inviteId = e.target.dataset['invite'];
    const updatedEmailString = Object.assign({}, this.state.emailStrings, { [inviteId]: e.target.value });
    this.setState({
      emailStrings: updatedEmailString
    });
  }

  appendInput() {
    const newInvite = `invite-${this.state.invites.length}`;
    this.setState({ invites: this.state.invites.concat([newInvite]) });
  }

  truncateInput() {
    this.setState({ invites: this.state.invites.slice(0, -1) });
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
    const truncateBtn = (this.state.invites.length > 1 ? <Button style={{marginLeft: '5px'}} onClick={() => this.truncateInput()}>-</Button> : null);
    return (
      <InviteModalContainer>
        <Button type='primary' onClick={this.showModal}>{this.props.isCollapsed ? '++' : 'Invite your Family'}</Button>
        <Modal
          title='Invite by Email'
          visible={visible}
          onOk={this.state.emailSuccess ? this.showModal : this.handleSubmit }
          okText={this.state.okText}
          confirmLoading={confirmLoading}
          onCancel={this.showModal}
          width='316'>
          <Form>
            {this.state.invites.map(invite =>
              <FormItem
                {...formItemLayout}
                key={invite}
                hasFeedback
                validateStatus={this.state.validateStatus[invite] ? 'success' : ''}
                style={{marginBottom: '5px'}}>
                <Input
                  data-invite={invite}
                  placeholder='example@myfamily.com'
                  onChange={this.handleInputChange}
                  value={this.state.emailStrings[invite]}
                />
              </FormItem>
            )}
            <Button onClick={() => this.appendInput()}>Add Recipient</Button>
            {truncateBtn}
          </Form>
          <p>{modalText}</p>
        </Modal>
      </InviteModalContainer>
    );
  }
}

export default InviteModal;
