import React from 'react'
import {
    SmileOutlined
} from "@ant-design/icons";
export default function Empty() {
    return (
        <div style={{ textAlign: 'center' }}>
            <SmileOutlined style={{ fontSize: 25, color:'black' }} />
            <h2>Dữ liệu trống</h2>
        </div>
    )
}
