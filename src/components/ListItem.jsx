import React from 'react';
import PropTypes from 'prop-types';
import { Button, List, Avatar, Tooltip, Rate, ConfigProvider, Checkbox } from 'antd';
import { DeleteOutlined, ProfileOutlined, FormOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

import EmptyComponent from './Empty';

dayjs.extend(relativeTime);
dayjs.locale('vi');

function ListItem({ list, onOpenUpdate, onUpdateOther, onRemoved }) {
	return (
		<ConfigProvider renderEmpty={EmptyComponent}>
			<List
				itemLayout="horizontal"
				dataSource={list}
				renderItem={(item) => (
					<List.Item
						actions={[
							<Button icon={<FormOutlined />} type="default" onClick={() => onOpenUpdate(item)}>
								Sửa
							</Button>,
							<Button danger icon={<DeleteOutlined />} onClick={() => onRemoved(item)}>
								Xóa
							</Button>,
						]}
					>
						<List.Item.Meta
							avatar={<Avatar size="large" icon={<ProfileOutlined />} />}
							title={<p>{item.title}</p>}
							description={
								<Tooltip title={dayjs(item.time).fromNow()}>
									Ngày đăng {dayjs(item.time).format('DD/MM/YYYY')}
								</Tooltip>
							}
						/>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							{item.deadline ? (
								<p style={{ margin: 'auto' }}>
									Thời hạn : {item.deadline && dayjs(item.deadline).format('DD-MM-YYYY')}
								</p>
							) : (
									''
								)}
							<span style={{ margin: '0 10px' }}>
								Tiến độ :{' '}
								<Checkbox
									defaultChecked={item.check}
									onChange={(e) => onUpdateOther(item.id, { check: e.target.checked })}
								/>
							</span>
							<Rate
								style={{ margin: '0 10px' }}
								count={1}
								defaultValue={item.star}
								onChange={(value) => onUpdateOther(item.id, { star: value })}
							/>
						</div>
					</List.Item>
				)}
			/>
		</ConfigProvider>
	);
}

ListItem.defaultProps = {
	list: [],
};

ListItem.propTypes = {
	list: PropTypes.array.isRequired,
	onOpenUpdate: PropTypes.func.isRequired,
	onUpdateOther: PropTypes.func.isRequired,
	onRemoved: PropTypes.func.isRequired,
};

export default ListItem;
