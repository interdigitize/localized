import React, { Component } from 'react';
import { Modal, Button, Form, Input } from 'antd';
const FormItem = Form.Item;

class InviteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      okText: 'Invite',
      emailString: '',
      validateStatus: '',
      modalText: "Enter a family member's email here. They will get an invite link to your family!"
    }
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
    return(
      <div id='invite-modal'>
        <Button type="primary" onClick={this.showModal}>Invite your Family</Button>
        <Modal
          title="Title"
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
              validateStatus={this.state.validateStatus}
              help="">
              <Input placeholder="dad@myfamily.com" id="validating" onChange={this.handleInputChange} />
            </FormItem>
          </Form>
          <p>{modalText}</p>
        </Modal>
      </div>
    );
  }
}

export default InviteModal;
