import {Button, Flex, Form, Input} from "antd";
import {FC, useEffect, useState} from "react";

interface FindInTableFormProps {
    handleSearch: (value: { search: string| undefined }) => void;
}

export const FindInTableForm: FC<FindInTableFormProps> = ({handleSearch}) => {

    const [searchValue, setSearchValue] = useState<string>()
    const [debounceValue, setDebounceValue] = useState<string>()
    const handleReset = () => {
        handleSearch({search: undefined})
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(searchValue)
        }, 500)
        return () =>  clearTimeout(timer)
    }, [searchValue]);

    useEffect(() => {
       if(debounceValue)
        handleSearch({search: debounceValue})
    }, [debounceValue]);

    return (

        <Form>
            <Flex>
                <Form.Item
                    name={'search'}
                >
                    <Input
                        onChange={(e => setSearchValue(e.currentTarget.value))}
                    />
                </Form.Item>
                <Button
                    onClick={handleReset}
                >
                    Сбросить
                </Button>
            </Flex>

        </Form>
    );
};

