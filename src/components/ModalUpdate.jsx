import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Button } from 'antd';

function ModalUpdate({ visible, setVisible, values, onUpdate, }) {
    const [form] = Form.useForm();
    return (
        <Modal
            title="Cập nhật nội dung công việc"
            visible={visible}
            footer={null}
            onCancel={() => {
                setVisible(false);
                form.resetFields();

            }}
        >
            <Form form={form} onFinish={onUpdate}>
                <Form.Item
                    label="Nội dung"
                    name="title"
                    initialValue={values && values.title}
                    rules={[
                        {
                            required: true,
                            message: 'Không được để trống nội dung công việc!',
                        },
                    ]}
                >
                    <Input placeholder="Nhập nội dung công việc" />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">Cập nhật</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

ModalUpdate.defaultProps = {
    values: {}
};

ModalUpdate.propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
};

export default (ModalUpdate);
