import React, { useReducer, useState } from 'react';
import { Button, Row, Col, Typography, Input, Form, Modal, DatePicker } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { v4 as uuidv4 } from 'uuid';
import 'dayjs/locale/vi';

import ListItem from './components/ListItem';
import ModalUpdate from './components/ModalUpdate';

dayjs.extend(relativeTime);
dayjs.locale('vi');

const { Title } = Typography;
const { confirm } = Modal;
const initialState = { list: [] };

function reducer(state, action) {
	switch (action.type) {
		case 'ADD_TODO': {
			let newTodoList = [...state.list];
			newTodoList.push(action.payload);
			return { list: newTodoList };
		}
		case 'UPDATE_TODO': {
			let newTodoList = [...state.list];
			let itemUpdate = newTodoList.find((ele) => ele.id === action.payload.id);
			itemUpdate.title = action.payload.title;
			return { list: newTodoList };
		}
		case 'REMOVE_TODO':
			let newTodoList = [...state.list];
			newTodoList.filter((value) => value.id !== action.payload);
			return { list: newTodoList };
		default:
			throw new Error();
	}
}
function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [visibleUpdate, setVisibleUpdate] = useState(false);
	const [dataItemPick, setDataItemPick] = useState({});

	const handleSubmit = (values) =>
		dispatch({
			type: 'ADD_TODO',
			payload: { id: uuidv4(), time: dayjs(), star: false, check: false ,...values},
		});

	const handleRemoveItem = (values) => {
		confirm({
			onOk() {
				dispatch({ type: 'REMOVE_TODO', payload: values.id });
			},
			okText:'Xác nhận',
			cancelText:'Hủy',
			title: 'Xóa nội dung công việc',
			icon: <ExclamationCircleOutlined />,
			content: `Xác nhận xóa công việc có nội dung là : ${values.title.slice(0, 20)}...`,
		});
	};

	const handleUpdateTodo = (values) =>
		dispatch({
			type: 'UPDATE_TODO',
			payload: { id: dataItemPick.id, title: values.title },
		});

	const handleOpenModalUpdate = (values) => {
		setDataItemPick(values);
		setVisibleUpdate(true);
	};
	return (
		<div>
			<div className="App">
				<div className="header">
					<Row gutter={16} justify="space-around" align="middle">
						<Col xs={24} sm={24} md={24}>
							<Title level={3} style={{ textAlign: 'center' }}>
								Todo App
							</Title>
						</Col>
						<Col xs={24} sm={24} md={24}>
							<Form onFinish={handleSubmit}>
								<Row gutter={16}>
									<Col xs={24} sm={18} md={18}>
										<Form.Item
											label="Nội dung"
											name="title"
											rules={[
												{
													required: true,
													message: 'Không được để trống nội dung công việc!',
												},
											]}
										>
											<Input placeholder="Nhập nội dung" />
										</Form.Item>
									</Col>
									<Col xs={24} sm={6} md={6}>
										<Form.Item label="Thời hạn" name="deadline">
											<DatePicker placeholder="Chọn ngày"  />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={24}>
										<div style={{display:'flex',justifyContent:'flex-end'}}>
											<Button icon={<PlusOutlined />} type="primary" htmlType="submit">
												Thêm mới
											</Button>
										</div>
									</Col>
								</Row>
							</Form>
						</Col>
					</Row>
				</div>
			</div>
			<div className="App" style={{ marginTop: '1em' }}>
				<Row gutter={16} justify="space-around" align="middle">
					<Col xs={24} sm={24} md={24}>
						<Title level={3} style={{ textAlign: 'center' }}>
							Danh sách nội dung công việc
						</Title>
					</Col>
					<Col xs={24} sm={24} md={24}>
						<ListItem
							list={state.list}
							onRemoved={handleRemoveItem}
							onOpenUpdate={handleOpenModalUpdate}
						/>
					</Col>
				</Row>
			</div>
			<ModalUpdate
				visible={visibleUpdate}
				setVisible={setVisibleUpdate}
				onUpdate={handleUpdateTodo}
			/>
		</div>
	);
}

export default App;
