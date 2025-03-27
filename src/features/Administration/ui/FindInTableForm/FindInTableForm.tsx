import {Button, Flex, Form, Input} from "antd";
import {FC} from "react";

interface FindInTableFormProps {
    handleSearch: (value: { search: string| undefined }) => void;
}

export const FindInTableForm: FC<FindInTableFormProps> = ({handleSearch}) => {

    const handleReset = () => {
        handleSearch({search: undefined})
    }

    return (

        <Form onFinish={handleSearch}>
            <Flex>
                <Form.Item
                    name={'search'}
                >
                    <Input/>
                </Form.Item>
                <Button
                    htmlType={'submit'}
                >Найти</Button>
                <Button
                    onClick={handleReset}
                >
                    Сбросить
                </Button>
            </Flex>

        </Form>
    );
};

