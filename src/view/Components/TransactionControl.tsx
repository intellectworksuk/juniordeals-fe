import { SaveOutlined } from '@ant-design/icons'
import { Form, InputNumber, Select, Spin } from 'antd'
import { strictEqual } from 'assert'
import { useAppSelector } from '../../hooks/reduxHooks'
import { User } from '../../types'

interface TransactionControlProps {
  user: User
  showOperator: boolean
  onSave: (values: any) => void
  onChangeCredits?: (credits: any) => void
}

export const TransactionControl = (props: TransactionControlProps) => {
  const { status } = useAppSelector((state) => state.transaction)

  const selectBefore = props.showOperator ? (
    <Form.Item
      name="Operator"
      rules={[{ required: true, message: '*' }]}
      noStyle
    >
      <Select>
        <Select.Option value=""> </Select.Option>
        <Select.Option value="add">+</Select.Option>
        <Select.Option value="minus">-</Select.Option>
      </Select>
    </Form.Item>
  ) : (
    <>+</>
  )

  return (
    <>
      <Form
        onFinish={props.onSave}
        fields={[
          {
            name: ['ReceiverId'],
            value: props.user.id,
          },
          {
            name: ['AvailableCredits'],
            value: props.user.availableCredits,
          },
          // {
          //   name: ["Credits"],
          //   value: props.user.availableCredits,
          // },
        ]}
      >
        <div className="row">
          <div className="col-lg-12 text-center">
            <Form.Item hidden={true} name="ReceiverId">
              <InputNumber></InputNumber>
            </Form.Item>
            <Form.Item hidden={true} name="AvailableCredits">
              <InputNumber></InputNumber>
            </Form.Item>
            <Form.Item name="Credits">
              <InputNumber
                min={0}
                max={9999}
                addonBefore={selectBefore}
                addonAfter={
                  <button
                    type="submit"
                    disabled={status === 'transferCreditsPending'}
                  >
                    <span id="button-text">
                      {status === 'transferCreditsPending' ? (
                        <Spin size="small" />
                      ) : (
                        <SaveOutlined />
                      )}
                    </span>
                  </button>
                }
                // defaultValue={props.user.availableCredits}
                onChange={props.onChangeCredits}
              ></InputNumber>
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  )
}
