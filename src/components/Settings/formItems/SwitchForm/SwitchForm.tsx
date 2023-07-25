import React, { FC } from 'react';
import { Button, Form, Input, Space, Switch } from 'antd';
import { CustomerInfo } from '@/types/models/chatbotCustom/customer-info.type';
import s from './SwitchForm.module.css';
type SwitchFormProps = {
  checkedValue: boolean;
  switchKeyName: keyof CustomerInfo;
  inputKeyName: keyof CustomerInfo;
  inputValue: string | number;
  onChange: <K extends keyof CustomerInfo>(
    key: K,
    value: CustomerInfo[K],
  ) => void;
};

const SwitchForm: FC<SwitchFormProps> = ({
  checkedValue,
  inputKeyName,
  switchKeyName,
  inputValue,
  onChange,
}) => {
  return (
    <>
      <Switch
        style={{
          width: '30%',
        }}
        className={s.switchMain}
        checked={checkedValue}
        onChange={(ifChecked) => onChange(switchKeyName, ifChecked)}
      />
      {checkedValue && (
        <Form.Item label="">
          <Space direction="vertical">
            <Input
              value={inputValue} // Here, the value is passed in via props
              style={{
                width: '30%',
                marginTop: '5px',
              }}
              onChange={(e) => onChange(inputKeyName, e.target.value)}
            />
            <Button type="primary" onClick={() => onChange(inputKeyName, '')}>
              Reset Phone
            </Button>
          </Space>
        </Form.Item>
      )}
    </>
  );
};

export default SwitchForm;
